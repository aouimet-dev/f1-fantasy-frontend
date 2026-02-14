import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../pages/Dashboard.vue'),
  },
  {
    path: '/standings',
    name: 'Leaderboard',
    component: () => import('../pages/Leaderboard.vue'),
  },
  {
    path: '/races',
    name: 'RaceCalendar',
    component: () => import('../pages/RaceCalendar.vue'),
  },
  {
    path: '/races/:raceId',
    name: 'RaceDetails',
    component: () => import('../pages/RaceDetails.vue'),
  },
  {
    path: '/members',
    name: 'Members',
    component: () => import('../pages/Members.vue'),
  },
  {
    path: '/members/:memberId',
    name: 'MemberProfile',
    component: () => import('../pages/MemberProfile.vue'),
  },
  {
    path: '/members/:memberId/teams/:teamId',
    name: 'TeamDetails',
    component: () => import('../pages/TeamDetails.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFound.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
