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
import ProductDetail from "@/components/shop/ProductDetail.vue";

// user
import UserDelivery from "@/components/user/UserDelivery.vue";
import UserMypage from "@/components/user/UserMypage.vue";
import UserProfile from "@/components/user/UserProfile.vue";
import UserPurchase from "@/components/user/UserPurchase.vue";
import UserBasket from "@/components/user/UserBasket.vue";

// admin
import AdminDashboard from "@/components/admin/AdminDashboard.vue";
import ManageOrders from "@/components/admin/ManageOrders.vue";
import ManageProducts from "@/components/admin/ManageProducts.vue";
import ManageUsers from "@/components/admin/ManageUsers.vue";

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
        // children: [{ path: "detail", component: ProductDetail }],
      },
      {
        path: "products/detail",
        component: ProductDetail,
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
    path: "/admin",
    component: AdminDashboard,
    children: [
      { path: "orders", component: ManageOrders },
      { path: "products", component: ManageProducts },
      { path: "users", component: ManageUsers },
    ],
  },
];

export default routes;
