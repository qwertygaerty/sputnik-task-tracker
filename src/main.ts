import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@imengyu/vue3-context-menu/lib/vue3-context-menu.css";
import ContextMenu from "@imengyu/vue3-context-menu";
import "../src/assets/css/iconfont.css";
import Vue3ColorPicker from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import egalWidgets from "@egalteam/widget-library";
import "@egalteam/widget-library/dist/style.css";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHYojo-ARk04vfDB1fQ5JxvWKdtFA3vUs",
  authDomain: "sputnik-task-tracker.firebaseapp.com",
  databaseURL:
    "https://sputnik-task-tracker-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sputnik-task-tracker",
  storageBucket: "sputnik-task-tracker.appspot.com",
  messagingSenderId: "767101755102",
  appId: "1:767101755102:web:47b2616f7b9d1da0a6ac4f",
  measurementId: "G-68DBBM353R",
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

createApp(App)
  .use(Vue3ColorPicker)
  .use(egalWidgets)
  .use(router)
  .use(ContextMenu)
  .mount("#app");
