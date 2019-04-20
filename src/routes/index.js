import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/routes/routes';
import store from '@/stores';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthurized) {
      next({
        name: 'login' // the route the guest will be redirected to
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
