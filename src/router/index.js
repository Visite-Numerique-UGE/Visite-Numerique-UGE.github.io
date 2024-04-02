import { createRouter, createWebHashHistory } from 'vue-router'
import MapView from '../views/MapView.vue';
import QuizView from '../views/QuizView.vue';
import HomeView from '../views/HomeView.vue';
import EventView from '../views/EventView.vue';
import CourseView from '../views/CourseView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/quiz/:id',
      name: 'quiz',
      component: QuizView
    },
    {
      path: '/parcours/:id',
      name: 'parcours',
      component: CourseView
    },
    {
      path: '/parcours/',
      name: 'parcours-list',
      component: CourseView
    },
    {
      path: '/event/',
      name: 'event-list',
      component: EventView
    },
    {
      path: '/event/:id',
      name: 'event',
      component: EventView
    },
    {
      path: '/navigate/:id',
      name: 'navigate',
      component: MapView
    }
  ]
})

export default router
