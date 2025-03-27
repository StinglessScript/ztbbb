<template>
  <div class="faq-area ptb-80 bg-custom">
    <div class="container">
      <div class="disCssMobile">
        <h3
          style="padding: 22px 0"
          class="text-center d-flex justify-content-center"
        >
          <!-- Vui lòng Đăng Nhập hoặc <a :href="`/dang-ky?redirectUrl=${redirectUrl}`">Đăng Ký</a> nếu chưa có tài
          khoản -->
          Vui lòng đăng nhập để quản lý dịch vụ
        </h3>
      </div>
      <div class="d-flex align-items-center justify-content-center h-100">
        <div style="width: 50%" class="disCssDesk">
          <img
            src="~/assets/img/login-one.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <section class="">
          <ValidationObserver v-slot="{ handleSubmit }">
            <h3 style="padding: 22px 0" class="text-center disCssDesk">
              <!-- Vui lòng Đăng Nhập hoặc <a :href="`/dang-ky?redirectUrl=${redirectUrl}`">Đăng Ký</a> nếu chưa có
              tài khoản -->
              Vui lòng đăng nhập để quản lý dịch vụ
            </h3>

            <form
              @submit.prevent="handleSubmit(onSubmit)"
              style="padding: 0 40px"
            >
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
                  <div class="input-field w-100">
                    <input
                      id="phone"
                      v-model="user"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Nhập SĐT hoặc Email"
                      autocomplete="off"
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
                    autocomplete="off"
                  />
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
                <a
                  :href="`/quen-mat-khau${
                    redirectUrl ? `?redirectUrl=${redirectUrl}` : ''
                  }`"
                  >Quên mật khẩu?</a
                >
              </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary text-center w-100">
                  Đăng nhập
                </button>
                <div class="d-flex gap-2 justify-content-center pt-4">
                  Bạn chưa có tài khoản?
                  <a
                    v-if="getRedirectUrl"
                    :href="`/dang-ky?redirectUrl=${getRedirectUrl}`"
                    >Đăng ký ngay</a
                  >
                  <a v-else href="/dang-ky">Đăng ký ngay</a>
                </div>
              </div>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
              </div>
              <LoginSocial @handleGetOtp="handleGetOtp" />
            </form>
          </ValidationObserver>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import LoginSocial from "./LoginSocial.vue";
import SVGLogin from "~/assets/img/login-one.svg";
const sha1 = require("js-sha1");
var CryptoJS = require("crypto-js");
import { handleFormatRedirectUrl } from "~/utils/formatUrl.js";
import { formatData } from "../../utils/formatUrt";
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
      userInside: process.env.USER_INSIDE_URL,
      supportV1: process.env.SUPPORT_V1,
      currentDomain: null,
    };
  },
  components: {
    SVGLogin,
    LoginSocial,
  },
  computed: {
    // getQuery() {
    //   const query = this.$route.query.redirectUrl
    //     ? "?redirectUrl=" + this.$route.query.redirectUrl
    //     : "";
    //   // console.log("🚀 ~ file: Loginv2.vue:159 ~ getQuery ~ query:", query);

    //   return query;
    // },
    getRedirectUrl() {
      const {
        redirectUrl,
        type,
        os,
        store,
        id,
        orderId,
        openBill,
        lab,
        callback,
        accountPhone,
      } = this.$route.query;
      const query = this.$route.query.redirectUrl
        ? formatData({
            redirectUrl,
            type,
            os,
            store,
            id,
            orderId,
            openBill,
            lab,
            callback,
            accountPhone,
          })
        : "/";
      console.log("🚀 ~ getRedirectUrl ~ query:", query);
      return query != "/" ? query : "";
    },
  },

  mounted() {
    // console.log(
    //   "🚀 ~ formatData:",
    //   formatData(this.$route.query)
    // );
    this.currentDomain = window.location.origin;
    this.$store.commit("setLoading", false);
    //console.log("this.$route.query", this.$route)
    if (Cookies.get("loginToken") !== undefined) {
      let bytes = CryptoJS.AES.decrypt(Cookies.get("loginToken"), "ztbee");
      let originalText = bytes.toString(CryptoJS.enc.Utf8);
      //get email and password
      this.email = originalText.split("&")[0].split("=")[1];
      this.password = originalText.split("&")[1].split("=")[1];
    }

    if (this.$route.query.accountPhone) {
      this.checkUserPhone(this.$route.query.accountPhone);
    }

    if (this.$route.query.errorCode) {
      this.$toast.error(this.$route.query.errorMessage);
    }

    const finalUrl = handleFormatRedirectUrl(window.location.search);
    const {
      redirectUrl,
      type,
      os,
      store,
      id,
      orderId,
      openBill,
      lab,
      callback,
    } = this.$route.query;
    this.redirectUrl = formatData({
      redirectUrl,
      type,
      os,
      store,
      id,
      orderId,
      openBill,
      lab,
      callback,
    });
    // this.redirectUrl = new URLSearchParams(window.location.search).get(
    //   "redirectUrl"
    // );
  },

  methods: {
    handleGetOtp() {},

    async checkUserPhone(phone) {
      const resCustomer = await this.$store.dispatch(
        "checkUsernameExisted",
        phone
      );
      if (resCustomer?.data?.checkUsernameExisted == true) {
        console.log("đã tạo tài khoản");
        this.user = phone;
      } else {
        const {
          redirectUrl,
          type,
          os,
          store,
          id,
          orderId,
          openBill,
          lab,
          callback,
        } = this.$route.query;
        this.redirectUrl = formatData({
          redirectUrl,
          type,
          os,
          store,
          id,
          orderId,
          openBill,
          lab,
          callback,
        });
        // console.log(
        //   "🚀 ~ checkUserPhone ~ this.$route.query:",
        //   this.$route.query
        // );
        // console.log("this.redirectUrl", this.redirectUrl);
        this.$router.push({
          path: "dang-ky",
          query: {
            redirectUrl: this.redirectUrl,
            accountPhone: this.$route.query.accountPhone,
          },
        });
      }
    },
    async onSubmit() {
      // Lưu cookie nếu cần
      if (this.remember) {
        const encryptedData = CryptoJS.AES.encrypt(
          `email=${this.email}&password=${this.password}`,
          "ztbee"
        ).toString();
        Cookies.set("loginToken", encryptedData);
      }

      // const loginRequest = {
      //   username: this.user,
      //   password: this.password,
      // };

      try {
        this.$store.commit("setLoading", true);
        // const response = await this.$store.dispatch("newLogin", loginRequest);
        //const response = await this.$sdk.auth.loginV2(loginRequest);
        const login = await this.handleLogin(
          this.user,
          this.password,
          "PW",
          ""
        );

        if (login) {
          Cookies.remove("userLoginId_zalo");
          Cookies.remove("token_zalo");
          const accessToken = login?.accessToken;

          const user_infor = {
            id: login?.partyId,
            fullName: login?.fullName,
            email: login?.email,
            phone: login?.phone,
            readyV2: true,
          };
          this.$store.commit("setUser", user_infor);

          Cookies.set(process.env.ACCESSTOKEN_NAME, accessToken, {
            domain: ".longvan.net",
            path: "/",
          });
          if (
            this.$route.query.redirectUrl &&
            this.$route.query.redirectUrl != "/"
          ) {
            this.redirectToPreviousUrl(true);
          } else {
            const targetRoute =
              this.$route.name == "dang-ky-tu-van"
                ? this.$route.fullPath
                : this.userInside;

            const targetDomain = new URL(targetRoute, this.currentDomain)
              .origin;

            if (targetDomain == this.currentDomain) {
              this.$router.push(targetRoute);
            } else {
              window.location.href = targetRoute;
            }
          }
        } else {
          this.$store.commit("setLoading", false);
        }
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.error("Error during login:", error);
        this.$toast.error(error);
      }
    },
    redirectToPreviousUrl(readyV2) {
      let newRedirectUrl = this.$route.query.redirectUrl;

      // Kiểm tra nếu redirectUrl chưa chứa dấu "?"
      if (!newRedirectUrl.includes("?")) {
        // Thêm dấu "?" vào redirectUrl
        newRedirectUrl += "?";
      } else {
        // Nếu redirectUrl đã có dấu "?" thì thêm dấu "&" vào redirectUrl
        newRedirectUrl += "&";
      }

      // Tạo chuỗi query mới bằng cách loại bỏ redirectUrl và thêm "&" vào các tham số query còn lại
      const queryString = Object.keys(this.$route.query)
        .filter((key) => key !== "redirectUrl") // Loại bỏ redirectUrl khỏi danh sách các tham số query
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              this.$route.query[key]
            )}`
        )
        .join("&");

      // Ghép chuỗi query mới với redirectUrl
      newRedirectUrl += queryString;

      const prevUrl = newRedirectUrl || "";
      //console.log("🚀 ~ redirectToPreviousUrl ~ prevUrl:", prevUrl);
      const targetRoute = readyV2
        ? prevUrl && prevUrl !== "/"
          ? prevUrl
          : this.userInside
        : this.userInside;
      // `${this.supportV1}?source=user-inside`;

      const targetDomain = new URL(targetRoute, this.currentDomain).origin;
      //const currentDomain = window.location.origin;

      if (targetDomain == this.currentDomain) {
        // Nếu cùng domain, sử dụng Vue Router
        this.$router.push(targetRoute);
      } else {
        // Nếu khác domain, sử dụng window.location.assign
        window.location.assign(targetRoute);
      }
    },

    async handleLogin(phone, password, type, otpCode) {
      try {
        const loginRequest = {
          username: phone,
          password,
          type,
          otpCode,
        };

        const response = await this.$sdk.auth.login(loginRequest);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleLogin ~ error:", error);
        this.$toast.error(error);
      }
    },

    async getUser(accessToken) {
      try {
        const res = await this.$store.dispatch("getUserByToken", {
          token: accessToken,
          orgId: process.env.ORG_ID,
        });
        return res;
      } catch (error) {
        //Cookies.remove("token");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1024px) {
  .wrapper {
    padding: 48px 144px;
  }

  .disCssDesk {
    display: block;
  }

  .disCssMobile {
    display: none;
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

    //justify-content: center;
    a {
      margin: 0 5px;
    }
  }

  .disCssDesk {
    display: none;
  }

  .disCssMobile {
    display: block;
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
