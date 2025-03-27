<template>
  <div class="pricing-table">
    <div>
      <div class="pricing-header">
        <h3>{{ item.name }}</h3>
      </div>

      <div style="min-height: 70px">
        <div class="pricing-price" v-if="item.annualSubsPrice">
          <span class="active"
            >{{ convertPrice(item.annualSubsPrice) }}đ/{{ item.unit }}</span
          >
          <span>trả theo năm</span>
        </div>
        <div class="pricing-price rmb" v-if="item.price">
          <span v-if="item.annualSubsPrice"> Hoặc </span>
          <span class="active-mini" :class="{ active: !item.annualSubsPrice }"
            >{{ convertPrice(item.price) }}đ/{{ item.unit }} {{ " " }}</span
          >
          <span v-if="item.annualSubsPrice"> trả theo tháng</span>
        </div>
      </div>
    </div>

    <div class="pricing-features active" v-html="item.detail"></div>

    <div class="pricing-footer">
      <a
        v-if="`${item.btnUrl}`.includes('http')"
        :href="item.btnUrl"
        target="_blank"
        class="btn btn-primary"
        >{{ item.btnText }}</a
      >
      <a  v-else :href="item.btnUrl" class="btn btn-primary"
        >{{ item.btnText }}
      </a>
      <div v-if="item.btnUrl2">
        <a
          v-if="`${item.btnUrl2}`.includes('http')"
          :href="item.btnUrl2"
          target="_blank"
          class="btn-trial"
        >
          <img src="~/assets/img/infomation.png" />
          {{ item.btnText2 }}</a
        >
        <a  v-else :href="item.btnUrl2" class="btn-trial">
          <img src="~/assets/img/infomation.svg" />
          {{ item.btnText2 }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      details: "",
    };
  },
  // async fetch() {
  //   const data = await this.$store.dispatch("getProductOptions", this.item.id);
  //   this.details = data.data;
  // },
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
.btn-trial {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 4px;
  background: #ecfaf1;
  img {
    margin: 0px;
    width: 16px;
  }
}
.btn {
  text-transform: capitalize;
}
.p-12 {
  padding: 12px 0;
}
.pricing-table {
  margin-bottom: 60px;
}
.pricing-price {
  .active-mini {
    &.active {
      font-size: 20px;
    }
    font-weight: 500;
    font-size: 12px;
    padding: 0 3px;
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
  gap: 12px;
  width: 90%;
  margin: auto;
}
</style>
