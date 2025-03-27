<template>
  <div>
    <div
      class="faq-area ptb-80 bg-custom"
      style="padding-left: 10px; padding-right: 10px"
    >
      <div class="container">
        <div
          class="row d-flex align-sub-items-center justify-content-center h-100 wrapper"
        >
          <section>
            <h2>Cập nhật thông tin tài khoản</h2>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="item">
                  <div class="sub-item">
                    <ValidationProvider
                      mode="lazy"
                      rules="required"
                      v-slot="{ errors }"
                    >
                      <label
                        >Họ tên<span>*</span>
                        <span style="color: red">{{ errors[0] }}</span></label
                      >
                      <input
                        class="form-control form-control-lg"
                        v-model="user.name"
                        placeholder="Vui lòng nhập họ và tên"
                        autocomplete="off"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      mode="lazy"
                      rules="email"
                      v-slot="{ errors }"
                    >
                      <label
                        >Email
                        <!-- <span>*</span> -->
                        <span style="color: red">{{ errors[0] }}</span></label
                      >
                      <input
                        type="email"
                        class="form-control form-control-lg"
                        v-model="user.email"
                        placeholder="Vui lòng nhập email"
                        autocomplete="off"
                      />
                    </ValidationProvider>
                  </div>
                  <div class="sub-item-phone">
                    <ValidationProvider
                      mode="lazy"
                      rules="phone|required"
                      v-slot="{ errors }"
                    >
                      <label
                        >Số điện thoại
                        <span style="color: red">*</span>
                        <span style="color: red">{{ errors[0] }}</span></label
                      >
                      <div class="input-phone-field">
                        <input
                          type="number"
                          class="form-control form-control-lg"
                          v-model="user.phone"
                          autocomplete="off"
                          placeholder="Vui lòng nhập số điện thoại"
                        />
                      </div>
                    </ValidationProvider>
                  </div>
                </div>
                <!-- <div
                v-if="isUserLogin"
                class="d-flex flex-column justify-content-center align-items-center"
                style="margin-top: 10px"
              >
                <p style="margin-bottom: 0; color: red">
                  Số điện thoại của bạn đã tồn tại.
                </p>
                <p style="color: red">
                  Vui lòng đăng nhập để tiến hành liên kết.
                </p>
              </div> -->

                <div
                  class="btn-action"
                  style="padding-right: 0 !important; flex-wrap: wrap"
                >
                  <!-- <button
                  class="btn btn-cancel"
                  type="button"
                  @click="handleComplete"
                >
                  Cập nhật sau
                </button> -->
                  <button
                    class="btn btn-primary"
                    type="submit"
                    :style="{
                      'min-width': `${isUserLogin && '190px'}`,
                    }"
                  >
                    Cập nhật ngay
                  </button>
                  <!-- <button
                  v-if="isUserLogin"
                  @click="
                    $router.push(
                      '/dang-nhap' +
                        getQuery +
                        `&accountPhone=${user.phone}&linkAccount=true`
                    )
                  "
                  class="btn btn-primary"
                  :style="{
                    'min-width': `${isUserLogin && '190px'}`,
                  }"
                  type="button"
                >
                  Đăng nhập và liên kết
                </button> -->
                </div>
              </form>
            </ValidationObserver>
          </section>
        </div>
      </div>
    </div>
    <ModalLinkingAccount
      v-if="checkAccountUser"
      :checkAccountUser="checkAccountUser"
      @handleShowModal="handleShowModal"
      :user="user"
    />
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { formatData } from "../../utils/formatUrt";
// import CheckAccount from "@/components/Auth/CheckAccount.vue";
import ModalLinkingAccount from "@/components/Modal/ModalLinkingAccount.vue";

