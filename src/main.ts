import { createApp } from "vue";
import { registerServiceWorker } from "./worker";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "@arco-design/web-vue/dist/arco.css";

const app = createApp(App);

app.use(router);

app.mount("#app");

registerServiceWorker();
