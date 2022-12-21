import Vue from "vue";
import Router from "vue-router";
import cognitoAuth from "@/cognito";

const TheContainer = () => import('@/containers/TheContainer')

const Login = () => import("@/components/Login.vue");
const Signup = () => import("@/components/Signup.vue");
const SignupPlaceInfo = () => import("@/components/SignupPlaceInfo.vue");
const SignupUrlSelect = () => import("@/components/SignupUrlSelect.vue");
const SignupTemplateSelect = () => import("@/components/SignupTemplateSelect.vue");
const SignupPosterDialog = () => import("@/components/SignupPosterDialog.vue");
const DashboardTable = () => import("@/components/DashboardTable.vue");
const PasswordReset = () => import("@/components/PasswordReset.vue");
const PasswordResetConfirm = () => import("@/components/PasswordResetConfirm.vue");
const DashboardSettings = () => import('@/components/DashboardSetting.vue');
const DashboardOrders = () => import("@/components/DashboardOrders.vue");
const DashboardCustomers = () => import("@/components/DashboardCustomers.vue");
const Messaging = () => import("@/components/Messaging.vue");
const Payment = () => import("@/components/Payment.vue");
const OrderingNotifs = () => import("@/components/ordering/OrderingNotifs.vue");
const OrderingDelivery = () => import("@/components/ordering/OrderingDelivery.vue");
const OrderingPayments = () => import("@/components/ordering/OrderingPayments.vue");
const OrderingSettings = () => import("@/components/ordering/OrderingSettings.vue");
const SettingsProfile = () => import("@/components/settings/SettingsProfile.vue");
const SettingsDesign = () => import("@/components/settings/SettingsDesign.vue");
const SettingsAnalytics = () => import("@/components/settings/SettingsAnalytics.vue");
const DeliveryOptionEdit = () => import("@/components/ordering/DeliveryOptionEdit.vue");
const PaymentOptionEdit = () => import("@/components/ordering/PaymentOptionEdit.vue");
const MenuUpload = () => import("@/components/MenuUpload.vue");
const Poster = () => import("@/components/settings/Poster.vue");
const Iiko = () => import("@/components/settings/Iiko.vue");
const ScanMenu = () => import("@/components/ScanMenu.vue");

Vue.use(Router);

function requireAuth(to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next();
    if (!loggedIn) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  });
}

function isAlreadyIn(to, from, next) {
  cognitoAuth.isAuthenticated((err, loggedIn) => {
    if (err) return next();
    if (loggedIn) {
      next({
        path: "/dashboard"
      })
    } else next();
  });
}

export default new Router({
  linkActiveClass: "active",
  mode: "history",
  base: __dirname,
  routes: [{
      path: "/",
      redirect: '/dashboard',
    },
    {
      path: "/dashboard/:message",
      component: TheContainer,
      beforeEnter: requireAuth,
      props: true
    },
    {
      path: "/dashboard",
      component: TheContainer,
      children: [{
        path: "", component: DashboardTable
      },
    {
      path: "/settings", component: DashboardSettings
    },
    {
      path: "/orders", component: DashboardOrders
    },
    {
      path: "/customers", component: DashboardCustomers
    },
    {
      path: "/upload", component: MenuUpload
    },
    {
      path: "/notifs", component: OrderingNotifs
    },
    {
      path: "/delivery", component: OrderingDelivery
    },
    {
      path: "/delivery_option/:option", component: DeliveryOptionEdit
    },
    {
      path: "/payments", component: OrderingPayments
    },
    {
      path: "/payment_option/:option", component: PaymentOptionEdit
    },
    {
      path: "/profile", component: SettingsProfile
    },
    {
      path: "/design", component: SettingsDesign
    },
    {
      path: "/ordering_settings", component: OrderingSettings
    },
    {
      path: "/poster", component: Poster
    },
    {
      path: "/iiko", component: Iiko
    },
    {
      path: "/ScanMenu", component: ScanMenu
    },
    {
      path: "/analytics", component: SettingsAnalytics
    },
    {
      path: "/messaging", component: Messaging
    },
    {
      path: "/payment", component: Payment
      },
  ],
      beforeEnter: requireAuth
    },
    
    {
      path: "/login",
      component: Login,
      beforeEnter: isAlreadyIn
    },
    {
      path: "/signup",
      component: Signup,
      beforeEnter: isAlreadyIn
    },
    {
      path: "/signup_1",
      component: SignupPlaceInfo,
      beforeEnter: requireAuth
    },
    {
      path: "/signup_2",
      component: SignupPosterDialog,
      beforeEnter: requireAuth
    },
    {
      path: "/signup_3",
      component: SignupTemplateSelect,
      beforeEnter: requireAuth
    },
    {
      path: "/signup_3",
      component: SignupUrlSelect,
      beforeEnter: requireAuth
    },
    {
      path: "/reset_password",
      component: PasswordReset
    },
    {
      path: "/confirm_reset_password",
      component: PasswordResetConfirm
    },
    {
      path: "/logout",
      beforeEnter(to, from, next) {
        cognitoAuth.logout();
        localStorage.removeItem("grab-menu-default")
        next("/login");
      }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
  
});