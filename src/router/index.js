import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from "@/views/ItemView";
import SignUpView from "@/views/SignUpView";
import LoginView from "@/views/LoginView";
import TeamEditView from "@/views/TeamEditView";
import TeamDisplayView from "@/views/TeamDisplayView";
import MemberEditView from "@/views/MemberEditView";
import TeamEntryView from "@/views/TeamEntryView";
import TeamScheduleView from "@/views/TeamScheduleView";
import ScheduleAddView from "@/views/ScheduleAddView";
import ScheduleEditView from "@/views/ScheduleEditView";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/item',
    name: 'item',
    component: ItemView
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
  },
  {
    path: '/team/schedule/add',
    name: 'scheduleAdd',
    component: ScheduleAddView
  },
  {
    path: '/team/schedule/edit',
    name: 'scheduleEdit',
    component: ScheduleEditView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
