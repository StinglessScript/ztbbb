<template>
  <div>
    <div
      style="
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #02020250;
        margin-top: 0px !important;
        cursor: pointer;
      "
      @click="emitHandleShowModal()"
    ></div>
    <div
      class="widget-area widget-area-modal w90 w30"
      style="
        position: fixed;
        top: 10%;
        z-index: 1000;
        padding: 0 15px 0 15px;
        background-color: #fff;
        min-height: 450px;
        overflow: auto;
        transform: translateX(-50%);
        left: 50%;
        border-color: rgb(68, 206, 111) !important;
        border: 2px solid rgb(68, 206, 111) !important;
        border-top-width: 4px !important;
        border-radius: 20px;
      "
      id="secondary"
    >
      <div style="position: relative; height: auto; padding: 10px">
        <div class="d-flex justify-content-between">
          <div></div>

          <span style="cursor: pointer" @click="emitHandleShowModal()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16"
              width="12"
              fill="#4caf50"
              viewBox="0 0 384 512"
            >
              <path
                d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
              />
            </svg>
          </span>
        </div>
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
              Số điện thoại đã liên kết với tài khoản khác
            </div>
            <div class="d-flex justify-content-center align-items-center">
              <div
                style="
                  text-align: center;
                  font-size: 16px;
                  font-weight: 600;
                  color: #44ce6f;
                "
              >
                Vui lòng đăng nhập để liên kết tài khoản
              </div>
            </div>
          </div>

          <div>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="d-flex flex-column gap-3">
                  <div>
                    <div class="form-outline mb-2">
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
                            v-model="user.phone"
                            type="text"
                            class="form-control form-control-lg"
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
                  </div>
                  <div class="text-center d-flex flex-column gap-3">
                    <button
                      type="submit"
                      class="btn btn-primary text-center w-100"
                    >
                      Đăng nhập và liên kết tài khoản
                    </button>

                    <button
                      @click="handleCreateAccount()"
                      type="button"
                      class="btn btn-secondary text-center w-100"
                    >
                      Không phải tôi, tạo tài khoản mới
                    </button>

                    <button
                      @click="emitHandleShowModal()"
                      type="button"
                      class="btn btn-danger text-center w-100"
                    >
                      Sử dụng số điện thoại khác
                    </button>
                  </div>
                </div>
              </form>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
