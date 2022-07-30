// @ts-check
const fs = require('fs')
const path = require('path')
const express = require('express')
const axios = require('axios')

const { SitemapStream, streamToPromise } = require('sitemap')
const { createGzip } = require('zlib')
// const { Readable } = require('stream')

const dotenv = require('dotenv')

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

const IS_PROD = process.env.NODE_ENV === 'production'

if (IS_PROD) {
  dotenv.config({ path: '.env.production' })
} else {
  dotenv.config({ path: '.env' })
}

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'https://api.improvecn.com/api'

async function createServer (
  root = process.cwd(),
  isProd = IS_PROD,
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  // @ts-ignore
  const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}
  // const manifest = require('./dist/client/ssr-manifest.json')

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    vite = await require('vite').createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false,
      }),
    )
  }

  // sitemap
  let sitemap
  app.get('/sitemap.xml', async function (req, res) {
    res.header('Content-Type', 'application/xml')
    res.header('Content-Encoding', 'gzip')
    // if we have a cached entry send it
    // TODO: 缓存？
    // if (sitemap) {
    //   res.send(sitemap)
    //   return
    // }

    try {
      const smStream = new SitemapStream({ hostname: 'https://improvecn.com/' })
      const pipeline = smStream.pipe(createGzip())

      // pipe your entries or directly write them.
      smStream.write({ url: '/', changefreq: 'daily', priority: 1.0 })
      smStream.write({ url: '/about-us/', changefreq: 'daily', priority: 1.0 })
      smStream.write({ url: '/products/', changefreq: 'daily', priority: 1.0 })
      smStream.write({ url: '/articles/', changefreq: 'daily', priority: 1.0 })
      smStream.write({ url: '/contact/', changefreq: 'daily', priority: 1.0 })

      // todo: dynamic routes
      // const { data: routes } = await axios.get(`${API_BASE_URL}/dynamic-routes`)
      // routes.forEach((route) => {
      //   smStream.write({ url: route, changefreq: 'daily', priority: 1.0 })
      // })

      /* or use
      Readable.from([{url: '/page-1'}...]).pipe(smStream)
      if you are looking to avoid writing your own loop.
      */

      // cache the response
      streamToPromise(pipeline).then(sm => {
        sitemap = sm
      })
      // make sure to attach a write stream such as streamToPromise before ending
      smStream.end()
      // stream write the response
      pipeline.pipe(res).on('error', (e) => { throw e })
    } catch (e) {
      console.error(e)
      res.status(500).end()
    }
  })

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.js')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      }

      const [
        appHtml,
        preloadLinks,
        headTags,
        htmlAttrs,
        bodyAttrs,
      ] = await render(url, manifest)

      // TODO: initialState
      let initialState = {}

      initialState = '<script>window.__INITIAL_STATE__=' + JSON.stringify(initialState) + '</script>'

      const html = template
        .replace('{{ HTML_ATTRS }}', htmlAttrs)
        .replace('{{ HEAD }}', headTags)
        .replace('{{ BODY_ATTRS }}', bodyAttrs)
        .replace('{{ INITIAL_STATE }}', initialState)
        .replace('<!--preload-links-->', preloadLinks)
        .replace('<!--app-html-->', appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  const port = 3000
  createServer().then(({ app }) =>
    app.listen(port, () => {
      console.log(`http://localhost:${port}`)
    }),
  )
}

// for test use
exports.createServer = createServer
