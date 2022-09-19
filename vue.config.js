const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    // 端口号
    port: 8658,
    // 主机名
    host:"localhost",
    // 启动项目时是否自动打开浏览器
    open:true,
    // 是否开启https
    https:false,
    // 配置跨域
    proxy: {
      [process.env.VUE_APP_BASE_API] :{
        target: process.env.VUE._APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {[ '^' + process.env.VUE_APP_BASE_API ]:''}
      }
    }
  },
  // 关闭eslint
  lintOnSave:false
})
