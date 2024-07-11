<template>
  <div class="pd-20">
    <h2 class="mb-20 ff_02 fl fs-40">Admin Dashboard</h2>
    <ul class="tab_cat_02">
      <li :class="{ active: selectTab == 1 }" @click="selectTab =1">
        <router-link to="/admin/products">Manage Products</router-link>
      </li>
      <li :class="{ active: selectTab == 2 }" @click="selectTab =2">
        <router-link to="/admin/orders">Manage Orders</router-link>
      </li>
      <li :class="{ active: selectTab == 3 }" @click="selectTab =3">
        <router-link to="/admin/users">Manage Users</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { ref } from 'vue';
let selectTab = ref(1);

</script>

<style lang="scss" scoped></style>
