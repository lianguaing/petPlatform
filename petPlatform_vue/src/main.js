import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

//注册持久化插件
pinia.use(piniaPluginPersistedstate);

app.use(router);

app.mount("#app");
