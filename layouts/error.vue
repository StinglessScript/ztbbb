<template>
  <div class="error-area">
    <div class="d-table">
      <div class="d-table-cell">
        <div class="container">
          <div class="error-content">
            <div class="notfound-404">
              <h1>Oops!</h1>
            </div>
            <h3>404 - Không tìm thấy trang</h3>
            <p>Trang bạn tìm có thể đã bị xóa hoặc không tồn tại</p>
            <a  href="/" class="btn btn-primary">Về trang chủ</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "error",
  middleware: ["checkAuth", "middlewareHeader"],
  head() {
    //console.log("🚀 ~ head ~ this.product:", this.product);

    return {
      meta: [
        {
          hid: "robots",
          name: "robots",
          content: "noindex",
        },
        {
          hid: "description",
          name: "description",
          content: "",
        },
        {
          hid: "keywords",
          name: "keywords",
          content: "",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
