export default {
  beforeMount(el, binding) {
    // 事件处理函数
    const handleClick = (event) => {
      const user = JSON.parse(localStorage.getItem("user"));
      console.log(user?.userInfo);
      if (!user?.userInfo) {
        event.preventDefault(); // 阻止默认行为
        // 如果未登录，则跳转到登录页面
        ElMessage.error("请先登录");
      } else {
        binding.value();
      }
    };

    // 为元素添加点击事件监听器
    el.addEventListener("click", handleClick);

    // 将处理函数存储在 el 上，以便在 unmounted 中使用
    el._handleClick = handleClick;
  },
  unmounted(el) {
    // 移除事件监听器
    el.removeEventListener("click", el._handleClick);
  },
};
