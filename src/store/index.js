import user from "./user";
import login from "./login";
import { createStore } from "vuex";
const store = createStore({
    modules : {
        user,
        login,
    }
});

export default store;