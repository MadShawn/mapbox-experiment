import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import WorkOrder from './views/WorkOrder.vue';
import DailyRoad from './components/workOrder/DailyRoadList.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/workOrder',
      name: 'workOrder',
      component: WorkOrder,
      children: [
        {
          path: '/list',
          component: DailyRoad
        }
      ]
    },
  ]
});
