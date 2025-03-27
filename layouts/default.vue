<template>
  <div>
    <Header></Header>
    <div style="height: max-content">
      <Nuxt />
    </div>
    <PreLoader v-if="isLoading" />
    <Footer
      v-if="
        $route.name != 'thuc-hanh-lab' && $route.name != 'thuc-hanh-lab-lab'
      "
      ref="modal"
    ></Footer>
    <ModalVoucherNewCustomer
      v-if="$store.getters.newCusomer"
      :voucher="$store.getters.newCusomer"
    />
    <back-to-top
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="go-top"><feather type="arrow-up"></feather></div>
    </back-to-top>
    <div id="fb-root"></div>

    <!-- Your Plugin chat code -->
    <div id="fb-customer-chat" class="fb-customerchat"></div>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import PreLoader from "./PreLoader";
import ModalTicket from "../components/Modal/ModalTicket.vue";
import Cookies from "js-cookie";
import ModalVoucherNewCustomer from "../components/Modal/ModalVoucherNewCustomer.vue";
export default {
  middleware(ctx) {
    ctx.$gtm.push({ event: "ssr" });
    "checkAuth", "middlewareHeader";
  },
  name: "default",
  components: {
    Header,
    Footer,
    PreLoader,
    ModalTicket,
    ModalVoucherNewCustomer,
  },
  data() {
    return {
      isLoading: true,
      currentUrl: "",
      zalo: 0,
      isShow: false,
      isModal: false,
      accessToken: Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      }),
    };
  },
  computed: {
    // isLoading() {
    //   return this.$store.getters.isLoading;
    // },
  },
  watch: {
    isModal: function () {
      this.$refs.advice.$modal.show("advice");
    },
    $route(pathUrl) {
      //console.log("🚀 ~ $route ~ pathUrl:", pathUrl)
      // Kiểm tra nếu đường dẫn là /cua-hang hoặc bắt đầu bằng /cua-hang/
      const isStorePath =
        pathUrl.path === "/cua-hang" || pathUrl.path.startsWith("/cua-hang/");

      // Kiểm tra nếu đường dẫn có chứa '?' hoặc '#'
      if (
        // pathUrl.fullPath.indexOf("?") !== -1 ||
        pathUrl.fullPath.indexOf("#") !== -1
      ) {
        this.$store.commit("setLoading", false);
      } else if (!isStorePath) {
        this.currentUrl = pathUrl.path;
        this.$store.commit("setLoading", true);
      }
    },

    "$store.getters.isLoading"(newValue) {
      //console.log("🚀 ~ newValue:", newValue);
      this.isLoading = newValue;
    },

    "$store.getters.newCusomer"(newValue) {
      //console.log("🚀 ~ newValue newCusomer:", newValue)
    },
  },

  mounted() {
    //console.log("$route", this.$route);
    //this.handleGetUserDetail();
    if (process.browser) {
      this.$gtag("config", "AW-977351199", {
        page_title: this.$metaInfo?.title || "",
        page_path: this.$route.fullPath,
      });
    }
    window.document.body.style.paddingLeft = 0;
    this.currentUrl = window.location.pathname;

    if (this.$route.query.accessToken) {
      Cookies.set(process.env.ACCESSTOKEN_NAME, this.$route.query.accessToken, {
        domain: ".longvan.net",
        path: "/",
      });
    }

    if (this.$route.query.errorMessage == "ACCESS_DENIED") {
      //console.log("hehehehehehehehe")
      this.$toast.error("Đăng nhập thất bại");
    }
    //console.log("currentUrl", this.$route);
    // console.log(FB)
    // FB.CustomerChat.hide()
    setTimeout(() => {
      this.isLoading = false;
    }, 1800);
  },
  methods: {
    toggleChat() {
      this.isShow = !this.isShow;
    },

    // async handleGetUserDetail() {
    //   try {
    //     Cookies.remove("user_infor", {
    //       domain: ".longvan.net",
    //       path: "/",
    //     });
    //     const response = await this.$store.dispatch("getUserDetail", {
    //       token: this.accessToken,
    //       orgId: process.env.ORG_ID,
    //     });

    //     if (response.data.getUserDetail) {
    //       console.log(
    //         "🚀 ~ handleGetUserDetail ~ response.data.getUserDetail:",
    //         response.data.getUserDetail
    //       );
    //       const user_infor = {
    //         id: response.data.getUserDetail.partyId,
    //         fullName: response.data.getUserDetail.fullName,
    //         email: response.data.getUserDetail.email,
    //         phone: response.data.getUserDetail.phone,
    //         readyV2: response.data.getUserDetail.readyV2,
    //       };

    //       Cookies.set("user_infor", JSON.stringify(user_infor), {
    //         domain: ".longvan.net",
    //         path: "/",
    //       });
    //     }
    //   } catch (error) {
    //     console.log("error", error);
    //   }
    // },
  },

  // head() {
  //   return {
  //     script: [
  //       {
  //         src: "https://api.pirsch.io/pa.js",
  //         id: "pianjs",
  //         defer: true,
  //         "data-code": "9v68dCdDe4DArxmgxyJSLerAI3U26WGJ",
  //         "data-enable-session": true
  //       }
  //     ]
  //   };
  // }
};
</script>
<style lang="scss">
.body {
  padding-left: 0;
  position: relative;
}
// @media (max-width: 768px) {

