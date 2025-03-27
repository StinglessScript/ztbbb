<template>
  <div v-if="!$store.getters.isAuthenticated">
    <div class="header-title" v-if="$route.name !== 'dang-nhap'">
      <div class="title-index" style="cursor: pointer">
        <a :href="`/dang-nhap?redirectUrl=${$route.fullPath}`">Đăng Nhập</a>
        để điền thông tin nhanh chóng và quản lý hiệu quả hơn
      </div>
    </div>
    <div class="action-line">
      <div class="btn-login-social" @click="loginGoogle()">
        <img src="@/assets/img/ggicon.png" /><span class="disCssMobile"
          >Google</span
        >
      </div>
      <div class="btn-login-social" @click="loginFacebook()">
        <img src="@/assets/img/fbicon.png" /><span class="disCssMobile"
          >Facebook</span
        >
      </div>
      <div class="btn-login-social" @click="loginZalo()">
        <img src="@/assets/img/zlicon.png" /><span class="disCssMobile"
          >Zalo</span
        >
      </div>
      <!-- <div class="btn-login-social" @click="handleGetOtp()">
        <span
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 15 15"
          >
            <path
              fill="currentColor"
              d="M3.5 6a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 1 0v-2a.5.5 0 0 0-.5-.5M11 7h.5a.5.5 0 0 0 0-1H11z"
            />
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M0 1.5A1.5 1.5 0 0 1 1.5 0h12A1.5 1.5 0 0 1 15 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 0 13.5zm2 5a1.5 1.5 0 1 1 3 0v2a1.5 1.5 0 1 1-3 0zM7 6H6V5h3v1H8v4H7zm3-1h1.5a1.5 1.5 0 0 1 0 3H11v2h-1z"
              clip-rule="evenodd"
            /></svg></span
        ><span class="disCssMobile">OTP</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
// import LoginModal from "./Loginv2.vue";
export default {
  data() {
    return {
      email: "",
      password: "",
      remember: false,
    };
  },
  components: {
    // LoginModal,
  },
  mounted() {
    //this.urlPages();
    //console.log("window.location.", window.location);
  },
  computed: {
    redirectUrl() {
      return window.location.pathname == "/dang-nhap"
        ? this.$route.query.redirectUrl
          ? `${window.location.origin}/dang-nhap?redirectUrl=${this.$route.query.redirectUrl}`
          : `${window.location.origin}/dang-nhap`
        : `${window.location.origin}/dang-nhap`;
    },
  },

  methods: {
    urlPages() {
      const { redirectUrl, ...queryParams } = this.$route.query;
      if (redirectUrl) {
        // Giải mã redirectUrl
        const decodedRedirectUrl = decodeURIComponent(redirectUrl);

        // Tạo một đối tượng URL để tách các tham số query
        const url = new URL(decodedRedirectUrl, window.location.origin);
        const query = new URLSearchParams(url.searchParams);

        // Thêm các tham số từ queryParams vào query
        for (const [key, value] of Object.entries(queryParams)) {
          query.append(key, value);
        }

        const domain = `${url.origin}${url.pathname}`; // Domain
        const params = `?${query.toString()}`; // Params

        const cookieObject = {
          domain,
          params,
        };
        //console.log("🚀 ~ urlPages ~ cookieObject:", cookieObject)
        Cookies.set("urlData", JSON.stringify(cookieObject)); // Cookies sẽ hết hạn sau 7 ngày
      }
    },
    showLogin() {
      this.$modal.show("change-avatar");
    },
    async loginGoogle() {
      this.urlPages();
      const data = {
        redirectUrl: this.redirectUrl,
        type: "login",
      };
      const res = await this.$store.dispatch("loginGoogle", data);
      window.location.href = res.data.loginGoogle;
    },
    async loginFacebook() {
      this.urlPages();
      const data = {
        redirectUrl: this.redirectUrl,
        type: "login",
      };
      const res = await this.$store.dispatch("loginFacebook", data);
      window.location.href = res.data.loginFacebook;
    },
    async loginZalo() {
      this.urlPages();
      const data = {
        redirectUrl: this.redirectUrl,
        type: "login",
      };
      const res = await this.$store.dispatch("loginZalo", data);
      window.location.href = res.data.loginZalo;
    },

    handleGetOtp() {
      this.$emit("handleGetOtp");
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .disCssDesk {
    display: none;
  }

  .disCssMobile {
    display: block;
  }
}

@media screen and (max-width: 760px) {
  .disCssDesk {
    display: block;
  }

  .disCssMobile {
    display: none;
  }
}
.header-title {
  display: flex;
  justify-content: center;
  position: relative;
  a {
    color: var(--44-ce-6-f-100, #44ce6f);
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px; /* 137.5% */
    text-decoration-line: underline;
  }
  gap: 8px;
  .title-index {
    position: relative;
    z-index: 2;
    background: #fff;
    padding: 0 8px;
  }
  // &:before {
  //   content: "";
  //   width: 100%;
  //   height: 1px;
  //   background: #d6d6d6;
  //   z-index: 1;
  //   position: absolute;
  //   left: 0;
  //   top: 10px;
  // }
}
.action-line {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  gap: 8px;
  .btn-login-social {
    border: 1px solid #e3e8ef;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    gap: 4px;
    border-radius: 8px;
    padding: 3px 8px;
    cursor: pointer;
  }
}
</style>
