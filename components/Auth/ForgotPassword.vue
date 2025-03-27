<template>
  <div class="faq-area ptb-80">
    <div class="container">
      <div class="faq-accordion">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="~/assets/img/ForgotPassword.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <section class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h3>Quên mật khẩu</h3>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <!-- Email input -->
                <div class="form-outline mb-3">
                  <ValidationProvider
                    rules="required"
                    mode="lazy"
                    v-slot="{ errors }"
                  >
                    <label class="form-label" for="email"
                      >Nhập tên tài khoản
                      <span style="color: red">{{ errors[0] }}</span></label
                    >

                    <div class="input-phone">
                      <input
                        v-model="userLoginId"
                        type="text"
                        class="form-control form-control-lg"
                        placeholder="Nhập SĐT hoặc Email"
                        autocomplete="off"
                      />
                    </div>
                  </ValidationProvider>
                </div>

                <!-- Submit button -->
                <button
                  type="submit"
                  href="javascript:void(0)"
                  class="btn btn-primary btn-lg btn-block"
                >
                  Gửi mã xác thực
                </button>
              </form>
            </ValidationObserver>
            <div
              class="d-flex gap-2 justify-content-center"
              style="padding-top: 10px"
            >
              <a :href="'/dang-nhap' + getQuery"
                >Quay về để đăng nhập</a
              >
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fpass from "~/assets/img/ForgotPassword.svg";
export default {
  head() {
    return {
      title: "Quên mật khẩu",
    };
  },
  data() {
    return {
      userLoginId: "",
      redirectUrl: "",
    };
  },
  computed: {
    getQuery() {
      const query = this.$route.query.redirectUrl
        ? "?redirectUrl=" + this.$route.query.redirectUrl
        : "";

      return query;
    },
  },
  components: {
    Fpass,
  },
  mounted() {
    this.redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectUrl"
    );
  },
  methods: {
    async handleCheckUserLoginId(userLoginId) {
      try {
        const response = await this.$sdk.auth.getUserLoginByUserLoginId(
          userLoginId
        );
        if (response) {
          return response;
        } else {
          this.$toast.error("Không tìm thấy tên tài khoản");
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleCheckUserLoginId ~ error:", error);
        this.$toast.error(error);
      }
    },

    async hanldeGetPhone(partyId) {
      try {
        const response = await this.$sdk.auth.getPhoneByPartyId(partyId);
        if (response) {
          return response;
        } else {
          this.$toast.error('Tài khoản chưa cập nhật số điện thoại');
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ hanldeGetPhone ~ error:", error);
        this.$toast.error(error);
      }
    },

    async onSubmit() {
      const checkUserLogin = await this.handleCheckUserLoginId(
        this.userLoginId
      );

      if (checkUserLogin) {
        const getPhone = await this.hanldeGetPhone(checkUserLogin?.partyId);

        if (getPhone) {
          const response = await this.$store.dispatch("sendCodeActive", {
            phone: getPhone,
            userLoginId: this.userLoginId,
          });
          if (response.data.sendSmsVerifyCode) {
            this.$router.push({
              path: "/quen-mat-khau/verify",
              query: {
                phone: getPhone,
                userLoginId: this.userLoginId,
                redirectUrl: this.redirectUrl,
              },
            });
          } else {
            console.log(response);
            this.$toast.error(response.errors[0].message);
          }
        }
      }
    },
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

.input-phone input::-webkit-inner-spin-button,
.input-phone input::-webkit-outer-spin-button {
  display: none;
}
</style>
