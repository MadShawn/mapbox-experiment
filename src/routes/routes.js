import Home from '@/views/Home.vue';
import Login from '@/views/Login.vue';
import WorkOrder from '@/views/WorkOrder.vue';
import DailyRoadList from '@/components/workOrder/DailyRoadList.vue';
import MapEditor from '@/views/MapEditor.vue';

const routes = [{
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
  /* webpackChunkName: "about" */
  component: () => import('@/views/About.vue')
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
  children: [{
    path: '/list',
    component: DailyRoadList
  }]
},
{
  path: '/mapEditor',
  name: 'mapEditor',
  component: MapEditor
}];

export default routes;
