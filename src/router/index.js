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
    path : "/",
    name : "layout",
    redirect : "/index",
    component: () => import("../layout"),
    children : [
      {
        path : "index",
        name : "index",
        component : () => import("../views/index"),
        meta : {
          title : "首页"
        }
      },
      {
        path : "member",
        name : "member",
        component : () => import("../views/member"),
        meta : {
          title : "会员管理"
        }
      },
      {
        path : "supplier",
        name : "supplier",
        component : () => import("../views/supplier"),
        meta : {
          title : "供应商管理"
        }
      },
      {
        path : "goods",
        name : "goods",
        component : () => import("../views/goods"),
        meta : {
          title : "商品管理"
        }
      },
      {
        path : "staff",
        name : "staff",
        component : () => import("../views/staff"),
        meta : {
          title : "员工管理"
        }
      }
    ]
  }
];

const router = new VueRouter({
  routes,
});

// 挂载路由守卫
router.beforeEach((to, from, next) => {
  let a=JSON.parse(sessionStorage.getItem('token'))
  // to and from are both route objects. must call `next`.
  if (a != null) {
     next()//执行下一步放行
  }else{
    if(to.path=='/login'){
      next()
    }else{
      next('/login')
    }
  }
})

export default router;
