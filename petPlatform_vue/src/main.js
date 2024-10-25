import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import authClick from './directives/authClick'; // 引入自定义指令

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

//注册持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(router);
app.directive('authClick', authClick); // 注册自定义指令

app.mount("#app");
