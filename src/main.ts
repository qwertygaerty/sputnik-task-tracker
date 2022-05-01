import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import "../src/assets/css/iconfont.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHYojo-ARk04vfDB1fQ5JxvWKdtFA3vUs",
  authDomain: "sputnik-task-tracker.firebaseapp.com",
  projectId: "sputnik-task-tracker",
  storageBucket: "sputnik-task-tracker.appspot.com",
  messagingSenderId: "767101755102",
  appId: "1:767101755102:web:41d20db26add997ea6ac4f",
  measurementId: "G-JD9M2CXHX5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App).use(router).use(ContextMenu).mount("#app");
