<template>
  <nav>
    <ul class="nav_bar nv_left">
      <li @click="selectCtgy('ALL')" :class="{active : categoryName =='ALL'&& mainPath == 'shop'}" >
        ALL
      </li>
      <li v-for="(item,idx) in ctgy" :key="item" @click="selectCtgy(item,idx)" :class="{active : categoryName == item && mainPath == 'shop'}">
        {{ item }}
      </li>
    </ul>
    <ul class="nav_bar nv_right">
      <li v-if="!loginSuccess" :class="{active : mainPath =='join'}">
        <router-link to="/join">회원가입</router-link>
      </li>
      <li v-if="!loginSuccess" :class="{active : mainPath =='login'}">
        <router-link to="/login">로그인</router-link>
      </li>
      <li v-if="loginSuccess">
        <router-link to="/login">로그아웃</router-link>
      </li>
      <li v-if="loginSuccess" :class="{active : subPath =='basket'}">
        <router-link to="/user/basket"
          ><img
            src="@/assets/img/cart.png"
            class="sm_icon"
          />장바구니</router-link
        >
      </li>
      <li v-if="loginSuccess" :class="{active : subPath =='mypage' || subPath =='profile'}">
        <router-link to="/user/mypage"
          ><img
            src="@/assets/img/mypage.png"
            class="sm_icon"
          />마이페이지</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import productApi from "@/api/productApi";
import { getItemWithExpireTime } from "@/utils/common";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const subPath = computed(() => {
  return route.path.split("/")[2];
});
const loginSuccess = computed(() => {
  return store.state.login.loginSuccess;
});
let userId = ref(getItemWithExpireTime("userInfoObj")?.userId);
if (userId.value != "" && userId.value != undefined) {
  store.commit("login/setLoginStatus", true);
}
let ctgy = ref([]);
const categoryName = computed(() => {
  return store.state.common.category_name;
});

// 용품 카테고리 api 호출
const getCtgy = async () => {
  let result = await productApi.getCategory();
  ctgy.value = result;
};
// 선택한 카테고리 이름 store 저장
const selectCtgy = (ctgyName,idx ) => {
  idx +=1;
  store.commit("common/setCtgyName", ctgyName);
  
  if(idx) router.push(`/shop/products/${idx}`);
  else router.push(`/shop/products`);
};
// created
getCtgy();
</script>

<style lang="scss" scoped></style>
