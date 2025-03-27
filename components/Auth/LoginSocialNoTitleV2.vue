<template>
  <div v-if="!$store.getters.isAuthenticated">
    <div class="action-line">
      <div
        class="btn-login-social"
        style="border-radius: 50%; padding: 5px !important"
        @click="loginGoogle()"
      >
        <img src="@/assets/img/ggicon.png" />
      </div>
      <div
        class="btn-login-social"
        @click="loginFacebook()"
        style="border-radius: 50%; padding: 5px !important"
      >
        <img src="@/assets/img/fbicon.png" />
      </div>
      <div
        class="btn-login-social"
        @click="loginZalo()"
        style="border-radius: 50%; padding: 5px !important"
      >
        <img src="@/assets/img/zlicon.png" />
      </div>
    </div>
    <div class="header-title" v-if="$route.name !== 'dang-nhap'">
      <div class="title-index" style="text-align: center; cursor: pointer">
        <a @click="pagesLogin">Đăng Nhập ngay</a>
      </div>
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
  computed: {
    redirectUrl() {
      return window.location.pathname == "/dang-nhap"
        ? this.$route.query.redirectUrl
          ? `${window.location.origin}/dang-nhap?redirectUrl=${this.$route.query.redirectUrl}`
          : `${window.location.origin}/dang-nhap`
        : `${window.location.origin}/dang-nhap?redirectUrl=${this.$route.fullPath}`;
    },
  },

  methods: {
    urlPages() {
      const fullUrl = window.location.href; // Hoặc dùng this.$route.fullPath nếu bạn chỉ cần phần path
      const url = new URL(fullUrl);

      const domain = `${url.origin}${url.pathname}`; // Domain
      const params = url.search; // Params

      const cookieObject = {
        domain,
        params,
      };

      Cookies.set("urlData", JSON.stringify(cookieObject)); // Cookies sẽ hết hạn sau 7 ngày
    },
    
    pagesLogin() {
      return this.$router.push({
        name: "dang-nhap",
        query: { redirectUrl: this.$route.fullPath },
      });
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
    font-size: 14px;
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
    padding: 5px 8px;
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
  margin-top: 5px;
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
