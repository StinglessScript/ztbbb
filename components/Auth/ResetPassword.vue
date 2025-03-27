<template>
  <div class="faq-area ptb-80">
    <div class="container">
      <div class="faq-accordion">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="~/assets/img/admin-verify.png"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <section class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <h3>Đặt lại mật khẩu</h3>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
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
                      v-model="password"
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
                      v-model="rePassword"
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
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResetPass from "~/assets/img/ResetPass.svg";
export default {
  head() {
    return {
      title: "Đặt lại mật khẩu",
    };
  },
  data() {
    return {
      token: "",
      userLoginId: "",
      password: "",
      rePassword: "",
      redirectUrl: "",
    };
  },
  components: { ResetPass },
  async mounted() {
    // this.userLoginId = new URLSearchParams(window.location.search).get(
    //   "userId"
    // );
    this.token = new URLSearchParams(window.location.search).get("key_reset");
    this.redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectUrl"
    );

    const checkToken = await this.handleCheckResetKey(this.token);
    if (checkToken?.errorMessage) {
      this.$toast.error(checkToken?.errorMessage);
      this.$router.push({
        path: "/quen-mat-khau",
        query: { redirectUrl: this.redirectUrl },
      });
    }
  },
  methods: {
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

    async onSubmit() {
      try {
        const checkKey = await this.handleCheckResetKey(this.token);
        if (!checkKey?.errorMessage) {
          const data = {
            userLoginId: checkKey?.userLoginId,
            username: checkKey?.userLoginId,
            newPassword: this.password,
            token: checkKey?.accessToken,
          };
          const response = await this.$store.dispatch("resetPassword", data);
          if (response.data.resetPassword) {
            this.$toast.success("Thay đổi mật khẩu thành công!");
            this.$router.push({
              path: "/dang-nhap",
              query: { redirectUrl: this.redirectUrl },
            });
          } else {
            this.$toast.error("Thay đổi mật khẩu thất bại");
          }
        } else {
          this.$toast.error(checkKey?.errorMessage);
          this.$router.push({
            path: "/quen-mat-khau",
            query: { redirectUrl: this.redirectUrl },
          });
        }
      } catch (error) {
        console.log("🚀 ~ onSubmit ~ error:", error);
        this.$toast.error(error);
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
</style>
