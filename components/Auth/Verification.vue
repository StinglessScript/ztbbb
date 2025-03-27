<template>
  <div class="faq-area ptb-80">
    <div class="container">
      <div class="faq-accordion">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-8 col-lg-7 col-xl-6">
            <img
              src="~/assets/img/Otp.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <!-- <ValidationProvider rules="email" v-slot="{ errors }">
            <input v-model="email" type="text" />
            <span>{{ errors[0] }}</span>
          </ValidationProvider> -->

          <section class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <p>
              Cảm ơn bạn đã đăng ký! Mã xác minh tài khoản của bạn đã được gửi.
              Vui lòng kiểm tra email của bạn.
            </p>
            <p>
              Nếu bạn không nhận được, vui lòng nhấp vào "Gửi lại" của bên dưới.
            </p>
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(onSubmit)">
                <div class="form-outline mb-3">
                  <label class="form-label" for="code|required"
                    >Mã xác nhận</label
                  >
                  <!-- validate form  -->
                  <ValidationProvider
                    mode="lazy"
                    rules="code"
                    v-slot="{ errors }"
                  >
                    <input
                      id="code"
                      v-model="code"
                      type="text"
                      class="form-control form-control-lg"
                      placeholder="Nhập mã xác nhận"
                    />
                    <span style="color: red">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

                <!-- Submit button -->
                <div class="row">
                  <div class="col-md-6 mb-2">
                    <button
                      type="submit"
                      href="javascript:void(0)"
                      class="btn btn-primary btn-lg btn-block"
                    >
                      Xác nhận
                    </button>
                  </div>
                  <div class="col-md-6">
                    <button
                      class="btn btn-warning btn-lg btn-block"
                      @click.prevent="handleResendCode"
                    >
                      Gửi lại mã
                    </button>
                  </div>
                </div>
              </form></ValidationObserver
            >
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";

export default {
  name: "dang-nhap",
  components: {
    PageTitle,
  },
  data() {
    return {
      code: "",
    };
  },
  methods: {
    handleResendCode(e) {
      this.$toast.info("Đang gửi lại mã xác nhận");
      let body = {
        email: this.$route.query.email,
        platform: "WEB",
        url_active_account: `https://${this.host}/xac-thuc`,
      };
      this.$store
        .dispatch("sendCodeActiveAgain", body)
        .then((data) => {
          this.$toast.success(data.message, {});
        })
        .catch((error) => {
          this.$toast.error(error.message, {});
        });
      e.stopPropagation();
    },
    onSubmit() {
      this.$toast.info("Đang xác thực...");
      let payload = {
        code: this.code,
        email: this.$route.query.email,
      };
      this.$store
        .dispatch("activeAccount", payload)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast(data.message, {});
              this.$router.push("/dang-nhap");

              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        })
        .catch((error) => {
          console.log(error);

        });
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
