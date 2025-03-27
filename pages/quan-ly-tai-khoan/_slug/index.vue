<template>
    <div style="width: 100%">
      <component :is="name" />
    </div>
  </template>
  
  <script>
  import MyAccount from "../../../components/AccountManagement/MyAccount/";
  import Notification from "../../../components/AccountManagement/Notification";
  import Receipt from "../../../components/AccountManagement/Receipt";
  import Services from "../../../components/AccountManagement/Services";
  export default {
    layout: "admin",
    components: {
      MyAccount,
      Services,
      Receipt,
      Notification,
    },
    data() {
      return {
        currentUrl: "/dich-vu",
        name: "Services",
        menuItems: [
          {
            link: "dich-vu",
            name: "Dịch vụ",
            component: "Services",
          },
          {
            link: "don-hang",
            name: "Đơn hàng",
            component: "Receipt",
          },
          {
            link: "tai-khoan",
            name: "Tài khoản của tôi",
            component: "MyAccount",
          },
          {
            link: "thong-bao",
            name: "Thông báo",
            component: "Notification",
          },
          // {
          //   link: "#qua-tang",
          //   name: "Quà tặng",
          //   component: "Files",
          // },
        ],
      };
    },
  
    // watch: {
    //   $route(pathUrl) {
    //     console.log(pathUrl);
    //     this.currentUrl = pathUrl.slug;
    //     this.menuItems.forEach((element) => {
    //       if (element.link == pathUrl.slug) {
    //         this.name = element.component;
    //       }
    //     });
    //   },
    // },
    
    created() {
        this.menuItems.forEach((element) => {
          if (element.link == this.$route.params.slug) {
            this.name = element.component;
          }
        });
    },
  };
  </script>
  
  <style lang="scss" scoped></style>
  