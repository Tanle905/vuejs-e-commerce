import { createApp } from "vue";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

createApp(App).use(router).use(Antd).mount("#app");
