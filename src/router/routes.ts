import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/pages/index.vue'),
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: () => import(/* webpackChunkName: "about-us" */ '@/pages/about-us.vue'),
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import(/* webpackChunkName: "articles" */ '@/pages/articles/index.vue'),
  },
  {
    path: '/articles/:title_slug',
    name: 'articles-show',
    component: () => import(/* webpackChunkName: "articles-show" */ '@/pages/articles/show.vue'),
  },

]

export default routes
