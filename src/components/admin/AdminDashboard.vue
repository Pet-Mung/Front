<template>
  <div>
    <h1>Admin Dashboard</h1>
    <router-link to="/admin/products">Manage Products</router-link>
    <router-link to="/admin/orders">Manage Orders</router-link>
    <router-link to="/admin/users">Manage Users</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
