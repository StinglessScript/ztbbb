<template>
  <div style="background: #fcfcfd">
    <div class="container" style="padding: 80px 16px">
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12 mb-4">
          <div class="info">
            <div class="info-title">
              {{
                $route.query.pttt == "chuyen-khoan"
                  ? "Tạo đơn hàng thành công!"
                  : "Thanh toán đơn hàng thành công!"
              }}
            </div>
            <div class="info-des">
              Cảm ơn bạn đã sử dụng dịch vụ của Long Vân System.
            </div>
            <div class="info-des">
              Mã đơn hàng của bạn là:<span class="textPrimary">
                {{ opportunityId }}
              </span>
            </div>
            <div class="info-des">
              Nhấn vào
              <a
                :href="`${userInside}/service`"
                style="color: #44ce6f; text-decoration: underline"
                >đây</a
              >
              để vào trang quản lý dịch vụ.
            </div>
            <div class="info-list">
              <div class="info-item">
                <feather type="check"></feather
                ><strong>Bộ phận kinh doanh</strong> sẽ liên hệ bạn qua SĐT:
                <span class="textPrimary">{{ user.userName }} </span>.
              </div>
              <div class="info-item">
                <feather type="check"></feather>Thông tin đơn hàng sẽ được gửi
                về email <span class="textPrimary">{{ user.email }} </span>
              </div>

              <!-- <div class="info-item">Hoặc ba sẽ được gửi
                về Email:  <span class="textPrimary">{{ getUser.email }} </span>.
              </div> -->
              <div class="info-item">
                <feather type="check"></feather> Liên hệ trực tiếp với chúng tôi
                nếu có vấn đề phát sinh.
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-start gap-4 pt-4">
            <div class="btn btn-primary-light" @click="$router.push('/')">
              Trở lại trang chủ
            </div>
            <div @click="$router.push('/cua-hang')" class="btn btn-primary">
              Xem sản phẩm khác
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 mb-4">
          <div class="info-right">
            <img
              src="~/assets/img/Admin-bro.svg"
              class="banner"
              height="260px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      user: {},
      tokenData: null,
      userInside: process.env.USER_INSIDE_URL,
    };
  },
  mounted() {
    this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, { domain: '.longvan.net', path:"/" });
    this.getUser();
  },
  computed: {
    opportunityId() {
      const id = this.$route.query.id;

      return id;
    },
  },
  methods: {
    async getUser() {
      try {
        const token = Cookies.get(process.env.ACCESSTOKEN_NAME, { domain: '.longvan.net', path:"/" });
        const res = await this.$store.dispatch("getUserByToken", {
          accessToken: token,
          orgId: "LONGVAN",
        });
        this.user = res.data.getUserDetail;
      } catch (error) {
        //Cookies.remove("token");
      }
    },
  },

  watch: {
    tokenData: function () {
      this.tokenData = Cookies.get(process.env.ACCESSTOKEN_NAME, { domain: '.longvan.net', path:"/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.textPrimary {
  color: #44ce6f;
  text-decoration: dashed;
}
</style>