// }
.chat {
  position: fixed;
  cursor: pointer;
  z-index: 998;
  bottom: 80px;
  right: 4px;
  .box-content {
    position: absolute;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    overflow: hidden;
    bottom: 100%;
    right: 0px;
    // width: 423px;
    // height: 443px;
    background: #fff;
    border: 1px solid #e3e8ef;
    box-shadow: 0px 5px 14px rgba(20, 20, 21, 0.12);

    .box-header {
      width: 100%;
      height: 150px;
      background: #44ce6f;
      padding: 25px 18px 0 18px;
      display: flex;
      align-items: flex-end;

      img {
        width: 180px;
      }
      .box-header-logo {
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        img {
          width: 151px;
          margin-left: 0;
        }
        span {
          font-weight: 400;
          padding-top: 32px;
          padding-bottom: 10px;
          font-size: 16px;
          line-height: 24px;
          letter-spacing: 0.5px;
          color: #ffffff;
        }
      }
    }
    .box-body {
      padding: 16px;
      .box-body-item {
        border: 1px solid #e3e8ef;
        border-radius: 6px;
        margin: 8px 0;
        padding: 16px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        text-align: center;
        color: #ffffff;
        &:first-child {
          margin-top: 0;
        }
        .list-box {
          display: flex;
          gap: 6px;
          .btn-box {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding: 12px 16px;
            gap: 10px;
            width: 107px;
            height: 42px;
            background: #44ce6f;
            color: #fff;
            border-radius: 6px;
          }
        }
        .btn-box {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 12px 16px;
          gap: 10px;
          width: 107px;
          height: 42px;
          background: #44ce6f;
          color: #fff;
          border-radius: 6px;
        }

        h3 {
          font-weight: 500;
          font-size: 22px;
          line-height: 26px;
          color: #000000;
        }
        .box-phone {
          font-weight: 500;
          font-size: 32px;
          line-height: 34px;
          text-align: center;
          color: #44ce6f;
        }
      }
    }
  }
  .btn-icon {
    width: 50px;
    height: 50px;
    animation: roll 0.7s infinite;
    @keyframes roll {
      0% {
        transform: rotate(0deg);
      }
      50% {
        transform: rotate(30deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    // background: #009ce0;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon-ab {
      color: white;
    }
  }
}
.zalo-chat-widget {
  bottom: 182px !important;
  right: 0px !important;
}
//chatwoot
.woot-elements--right {
  right: 20px;
  bottom: 132px !important;
}
// .woot-widget-bubble {
//   svg {
//     margin: -6px !important;
//   }
//   &.woot--close {
//     &::before {
//       left: 24px !important;
//       top: 15px !important;
//     }
//     &::after {
//       left: 24px !important;
//       top: 15px !important;
//     }
//   }
//   img {
//     margin: 13px !important;
//   }
//   &.woot-elements--right {
//     right: 4px !important;
//     bottom: 132px;
//   }
//   width: 50px !important;
//   height: 50px !important;
// }
@media (max-width: 768px) {
  .btn-phone {
    display: none;
  }
  .chat {
    position: fixed;
    cursor: pointer;
    z-index: 998;
    bottom: 80px;
    right: 4px;
    .box-content {
      position: absolute;
      border-top-right-radius: 6px;
      border-top-left-radius: 6px;
      overflow: hidden;
      bottom: 100%;
      right: 0px;
      width: 324px;
      // height: 443px;
      background: #fff;
      border: 1px solid #e3e8ef;
      box-shadow: 0px 5px 14px rgba(20, 20, 21, 0.12);
      img {
        width: 80px;
        height: 60px;
      }
      .box-header {
        width: 100%;
        align-items: flex-end;
        height: 120px;
        background: #44ce6f;
        padding: 12px 8px 0 24px;
        display: flex;
        .box-header-logo {
          display: flex;
          flex-direction: column;
          img {
            width: 120px;
            margin-left: 0;
          }
          span {
            font-weight: 400;
            padding-top: 12px;
            font-size: 12px;
            line-height: 24px;
            letter-spacing: 0.5px;
            color: #ffffff;
          }
        }
      }
      .box-body {
        padding: 16px;
        .box-body-item {
          border: 1px solid #e3e8ef;
          border-radius: 6px;
          margin: 4px 0;
          padding: 8px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-weight: 400;
          font-size: 14px;
          line-height: 18px;
          text-align: center;
          color: #ffffff;
          &:first-child {
            margin-top: 0;
          }
          h3 {
            font-weight: 500;
            font-size: 16px;
            line-height: 18px;
            color: #000000;
          }
          .box-phone {
            font-weight: 500;
            font-size: 20px;
            line-height: 24px;
            text-align: center;
            color: #44ce6f;
          }
          .list-box {
            display: flex;
            flex-wrap: wrap;

            .btn-box {
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 2px 4px;
              gap: 4px;
              height: 32px;
              background: #44ce6f;
              color: #fff;
              border-radius: 6px;
            }
          }
        }
      }
    }
    .btn-icon {
      width: 50px;
      height: 50px;
      animation: roll 0.7s infinite;
      @keyframes roll {
        0% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(30deg);
        }
        100% {
          transform: rotate(0deg);
        }
      }
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
        0 2px 4px -2px rgb(0 0 0 / 0.1);
      // background: #009ce0;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .icon-ab {
        color: white;
      }
    }
  }
}
//end chat woot
</style>
