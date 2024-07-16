<template>
  <div class="pd-20">
    <h2 class="mb-20 ff_02 fl fs-40">Admin Dashboard</h2>
    <ul class="tab_cat_02">
      <li :class="{ active: adminTab == 1 }" @click="selectAdminTab(1)">
        <router-link to="/admin/products">Manage Products</router-link>
      </li>
      <li :class="{ active: adminTab == 2 }" @click="selectAdminTab(2)">
        <router-link to="/admin/orders">Manage Orders</router-link>
      </li>
      <li :class="{ active: adminTab == 3 }" @click="selectAdminTab(3)">
        <router-link to="/admin/users">Manage Users</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
const store = useStore();
const adminTab = computed(() => {
  return store.state.user.adminTab;
});
const selectAdminTab = (num) => {
  store.commit("user/setAdminTab", num);
};
</script>

<style lang="scss" scoped></style>
