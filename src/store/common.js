import api from "@/api/purchaseApi";
export default {
  namespaced: true,
  state() {
    return {
      isModalOpen: false,
      basketInfo : {},
      adminTab : 1,
      category_name : 'ALL',
      isChange : false,
    };
  },
  mutations: {
    // modal open / close
    setIsModalOpen(state, payload) {
      state.isModalOpen = payload;
    },
    // 관리자 선택한 탭
    setAdminTab(state, payload) {
      state.adminTab = payload;
    },
    // 장바구니 정보
    setBasketInfo(state,payload){
        state.basketInfo = payload;
    },
    // 선택한 카테고리
    setCtgyName(state,payload){
      state.category_name = payload;
      state.isChange = true;
    },
    setIsChange(state,payload){
      state.isChange = payload;
    },
  },
  actions: {
    // 장바구니 조회 api 호출
    async getBasketView(context) {
      try {
        const result = await api.viewCart();
        // console.log(result);
        context.commit('setBasketInfo',result);
      } catch (error) {
        console.error(error);
      }
    },
    // 장바구니 추가 api 호출
    async addBasket(context,addBasketinfo) {
      try {
        const result = await api.addCart(addBasketinfo.productId, addBasketinfo.count);
        console.log('result',result);
      } catch (error) {
        console.error(error);
      }
    },
    // 장바구니 삭제 api 호출
    async delBasket(context,basketId) {
      try {
        const result = await api.deleteCart(basketId);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
};
