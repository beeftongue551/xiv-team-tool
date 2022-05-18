import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CharacterView from "@/views/CharacterView";
import ItemView from "@/views/ItemView";
import ScheduleEditView from "@/views/ScheduleEditView";
import SignUpView from "@/views/SignUpView";
import LoginView from "@/views/LoginView";
import TeamEditView from "@/views/TeamEditView";
import TeamDisplayView from "@/views/TeamDisplayView";
import MemberEditView from "@/views/MemberEditView";
import TeamEntryView from "@/views/TeamEntryView";
import TeamScheduleView from "@/views/TeamScheduleView";
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
    path: '/team/schedule/edit',
    name: 'scheduleEdit',
    component: ScheduleEditView
  },
  {
    path: '/sign-up',
    name:'signUp',
    component: SignUpView
  },
  {
    path:'/login',
    name:'login',
    component: LoginView
  },
  {
    path: '/team/edit',
    name: 'teamEdit',
    component: TeamEditView
  },
  {
    path: '/team/display',
    name: 'teamDisplay',
    component: TeamDisplayView
  },
  {
    path: '/team/member-edit',
    name: 'memberEdit',
    component: MemberEditView
  },
  {
    path: '/team/entry',
    name: 'teamEntry',
    component: TeamEntryView
  },
  {
    path: '/team/schedule',
    name: 'teamSchedule',
    component: TeamScheduleView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
