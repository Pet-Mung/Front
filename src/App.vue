<template>
  <div class="layout_wrapper" >
    <TheHeader />
    <div :class="mainPath == 'main' || subPath == 'mypage' ? 'main_wrap main_wt' : 'main_wrap '" >
      <router-view></router-view>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
import "@/assets/css/style.css";
import "@/assets/css/reset.css";
import "@/assets/css/header.scss";
import "@/assets/css/footer.scss";
import "@/assets/css/modal.scss";
import "@/assets/css/_variable.scss";
import "@/assets/css/user.scss";
import "@/assets/css/product.scss";

import TheHeader from "@/components/public/TheHeader.vue";
import TheFooter from "@/components/public/TheFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
import API from "./api/apiAuth";
import { getItemWithExpireTime } from "./utils/common";
import { useStore } from "vuex";

const store = useStore();
const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
const subPath = computed(() => {
  return route.path.split("/")[2];
});
const userId = computed(()=>{
  return getItemWithExpireTime('userInfoObj')?.userId;
});
const type = computed(()=>{
  return getItemWithExpireTime('userInfoObj')?.type;
});
const setLoginData = async () => {
  API.setAuthToken(userId.value, type.value);
}

store.watch((state)=>{
  if(state.login.loginSuccess){
    setLoginData();
  } 
},setLoginData);
</script>

<style>
#app{
  overflow: auto;
}
#app.hidden{
  overflow: hidden;
}

</style>
