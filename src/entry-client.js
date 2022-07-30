import { createApp } from './main'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

import * as Shareon from 'shareon'
import 'shareon/css'

window.Shareon = Shareon

window.gsap = gsap
window.gsap.registerPlugin(ScrollTrigger)

const { app, router } = createApp()

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
  app.mount('#app')
})
