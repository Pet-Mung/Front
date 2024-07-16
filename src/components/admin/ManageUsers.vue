<template>
  <div class="flex_center">
    <h3 class="fl text-center fs-30 pd-20">Manage Users</h3>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Idx</th>
          <th>아이디</th>
          <th>이메일</th>
          <th>만든 날짜</th>
          <th>수정한 날짜</th>
          <th>주소</th>
          <th>전화번호</th>
          <th>활동여부</th>
          <th>수정</th>
          <th>삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="userInfo in usersInfo" :key="userInfo">
          <td>{{ userInfo.id}}</td>
          <td>{{ userInfo.user_name}}</td>
          <td>{{ userInfo.email}}</td>
          <td>{{ userInfo.created_at.split("T")[0]}}</td>
          <td>{{ userInfo.updated_at.split("T")[0]}}</td>
          <td>{{ (userInfo.address == null || userInfo.address == '&') ? '-' : userInfo.address.split("&")[0]}}</td>
          <td>{{ userInfo.phone_number == 'None' ? '-' : userInfo.phone_number}}</td>
          <td>{{ userInfo.is_active ? 'YES' : 'NO'}}</td>
          <td @click="modifyInfo(userInfo.id)"><img class="edit_icon" src="@/assets/img/edit_icon.png" alt="수정 버튼"></td>
          <td @click="deleteInfo(userInfo.id)"><img class="edit_icon" src="@/assets/img/del_icon.png" alt="삭제 버튼"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

// user 정보 조회 api 호출
import {ref} from 'vue';
import api from "@/api/userApi.js";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
let usersInfo = ref([]);
const getUsersInfo = async () => {
  try {
    const result = await api.getUsers();
    usersInfo.value = result.data;
  } catch (error) {
    console.error(error);
  }
};
const modifyInfo = (id) => {
  window.sessionStorage.setItem('click_idx',id);
  router.push('users/profile');
}
const deleteInfo = (id) => {
  if (confirm("정말 삭제하시겠습니까?") ==true){
    store.dispatch('common/delUserInfo',id);
    router.go();
  }
}
getUsersInfo();
</script>

<style lang="scss" scoped></style>