export default {
  props: ["checkAccountUser", "user"],
  data() {
    return {
      dataDes: null,
      password: "",
      userLoginId_zalo: Cookies.get("userLoginId_zalo"),
      currentDomain: null,
      userInside: process.env.USER_INSIDE_URL,
      token_zalo: Cookies.get("token_zalo"),
    };
  },

  mounted() {
    this.currentDomain = window.location.origin;
  },

  methods: {
    emitHandleShowModal() {
      this.$emit("handleShowModal");
    },

    async handleCreateAccount() {
      try {
        this.$store.commit("setLoading", true);
        const response = await this.handleCreateUserDetail(
          this.userLoginId_zalo
        );
        if (response) {
          const userDetail = await this.handleGetUserDetail(this.token_zalo);

          if (userDetail) {
            // console.log(
            //   "🚀 ~ onSubmit ~ userDetail:",
            //   userDetail,
            //   process.env.ACCESSTOKEN_NAME
            // );
            const user_infor = {
              id: userDetail?.partyId,
              fullName: userDetail?.fullName,
              email: userDetail?.email,
              phone: userDetail?.phone,
              readyV2: true,
            };
            this.$store.commit("setUser", user_infor);

            Cookies.remove("userLoginId_zalo");
            Cookies.remove("token_zalo");

            Cookies.set(process.env.ACCESSTOKEN_NAME, userDetail?.accessToken, {
              domain: ".longvan.net",
              path: "/",
            });

            this.$toast.success("Cập nhật thông tin thành công!");
            this.handleFindCampaignActionGiftVoucher();
            // if (
            //   this.$route.query.callback != undefined &&
            //   this.$route.query.callback != null &&
            //   this.$route.query.callback != "/" &&
            //   this.$route.query.callback != ""
            // ) {
            //   this.$store.commit("setLoading", true);
            //   window.location.href = this.$route.query.callback;
            // } else {
            //   this.$store.commit("setLoading", true);
            //   window.location.href = `${this.userInside}`;
            // }
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleCreateAccount ~ error:", error);
        this.$toast.error("handleCreateUserDetail", error);
        this.$store.commit("setLoading", false);
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

    async handleCreateUserDetail(userLoginId) {
      try {
        const response = await this.$sdk.auth.createUserDetail(userLoginId);

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

    async onSubmit() {
      try {
        this.$store.commit("setLoading", true);
        const loginRequest = {
          username: this.user.phone,
          password: this.password,
        };
        const response = await this.$store.dispatch("newLogin", loginRequest);

        if (response.data.login) {
          const linking = await this.handleLinkingUserLoginAndUserDetail(
            this.userLoginId_zalo,
            response.data.login?.partyId
          );
          if (linking) {
            this.$toast.success("Liên kết thành công.");
            Cookies.remove("userLoginId_zalo");
            Cookies.remove("token_zalo");
            const accessToken = response.data.login?.accessToken;

            const user_infor = {
              id: response.data.login?.partyId,
              fullName: response.data.login?.fullName,
              email: response.data.login?.email,
              phone: response.data.login?.phone,
              readyV2: true,
            };
            this.$store.commit("setUser", user_infor);

            Cookies.set(process.env.ACCESSTOKEN_NAME, accessToken, {
              domain: ".longvan.net",
              path: "/",
            });

            if (
              (this.$route.query.redirectUrl &&
                this.$route.query.redirectUrl != "/") ||
              (this.$route.query.callback && this.$route.query.callback != "/")
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
          }
        } else {
          this.$toast.error(response.errors[0].message);
          this.$store.commit("setLoading", false);
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        this.$toast.error(error);
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
      let newRedirectUrl =
        this.$route.query.redirectUrl || this.$route.query.callback;

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
        .filter(
          (key) =>
            key !== "redirectUrl" &&
            key !== "callback" &&
            key !== "status" &&
            key !== "typeLogin"
        ) // Loại bỏ redirectUrl khỏi danh sách các tham số query
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

    async handleFindCampaignActionGiftVoucher() {
      try {
        let token = Cookies.get(process.env.ACCESSTOKEN_NAME, {
          domain: ".longvan.net",
          path: "/",
        });

        await this.$sdk.order.setToken(token);
        const response = await this.$sdk.order.findCampaignActionGiftVoucher();
        if (response?.status == 1) {
          this.handleAddCustomerToVoucher(
            this.$store.getters.getUser?.partyId ||
              this.$store.getters.getUser?.id,
            response?.data,
            token
          );
        } else {
          if (
            this.$route.query.callback != undefined &&
            this.$route.query.callback != null &&
            this.$route.query.callback != "/" &&
            this.$route.query.callback != ""
          ) {
            window.location.href = this.$route.query.callback;
          } else {
            window.location.href = `${this.userInside}`;
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleFindCampaignActionGiftVoucher ~ error:", error);
      }
    },

    async handleAddCustomerToVoucher(userId, campaignActionId, token) {
      try {
        await this.$sdk.crm_camping.setToken(token);
        const response = await this.$sdk.crm_camping.addCustomerToVoucher(
          userId,
          campaignActionId
        );
        if (response) {
          this.$store.commit("setNewCusomer", response);
          if (
            this.$route.query.callback != undefined &&
            this.$route.query.callback != null &&
            this.$route.query.callback != "/" &&
            this.$route.query.callback != ""
          ) {
            this.$store.commit("setLoading", false);
            //window.location.href = this.$route.query.callback;
            this.$store.commit("setVuex_redirect_url", {
              type: "href",
              redirect: this.$route.query.callback,
            });
          } else {
            this.$store.commit("setLoading", false);
            //window.location.href = `${this.userInside}`;
            this.$store.commit("setVuex_redirect_url", {
              type: "href",
              redirect: this.userInside,
            });
          }
        }
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.log("🚀 ~ handleAddCustomerToVoucher ~ error:", error);
      }
    },
  },
};
</script>

<style>
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
</style>
