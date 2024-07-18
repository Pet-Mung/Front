<template>
  <div class="select_wrap">
    <ul class="flex_center">
      <li @click="selectJoinFlag(0)" class="mr-10">
        <img src="@/assets/img/seller_icon.png" alt="seller" />
        <p class="text-center fs-30 ff_02">판매자</p>
      </li>
      <li @click="selectJoinFlag(1)" class="ml-10">
        <img src="@/assets/img/shopper_icon.png" alt="shopper" />
        <p class="text-center fs-30 ff_02">구매자</p>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { defineEmits } from "vue";
const emit = defineEmits(["callFn"]);

const store = useStore();
const selectJoinFlag = (flag) => {
  if (flag !== null) {
    store.commit("login/setJoinFlag", flag);
    emit("callFn", "true");
  }
};
</script>

<style lang="scss" scoped>
.select_wrap ul{
    height: 50vh;
    flex-direction: row;
    li{
        img{
            max-width: 180px;
            margin-bottom: 20px;
        }
        border : 1px solid #c9c7c7;
        background-color: #fff;
        border-radius: 10px;
        padding : 20px;
        &:hover{
            background-color: rgb(255, 245, 239);
        }
    }
}
</style>
