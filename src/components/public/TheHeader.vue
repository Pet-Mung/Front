<template>
  <div class="header_wrap">
    <div class="logo_area" @click="router.push('/main')">
      <img src="@/assets/img/logo.png" alt="logo" />
      <h1>pet mall</h1>
    </div>
    <NavBar />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavBar from './NavBar.vue';

const router = useRouter();
</script>
