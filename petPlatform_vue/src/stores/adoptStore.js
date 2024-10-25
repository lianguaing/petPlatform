// 管理用户领养数据相关
import { defineStore } from "pinia";
import {
  getAdoptionInfo,
  deleteAdoptionInfo,
  updateAdoptionInfo,
} from "../api/api";
import { useUserStore } from "./userStore";
const userStore = useUserStore();

export const useAdoptStore = defineStore({
  id: "adopt",
  // 1. 定义管理用户领养数据的state
  state: () => ({
    adoptInfo: {},
  }),
  actions: {
    // 获取用户的领养数据
    async getAdoptMessage() {
      try {
        const res = await getAdoptionInfo(userStore.userInfo.id);
        this.adoptInfo = res.data.adoptionR;
        console.log("领养列表：", this.adoptInfo);
        return true;
      } catch (e) {
        return false;
      }
    },
    // 删除用户领养数据
    async deleteAdoptMessage(id) {
      const res = await deleteAdoptionInfo(id);
      if (res.status) {
        ElMessage.success("删除成功");
        // 删除成功后更新用户领养数据
        this.getAdoptMessage();
      } else ElMessage.error("删除失败");
    },
    // 修改用户领养数据
    async updateAdoptMessage(id, data = {}) {
      const res = await updateAdoptionInfo(id, data);
      if (res.status) {
        ElMessage.success("更新成功");
        // 更新成功后更新用户领养数据
        this.getAdoptMessage();
      } else ElMessage.error("更新失败");
    },
  },
});
