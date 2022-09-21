import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/login";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/",
    name: "layout",
    component: () => import("../layout/layout.vue"),
  },
];

const router = new VueRouter({
  routes,
});
// 全局导航守卫
router.beforeEach((to, from, next) => {
  // to到哪儿去  from从哪儿来  next执行下一步 放行
  let a=JSON.parse(sessionStorage.getItem('token'))
  if (a!=null) {
    next(); // 执行下一步 放行
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login"); // 跳转的意思
    }
  }
});
export default router;
