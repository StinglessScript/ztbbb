<template>
  <div class="pricing-table">
    <div class="pricing-header">
      <h3>{{ item.title }}</h3>
    </div>

    <div style="min-height: 70px">
      <div class="pricing-price" v-if="item.price">
        <span class="active"
          >{{ convertPrice(item.price) }}{{ item.currency_code }}/Tháng</span
        >
        <span> trả theo năm</span>
      </div>
      <div class="pricing-price rmb" v-if="item.price">
        <span> Hoặc</span>
        <span class="active-mini"
          >{{ convertPrice(item.price) }}{{ item.currency_code }}/Tháng</span
        >
        <span> trả theo tháng</span>
      </div>
    </div>

    <div class="pricing-features active">
      <div class="p-12" v-for="product in details" :key="product.id">
        <div class="row g-2">
          <div class="col-lg-6 text-right">
            <strong>{{ product.title }} </strong>
          </div>
          <div class="col-lg-6 text-left">
            {{ product.quantity_option }} {{ product.unit }}
          </div>
        </div>
      </div>
    </div>

    <div class="pricing-footer">
      <a  href="/" class="btn btn-primary-light"
        >Dùng thử miễn phí
      </a>

      <a  href="/" class="btn btn-primary"> Đăng ký </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
        details:""
    };
  },
  async fetch() {
    const data = await this.$store.dispatch("getProductOptions", this.item.id);
    this.details = data.data;
  },
  computed: {},
  methods: {
    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
 
  },
};
</script>

<style lang="scss" scoped>
.p-12 {
  padding: 12px 0;
}
.pricing-table {
  margin-bottom: 60px;
}
.pricing-price {
  .active-mini {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #44ce6f;
    mix-blend-mode: normal;
  }
  .active {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #44ce6f;
    mix-blend-mode: normal;
    padding: 0 4px;
  }

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 22px;
  display: flex;
  justify-content: center;

  align-items: baseline;
  text-align: center;
  color: #364152;
  mix-blend-mode: normal;
  width: max-content;
  margin: auto;
  border-bottom: 1px solid #cdd5df;
  &.rmb {
    border-bottom: none;
    padding-bottom: 12px;
  }
}
.btn {
  width: max-content;
  min-width: 80%;
  margin: auto;
}
.pricing-footer {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 90%;
  margin: auto;
}
</style>
