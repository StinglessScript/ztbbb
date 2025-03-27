<template>
  <div style="background: #fcfcfd">
    <div class="container" style="padding: 80px 16px">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 mb-4 d-flex justify-content-center align-items-center flex-column">
          <div class="info d-flex gap-2 justify-content-between col-lg-11 flex-column-mobile">
            <div>
              <div class="info-title">
                Chúng tôi đã nhận được yêu cầu tư vấn của bạn
              </div>
              <!-- <div class="info-des">
              Yêu cầu tư vấn của bạn đã được tạo thành công
            </div> -->
              <div class="info-des">
                Mã yêu cầu của bạn là:<span class="textPrimary">
                  {{ opportunityId }}.
                </span>
              </div>

              <div class="info-list">
                <div class="info-item d-flex">
                  <feather type="check"></feather>
                  <div><strong>Bộ phận kinh doanh </strong> sẽ liên hệ
                  bạn qua SĐT:
                  <span class="textPrimary ml-2">{{ getUser.phone }} </span>.</div>
                </div>
                <!-- <div class="info-item">Hoặc ba sẽ được gửi
                về Email:  <span class="textPrimary">{{ getUser.email }} </span>.
              </div> -->
                <div class="info-item d-flex">
                  <feather type="check"></feather><div>Liên hệ trực tiếp với chúng
                  tôi nếu có vấn đề phát sinh.</div>
                </div>
                <div class="info-item d-flex">
                  <feather type="check"></feather><div>Bạn có thể liên hệ thông qua
                  tổng đài miễn phí <a class="textPrimary" href="tel:1800.6070">1800.6070</a> hoặc quét QR Zalo để được hỗ trợ.</div>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column align-items-center">
              <img src="~/assets/imgPayment/scanZalo.jpg" height="200px" width="200px" />
              <span style="font-size: 14px; font-weight: bold; display: flex; justify-content: center; align-items: center;">Quét mã để được hỗ trợ</span>
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
        <!-- <div class="col-lg-5 col-md-12 col-sm-12 mb-4">
          <div class="info-right" style="margin-top: 20px;">
            <img
              src="~/assets/img/Admin-bro.svg"
              class="banner"
              height="500px"
            />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  middleware: ["checkAuth", "middlewareHeader"],
  computed: {
    getUser() {
      if (Cookies.get("authInfo")) {
        const user = JSON.parse(Cookies.get("authInfo"));
        return user;
      } else return {};
    },
    opportunityId() {
      const id = Cookies.get("opportunityId");
      return id;
    },
  },
  mounted(){
    this.$store.commit("setLoading", false);
    this.$store.commit("setUpdateItemProductOrder", null);
    this.$store.commit("setUpdateItemTimeRent", null);
    this.$store.commit("setIsOS", null);
  }
};
</script>

<style lang="scss" scoped>
.textPrimary {
  color: #44ce6f;
  text-decoration: dashed;
}

@media screen and (min-width: 1024px) {
  .disCssDesk {
    display: block;
  }

  .disCssMobile {
    display: none;
  }
}

@media screen and (max-width: 760px) {
  .disCssDesk {
    display: none;
  }

  .disCssMobile {
    display: block;
  }

  .flex-column-mobile{
    display: flex;
    flex-flow: column;
  }
}

</style>
