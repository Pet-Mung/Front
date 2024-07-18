// view
import ShopView from "@/views/ShopView.vue";
import UserView from "@/views/UserView.vue";

// components
import MainView from "@/components/MainView.vue";

// public
import LoginView from "@/components/user/UserLogin.vue";
import JoinView from "@/components/user/UserJoin.vue";

//shop
import Product from "@/components/shop/ShopProduct.vue";
import ProductDetail from "@/components/shop/ShopProductDetail.vue";

// user
import UserDelivery from "@/components/user/UserDelivery.vue";
import UserMypage from "@/components/user/UserMypage.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import UserPurchase from "@/components/user/UserPurchase.vue";
import UserBasket from "@/components/user/UserBasket.vue";

// admin
import ManageDashboard from "@/components/manage/ManageDashboard.vue";
import ManageOrders from "@/components/manage/ManageOrders.vue";
import ManageProducts from "@/components/manage/ManageProducts.vue";
import ManageUsers from "@/components/manage/ManageUsers.vue";
import ProductItem from "@/components/manage/sub/ProductItem.vue";

//icon
import iconView from "@/components/public/TheIcon.vue";
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
        children: [
          { path: "", component: Product },
          { path: ":id", component: Product },
          { path: "detail/:id", component: ProductDetail },
        ],
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
      { path: "profile", component: UserProfile },
      { path: "purchase", component: UserPurchase },
      { path: "basket", component: UserBasket },
    ],
  },
  //관리자 페이지
  {
    path: "/manage",
    component: ManageDashboard,
    children: [
      { path: "orders", component: ManageOrders },
      {
        path: "products",
        children: [
          { path: "", component: ManageProducts },
          { path: ":id", component: ProductItem },
        ],
      },
      {
        path: "users",
        // component: ManageUsers,
        children: [
          { path: "", component: ManageUsers },
          { path: "profile", component: UserProfile },
        ],
      },
    ],
  },
  {
    path: "/icons",
    name: "iconView",
    component: iconView,
    props: true,
  },
  { path: "/:pathMatch(.*)*", redirect: "/main" },
];

export default routes;
