import user from "./user";
import login from "./login";
import product from "./product";
import { createStore } from "vuex";
const store = createStore({
    modules : {
        user,
        login,
        product,
    }
});

export default store;