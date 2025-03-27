<template>
  <div class="faq-area ptb-80 bg-custom">
    <div class="container">
      <div
        class="row d-flex align-items-center justify-content-center h-100 wrapper"
      >
        <div class="col-md-6 col-lg-6 col-xl-6">
          <img
            src="~/assets/img/SignUp.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <section class="col-md-6 col-lg-6 col-xl-6">
          <ValidationObserver v-slot="{ handleSubmit }">
            <h3 style="padding: 20px 0" class="text-center">
              <!-- Vui lòng Đăng ký hoặc <a href="/dang-nhap">Đăng Nhập</a> nếu đã có
              tài khoản -->
              Đăng ký tài khoản
            </h3>

            <form
              @submit.prevent="handleSubmit(onSubmit)"
              style="padding: 0 40px"
            >
              <div class="form-outline mb-2">
                <ValidationProvider
                  rules="required"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="password"
                    >Họ và tên
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>

                  <input
                    id="name"
                    v-model="name"
                    class="form-control form-control-lg"
                    placeholder="Nhập họ tên"
                  />
                </ValidationProvider>
              </div>
              <div class="form-outline mb-2">
                <ValidationProvider
                  mode="lazy"
                  rules="required|phone"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="phone"
                    >Số điện thoại
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <div class="input-field">
                    <input
                      id="phone"
                      v-model="phone"
                      type="number"
                      class="form-control form-control-lg"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </ValidationProvider>
              </div>
              <!-- <div>
                <div class="row">
                  <div class="col-sm-1"><input type="checkbox" /></div>
                  <div class="col-sm-11">
                    <label class="text-muted">
                      Hệ thống sẽ tạo tài khoản từ số điện thoại của bạn nếu
                      chưa có tài khoản để hỗ trợ yêu cầu của bạn tốt
                      hơn.</label
                    >
                  </div>
                </div>
              </div> -->
              <div class="text-center">
                <button type="submit" class="btn btn-primary text-center w-100">
                  Đăng ký
                </button>
              </div>

              <!-- <div class="divider d-flex align-items-center my-4">
                <p class="text-center mx-3 mb-0 text-muted">Hoặc</p>
              </div> -->
              <div
                class="d-flex gap-2 justify-content-center"
                style="padding-top: 10px"
              >
                Bạn đã có tài khoản?
                <a   :href="'/dang-nhap' + getQuery"
                  >Đăng nhập ngay</a
                >
              </div>
              <!-- <div class="d-flex justify-content-center py-2">
              </div> -->
            </form></ValidationObserver
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SVGreg from "~/assets/img/SignUp.svg";
const sha1 = require("js-sha1");
import { handleFormatRedirectUrl } from "~/utils/formatUrl.js";
import { formatData } from "../../utils/formatUrt";
export default {
  head() {
    return {
      title: "Đăng ký tài khoản",
    };
  },
  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
      name: "",
      phone: "",
      platform: `WEB`,
      host: "",
      redirectUrl: "",
    };
  },
  components: {
    SVGreg,
  },
  computed: {
    getQuery() {
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
      const query = this.$route.query.redirectUrl
        ? "?redirectUrl=" +
          formatData({
            redirectUrl,
            type,
            os,
            store,
            id,
            orderId,
            openBill,
            lab,
            callback,
          })
        : "";

      return query;
    },
  },
  mounted() {
    this.host = location.host;
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
    //console.log("🚀 ~ mounted ~ this.redirectUrl:", this.redirectUrl)
    // this.redirectUrl = new URLSearchParams(window.location.search).get(
    //   "redirectUrl"
    // );

    //console.log("🚀 ~ mounted ~ this.redirectUrl:", this.redirectUrl, this.$route.query.redirectUrl);
    // console.log("🚀 ~ mounted ~ window.location.search:", window.location.search)

    if (this.$route.query.accountPhone) {
      this.phone = this.$route.query.accountPhone;
    }
  },
  methods: {
    async onSubmit() {
      // let body = {
      //   userLoginId: "0988222882",
      //   password: "123456",
      //   phone: "0988222882",
      //   fullName: "long test tao tai khoan",
      //   orgId: "LONGVAN",
      // };

      // this.$store
      //   .dispatch("register", body)
      //   .then((data) => {
      //     switch (data.status) {
      //       case 1:
      //         this.$toast.success(data.message, {}),
      //           this.$router.push(
      //             "/xac-thuc?email=" + this.email.toLowerCase()
      //           );
      //         break;
      //       case 0:
      //         this.$toast.error(data.message, {});
      //         break;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      let registerRequest = {
        userLoginId: this.phone,
        fullName: this.name,
      };
      const response = await this.$store.dispatch(
        "registerV2",
        registerRequest
      );
      if (response.data.register) {
        this.$toast.success("Đăng ký thành công!");
        await this.$store.dispatch("sendCodeActive", {
          phone: this.phone,
          userLoginId: this.phone,
        });
        this.$router.push({
          path: "/xac-thuc",
          query: {
            userId: this.phone,
            user: this.name,
            redirectUrl: this.redirectUrl,
          },
        });
      } else {
        if (
          response.errors[0].extensions.debugInfo.errorCode ===
          "USER_LOGIN_NEED_VERIFY_SMS"
        ) {
          this.$toast.warning(response.errors[0].message);
          await this.$store.dispatch("sendCodeActive", {
            phone: this.phone,
            userLoginId: this.phone,
          });
          this.$router.push({
            path: "/xac-thuc",
            query: {
              redirectUrl: this.redirectUrl,
              userId: this.phone,
              user: this.name,
            },
          });
        } else {
          this.$toast.error("Số điện thoại đã được đăng ký!");
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-custom {
  background: #fcfcfd;
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
