<template>
  <div class="faq-area ptb-80">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center h-100">
        <div class="col-md-8 col-lg-7 col-xl-6">
          <img src="~/assets/img/SignUp.svg"
            class="img-fluid"
            alt="Phone image"
          />
        </div>
        <section class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(onSubmit)">
              <h2 style="padding: 22px 0">Đăng ký</h2>
              <div class="form-outline mb-2">
                <label class="form-label" for="name">Họ và tên</label>
                <ValidationProvider
                  mode="lazy"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    id="name"
                    v-model="name"
                    type="name"
                    class="form-control form-control-lg"
                    placeholder="Nhập họ và tên" autocomplete="off"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <!-- Email input -->
              <div class="form-outline mb-2">
                <label class="form-label" for="email">Email</label>

                <ValidationProvider
                  rules="email|required"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <input
                    id="email"
                    v-model="email"
                    type="email"
                    class="form-control form-control-lg"
                    placeholder="Nhập địa chỉ email" autocomplete="off"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-outline mb-2">
                <label class="form-label" for="email">Mật khẩu</label>
                <ValidationProvider
                  name="password"
                  width="50%"
                  rules="required|min:6"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <input
                    id="password"
                    v-model="password"
                    type="password"
                    class="form-control form-control-lg"
                    placeholder="Mật khẩu tối thiểu 6 ký tự " autocomplete="off"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-outline mb-2">
                <label class="form-label" for="rePassword"
                  >Nhập lại mật khẩu</label
                >
                <ValidationProvider
                  width="50%"
                  rules="required|min:6|password:@password"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <input
                    id="rePassword"
                    v-model="rePassword"
                    type="Password"
                    class="form-control form-control-lg"
                    placeholder="Nhập lại mật khẩu" autocomplete="off"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="form-outline mb-4">
                <label class="form-label" for="phone">Nhập số điện thoại</label>
                <ValidationProvider
                  rules="required|phone"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <input
                    id="phone"
                    v-model="phone"
                    type="text"
                    class="form-control form-control-lg"
                    placeholder="Nhập lại số điện thoại" autocomplete="off"
                  />
                  <span style="color: red">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>

              <button
                type="submit"
                href="/xac-thuc"
                class="btn btn-primary btn-lg btn-block"
              >
                Tạo tài khoản
              </button>

              <div class="divider d-flex align-items-center my-4">
                <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
              </div>
              <div class="d-flex justify-content-center">
              </div>
              </form
          ></ValidationObserver>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SVGreg from '~/assets/img/SignUp.svg'

export default {
  data() {
    return {
      email: "",
      password: "",
      rePassword: "",
      name: "",
      phone: "",
      platform: `WEB`,
      host: "",
    };
  },
  components: {
    SVGreg,
  },
  mounted() {
    this.host = location.host;
  },
  methods: {
    onSubmit() {
      this.$toast.info("Đang tạo tài khoản...");

      let body = {
        fullName: this.name,
        email: this.email.toLowerCase(),
        password: this.password,
        phone: this.phone,
        platform: this.platform,
        url_active_account: `https://${this.host}/xac-thuc`,
      };
      this.$store
        .dispatch("register", body)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {}),
                this.$router.push(
                  "/xac-thuc?email=" + this.email.toLowerCase()
                );
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
</style>
