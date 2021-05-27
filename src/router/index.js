import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      requiresAuth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Logout.vue')
  },
  {
    path: '/login',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue')
  },
  {
    path: '/quiz',
    name: 'Quiz',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/Quiz.vue')
  },
  {
    path: '/highscore',
    name: 'Highscore',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/Highscore.vue')
  },
  {
    path: '/myprofile',
    name: 'MyProfile',
    meta: {
      requiresAuth: true,
    },
    component: () => import('../views/MyProfile.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})
