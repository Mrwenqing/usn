
// 引入路由对象
import router from "./router"
// 引入vuex
import store from "./store"

// 创建路由守卫，实现页面拦截
router.beforeEach(async (to,from, next)=>{
  const token = store.getters.token
  if(token){
    // 已登录的逻辑
    if(to.path === "/login"){
      next(from.path)
    }else{
      // 获取用户信息
      let userInfo = store.getters.userInfo
      userInfo = typeof userInfo === "object" ? JSON.stringify(userInfo) : userInfo
      if(userInfo === "{}" || userInfo === ""){
        // 没有token
        // token过期
        const response = await store.dispatch("handleUserInfo")
        if(response){
          next()
        }else{
          next("/login")
        }
      }else{
        next()
      }
    }
  }else{
    if(to.path === "/login"){
      next()
    }else{
      next("/login")
    }
  }
})

/**
 *
 * 有token
 *    判断进入的是不是登录页
 *      是
 *        next(form.path) 跳转到登录之前的页面
 *      不是
 *        从vuex获取用户信息
 *          有用户信息
 *            next() 放行进入
 *          没有用户信息
 *            调用vuex里面的获取用户信息接口
 *                获取成功
 *                  next() 放行进入
 *                获取失败
 *                  next("/login") 直接进入登录页
 *
 * 没有token
 *  判断进入的是不是登录页
 *    是
 *      next()放行进入
 *    不是
 *      next("/login")
 *
 *
 */
