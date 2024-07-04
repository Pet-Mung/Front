import shopStore from "./shopStore";
import { createStore } from "vuex";
const store = createStore({
    modules : {
        shopStore,
    }
});

export default store;