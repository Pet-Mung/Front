<template>
  <div>
    <p>ss</p>
    <button type="button" @click="joinBtn">버튼</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import api from "@/api/userApi.js";

onMounted(() => {

});

const createUser = async (info) => {
    console.log(info);
  try {
    const response = await api.joinUser(info);
    console.log(response);
  } catch (error) {
    console.error(error);

  }
};
const getUsersInfo = async () => {
  try {
    const response = await api.getUsers();
    console.log(response);
  } catch (error) {
    console.error(error);

  }
};

const joinBtn = () => {
  let info = {
    "password": "qwer1234!!",
    "password_check": "qwer1234!!",
    "username": "asdf123",
    "email": "user@example.com",
  };
  createUser(info);
getUsersInfo();
};
</script>

<style lang="scss" scoped></style>