export default {
  head() {
    return {
      title: "Cập nhật tài khoản",
    };
  },

  components: {
    // CheckAccount,
    ModalLinkingAccount,
  },
  // mounted() {
  //   this.userLoginId = new URLSearchParams(window.location.search).get(
  //     "userId"
  //   );
  //   this.redirectUrl = new URLSearchParams(window.location.search).get(
  //     "redirectUrl"
  //   );
  //   this.name = new URLSearchParams(window.location.search).get("user");
  //   this.token = new URLSearchParams(window.location.search).get("token");
  // },
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
      const query = this.$route.query.callback
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
    const userFromStore = this.$store.getters.getUser;
    //console.log("userFromStore", userFromStore);
    if (userFromStore && userFromStore.fullName) {
      this.user.name = userFromStore.fullName;
      this.user.phone = userFromStore.userName; // Make sure the property name is correct
      this.user.email = userFromStore.email; // Update with the correct property name
    }
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
  },
  data() {
    return {
      user: {
        name: "",
        phone: "",
        email: "",
        password: "",
        rePassword: "",
      },
      userInside: process.env.USER_INSIDE_URL,
      redirectUrl: "",

      userLoginId_zalo: Cookies.get("userLoginId_zalo"),

      isUserLogin: false,
      idParty: null,

      token_zalo: Cookies.get("token_zalo"),
      checkAccountUser: false,
    };
  },
  methods: {
    handleShowModal() {
      this.checkAccountUser = !this.checkAccountUser;
    },

    async onSubmit() {
      const body = {
        accessToken: Cookies.get(process.env.ACCESSTOKEN_NAME, {
          domain: ".longvan.net",
          path: "/",
        }),
        type: this.$route.query.type,
        updateUserRequest: {
          fullName: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
        },
      };
      try {
        this.$store.commit("setLoading", true);
        // const response = await this.$store.dispatch("updateInfo", body);
        const response = await this.$sdk.auth.updateProfile(
          this.userLoginId_zalo,
          this.user.name,
          this.user.phone,
          this.user.email
        );

        const checkUserLogin = await this.handleCheckUsernameExisted(
          this.user.phone
        );

        if (!checkUserLogin) {
          const createUserDetail = await this.handleCreateUserDetail(
            this.userLoginId_zalo
          );
          if (createUserDetail) {
            const userDetail = await this.handleGetUserDetail(this.token_zalo);

            if (userDetail) {
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

              Cookies.set(
                process.env.ACCESSTOKEN_NAME,
                userDetail?.accessToken,
                { domain: ".longvan.net", path: "/" }
              );

              this.$toast.success("Cập nhật thông tin thành công!");

              // this.handleFindCampaignActionGiftVoucher();

              // if (
              //   this.$route.query.callback != undefined &&
              //   this.$route.query.callback != null &&
              //   this.$route.query.callback != "/" &&
              //   this.$route.query.callback != ""
              // ) {
              //   // this.$store.commit("setLoading", true);
              //   //window.location.href = this.$route.query.callback;
              //   this.$store.commit("setVuex_redirect_url", {
              //     type: "href",
              //     redirect: this.$route.query.callback,
              //   });
              // } else {
              //   this.$store.commit("setLoading", true);
              //   //window.location.href = `${this.userInside}`;
              //   this.$store.commit("setVuex_redirect_url", {
              //     type: "href",
              //     redirect: this.userInside,
              //   });
              // }

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
          }
        } else {
          // this.idParty = checkUserLogin?.partyId;
          // this.isUserLogin = true;

          // this.$router.push(
          //   `/lien-ket-tai-khoan` +
          //     this.getQuery +
          //     `&accountPhone=${this.user.phone}`
          // );
          this.$store.commit("setLoading", false);
          this.checkAccountUser = true;
        }
      } catch (error) {
        this.$store.commit("setLoading", false);
        console.log("🚀 ~ onSubmit ~ error:", error);
        this.$toast.error("onSubmit", error);
      }
    },
    async handleComplete() {
      this.$router.push({
        path: "/cap-nhat-dang-ky/hoan-tat",
        query: {
          redirectUrl: this.redirectUrl,
          token: this.token,
        },
      });
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

    async handleCheckUsernameExisted(userLoginId) {
      try {
        const response = await this.$sdk.auth.checkUsernameExisted(userLoginId);
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleCheckUsernameExisted ~ error:", error);
        this.$toast.error("handleCheckUsernameExisted", error);
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
        console.log("🚀 ~ handleAddCustomerToVoucher ~ error:", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (min-width: 960px) {
  .btn-action {
    padding-right: 5rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    input {
      width: 80%;
    }
  }
  .wrapper {
    padding: 48px 144px;
  }
}

@media screen and (max-width: 960px) {
  .wrapper {
    padding: 20px 0px;
  }
  .item {
    display: grid;
    input {
      width: 100%;
    }
  }
  .sub-item {
    margin-top: 20px;
    div {
      margin-top: 10px;
    }
  }
  .sub-item-phone {
    margin-top: 10px;
  }
}

.sub-item {
  display: grid;
  width: 100%;
}
.item {
  margin-top: 20px;
  input {
    margin-top: 5px;
    text-align: left;
    padding: 0 20px;
  }
}
.sub-item-phone {
  width: 100%;
}

.input-phone-field {
  margin-top: -5px;
}
.input-phone-field input::-webkit-inner-spin-button,
.input-phone-field input::-webkit-outer-spin-button {
  display: none;
}

.btn-action {
  margin-top: 20px;
  display: flex;
  //justify-content: flex-end;
  justify-content: center;
  gap: 20px;
}
.btn-cancel {
  color: #44ce6f;
  border: 1px solid #44ce6f;
}

.bg-custom {
  background: #fcfcfd;
}

.wrapper {
  background: #ffffff;
  border: 1px solid #cdd5df;
  border-radius: 6px;
}

span {
  color: red;
  margin-left: 3px;
  margin-bottom: 0.5rem;
}
</style>
