<template>
    <div>
      <PageTitle class="is-pc" pageTitle="Đặt hàng thành công" />
      <Cart />
    </div>
  </template>
  
  <script>
  import PageTitle from "../components/Common/PageTitle";
  import Cart from "../components/Cart/CartTwo";
  
  export default {
    middleware: ["add", "middlewareHeader"],
  
    components: {
      PageTitle,
      Cart,
    },
  
    data() {
      return {};
    },
  };
  </script>
  