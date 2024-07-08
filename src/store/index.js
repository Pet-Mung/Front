import shopStore from "./shopStore";
import login from "./login";
import { createStore } from "vuex";
const store = createStore({
    modules : {
        shopStore,
        login,
    }
});

export default store;