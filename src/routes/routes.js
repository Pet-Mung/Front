// view
import ShopView from "@/views/ShopView.vue";
import UserView from "@/views/UserView.vue";

// components
import MainView from "@/components/MainView.vue";

// public
import LoginView from "@/components/public/LoginView.vue";
import JoinView from "@/components/public/JoinView.vue";

//shop
import Product from "@/components/shop/ShopProduct.vue";
// import ProductDetail from "@/components/shop/ProductDetail.vue";

// mypage
import UserDelivery from "@/components/user/UserDelivery.vue";
import UserMypage from "@/components/user/UserMypage.vue";

const routes = [
  //처음 페이지 접속시 로딩페이지
  { path: "/", redirect: "/main" },
  // 메인 페이지
  {
    path: "/main",
    name: "MainView",
    component: MainView,
    props: true,
  },
  // 로그인 페이지
  {
    path: "/login",
    name: "LoginView",
    component: LoginView,
    props: true,
  },
  // 로그인 페이지
  {
    path: "/join",
    name: "JoinView",
    component: JoinView,
    props: true,
  },
  //상품 페이지
  {
    path: "/shop",
    component: ShopView,
    children: [
      {
        path: "products",
        component: Product,
        //  children: [{ path: "detail/:id", component: ProductDetail }],
      },
    ],
  },
  //상품 페이지
  {
    path: "/user",
    component: UserView,
    children: [
      { path: "mypage", component: UserMypage },
      { path: "delivery", component: UserDelivery },
    ],
  },
];

export default routes;