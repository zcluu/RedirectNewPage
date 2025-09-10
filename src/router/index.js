import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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

router.beforeEach((to, from, next) => {
    document.title = to.query.to || 'New Page'
    next()
})
export default router
