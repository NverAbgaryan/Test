import Vue from 'vue'
import Router from 'vue-router'
import firstPage from '../content/first-page-content.vue'
import second from '../content/second-page-content.vue'
import Video from '../content/video.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'first',
      component: firstPage
    },
    {
      path: '/second',
      name: 'second',
      component: second
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    }
  ]
})
