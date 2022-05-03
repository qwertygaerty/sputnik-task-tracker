import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import "../src/assets/css/iconfont.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import egalWidgets from "@egalteam/widget-library";
import "@egalteam/widget-library/dist/style.css";

createApp(App).use(egalWidgets).use(router).use(ContextMenu).mount("#app");
