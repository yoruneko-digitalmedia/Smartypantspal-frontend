// Import Vue Router modules
import { createRouter, createWebHistory } from 'vue-router';

// Import components
import main from '../views/Main/00-Main.vue';
import Login from '../views/Login/00-Login.vue';
import axios from 'axios';
const check = true
// Define route rules
const routes = [
  {
    path: '/login', // Login page route
    name: 'Login',
    component: Login,
    // beforeEnter: async (to, from, next) => {
    //   // Execute asynchronous check function before entering the route
    //   await check_function(to, from, next);
    // }
  },
  {
    path: '/main', // Main page route
    name: 'main',
    redirect: '/main/home',
    component: main,
    // beforeEnter: async (to, from, next) => {
    //   // Execute asynchronous check function before entering the route
    //   await check_function(to, from, next);
    // },
    children: [
      // Child page routes
      { path: 'home', name: 'Home', 
        component: () => import('../views/Main/01-Home.vue') },
      { path: 'test/', name: 'test', 
        component: () => import('../views/Main/02-Test.vue'),
        children:[
          { path: 'history', name: 'history', 
            component: () => import('../views/Main/02-Test/History.vue'),},
          { path: 'detail', name: 'Detail', 
            component: () => import('../views/Main/02-Test/Detail.vue')},
          {
            path: 'question', 
            name: 'question', 
            component: () => import('../views/Main/02-Test/Question.vue'),
            meta: { fallback: '/main/test/history' },  // Set a fallback route in route meta
            beforeEnter: (to, from, next) => {
              if(!check){
                console.log("Navigation to 'question' route is blocked.")
                next(to.meta.fallback || from.path);  // Navigate to the fallback route if it exists
              }else{
                next();
              }
            },
          },
          
        ]
      },
      { path: 'practice', name: 'practice', 
        component: () => import('../views/Main/03-Practice.vue') },
      { path: 'analize', name: 'analize', 
        component: () => import('../views/Main/04-Analize.vue') },
      { path: 'manage', name: 'manage', 
        component: () => import('../views/Main/05-Manage.vue') },
      { path: 'class', name: 'class', 
        component: () => import('../views/Main/06-Class.vue') },
      { path: 'user_dashbroad', name: 'UserDashbroad', 
        component: () => import('../views/Main/07-0-UserDashbroad.vue') },
      { path: 'setting', name: 'setting', 
        component: () => import('../views/Main/07-1-Setting.vue') }
    ]
  },
  {
    path: '/', // Redirect root path to the main page's home
    redirect: '/main/home'
  },
  {
    path: '/:catchAll(.*)', // Match all unmatched paths, redirect to the login page
    // redirect: '/login',
    name: '404',
    component: () => import('../components/ResultPage/404.vue')
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Define check function for authentication before route navigation
const check_function = async (to, from, next) => {
  try {
    // Send a GET request with credentials to check user login status
    const response = await axios.get('http://127.0.0.1/login_check', { withCredentials: true });
    if (response.data[4] == true) {
      // User is logged in
      // console.log(response)
      if (to.path === '/login') {
        // console.log('11');
        next(from.path); // If the target route is the login page, redirect back to the source route
      } else {
        // console.log('22');
        next(); // Normal navigation in other cases
      }
    } else {
      // User is not logged in
      // console.log('33');
      if (to.path !== '/login') {
        // console.log('44');
        next('/login'); // If the target route is not the login page, redirect to the login page
      } else {
        // console.log('55');
        next(); // Normal navigation in other cases
      }
    }
  } catch (error) {
    // Request error, redirect to the login page
    console.error(error);
    next('/login');
  }
};

router.beforeEach(async (to, from, next) => {
  await check_function(to, from, next);
});

// Export router instance
export default router;
