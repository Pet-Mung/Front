<template>
  <div class="admin-wrapper">
    <h1>Admin Dashboard</h1>
    <router-link to="/admin/products">Manage Products</router-link>
    <router-link to="/admin/orders">Manage Orders</router-link>
    <router-link to="/admin/users">Manage Users</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.admin-wrapper {
  padding-bottom: 200px;
}
a {
  display: inline-block;
  padding-right: 20px;
  margin-bottom: 50px;
}
</style>
