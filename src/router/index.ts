import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView // 這代表首頁會載入 HomeView.vue
    },
    {
      path: '/about',
      name: 'about',
      // 使用延遲加載提高性能
      component: () => import('../views/AboutUs.vue')
    },
    {
      path: '/work/outdoor',
      name: 'OutdoorGallery',
      component: () => import('../views/OutdoorGallery.vue')
    },
    {
      path: '/work/modelcard',
      name: 'ModelCard',
      component: () => import('../views/ModelCard.vue')
    },
    {
      path: '/work/light',
      name: 'LightPortfolio',
      component: () => import('../views/LightPortfolio.vue')
    },
    {
      path: '/work/exquisite',
      name: 'Exquisite',
      component: () => import('../views/Exquisite.vue')
    },
    {
      path: '/work/birthday',
      name: 'Birthday',
      component: () => import('../views/Birthday.vue')
    },
    {
      path: '/work/customized',
      name: 'Customized',
      component: () => import('../views/Customized.vue')
    },
    { 
      path: '/testimonials', 
      name: 'testimonials', 
      component: () => import('../views/Testimonials.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // 始終捲動到頂部
    return { top: 0 }
  },
})

export default router
