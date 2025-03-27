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
          <div class="container">
            <h2 style="padding: 22px 0" class="text-center">
              Đăng ký - Xác thực số điện thoại
            </h2>
            <div class="label">
              Nhập mã xác thực đã được gửi đến:
              <span class="phone">{{ userLoginId }}</span>
            </div>
            <form>
              <div class="input-field">
                <input
                  ref="codeInputs"
                  v-for="(code, index) in codes"
                  :key="index"
                  type="number"
                  :value="code"
                  @input="handleCodeInput(index, $event.target.value)"
                />
              </div>
              <div class="mt-4 mb-4 label">
                <span class="mr-2">Bạn vẫn chưa nhận được mã?</span
                ><a @click="resendCode" href="#">Gửi lại mã</a>
              </div>
              <button
                type="button"
                class="btn btn-primary text-center w-100"
                :class="{ disabled: !isCodeComplete }"
                @click="handleVerify"
              >
                Xác thực
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { handleFormatRedirectUrl } from "~/utils/formatUrl.js";
import { formatData } from "../../utils/formatUrt";
export default {
  head() {
    return {
      title: "Xác thực số điện thoại",
    };
  },
  data() {
    return {
      codes: ["", "", "", "", "", ""],
      userLoginId: "",
      redirectUrl: "",
      user: "",
    };
  },
  computed: {
    isCodeComplete() {
      return this.codes.every((code) => code !== "");
    },
  },
  methods: {
    // handleCodeInput(index, value) {
    //   if (value.length > 1) {
    //     this.$set(this.codes, index, value.charAt(0));
    //     return;
    //   }

    //   this.$set(this.codes, index, value);

    //   if (value !== "" && index < this.codes.length - 1) {
    //     this.$refs.codeInputs[index + 1].focus();
    //   }
    // },
    handleCodeInput(index, value) {
      if (value.length > 1) {
        this.$set(this.codes, index, value.charAt(0));
        return;
      }

      this.$set(this.codes, index, value);

      if (value !== "") {
        // Focus on the next input if available
        if (index < this.codes.length - 1) {
          this.$refs.codeInputs[index + 1].focus();
        }
      } else {
        // If the input is cleared, focus on the previous input
        if (index > 0) {
          this.$refs.codeInputs[index - 1].focus();
        }
      }
    },
    async handleVerify() {
      const code = this.codes.join("");
      const dataActive = {
        userLoginId: this.userLoginId,
        code,
      };
      const response = await this.$store.dispatch(
        "activeAccountV2",
        dataActive
      );

      if (response.data.verifyCode) {
        this.$toast.success("Xác thực thành công!");

        //Cookies.set("token", response.data.verifyCode);
        Cookies.set(process.env.ACCESSTOKEN_NAME, response.data.verifyCode, {
          domain: ".longvan.net",
          path: "/",
        });
        // this.$router.push({
        //   path: "/cap-nhat-dang-ky",
        //   query: {
        //     redirectUrl: this.redirectUrl,
        //   },
        // });
        const routeData = this.$router.resolve({
          path: "/cap-nhat-dang-ky",
          query: {
            redirectUrl: this.redirectUrl,
          },
        });

        Cookies.set(process.env.ACCESSTOKEN_NAME, response.data.verifyCode, {
          domain: ".longvan.net",
          path: "/",
        });
        this.$store.commit("setLoading", true);
        //window.location.href = routeData.href;
        this.$router.push(routeData.href);
        //Cookies.set("token", response.data.verifyCode);
      } else {
        this.$store.commit("setLoading", false);
        this.$toast.error(response.errors[0].message);
        console.log("Response:", response);
      }
    },
    async resendCode() {
      const response = await this.$store.dispatch("sendCodeActive", {
        phone: this.userLoginId,
        userLoginId: this.userLoginId,
      });

      if (response.data.sendSmsVerifyCode) {
        this.$toast.success("Đã gửi mã xác thực!");
      } else {
        console.log("Response:", response);
        this.$toast.error("Lỗi khi gửi mã!");
      }
    },
  },
  mounted() {
    this.userLoginId = this.$route.query.userId;
    this.user = this.$route.query.user;

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

    window.addEventListener("load", () => {
      if (this.$refs.codeInputs.length > 0) {
        this.$refs.codeInputs[0].focus();
      }
    });
  },
};
</script>

<style lang="scss" scoped>
form input {
  margin-top: 10px;
  height: 45px;
  width: 42px;
  border-radius: 5px;
  text-align: center;
}

.phone {
  color: #44ce6f;
  font-weight: 500;
}

.input-field {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
}

.label {
  margin: auto;
  width: 80%;
  text-align: center;
}

.input-field input::-webkit-inner-spin-button,
.input-field input::-webkit-outer-spin-button {
  display: none;
}

.disabled {
  background-color: #ddd;
  box-shadow: 0 13px 27px 0 rgba(151, 151, 151, 0.25);
}
</style>
