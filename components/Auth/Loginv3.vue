<template>
  <div class="faq-area bg-custom">
    <div class="d-flex align-items-center h-100 p-4">
      <ValidationObserver v-slot="{ handleSubmit }" style="width: 100%">
        <h3 style="padding: 22px 0" class="text-left">Đăng nhập</h3>

        <form @submit.prevent="handleSubmit(onSubmit)" style="padding: 0 40px">
          <div class="form-outline mb-2">
            <!-- <ValidationProvider
                  mode="lazy"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="name"
                    >Tài khoản
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="name"
                    v-model="user"
                    type="name"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider> -->
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
              class="text-left"
            >
              <label class="form-label" for="phone"
                >Tên tài khoản
                <span style="color: red">{{ errors[0] }}</span>
              </label>
              <div class="input-field">
                <input
                  id="phone"
                  v-model="user"
                  type="number"
                  class="form-control form-control-lg"
                  placeholder="Nhập SĐT hoặc username"
                />
              </div>
            </ValidationProvider>
          </div>
          <div class="form-outline mb-2">
            <ValidationProvider
              name="password"
              width="50%"
              rules="required|min:6"
              mode="lazy"
              v-slot="{ errors }"
            >
              <label class="form-label" for="email"
                >Mật khẩu
                <span style="color: red">{{ errors[0] }}</span>
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
              />
            </ValidationProvider>
          </div>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <!-- Checkbox -->
            <div class="form-check">
              <!-- check box true flase -->
              <input type="checkbox" id="remember" v-model="remember" />
              <label class="form-check-label" for="remember"> Ghi nhớ </label>
            </div>
            <a
              :href="`/quen-mat-khau?redirectUrl=${redirectUrl ? redirectUrl : ''}`"
              >Quên mật khẩu?</a
            >
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary text-center w-100">
              Đăng nhập
            </button>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
          </div>
          <LoginSocial /></form
      ></ValidationObserver>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import LoginSocial from "./LoginSocial.vue";
var CryptoJS = require("crypto-js");

export default {
  head() {
    return {
      title: "Đăng nhập tài khoản",
    };
  },
  data() {
    return {
      user: "",
      password: "",
      remember: false,
      host: "",
      redirectUrl: "",
    };
  },
  components: {
    LoginSocial,
  },
  computed: {
    getQuery() {
      const query = this.$route.query.redirectUrl
        ? "?redirectUrl=" + this.$route.query.redirectUrl
        : "";
      return query;
    },
    getRedirectUrl() {
      const query = this.$route.query.redirectUrl
        ? this.$route.query.redirectUrl
        : "/";
      return query;
    },
  },
  methods: {
    async onSubmit() {
      //lưu cookie
      if (this.remember === true) {
        let loginToken = CryptoJS.AES.encrypt(
          "email=" + this.email + "&password=" + this.password,
          "ztbee"
        ).toString();
        Cookies.set("loginToken", loginToken);
      }
      let loginRequest = [
        {
          clientId: "test",
          orgId: "LONGVAN",
          user: this.user,
          pass: this.password,
        },
      ];

      const response = await this.$store.dispatch("newLogin", loginRequest);
      if (response.data.login) {
        this.$store.commit("setToken", response.data.login.accessToken);
        //Cookies.set("token", response.data.login.accessToken);
        Cookies.set(
          process.env.ACCESSTOKEN_NAME,
          response.data.login.accessToken,
          { domain: ".longvan.net", path: "/" }
        );
        Cookies.set("userLoginId", this.user);
        this.$router.push(this.getRedirectUrl ? this.getRedirectUrl : "/");
      } else {
        this.$toast.error("Số điện thoại hoặc Mật khẩu không đúng!");
      }
    },
    async callBackPrevUrl() {
      const prevUrl = this.$route.query.redirect || "";

      window.location.assign(prevUrl);
    },
  },
  mounted() {
    if (Cookies.get("loginToken") !== undefined) {
      let bytes = CryptoJS.AES.decrypt(Cookies.get("loginToken"), "ztbee");
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      //get email and password
      this.email = originalText.split("&")[0].split("=")[1];
      this.password = originalText.split("&")[1].split("=")[1];
    }

    this.redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectUrl"
    );
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .wrapper {
    padding: 48px 144px;
  }
}

@media screen and (max-width: 760px) {
  .img-fluid {
    width: 200px;
  }
  .text-left {
    font-size: 18px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    a {
      margin: 0 5px;
    }
  }
}
.btn-fb {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 0px;
  background: #ffffff;
  margin: 0 20px;
  border: 1px solid #cdd5df;
  border-radius: 4px;
  font-weight: 400;
  cursor: pointer;
  font-size: 14px;
  line-height: 12px;
  letter-spacing: 0.4px;
  img {
    width: 12px;
  }

  color: #000000;
}
.bg-custom {
  background: #fcfcfd;
}
.form-check {
  padding-left: 0;
}
h2 {
  font-weight: 500;
  font-size: 32px;
  line-height: 34px;
  text-align: center;
  color: #000000;
}
.wrapper {
  background: #ffffff;
  border: 1px solid #cdd5df;
  border-radius: 6px;
}
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}

/* Shared */
.loginBtn {
  box-sizing: border-box;
  position: relative;
  /* width: 13em;  - apply for fixed size */
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
}
.loginBtn:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
  width: 34px;
  height: 100%;
}
.loginBtn:focus {
  outline: none;
}
.loginBtn:active {
  box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
}
.input-field input::-webkit-inner-spin-button,
.input-field input::-webkit-outer-spin-button {
  display: none;
}
</style>
