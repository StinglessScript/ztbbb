<template>
  <div class="faq-area ptb-80 bg-custom">
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

                  <ValidationProvider
                    mode="lazy"
                    rules="phone"
                    v-slot="{ errors }"
                  >
                    <label
                      >Số điện thoại
                      <span style="color: red">{{ errors[0] }}</span></label
                    >
                    <input
                      type="number"
                      class="form-control form-control-lg"
                      v-model="user.phone"
                      placeholder="Vui lòng nhập số điện thoại"
                      autocomplete="off"
                    />
                  </ValidationProvider>
                </div>
                <!-- <div class="sub-item-phone">
                  <ValidationProvider
                    mode="lazy"
                    rules="required||phone"
                    v-slot="{ errors }"
                  >
                    <label
                      >Số điện thoại
                      <span style="color: red">{{ errors[0] }}</span></label
                    >
                    <div class="input-phone-field">
                      <input
                        type="number"
                        class="form-control form-control-lg"
                        v-model="user.phone"
                        disabled
                      />
                    </div>
                  </ValidationProvider>
                </div> -->
              </div>
              <div class="item" style="gap: 0.5rem">
                <div class="sub-item">
                  <ValidationProvider
                    name="password"
                    mode="lazy"
                    rules="required|min:6"
                    v-slot="{ errors }"
                  >
                    <label
                      >Nhập mật khẩu đăng nhập<span>*</span>
                      <span style="color: red">{{ errors[0] }}</span></label
                    >
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      v-model="user.password"
                      placeholder="Vui lòng nhập mật khẩu"
                      autocomplete="off"
                    />
                  </ValidationProvider>
                </div>
                <div class="sub-item">
                  <ValidationProvider
                    mode="lazy"
                    rules="required|min:6|password:@password"
                    v-slot="{ errors }"
                  >
                    <label
                      >Nhập lại mật khẩu đăng nhập<span>*</span>
                      <span style="color: red">{{ errors[0] }}</span></label
                    >
                    <input
                      type="password"
                      class="form-control form-control-lg"
                      v-model="user.rePassword"
                      placeholder="Vui lòng nhập lại mật khẩu"
                      autocomplete="off"
                    />
                  </ValidationProvider>
                </div>
              </div>
              <div
                class="btn-action"
                style="justify-content: center; padding-right: 0px"
              >
                <!-- <button
                  class="btn btn-cancel"
                  type="button"
                  @click="handleComplete"
                >
                  Cập nhật sau
                </button> -->
                <button class="btn btn-primary" type="submit">
                  Cập nhật ngay
                </button>
              </div>
            </form>
          </ValidationObserver>
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
      title: "Cập nhật tài khoản",
    };
  },
  mounted() {
    const userFromStore = this.$store.getters.getUser;
    //console.log("🚀 ~ mounted ~ userFromStore:", userFromStore)
    //console.log("this.$route.query.redirectUrl", this.$route.query.redirectUrl);
    if (userFromStore && userFromStore.fullName) {
      this.user.name = userFromStore.fullName;
      this.user.phone = userFromStore.phone; // Make sure the property name is correct
      // this.user.email = userFromStore.email; // Update with the correct property name
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
    };
  },
  methods: {
    async onSubmit() {
      const body = {
        accessToken: Cookies.get(process.env.ACCESSTOKEN_NAME, {
          domain: ".longvan.net",
          path: "/",
        }),
        type: this.$route.query.type,
        password: this.user.password,
        updateUserRequest: {
          fullName: this.user.name,
          email: this.user.email,
          phone: this.user.phone,
        },
      };
      try {
        this.$store.commit("setLoading", true);
        const response = await this.$store.dispatch("updateInfo", body);
        this.$toast.success("Cập nhật thông tin thành công!");
        // this.handleFindCampaignActionGiftVoucher();
        if (
          this.$route.query.redirectUrl != undefined &&
          this.$route.query.redirectUrl != null &&
          this.$route.query.redirectUrl != "/" &&
          this.$route.query.redirectUrl != ""
        ) {
          // this.$store.commit("setLoading", true);

          if (this.redirectUrl) {
            // Kiểm tra xem redirectUrl có phải là một đường dẫn đầy đủ (có domain)
            const isValidUrl = /^(http:\/\/|https:\/\/|\/\/|www\.)/i.test(
              this.redirectUrl
            );

            if (isValidUrl) {
              // Nếu có domain, sử dụng window.location.href
              window.location.href = this.redirectUrl;
            } else {
              // Nếu không có domain, sử dụng this.$router.push()
              this.$router.push({
                path: this.redirectUrl,
              });
            }
          }
        } else {

          // this.$store.commit("setLoading", true);
          window.location.href = `${this.userInside}`;
        }
      } catch (error) {
        this.$store.commit("setLoading", false);
        this.$toast.error(error);
      }
    },
    async handleComplete() {
      this.$router.push({
        path: "/cap-nhat-dang-ky/hoan-tat",
        query: {
          redirectUrl: this.redirectUrl,
        },
      });
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
            this.$route.query.redirectUrl != undefined &&
            this.$route.query.redirectUrl != null &&
            this.$route.query.redirectUrl != "/" &&
            this.$route.query.redirectUrl != ""
          ) {
            if (this.redirectUrl) {
              // Kiểm tra xem redirectUrl có phải là một đường dẫn đầy đủ (có domain)
              const isValidUrl = /^(http:\/\/|https:\/\/|\/\/|www\.)/i.test(
                this.redirectUrl
              );

              if (isValidUrl) {
                // Nếu có domain, sử dụng window.location.href
                window.location.href = this.redirectUrl;
              } else {
                // Nếu không có domain, sử dụng this.$router.push()
                this.$router.push({
                  path: this.redirectUrl,
                });
              }
            }
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
            this.$route.query.redirectUrl != undefined &&
            this.$route.query.redirectUrl != null &&
            this.$route.query.redirectUrl != "/" &&
            this.$route.query.redirectUrl != ""
          ) {
            if (this.redirectUrl) {
              // Kiểm tra xem redirectUrl có phải là một đường dẫn đầy đủ (có domain)
              const isValidUrl = /^(http:\/\/|https:\/\/|\/\/|www\.)/i.test(
                this.redirectUrl
              );

              if (isValidUrl) {
                // Nếu có domain, sử dụng window.location.href
                //window.location.href = this.redirectUrl;
                this.$store.commit("setLoading", false);
                this.$store.commit("setVuex_redirect_url", {
                  type: "href",
                  redirect: this.redirectUrl,
                });
              } else {
                // Nếu không có domain, sử dụng this.$router.push()
                // this.$router.push({
                //   path: this.redirectUrl,
                // });
                this.$store.commit("setLoading", false);
                this.$store.commit("setVuex_redirect_url", {
                  type: "router",
                  redirect: this.redirectUrl,
                });
              }
            }
          } else {
            this.$store.commit("setLoading", false);
            // window.location.href = `${this.userInside}`;
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
<style lang="scss" scoped>
@media screen and (min-width: 960px) {
  .btn-action {
    padding-right: 5rem;
  }
  .item {
    display: flex;
    justify-content: space-between;
    input {
      //width: 80%;
      width: 100%;
    }
  }
  .sub-item {
    grid-auto-flow: column;
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
    //margin-top: 20px;
    div {
      margin-top: 10px;
    }
  }
  .sub-item-phone {
    margin-top: 10px;
  }
}

.sub-item {
  //display: flex;
  display: grid;
  width: 100%;
  gap: 0.5rem;
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
  justify-content: flex-end;
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
