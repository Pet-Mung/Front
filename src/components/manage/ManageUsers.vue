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
        <tr v-if="displayedPosts.length == 0">
          <td colspan="10" class="no_data_table">
            <img src="@/assets/img/nodata_icon.png" alt="no_data" />
            <p>데이터가 없습니다.</p>
          </td>
        </tr>
        <tr v-for="userInfo in displayedPosts" :key="userInfo">
          <td>{{ userInfo.id }}</td>
          <td>{{ userInfo.user_name }}</td>
          <td>{{ userInfo.email }}</td>
          <td>{{ userInfo.created_at.split("T")[0] }}</td>
          <td>{{ userInfo.updated_at.split("T")[0] }}</td>
          <td>
            {{
              userInfo.address == null || userInfo.address == "&"
                ? "-"
                : userInfo.address.split("&")[0]
            }}
          </td>
          <td>
            {{ userInfo.phone_number == "None" ? "-" : userInfo.phone_number }}
          </td>
          <td>{{ userInfo.is_active ? "YES" : "NO" }}</td>
          <td @click="modifyInfo(userInfo.id)">
            <img
              class="edit_icon"
              src="@/assets/img/edit_icon.png"
              alt="수정 버튼"
            />
          </td>
          <td @click="deleteInfo(userInfo.id)">
            <img
              class="edit_icon"
              src="@/assets/img/del_icon.png"
              alt="삭제 버튼"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <PagingView
    :currentPage="currentPage"
    :totalPages="totalPages"
    :isEmpty="isEmpty"
    @changePage="changePage"
  />
</template>

<script setup>
// user 정보 조회 api 호출
import api from "@/api/userApi.js";
import PagingView from "@/components/comn/ComnPaging.vue";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
let usersInfo = ref([]);

let currentPage = ref(1); //현재 페이지 번호
let postsperPage = 5; //한 페이지에 보여줄 게시글 갯수
let isEmpty = ref(false); //데이터 빈 값 여부
const totalPages = computed(() => {
  //총 페이지 수
  return Math.ceil(usersInfo.value.length / postsperPage);
});

// 현재 페이지에 해당하는 게시글 목록을 반환
const displayedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsperPage;
  const endIndex = startIndex + postsperPage;
  if (!usersInfo.value) return [];
  else return usersInfo.value.slice(startIndex, endIndex);
});

// 모든 회원 정보 전체 api 호출
const getUsersInfo = async () => {
  try {
    const result = await api.getUsers();
    usersInfo.value = result.data;
  } catch (error) {
    console.error(error);
  }
};

//회원정보 수정 버튼 이벤트리스너
const modifyInfo = (id) => {
  window.sessionStorage.setItem("click_idx", id);
  router.push("users/profile");
};

//회원정보 삭제 버튼 이벤트리스너
const deleteInfo = (id) => {
  if (confirm("정말 삭제하시겠습니까?") == true) {
    store.dispatch("user/delUserInfo", id);
    router.go();
  }
};

//페이지 변경
const changePage = (str) => {
  if (str == "prev") currentPage.value--;
  else if (str == "next") currentPage.value++;
  else currentPage.value = str;
};

// created
getUsersInfo();
</script>

<style lang="scss" scoped></style>
