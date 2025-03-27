<template>
  <div class="account-body">
    <div class="account-title">Tài khoản của tôi</div>
    <div class="account-tabs">
      <b-card no-body>
        <b-tabs content-class="mt-3" active-nav-item-class="current">
          <b-tab v-for="(item, index) in tabs" :key="index" :title="item.name">
            <div class="tab_item"><component :is="item.component"/></div>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "Hồ sơ cá nhân",
          component: "test",
        },
        {
          name: "Thông tin xuất hóa đơn",
          component: "test",
        },
        {
          name: "Quản lý người dùng",
          component: "test",
        },
        {
          name: "Bảo mật",
          component: "test",
        },
        {
          name: "Đổi mật khẩu",
          component: "test",
        },
      ],
    };
  },
};
</script>

<style lang="scss">

</style>
