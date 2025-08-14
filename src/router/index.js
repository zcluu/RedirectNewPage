import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: ()=>import('@/views/RedirectNewPageView.vue'),
    },
  ],
})

export default router
