import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routes/index.js";
import store from "@/store/index.js";
import "dropzone/dist/dropzone.css";

let app = createApp(App);
app.use(store).use(router).mount("#app");
