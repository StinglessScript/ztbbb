<template>
  <div class="order-body">
    <div class="order-title">
      <a @click="orders()"><feather type="arrow-left"></feather></a>
      Chi tiết đơn hàng
    </div>
    <div class="order-panel">
        mã đơn hàng: #{{orderDetail?.id}}
    </div>
  </div>
</template>

<script>


export default {
  data() {
    return {
      orderDetail: null,
    };
  },
  created() {
    this.getOrderDetail();
  },

  methods: {
    getOrderDetail() {
      this.$store
        .dispatch("getOrderInfo", this.$route.query.id)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.orderDetail = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    orders(id) {
      this.$router.push({
        path: "don-hang",
      });
    },
    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    async getListOrder() {
      this.showLoader = true;
      let payload = {
        keyword: this.keyword,
        status: this.statusActive,
        currentPage: 1,
        maxResult: 10,
      };
      this.$store
        .dispatch("getListOrder", payload)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.listOrder = response.data;
              break;
            default:
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.order-body {
  background-color: #fcfcfd;
  padding: 20px 25px;
  .order-title {
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;
    color: #121926;
    padding: 28px 0;
  }
  .order-panel {
    padding: 24px 0px;
    background: #ffffff;
    border: 1px solid #e3e8ef;
    border-radius: 6px;
  }
}
</style>
