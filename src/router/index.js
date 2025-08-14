import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: '',
            component: () => import('@/views/RedirectNewPageView.vue'),
        },
        {
            path: '/new',
            name: 'new',
            component: () => import('@/views/CreateNewURLView.vue')
        }
    ],
})

export default router
