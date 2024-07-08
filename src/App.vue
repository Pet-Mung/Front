<template>
  <div class="layout_wrapper">
    <TheHeader />
    <div :class="mainPath == 'main' ? 'main_wrap main_wt' : 'main_wrap '" >
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
import "@/assets/css/user.scss";

import TheHeader from "@/components/public/TheHeader.vue";
import TheFooter from "@/components/public/TheFooter.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const mainPath = computed(() => {
  return route.path.split("/")[1];
});
</script>

<style></style>
