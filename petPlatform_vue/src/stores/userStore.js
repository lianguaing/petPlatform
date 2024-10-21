// 管理用户数据相关
import { defineStore } from "pinia";
import { getUserInfo, registerUser } from "../api/api";

export const useUserStore = defineStore({
  id: "user",
  // 1. 定义管理用户数据的state
  state: () => ({
    userInfo: {},
  }),
  actions: {
    // 获取用户登录数据
    async getUserMessage({ account, password }) {
      try {
        const res = await getUserInfo(account);
        // console.log("用户数据：", res);
        //判断密码是否正确
        if (password === res.data.user.password) {
          this.userInfo = res.data.user;
          return true;
        }
        return false;
      } catch (e) {
        // console.log("获取用户数据出错", e);
        return false;
      }
    },
    //注册用户
    async registerUserMessage(data) {
      try {
        const res = await registerUser(data);
        console.log("注册用户：", res);
        //自动登录保存用户数据
        this.userInfo = res.data.user;
        return true;
      } catch (e) {
        console.log("注册用户出错", e);
        return false;
      }
    },
    //退出时清除用户的数据
    clearUserInfo() {
      this.userInfo = {};
    },
  },
  persist: true,
});
