<template>
  <div class="basket_wrap">
    <h2 class="fs-40 mb-30">장바구니</h2>
    <table class="table table-bordered">
      <thead>
        <tr>
          <th colspan="2">상품명</th>
          <th>가격</th>
          <th>수량</th>
          <th>삭제</th>
          <th>
            <input
              class="cart_chkBox"
              type="checkbox"
              value="all"
              v-model="allSelectList"
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="basketInfo.length == 0">
          <td colspan="10" class="no_data_table">
            <img src="@/assets/img/nodata_icon.png" alt="no_data" />
            <p>데이터가 없습니다.</p>
          </td>
        </tr>
        <tr
          v-for="(item, index) in basketInfo"
          :key="index"
          @click.self="clickProduct(item.id)"
        >
          <td>
            <img
              :src="imageCheck(item.product_image)"
              :alt="item.product_name"
              class="pd-10"
            />
          </td>
          <td>{{ item.product_name }}</td>
          <td>{{ commonNumber(item.price) }}<span>원</span></td>
          <td>
            <div class="cell flex_center row">
              <span class="mr-20">수량</span>
              <button
                type="button"
                @click="item.count == 1 ? count : item.count--"
              >
                -
              </button>
              <label>
                <input type="text" v-model="item.count" readonly />
              </label>
              <button type="button" @click="item.count++">+</button>
            </div>
          </td>
          <td>
            <button type="button" class="del_btn" @click="delBasketView(item.id)">삭제</button>
          </td>
          <td>
            <input
              class="cart_chkBox"
              type="checkbox"
              :value="item.id"
              v-model="selectList"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <div class="result_area">
      <p>
        총 <strong>{{ selectList.length }}</strong
        >개의 상품금액 =
        <strong>{{ commonNumber(resultInfo.allPrice) }}</strong> 원
        <span>+</span> 배송비
        <strong>{{ commonNumber(resultInfo.delivery) }}</strong
        > 원 <span>=</span> 합계
        <strong>{{
          commonNumber(resultInfo.allPrice + resultInfo.delivery)
        }}</strong> 원
      </p>

    </div>
    <div class="btn-area">
      <button type="button" @click="router.push('/shop/products')">
        &lt; 쇼핑 계속하기
      </button>
      <button type="button">주문하기</button>
    </div>
  </div>
</template>

<script setup>
import { commonNumber, imageCheck } from "@/utils/common";
import { computed, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const basketInfo = computed(() => {
  return store.state.user.basketInfo;
});
let selectList = ref([]);
let allCheckList = ref([]);
let allSelectList = computed({
  get() {
    return selectList.value.length === allCheckList.value.length;
  },
  set(e) {
    selectList.value = e ? allCheckList.value : [];
  },
});
let resultInfo = reactive({
  allPrice: 3000,
  delivery: 3000,
});
const getBasketView = async () => {
  await store.dispatch("user/getBasket");
  basketInfo.value.forEach((el) => {
    el.price = 1000;
    allCheckList.value.push(el.id);
  });
};
const delBasketView = async (id) => {
  await store.dispatch("user/delBasket", id);
  getBasketView();
};

// created
getBasketView();
watch(selectList,()=>{
  console.log(selectList.value);
})
</script>

<style lang="scss" scoped>
.basket_wrap {
  padding: 30px 0;
  .table {
    min-width: auto;
    width: 100%;
    thead {
      background-color: #cee6fb;
      border-top: 2px solid #2e9bf9;
    }
    tbody {
      border-bottom: 2px solid #2e9bf9;
      tr {
        &:hover {
          background-color: #eff9fd;
        }
        td {
          vertical-align: middle;
          img {
            width: 100px;
          }
          .del_btn{
            border: 1px solid #a5a3a3;
            padding: 5px 10px;
            background-color: #ececec;
          }
          .cell.flex_center.row {
            align-items: center;
            button {
              background-color: #0376d9;
              border: none;
              border-radius: 5px;
            }
            input {
              border: none;
            }
          }
        }
      }
    }
  }
  .result_area{
    width: 100%;
    background-color: #e2e2e2;
    padding:20px;
    margin: 20px 0;
    border-radius: 20px;
    p{
      text-align: right;
    }
    span{
      display: inline-flex;
      background-color: #9a9b9c;
      width: 30px;
      height: 30px;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: 700;
      color:#fff;
    }
  }
  .btn-area{
    display: flex;
    align-items: center;
    justify-content: space-between;
    button{
      width: 45%;
      background-color: #505cff;
      &:first-child{
        background-color: #fff;
        color:#505cff;
        border:1px solid #505cff;
      }
    }
  }
}
</style>
