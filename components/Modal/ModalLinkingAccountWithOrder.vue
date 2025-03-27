<template>
  <div style="width: 100%">
    <div>
      <div class="d-flex flex-column gap-3">
        <div class="d-flex flex-column gap-1">
          <div
            style="
              text-align: center;
              font-size: 20px;
              font-weight: 600;
              color: #44ce6f;
            "
          >
            <!-- {{
              resetPassword
                ? "Cập nhật mật khẩu"
                : loginPW
                ? "Xác thực thông tin để tiếp tục sử dụng dịch vụ"
                : "Xác thực OTP để tiếp tục sử dụng dịch vụ"
            }} -->
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <div
              v-if="loginPW"
              style="
                text-align: center;
                font-size: 14px;
                font-weight: 600;
                color: #44ce6f;
              "
            >
              {{
                resetPassword
                  ? "Vui lòng cập nhật lại mật khẩu"
                  : loginPW
                  ? "Vui lòng đăng nhập để xác thực thông tin"
                  : ""
              }}
            </div>
            <div v-if="loginOTP" style="text-align: center; font-size: 14px">
              Mã xác thực đã được gửi đến
              <span style="font-weight: 600; color: #44ce6f">{{ phone }}</span>
              vui lòng nhập mã xác thực
            </div>
          </div>
        </div>
        <div v-if="!resetPassword">
          <div v-if="loginPW">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="d-flex flex-column gap-3">
                  <div class="d-flex flex-column gap-1">
                    <div class="form-outline mb-2">
                      <ValidationProvider
                        mode="lazy"
                        rules="required"
                        v-slot="{ errors }"
                        class="text-left"
                      >
                        <label
                          class="form-label"
                          for="phone"
                          style="margin-bottom: 0px !important"
                          >Tên tài khoản
                          <span style="color: red">{{ errors[0] }}</span>
                        </label>
                        <div class="input-field w-100">
                          <input
                            style="margin-bottom: 0.5rem !important"
                            id="phone"
                            v-model="phone"
                            type="text"
                            class="form-control form-control-lg input-data"
                            placeholder="Nhập số SĐT hoặc Email"
                            autocomplete="off"
                            disabled
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
                        <label
                          class="form-label"
                          for="email"
                          style="margin-bottom: 0px !important"
                          >Mật khẩu
                          <span style="color: red">{{ errors[0] }}</span>
                        </label>
                        <input
                          style="margin-bottom: 0.5rem !important"
                          id="password"
                          v-model="password"
                          type="password"
                          class="form-control form-control-lg input-data"
                          placeholder="Nhập mật khẩu"
                          autocomplete="off"
                        />
                      </ValidationProvider>
                    </div>
                  </div>
                  <div class="text-center d-flex flex-column gap-2">
                    <button
                      type="submit"
                      class="btn btn-primary text-center w-100"
                    >
                      Đăng nhập và liên kết đơn hàng
                    </button>

                    <button
                      @click="handleChooseOption()"
                      type="button"
                      class="btn btn-primary-light text-center w-100"
                    >
                      Quên mật khẩu
                    </button>
                    <button
                      v-if="$route.query.redirectUrl"
                      @click="redirectToPreviousUrl()"
                      type="button"
                      href="javascript:void(0)"
                      class="btn btn-primary-light btn-lg btn-block"
                    >
                      Quay về thanh toán
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>

          <div v-else>
            <form class="loginOTP">
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
                ><a href="#" @click="handleResetOTP()">Gửi lại mã</a>
              </div>
              <div class="text-center d-flex flex-column gap-2">
                <button
                  @click="onSubmitOTP()"
                  type="button"
                  class="btn btn-primary text-center w-100"
                >
                  Xác thực
                </button>

                <button
                  v-if="typeLogin == 'PW'"
                  @click="handleChooseOption()"
                  type="button"
                  class="btn btn-primary-light text-center w-100"
                >
                  Đăng nhập bằng mật khẩu
                </button>
                <button
                  v-if="$route.query.redirectUrl"
                  @click="redirectToPreviousUrl()"
                  type="button"
                  href="javascript:void(0)"
                  class="btn btn-primary-light btn-lg btn-block"
                >
                  Quay về thanh toán
                </button>
              </div>
            </form>
          </div>
        </div>
        <div v-else>
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmitResetPW)">
              <ValidationProvider
                name="password"
                rules="required|min:6"
                mode="lazy"
                v-slot="{ errors }"
              >
                <div class="form-outline mb-2">
                  <label class="form-label" for="email"
                    >Nhập mật khẩu mới
                    <span style="color: red">{{ errors[0] }}</span></label
                  >
                  <input
                    id="password"
                    v-model="resetPW"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Nhập mật khẩu mới"
                    autocomplete="off"
                  />
                </div>
              </ValidationProvider>
              <ValidationProvider
                rules="required|min:6|password:@password"
                mode="lazy"
                v-slot="{ errors }"
              >
                <div class="form-outline mb-2">
                  <label class="form-label" for="rePassword"
                    >Nhập lại mật khẩu mới
                    <span style="color: red">{{ errors[0] }}</span></label
                  >

                  <input
                    id="rePassword"
                    v-model="reset_config_PW"
                    type="Password"
                    class="form-control form-control-lg"
                    placeholder="Nhập lại mật khẩu"
                    autocomplete="off"
                  />
                </div>
              </ValidationProvider>
              <!-- Submit button -->
              <button
                type="submit"
                href="javascript:void(0)"
                class="btn btn-primary btn-lg btn-block"
              >
                Cập nhật
              </button>
            </form>
          </ValidationObserver>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  props: [
    "checkModal",
    "phone",
    "typeLogin",
    "name",
    "url",
    "order",
    "redirectUrl",
  ],
  data() {
    return {
      dataDes: null,
      password: "",
      userLoginId_zalo: Cookies.get("userLoginId_zalo"),
      currentDomain: null,
      userInside: process.env.USER_INSIDE_URL,
      token_zalo: Cookies.get("token_zalo"),

      loginPW: false,
      loginOTP: false,

      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",

      resetPassword: false,
      keyReset: "",

      resetPW: "",
      reset_config_PW: "",

      checkOtp: false,
      otpTimer: null,
    };
  },

  mounted() {
    this.currentDomain = window.location.origin;
    //this.handleCheckLoginID(this.phone);
    if (this.typeLogin == "PW") {
      this.loginPW = true;
      // setTimeout(() => {
      //   this.$store.commit("setLoading", false);
      // }, 3000);
    } else {
      this.loginOTP = true;
      // setTimeout(() => {
      //   this.$store.commit("setLoading", false);
      // }, 3000);
      if (this.checkOtp == false) {
        this.handleSendOtpWhenTypeLoginOtp();
        this.checkOtp = true;
        this.startOtpCountdown();
      }

      this.$refs.code1.focus();

      const inputs = document.querySelectorAll("input"),
        button = document.querySelector("button");

      // iterate over all inputs
      inputs.forEach((input, index1) => {
        input.addEventListener("keyup", (e) => {
          const currentInput = input,
            nextInput = input.nextElementSibling,
            prevInput = input.previousElementSibling;

          // if the value has more than one character then clear it
          if (currentInput.value.length > 1) {
            currentInput.value = "";
            return;
          }

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
              if (index1 <= index2 && prevInput) {
                input.setAttribute("disabled", true);
                input.value = "";
                prevInput.focus();
              }
            });
          }

          if (!inputs[3].disabled && inputs[3].value !== "") {
            button.classList.add("active");
            return;
          }
          button.classList.remove("active");
        });
      });

      //focus the first input which index is 0 on window load
      window.addEventListener("load", () => inputs[0].focus());
    }
  },

  watch: {
    loginOTP: {
      handler(newVal, oldVal) {
        console.log("🚀 ~ handler ~ newVal:", newVal);
        if (newVal === true) {
          if (this.checkOtp == false) {
            if (this.typeLogin == "PW") {
              this.handleSendOtpWhenTypeLoginPW();
            } else {
              this.handleSendOtpWhenTypeLoginOtp();
            }

            this.checkOtp = true;
            this.startOtpCountdown();
          }

          // Đảm bảo DOM đã được cập nhật trước khi thao tác
          this.$nextTick(() => {
            const inputs = document.querySelectorAll("input");
            const button = document.querySelector("button");

            // Lắng nghe sự kiện keyup trên tất cả các input
            inputs.forEach((input, index1) => {
              input.addEventListener("keyup", (e) => {
                const currentInput = input;
                const nextInput = input.nextElementSibling;
                const prevInput = input.previousElementSibling;

                // Nếu có nhiều hơn một ký tự, xóa giá trị
                if (currentInput.value.length > 1) {
                  currentInput.value = "";
                  return;
                }

                if (
                  nextInput &&
                  nextInput.hasAttribute("disabled") &&
                  currentInput.value !== ""
                ) {
                  nextInput.removeAttribute("disabled");
                  nextInput.focus();
                }

                // Nếu nhấn phím Backspace
                if (e.key === "Backspace") {
                  inputs.forEach((input, index2) => {
                    if (index1 <= index2 && prevInput) {
                      input.setAttribute("disabled", true);
                      input.value = "";
                      prevInput.focus();
                    }
                  });
                }

                // Kích hoạt nút khi tất cả các ô nhập có giá trị
                if (!inputs[3].disabled && inputs[3].value !== "") {
                  button.classList.add("active");
                  return;
                }
                button.classList.remove("active");
              });
            });

            // Focus vào input đầu tiên khi trang được load
            window.addEventListener("load", () => inputs[0].focus());
          });
        }
      },
      deep: true,
    },

    // loginPW: {
    //   handler(newVal, oldVal) {
    //     console.log("🚀 ~ handler ~ newVal:", newVal)
    //     if(newVal == true){

    //     }
    //   }
    // }
  },

  methods: {
    handleResetOTP() {
      if (this.typeLogin == "PW") {
        this.handleSendOtpWhenTypeLoginPW();
      } else {
        this.handleSendOtpWhenTypeLoginOtp();
      }
    },

    startOtpCountdown() {
      // 300 giây = 300 * 1000 ms
      this.otpTimer = setTimeout(() => {
        this.checkOtp = false; // Đặt checkOtp về false sau 300 giây
        console.log("OTP expired. checkOtp is now false.");
      }, 300 * 1000); // 300 giây = 300 * 1000 ms
    },

    // (Tuỳ chọn) Hàm hủy bộ đếm nếu cần
    stopOtpCountdown() {
      if (this.otpTimer) {
        clearTimeout(this.otpTimer); // Hủy bộ đếm nếu cần
        console.log("OTP countdown has been stopped.");
      }
    },

    async handleSendOtpWhenTypeLoginPW() {
      try {
        const response = await this.$store.dispatch("sendCodeActive", {
          phone: this.phone,
          userLoginId: this.phone,
        });
        if (response.data.sendSmsVerifyCode) {
          this.$toast.success("Gửi lại mã thành công");
          return response.data.sendSmsVerifyCode;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleSendOtpWhenTypeLoginPW ~ error:", error);
        this.$toast.error("handleSendOtpWhenTypeLoginPW", error);
      }
    },

    async handleSendOtpWhenTypeLoginOtp() {
      try {
        const response = await this.$sdk.auth.sendOTP(this.phone);
        if (response) {
          this.$toast.success("Gửi lại mã thành công");
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleSendOtpWhenTypeLoginOtp ~ error:", error);
        this.$toast.error("handleSendOtpWhenTypeLoginOtp", error);
      }
    },

    emitHandleShowModal() {
      this.$emit("handleLoading", true);
      this.$store.commit("setLoading", true);
      //this.$emit("handleShowModal");
      // const currentUrl = this.$route.fullPath;
      // const newUrl = currentUrl.replace(
      //   "xac-thuc-thong-tin",
      //   "ket-qua-thanh-toan"
      // );

      // Chuyển hướng đến URL mới
      //this.$router.push(newUrl);

      setTimeout(() => {
        if (this.$route.query.redirectUrl) {
          this.$router.push(this.redirectToPreviousUrl());
        } else {
          window.location.href = this.url;
        }
      }, 3000);
    },

    handleChooseOption() {
      this.loginPW = !this.loginPW;
      this.loginOTP = !this.loginOTP;

      if (this.loginOTP == false) {
        this.code1 = "";
        this.code2 = "";
        this.code3 = "";
        this.code4 = "";
        this.code5 = "";
        this.code6 = "";
      } else {
        this.password = "";
      }
    },

    async handleCheckLoginID(phone) {
      try {
        const resCustomer = await this.$store.dispatch(
          "checkUsernameExisted",
          phone
        );
        if (resCustomer?.data?.checkUsernameExisted == true) {
          this.loginPW = true;
        } else {
          this.loginOTP = true;
        }
      } catch (error) {
        console.log("🚀 ~ handleCheckLoginID ~ error:", error);
        this.$toast.error("handleCheckLoginID", error);
      }
    },

    async handleGetUserDetail(token) {
      try {
        const response = await this.$sdk.auth.getUserDetail(token);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetUserDetail ~ error:", error);
        this.$toast.error("handleGetUserDetail", error);
      }
    },

    async handleCreateUserDetail(name, phone) {
      try {
        const response = await this.$sdk.auth.createUserDetailWithoutUserLogin(
          name,
          phone
        );

        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleCreateUserDetail ~ error:", error);
        this.$toast.error("handleCreateUserDetail", error);
      }
    },

    async handleCheckResetKey(token) {
      try {
        const response = await this.$sdk.auth.checkResetKey(token);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        this.$toast.error(error);
        console.log("🚀 ~ handleCheckResetKey ~ error:", error);
      }
    },

    async onSubmitResetPW() {
      try {
        this.$store.commit("setLoading", true);
        //this.$emit("handleLoading", true);
        const checkKey = await this.handleCheckResetKey(this.keyReset);
        if (!checkKey?.errorMessage) {
          const data = {
            userLoginId: checkKey?.userLoginId,
            username: checkKey?.userLoginId,
            newPassword: this.resetPW,
            token: checkKey?.accessToken,
          };
          const response = await this.$store.dispatch("resetPassword", data);
          if (response.data.resetPassword) {
            await this.onSubmit();
          } else {
            this.$toast.error("Thay đổi mật khẩu thất bại");
            //this.$emit("handleLoading", false);
            this.$store.commit("setLoading", false);
          }
        }
      } catch (error) {
        console.log("🚀 ~ onSubmitResetPW ~ error:", error);
        this.$toast.error("onSubmitResetPW", error);
        //this.$emit("handleLoading", false);
        this.$store.commit("setLoading", false);
      }
    },

    async onSubmitOTP() {
      try {
        if (this.typeLogin == "PW") {
          this.$emit("handleLoading", true);
          const dataActive = {
            userLoginId: this.phone,
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
            const key = await this.handleCreateResetKey(this.phone);
            if (key) {
              this.keyReset = key;
              this.resetPassword = true;
              this.$emit("handleLoading", false);
            }
          } else {
            this.$toast.error(response.errors[0].message);
            console.log(
              "🚀 ~ file: Verificationv2.vue:139 ~ handleVeirfy ~ response:",
              response
            );
            this.$emit("handleLoading", false);
          }
        } else {
          this.$store.commit("setLoading", true);
          const dataActive = {
            userLoginId: this.phone,
            code:
              this.code1.toString() +
              this.code2.toString() +
              this.code3.toString() +
              this.code4.toString() +
              this.code5.toString() +
              this.code6.toString(),
          };

          const response = await this.handleValidateOTP(
            dataActive?.code,
            dataActive?.userLoginId
          );
          if (response) {
            const createUserLogin = await this.handleCreateUserLogin(
              this.phone
            );
            if (createUserLogin) {
              const createUserDetail = await this.handleCreateUserDetail(
                this.name,
                this.phone
              );
              if (createUserDetail) {
                const linking = await this.handleLinkingUserLoginAndUserDetail(
                  createUserLogin?.id,
                  createUserDetail?.partyId
                );
                if (linking) {
                  const login = await this.handleLogin(
                    this.phone,
                    "OTP",
                    dataActive?.code,
                    ""
                  );
                  if (login) {
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

                    await this.$sdk.order.setToken(login?.accessToken);
                    const updateCustomer =
                      await this.$sdk.order.updateCustomerAndShippingAddress(
                        this.$route.params.id,
                        login?.partyId,
                        null
                      );
                    if (updateCustomer) {
                      //this.$toast.success("Liên kết đơn hàng với tài khoản thành công!");
                      //this.$emit("handleUpdateLinking");
                      this.emitHandleShowModal();
                    }
                  }
                }
              }
            }
          } else {
            this.$toast.error(response.errors[0].message);
            console.log(
              "🚀 ~ file: onSubmitOTP.vue:139 ~ onSubmitOTP ~ response:",
              response
            );
            this.$emit("handleLoading", false);
            this.$store.commit("setLoading", false);
          }
        }
      } catch (error) {
        console.log("🚀 ~ onSubmitOTP ~ error:", error);
        //this.$toast.error(error);
        // this.$emit("handleLoading", false);
        // this.$store.commit("setLoading", false);
      }
    },

    async handleLogin(phone, type, otpCode, password) {
      try {
        const loginRequest = {
          username: phone,
          type,
          otpCode,
          password,
        };

        const response = await this.$sdk.auth.login(loginRequest);
        console.log("🚀 ~ handleLogin ~ response:", response);
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

    async handleCreateUserLogin(userLoginId) {
      try {
        const response = await this.$sdk.auth.createUserLogin(userLoginId);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleCreateUserLogin ~ error:", error);
        this.$toast.error(error);
      }
    },

    async handleRegisterData() {
      try {
        let registerRequest = {
          userLoginId: this.phone,
          fullName: this.name || "Khách hàng mới",
        };
        const response = await this.$store.dispatch(
          "registerV2",
          registerRequest
        );

        if (response.data.register) {
          return response.data.register;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleRegisterData ~ error:", error);
        this.$toast.error(error);
      }
    },

    async handleValidateOTP(code, phone) {
      try {
        const response = await this.$sdk.auth.validateOTP(code, phone);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleValidateOTP ~ error:", error);
        this.$toast.error(error);
        this.$emit("handleLoading", false);
        this.$store.commit("setLoading", false);
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

    async onSubmit() {
      //this.$emit("handleLoading", true);
      try {
        this.$store.commit("setLoading", true);
        const loginRequest = {
          username: this.phone,
          password: this.loginOTP ? this.resetPW : this.password,
        };
        //const response = await this.$store.dispatch("newLogin", loginRequest);
        const login = await this.handleLogin(
          this.phone,
          "PW",
          "",
          this.loginOTP ? this.resetPW : this.password
        );

        if (login) {
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

          const token = await this.$sdk.order.setToken(login?.accessToken);
          const updateCustomer =
            await this.$sdk.order.updateCustomerAndShippingAddress(
              this.$route.params.id,
              login?.partyId,
              null
            );
          if (updateCustomer) {
            //this.$store.commit("setLoading", false);
            //this.$toast.success("Liên kết đơn hàng với tài khoản thành công!");
            //this.$emit("handleUpdateLinking");
            this.emitHandleShowModal();
          }
        } else {
          this.$toast.error(response.errors[0].message);
          //this.$emit("handleLoading", false);
          this.$store.commit("setLoading", false);
        }
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.log("🚀 ~ onSubmit ~ error:", error);
      }
    },

    async handleLinkingUserLoginAndUserDetail(userLoginId, partyId) {
      try {
        const response = await this.$sdk.auth.linkingUserLoginAndUserDetail(
          userLoginId,
          partyId
        );

        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleLinkingUserLoginAndUserDetail ~ error:", error);
        this.$toast.error("handleLinkingUserLoginAndUserDetail", error);
      }
    },

    redirectToPreviousUrl(readyV2) {
      // this.$emit("handleLoading", true);
      this.$store.commit("setLoading", true);
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

      this.$router.push(prevUrl);
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .w80 {
    width: 80% !important;
  }

  .w90 {
    width: 90% !important;
  }

  .w100 {
    width: 100% !important;
  }
}

.w30 {
  width: 30%;
}

.loader-bg {
  width: 80px;
  height: 80px;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -90px;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 2px solid transparent;
  border-radius: 50%;
  -webkit-animation: 1s spin linear infinite;
  animation: 1s spin linear infinite;
}

.logo-bg {
  height: 55px;
  width: 55px;
  background-image: url("~/assets/img/logo-lvs.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  margin: 0 auto;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -75px;
}

@-webkit-keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes spin {
  from {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.loginOTP {
  form input {
    margin-top: 10px;
    height: 45px;
    width: 42px;
    border-radius: 5px;
    text-align: center;
  }
}

.phone {
  color: #44ce6f;
}
// .input-field {
//   margin: auto;
//   width: 80%;
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
// }
.label {
  margin: auto;
  text-align: center;
}
.input-field input::-webkit-inner-spin-button,
.input-field input::-webkit-outer-spin-button {
  display: none;
}
.loginOTP {
  .input-field {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    input {
      margin-top: 10px;
      height: 45px; /* Chiều cao của input */
      width: 42px; /* Chiều rộng của input */
      border-radius: 5px; /* Góc bo tròn */
      text-align: center; /* Căn giữa nội dung bên trong input */
      font-size: 16px; /* Đảm bảo text dễ đọc */
    }
  }

  // .input-field {
  //   margin: auto;
  //   width: 80%;
  //   display: flex;
  //   justify-content: space-between;
  //   flex-wrap: wrap;
  // }
}

/*  */

@media (max-width: 768px) {
  .info {
    width: 100%;
  }

  .loginOTP {
    .input-field input {
      // width: 30%; /* Mặc định các input chiếm 30% chiều rộng trên màn hình lớn */
      margin-bottom: 10px;
      height: 45px; /* Giữ chiều cao cố định */
      border-radius: 5px;
      text-align: center; /* Căn giữa nội dung */
    }
  }
}
</style>
