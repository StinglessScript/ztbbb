<template>
  <div style="background: #fcfcfd">
    <div class="container p-80">
      <SendTickedByBackup365 />
    </div>
  </div>
</template>

<script>
import SendTickedByNormal from "@/components/Ticked/SendTickedByNormal.vue";
import SendTickedByBarebone from "@/components/Ticked/SendTickedByBarebone.vue";
import SendTickedByPlace from "@/components/Ticked/SendTickedByPlace.vue";
import SendTickedByBackup365 from "@/components/Ticked/SendTickedByBackup365.vue";
export default {
  components: {
    SendTickedByBarebone,
    SendTickedByNormal,
    SendTickedByPlace,
    SendTickedByBackup365,
  },
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
};
</script>

<style lang="scss" scoped>
.p-80 {
  padding: 80px;
}
@media (max-width: 768px) {
  .p-80 {
    padding: 0px;
  }
}
</style>
