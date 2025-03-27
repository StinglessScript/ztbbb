<template>
  <div class="faq-area ptb-80 bg-custom">
    <div class="container">
      <div
        class="row d-flex align-items-center justify-content-center h-100 wrapper"
      >
        <div class="col-md-6 col-lg-6 col-xl-6">
          <img
            src="~/assets/img/admin-verify.png"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <section class="col-md-6 col-lg-6 col-xl-6">
          <div class="container">
            <h3 style="padding: 22px 0" class="text-center">Quên mật khẩu</h3>
            <div class="label">
              Vui lòng nhập mã xác thực đã được gửi đến:
              <span class="phone">{{ phone }}</span>
            </div>
            <form>
              <div class="input-field">
                <input type="number" ref="code1" v-model="code1" />
                <input type="number" ref="code2" disabled v-model="code2" />
                <input type="number" ref="code3" disabled v-model="code3" />
                <input type="number" ref="code4" disabled v-model="code4" />
                <input type="number" ref="code5" disabled v-model="code5" />
                <input type="number" ref="code6" disabled v-model="code6" />
              </div>
              <div class="mt-4 mb-4 label">
                <span class="mr-2">Bạn vẫn chưa nhận được mã?</span
                ><a href="#" @click="resendCode">Gửi lại mã</a>
              </div>
              <button
                type="button"
                class="btn btn-primary text-center w-100"
                @click="onSubmit"
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
export default {
  head() {
    return {
      title: "Xác thực OTP",
    };
  },
  mounted() {
    this.$refs.code1.focus();
    this.userLoginId = new URLSearchParams(window.location.search).get(
      "userLoginId"
    );
    this.phone = new URLSearchParams(window.location.search).get(
      "phone"
    );
    this.redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectUrl"
    );

    const inputs = document.querySelectorAll("input"),
      button = document.querySelector("button");

    // iterate over all inputs
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        // This code gets the current input element and stores it in the currentInput variable
        // This code gets the next sibling element of the current input element and stores it in the nextInput variable
        // This code gets the previous sibling element of the current input element and stores it in the prevInput variable
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;

        // if the value has more than one character then clear it
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        // if the next input is disabled and the current value is not empty
        //  enable the next input and focus on it
        if (
          nextInput &&
          nextInput.hasAttribute("disabled") &&
          currentInput.value !== ""
        ) {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }

        // if the backspace key is pressed
        if (e.key === "Backspace") {
          // iterate over all inputs again
          inputs.forEach((input, index2) => {
            // if the index1 of the current input is less than or equal to the index2 of the input in the outer loop
            // and the previous element exists, set the disabled attribute on the input and focus on the previous element
            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", true);
              input.value = "";
              prevInput.focus();
            }
          });
        }
        //if the fourth input( which index number is 3) is not empty and has not disable attribute then
        //add active class if not then remove the active class.
        if (!inputs[3].disabled && inputs[3].value !== "") {
          button.classList.add("active");
          return;
        }
        button.classList.remove("active");
      });
    });

    //focus the first input which index is 0 on window load
    window.addEventListener("load", () => inputs[0].focus());
  },
  methods: {
    async onSubmit() {
      try {
        const dataActive = {
          userLoginId: this.userLoginId,
          code:
            this.code1.toString() +
            this.code2.toString() +
            this.code3.toString() +
            this.code4.toString() +
            this.code5.toString() +
            this.code6.toString(),
        };
        const response = await this.$store.dispatch(
          "activeAccountV2",
          dataActive
        );

        if (response.data.verifyCode) {
          const key = await this.handleCreateResetKey(this.userLoginId);
          if (key) {
            this.$toast.success("Xác thực thành công!");
            this.$router.push({
              path: "/reset",
              query: {
                key_reset: key,
                redirectUrl: this.redirectUrl,
              },
            });
          }
        } else {
          this.$toast.error(response.errors[0].message);
          console.log(
            "🚀 ~ file: Verificationv2.vue:139 ~ handleVeirfy ~ response:",
            response
          );
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    },

    async handleCreateResetKey(userLoginId) {
      try {
        const response = await this.$sdk.auth.createResetKey(userLoginId);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleCreateResetKey ~ error:", error);
        this.$toast.error(error);
      }
    },

    async resendCode() {
      const response = await this.$store.dispatch(
        "sendCodeActive",
        {
          phone: this.phone,
          userLoginId: this.userLoginId
        }
      );

      if (response.data.sendSmsVerifyCode) {
        this.$toast.success("Đã gửi mã xác thực!");
      } else {
        console.log(
          "🚀 ~ file: Verificationv2.vue:126 ~ resendCode ~ response:",
          response
        );
        this.$toast.error("Lỗi khi gửi mã!");
      }
    },
  },
  data() {
    return {
      phone: "",
      userLoginId: "",
      redirectUrl: "",
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    };
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
}
.input-field {
  margin: auto;
  width: 80%;
  display: flex;
  justify-content: space-between;
}
.label {
  margin: auto;
  text-align: center;
}
.input-field input::-webkit-inner-spin-button,
.input-field input::-webkit-outer-spin-button {
  display: none;
}
</style>
