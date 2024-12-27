<template>
  <div class="header_wrap">
    <div class="logo_area" @click="router.push('/main')">
      <h1>CATTUS
        <img src="@/assets/img/logo.png" alt="logo" />
        </h1>
      
    </div>
    <NavBar />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavBar from './TheNavBar.vue';

const router = useRouter();
</script>
