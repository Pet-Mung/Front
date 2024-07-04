<template>
  <div class="layout_wrapper">
    <TheHeader />
    <div class="main_wrap">
      <router-view></router-view>
    </div>
    <TheFooter />
  </div>
</template>

<script setup>
 import '@/assets/css/style.css';
 import '@/assets/css/reset.css';
 import '@/assets/css/footer.scss';

 import TheHeader from '@/components/public/TheHeader.vue';
 import TheFooter from '@/components/public/TheFooter.vue';


</script>

<style>
</style>
