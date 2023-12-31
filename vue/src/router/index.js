import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import ParentLandingPage from '../views/ParentLandingPage.vue'
// import KidsLandingPage from '../views/KidsLandingPage.vue'
import RegisterKids from '../views/RegisterKids.vue'
import store from '../store/index'
import ItemStore from '../views/StoreView.vue'
import Closet from '../views/ClosetView.vue'
import LoginKids from '../views/LoginKids.vue'
import Games from '../views/GamesView.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/parents",
      name: "parents",
      component: ParentLandingPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/parents/register",
      name: "register-kids",
      component: RegisterKids,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/store",
      name: "item-store",
      component: ItemStore,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/closet",
      name: "closet",
      component: Closet,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/login/kids",
      name: "kids-login",
      component: LoginKids,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/games",
      name: "games",
      component: Games,
      meta: {
        requiresAuth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
