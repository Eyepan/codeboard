import { createApp } from "vue";
import "./assets/index.css";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import router from "./router/router";

import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(autoAnimatePlugin);
app.mount("#app");
