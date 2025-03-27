<template>
  <modal name="advice" :adaptive="true" :scrollable="true" height="auto">
    <div class="modal-send">
      <div class="faq-area ptb-80 bg-custom">
        <div class="container">
          <div class="d-flex align-items-center justify-content-center h-100">
            <section class="">
              <ValidationObserver v-slot="{ handleSubmit }">
                <h3 style="padding: 22px 0" class="text-left">Đăng Nhập</h3>
                <form
                  @submit.prevent="handleSubmit(onSubmit)"
                  style="padding: 0 40px"
                >
                  <div class="form-outline mb-2">
                    <ValidationProvider
                      mode="lazy"
                      rules="required|phone"
                      v-slot="{ errors }"
                      class="text-left"
                    >
                      <label class="form-label" for="phone"
                        >Số điện thoại
                        <span style="color: red">{{ errors[0] }}</span>
                      </label>
                      <div class="input-field">
                        <input
                          id="phone"
                          v-model="user"
                          type="number"
                          class="form-control form-control-lg"
                          placeholder="Nhập số điện thoại"
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
                      />
                    </ValidationProvider>
                  </div>
                  <div
                    class="d-flex justify-content-between align-items-center mb-4"
                  >
                    <!-- Checkbox -->
                    <div class="form-check">
                      <!-- check box true flase -->
                      <input type="checkbox" id="remember" v-model="remember" />
                      <label class="form-check-label" for="remember">
                        Ghi nhớ
                      </label>
                    </div>
                    <a :href="`/quen-mat-khau?redirectUrl=${redirectUrl}`"
                      >Quên mật khẩu?</a
                    >
                  </div>
                  <div class="text-center">
                    <button
                      type="submit"
                      class="btn btn-primary text-center w-100"
                    >
                      Đăng nhập
                    </button>
                  </div>

                  <div class="divider d-flex align-items-center my-4">
                    <p class="text-center fw-bold mx-3 mb-0 text-muted">Hoặc</p>
                  </div>
                  <LoginSocial />
                  <!-- <div class="d-flex justify-content-center py-2">
              </div> -->
                  <!-- <div
                class="d-flex justify-content-center py-2 btn-fb"
                @click="loginFb"
              >
                <img
                  src="~/assets/img/fb.svg"
                  alt="fb image"
                  style="margin: 0 6px"
                />
                <div>Đăng nhập với facebok</div>
              </div> -->
                  <div class="d-flex gap-2 justify-content-center py-4">
                    Bạn chưa có tài khoản?
                    <a :href="`/dang-ky?redirectUrl=${redirectUrl}`"
                      >Đăng ký ngay</a
                    >
                  </div>
                </form></ValidationObserver
              >
            </section>
          </div>
        </div>
      </div>
    </div>
  </modal>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: ["product"],
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      description: "",
      pageTitle: "",
      loading: false,
    };
  },
  mounted() {
    // this.host = location.host;
  },

  methods: {
    sendTicked() {
      const hostname = window.location.origin;

      const user = {
        fullName: this.name,
        phone: this.email,
        email: this.phone,
      };
      const payload = {
        name: `Yêu cầu tư vấn ${
          this.$nuxt.$route.meta.title
            ? "sản phẩm " + this.$nuxt.$route.meta.title
            : ""
        }`,
        // goal: "ABC",
        description: this.description,
        referName: this.name,
        referEmail: this.email,
        referPhone: this.phone,
        priorityName: "MEDIUM",
        workEffortTypeId: process.env.workEffortTypeId,
        targetUrl: hostname + this.$route.path,
        extSource: hostname,
      };
      this.loading = true;

      this.$store
        .dispatch("sendTicked", payload)
        .then((response) => {
          this.loading = false;

          switch (response.data.addOpportunity.status) {
            case 0:
              break;
            case 1:
              this.$modal.hide("advice");
              this.$toast.success("Đã gửi yêu cầu tư vấn thành công", {});
              Cookies.set("opportunityId", response.data.addOpportunity.id);
              Cookies.set("authInfo", JSON.stringify(user));
              this.name = "";
              this.email = "";
              this.phone = "";
              this.description = "";
              this.$router.push("/success");
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
.modal-send {
  // z-index: 99999;
  padding: 48px;
  .product-info-modal {
    margin-bottom: 8px;
    // border: 1px #44ce6f solid;
    background: #ecfaf1;

    border-radius: 3px;
    padding: 10px;
    .product-info-title {
      font-size: medium;
      font-weight: 500;
    }
    .product-info-price {
      color: #44ce6f;
    }
  }
  .btn-send {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    &.active {
      background: #44ce6f;
      border-radius: 6px;
      color: #ffffff;
    }
    background: #ffffff;
    border: 1px solid #44ce6f;
    color: #44ce6f;

    border-radius: 6px;
    padding: 13px 0;
    width: 100%;
    margin: 12px 0;
    &:first-child {
      margin-top: 24px;
    }
  }
  .send-item {
    margin-bottom: 8px;
    .send-err {
      color: red;
    }
    .item-info {
      .form-label {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        letter-spacing: 0.5px;
        color: #0e314c;
        margin-bottom: 0;
        // margin-top: 24px;
      }
      .send-input {
        background: #ffffff;
        border: 1px solid #e3e8ef;
        border-radius: 6px;
        padding: 5px 10px;
        width: 100%;
      }
    }
  }
}
.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@-webkit-keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
</style>
