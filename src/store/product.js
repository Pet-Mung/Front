export default {
  namespaced: true,
  state() {
    return {
      animalTab: 1,
      category_name: "ALL",
      isChange: false,
    };
  },
  mutations: {
    setAnimalTab(state, payload) {
      state.animalTab = payload;
    },
    // 선택한 카테고리
    setCtgyName(state, payload) {
      state.category_name = payload;
      state.isChange = true;
    },
    setIsChange(state, payload) {
      state.isChange = payload;
    },
    setFirstCtgy(state, payload) {
      switch (payload) {
        case "1":
          state.category_name = "사료";
          break;
        case "2":
          state.category_name = "간식";
          break;
        case "3":
          state.category_name = "장난감";
          break;
        case "4":
          state.category_name = "노즈워크";
          break;
        case "5":
          state.category_name = "케어용품";
          break;
        case "6":
          state.category_name = "계절상품";
          break;
        case "7":
          state.category_name = "기타용품";
          break;
        default:
          state.category_name = "ALL";
      }
    },
  },
  actions: {},
  getters: {},
};
