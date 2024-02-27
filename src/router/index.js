import { createRouter, createWebHistory } from 'vue-router'
import MapView from '../views/MapView.vue';
import QuizView from '../views/QuizView.vue';
import HomeView from '../views/HomeView.vue';
import EventView from '../views/EventView.vue';
import CourseView from '../views/CourseView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/map',
      name: 'map',
      component: MapView
    },
    {
      path: '/map/:id',
      name: 'map-slider',
      component: MapView
    },
    {
      path: '/quiz:id',
      name: 'quiz',
      component: QuizView
    },
    {
      path: '/quiz/',
      name: 'course',
      component: CourseView
    },
    {
      path: '/event/',
      name: 'event',
      component: EventView
    }
  ]
})

export default router
