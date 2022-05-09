import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterView from "@/views/CharacterView";
import ItemView from "@/views/ItemView";
import ScheduleView from "@/views/ScheduleView";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/character',
    name: 'character',
    component: CharacterView
  },
  {
    path: '/item',
    name: 'item',
    component: ItemView
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: ScheduleView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
