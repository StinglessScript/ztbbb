<template>
  <div style="background: #fcfcfd">
    <div class="container" style="padding: 80px 16px">
      <div class="row">
        <div class="col-lg-7 col-md-12 col-sm-12 mb-4">
          <div class="info">
            <div class="info-title">
              DỊCH VỤ CỦA BẠN ĐÃ ĐƯỢC ĐĂNG KÝ THÀNH CÔNG
            </div>
            <div class="info-des">
              Cảm ơn bạn đã đăng ký sử dụng dịch vụ Backup365
            </div>
            <div class="info-des">
              Mã yêu cầu của bạn là:<span class="textPrimary">
                {{ opportunityId }}
              </span>
            </div>
            <div class="info-list">
              <div class="info-item">
                <feather type="check"></feather
                ><strong>Bộ phận kinh doanh</strong> sẽ liên hệ bạn qua SĐT:
                <span class="textPrimary">{{ getUser.phone }} </span>.
              </div>
              <div class="info-item">
                <feather type="check"></feather>Thông tin đơn hàng sẽ được gửi
                về email <span class="textPrimary">{{ getUser.email }} </span>
              </div>
              <!-- <div class="info-item">
                Hoặc ba sẽ được gửi về Email:
                .
                -->
              <!-- </div> -->
              <div class="info-item">
                <feather type="check"></feather
                ><span class="textPrimary"
                  ><a href="tel:18006070">Liên hệ</a>
                </span>
                trực tiếp với chúng tôi nếu có vấn đề phát sinh.
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
  head() {
    return {
      title: "Đăng ký dịch vụ backup microsoft 365",
      link: [
        {
          hid: "canonical",
          rel: "canonical",
          href: this.$store.state.host + this.$route.path,
        },
      ],
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Dịch vụ Backup Microsoft 365 bảo vệ các dữ liệu quan trọng của doanh nghiệp trước những sự cố bất ngờ như mất dữ liệu, tấn công virus, lỗi hệ thống, hoặc sự cố kỹ thuật. Đảm bảo an toàn dữ liệu với các tính năng mạnh mẽ như sao lưu dữ liệu hàng ngày, khôi phục dữ liệu một cách dễ dàng và nhanh chóng, hỗ trợ các tính năng quản lý dữ liệu thông minh",
        },
        {
          hid: "keywords",
          name: "keywords",
          content:
            "backup office 365, backup microsoft office 365, bestore Office 365 data, backup Office 365 file, Sao lưu Microsoft Office 365, Backup dữ liệu Microsoft Office, dữ liệu microsoft 365, backup microsoft 365",
        },
        {
          hid: "og:title",
          name: "og:title",
          content: "Đăng ký dịch vụ backup microsoft 365",
        },
        {
          hid: "og:url",
          name: "og:url",
          content: this.$store.state.host + this.$route.path,
        },
        {
          hid: "og:description",
          name: "og:description",
          content:
            "Dịch vụ Backup Microsoft 365 bảo vệ các dữ liệu quan trọng của doanh nghiệp trước những sự cố bất ngờ như mất dữ liệu, tấn công virus, lỗi hệ thống, hoặc sự cố kỹ thuật. Đảm bảo an toàn dữ liệu với các tính năng mạnh mẽ như sao lưu dữ liệu hàng ngày, khôi phục dữ liệu một cách dễ dàng và nhanh chóng, hỗ trợ các tính năng quản lý dữ liệu thông minh",
        },
      ],
    };
  },
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
};
</script>

<style lang="scss" scoped>
.textPrimary {
  color: #44ce6f;
  text-decoration: dashed;
}
</style>
