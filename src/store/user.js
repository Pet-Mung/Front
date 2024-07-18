import purchaseApi from "@/api/purchaseApi";
import userApi from "@/api/userApi";
export default {
  namespaced: true,
  state() {
    return {
      isModalOpen: false,
      basketInfo: [],
      adminTab: 1,
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
    setBasketInfo(state, payload) {
      state.basketInfo = payload;
    },
   
  },
  actions: {
    // 장바구니 조회 api 호출
    async getBasketView(context) {
      try {
        const result = await purchaseApi.viewCart();
        context.commit("setBasketInfo", result);
      } catch (error) {
        console.error(error);
      }
    },
    // 장바구니 추가 api 호출
    async addBasket(context, addBasketinfo) {
      try {
        const result = await purchaseApi.addCart(
          addBasketinfo.productId,
          addBasketinfo.count
        );
        // context.commit('setBasketInfo',result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    },
    // 장바구니 삭제 api 호출
    async delBasket(context, basketId) {
      try {
        const result = await purchaseApi.deleteCart(basketId);
        if (result.status == "404") {
          alert(result.detail);
        }
      } catch (error) {
        console.error(error);
      }
    },
    //회원탈퇴
    async delUserInfo(context, userId) {
      try {
        const result = await userApi.delOnlyUser(userId);
        console.log(result);
        if (result.status == "404") {
          alert(result.detail);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
};
