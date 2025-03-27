<template>
  <div class="faq-area ptb-80" ref="top">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img
            src="~/assets/img/login-one.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <section class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <h2 style="padding: 22px 0">Đăng nhập</h2>
              <!-- Email input -->
              <div class="form-outline mb-3">
                <label class="form-label" for="email|required">Email</label>
                <ValidationProvider
                  mode="lazy"
                  rules="email|required"
                  v-slot="{ errors }"
                >
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Email"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Password input -->
              <div class="form-outline mb-4">
                <label class="form-label" for="password">Mật khẩu</label>
                <ValidationProvider
                  mode="lazy"
                  rules="required|min:6"
                  v-slot="{ errors }"
                >
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Mật khẩu"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <div
                class="d-flex justify-content-between align-items-center mb-4"
              >
                <!-- Checkbox -->
                <div class="form-check">
                  <!-- check box true flase -->
                  <input type="checkbox" id="remember" v-model="remember" />
                  <label class="form-check-label" for="remember">
                    Ghi nhớ
                  </label>
                </div>
                <a  href="/quen-mat-khau">Quên mật khẩu?</a>
              </div>

              <!-- Submit button -->
              <button
                type="submit"
                href="javascript:void(0)"
                class="btn btn-primary btn-lg btn-block"
              >
                Đăng nhập
              </button>
              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
              </div>
            </form></ValidationObserver
          >

          <div class="d-flex justify-content-center">
            <!-- <FacebookButton /> -->
          </div>
          <div class="divider d-flex align-items-center py-4">
            <p class="text-center fw-bold mx-3 mb-0 text-muted">
              Bạn chưa có tài khoản ?
              <a  href="/dang-ky">Đăng ký ngay</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import SVGLogin from "~/assets/img/login-one.svg";
var CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      email: "",
      password: "",
      remember: false,
    };
  },
  components: {
    SVGLogin,
  },
  methods: {
    goto() {
      var element = this.$refs["top"];
      var top = element.offsetTop;

      window.scrollTo(0, top);
    },
    onSubmit() {
      //lưu cookie
      if (this.remember === true) {
        let loginToken = CryptoJS.AES.encrypt(
          "email=" + this.email + "&password=" + this.password,
          "ztbee"
        ).toString();
        Cookies.set("loginToken", loginToken);
      }

      let loginRequest = {
        username: this.email.toLowerCase(),
        password: this.password,
        type: "normal",
      };
      this.$store
        .dispatch("loginV2", loginRequest)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {}),
                // this.$store.commit("setToken", data.data.token);
                this.$store.commit("setLengthFavorite", -1);
              this.$router.push("/");
              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        })
        .catch((data) => {
          console.log(error);
        });
    },
  },
  mounted() {
    // this.goto();
    // Decrypt
    if (Cookies.get("loginToken") !== undefined) {
      let bytes = CryptoJS.AES.decrypt(Cookies.get("loginToken"), "ztbee");
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      //get email and password
      this.email = originalText.split("&")[0].split("=")[1];
      this.password = originalText.split("&")[1].split("=")[1];
    }
  },
};
</script>

<style lang="scss" scoped>
.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}
body {
  padding: 2em;
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
</style>
