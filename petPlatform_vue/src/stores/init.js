//登录后初始化获取信息
import { useAdoptStore } from "./adoptStore";

export function init() {
  const adoptStore = useAdoptStore();
  //   console.log(adoptStore.adoptInfo);
  //获取领养信息
  if (adoptStore.adoptInfo.id) return;
  adoptStore.getAdoptMessage();
}
