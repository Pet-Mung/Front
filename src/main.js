import { createApp } from "vue";
import App from "./App.vue";
import router from "@/routes/index.js";
import store from "@/store/index.js";
import "dropzone/dist/dropzone.css";
import { quillEditor } from "vue3-quill";

let app = createApp(App);
app.use(store).use(router).use(quillEditor).mount("#app");
