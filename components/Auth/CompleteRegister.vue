<template>
  <div class="faq-area ptb-80">
    <div class="container">
      <div class="faq-accordion">
        <div class="row d-flex align-items-center justify-content-center h-100">
          <div class="col-md-6 col-lg-6 col-xl-6">
            <img
              src="~/assets/img/linked.svg"
              class="img-fluid"
              alt="Phone image"
            />
          </div>
          <section class="col-md-6 col-lg-6 col-xl-6">
            <h3 class="text-center">Bạn đã tạo tài khoản thành công!</h3>
            <!-- <h6>Bây giờ bạn có thể</h6>
            <ul>
              <li><a href="#">Đăng nhập</a> bằng Zalo</li>
              <li>
                <a href="#">Đăng nhập</a> bằng số điện thoại và mật khẩu đã cập
                nhật
              </li>
            </ul> -->
            <div
              class="btn-action"
              style="display: flex; justify-content: center; gap: 1rem;"
            >
              <button class="btn btn-view">
                <a href="/cua-hang">Xem sản phẩm</a>
              </button>
              <!-- <button
                class="btn btn-primary"
                @click="handleContinue"
                v-if="
                  this.redirectUrl !== '/' &&
                  this.redirectUrl !== '' &&
                  this.redirectUrl !== undefined                                                                          
                "
              >
                <a style="color: #fff">Tiếp tục mua hàng</a>
              </button> -->
              <!-- <button
                class="btn btn-primary"
                v-if="
                  this.redirectUrl === '/' ||
                  (this.redirectUrl === '' && this.redirectUrl == undefined)
                "
              >
                <a href="/" style="color: #fff">Trang chủ</a>
              </button> -->
              <button class="btn btn-primary">
                <a :href="`${userInside}/service`" style="color: #fff"
                  >Quản lý dịch vụ</a
                >
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fpass from "~/assets/img/ForgotPassword.svg";
import Cookies from "js-cookie";
export default {
  mounted() {
    this.redirectUrl = new URLSearchParams(window.location.search).get(
      "redirectUrl"
    );
  },

  data() {
    return {
      redirectUrl: "",
      userInside: process.env.USER_INSIDE_URL,
    };
  },
  components: {
    Fpass,
  },
  methods: {
    async handleContinue() {
      this.$router.push({
        path: this.redirectUrl,
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

.btn-view {
  color: #44ce6f;
  border: 1px solid #44ce6f;
}
ul {
  list-style: none;
}
ul li {
  position: relative;
  list-style: none;
}
ul li::before {
  content: "";
  display: block;
  width: 9px;
  height: 14px;
  top: 4px;
  left: -22px;
  border-radius: 0;
  opacity: 1;
  border-top-color: transparent;
  border-left-color: transparent;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  border-right: 3px solid #44ce6f;
  border-bottom: 3px solid #44ce6f;
  position: absolute;
  -webkit-transition: all 0.12s, border-color 0.08s;
  transition: all 0.12s, border-color 0.08s;
}
</style>
