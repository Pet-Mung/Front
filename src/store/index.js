import common from "./common";
import login from "./login";
import { createStore } from "vuex";
const store = createStore({
    modules : {
        common,
        login,
    }
});

export default store;