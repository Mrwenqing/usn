<template>
  <!-- vue实例外创建 -->
  <div class="bg">
    <div class="t">
      <h1>梦学谷会员管理系统</h1>
      <div class="d1">
        <span class="s1">*</span>账号：
        <input type="text" class="ipt" v-model="username"  placeholder="请输入用户名"/>
      </div>
      <div class="d1">
        <span class="s1">*</span>密码：
        <input type="text" class="ipt" v-model="password" placeholder="请输入密码"/>
      </div>
      <div class="d1">
        <button class="btn" @click="dl">登录</button>
      </div>
    </div>
  </div>
</template>
<!-- 调用   <mycom></mycom> -->
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    dl() {
      if (this.username == "admin" && this.password == "123456") {
        this.$message({
          showClose: true,
          message: "登陆成功",
          type: "success",
        });
        this.$router.push({ path: "/index" });
      } else {
        this.$message({
          showClose: true,
          message: "内容不能为空",
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  border: none;
  margin-left: 60px;
  color: #fff;
  text-align: center;
  width: 100px;
  line-height: 40px;
  background-color: #409eff;
}
.bg {
  width: 100%;
  height: 100vh;
  // background-color: red;
  background-image: url("../assets/ace.jpg");
  background-size: 100% 100%;
}
.t {
  position: absolute;
  //   overflow: hidden;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -260px;
  width: 500px;
  height: 400px;
  border-radius: 50px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.945);
  opacity: 0.6;
  h1 {
    margin-top: 10px;
    text-align: center;
    line-height: 10px;
  }
  .d1 {
    margin-top: 40px;
    margin-left: 20px;
    height: 50px;
    .ipt {
      width: 370px;
      height: 40px;
    }
  }
}
.s1 {
  color: red;
}
</style>