<template>
  <div>
    <div class="page-title-area" style="margin-top: 70px">
      <div class="d-table">
        <div class="d-table-cell">
          <div class="container">
            <h1>Kiểm tra tài khoản</h1>
          </div>
        </div>
      </div>

      <div class="shape1">
        <img src="~/assets/img/shape1.png" alt="shape" />
      </div>
      <div class="shape2 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
      <div class="shape3">
        <img src="~/assets/img/shape3.svg" />
      </div>
      <div class="shape4">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape5">
        <img src="~/assets/img/shape5.png" alt="shape" />
      </div>
      <div class="shape6 rotateme">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape7">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape8 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
    </div>
    <div style="padding-top: 1rem; padding-bottom: 1rem">
      <div class="container">
        <h3>
          Đã có tài khoản đăng nhập sử dụng số điện thoại: {{ user?.phone }}
        </h3>

        <div
          class="btn-action"
          style="padding-right: 0 !important; flex-wrap: wrap"
        >
          <button
            class="btn btn-primary"
            type="submit"
          >
            
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["user"],
};
</script>
