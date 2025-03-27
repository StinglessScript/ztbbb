<template>
  <div style="background: #fcfcfd">
    <div class="container">
      <!-- style="padding: 80px 16px" -->
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12 mb-4">
          <div class="info">
            <div class="info-title" style="text-transform: uppercase">
              Đơn hàng của bạn đã được đặt thành công
            </div>
            <div class="info-des">
              Cảm ơn bạn đã sử dụng dịch vụ của Long Vân System.
            </div>
            <!-- <div class="info-des">
              Mã đơn hàng của bạn là:<span class="textPrimary">
                {{ opportunityId }}
              </span>
            </div> -->
            <div class="info-list">
              <div class="info-item" style="display: block !important">
                <feather type="check"></feather><strong>Mã đơn hàng</strong> của
                bạn là:
                <span class="textPrimary pl-2"> {{ opportunityId }}</span
                >.
              </div>
              <div class="info-item" style="display: block !important">
                <feather type="check"></feather
                ><strong>Bộ phận kinh doanh</strong> sẽ liên hệ bạn qua SĐT:
                <span class="textPrimary pl-2">
                  {{ user.phone ? user.phone : getUserNoLogin.phone }}</span
                >.
              </div>
              <!-- <div class="info-item">Hoặc ba sẽ được gửi
                về Email:  <span class="textPrimary">{{ getUser.email }} </span>.
              </div> -->
              <div class="info-item" style="display: block !important">
                <feather type="check"></feather> Bạn có thể thanh toán để đơn
                hàng xử lý nhanh hơn
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between gap-4 pt-4 d-flex-columb">
            <div
              class="btn btn-primary-light"
              style="min-width: 126px"
              @click="$router.push('/')"
            >
              Trở lại trang chủ
            </div>
            <div
              @click="$router.push(`/thanh-toan/${idOrder}?userId=${idUser}`)"
              class="btn btn-primary"
              style="min-width: 126px"
            >
              Thanh toán
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-12 col-sm-12 mb-4 d-none d-lg-block">
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
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      user: {},
      idOrder: this.$route.query.orderId,
      idUser: this.$route.query.userId,
    };
  },
  computed: {
    opportunityId() {
      const id = this.$route.query.orderId;
      return id;
    },
    getUserNoLogin() {
      if (Cookies.get("authInfo")) {
        const user = JSON.parse(Cookies.get("authInfo"));
        return user;
      } else return {};
    },
  },
  mounted() {
    this.getUser();
  },
  methods: {
    async getUser() {
      try {
        const token = Cookies.get(process.env.ACCESSTOKEN_NAME, {
          domain: ".longvan.net",
          path: "/",
        });
        const res = await this.$store.dispatch("getUserByToken", {
          token: token,
          orgId: proccess,
        });
        console.log("🚀 ~ file: ProductCheckout.vue:196 ~ getUser ~ res:", res);
        this.user = res.data.getUserDetail;
      } catch (error) {
        //Cookies.remove("token");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .d-flex-columb {
    display: flex;
    flex-flow: column;
  }
}
.textPrimary {
  color: #44ce6f;
  text-decoration: dashed;
}
</style>
