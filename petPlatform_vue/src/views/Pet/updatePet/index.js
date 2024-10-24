import { createVNode, render, ref } from "vue";
import updatePet from "./updatePet.vue";

export default (pet = {}) => {
  return new Promise((resolve) => {
    // 如果 div 已存在，先清除现有的渲染内容
    let div = document.getElementById("updatePet");
    if (!div) {
      div = document.createElement("div");
      div.setAttribute("id", "updatePet");
      document.body.appendChild(div); // 直接插入到 body
    }

    const cb = (data) => {
      resolve(data);
      // console.log(data);
      //销毁
      render(null, div);
    };

    //渲染
    const v_node = createVNode(updatePet, {
      pet,
      getDataCallback: cb,
    });
    render(v_node, div);
  });
};
