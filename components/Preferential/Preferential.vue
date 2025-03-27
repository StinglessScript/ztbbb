<template>
  <div class="container product-ex">
    <div class="product-ex-title">{{ block.title }}</div>
    <div class="product-ex-body row g-0">
      <div
        class="col-lg col-md-6 col-sm-6 product-ex-card"
        v-for="(Items, i) in block.preferentials"
        :key="i"
      >
        <div class="pcard-header">
          {{ Items.nameCard }}
        </div>
        <div class="pcard-item" v-for="(subItem, id) in Items.items" :key="id">
          <div class="pcard-item__name">{{ subItem.name }}</div>
          <div class="pcard-item__name">{{ subItem.subName }}</div>

          <div class="pcard-item__price">{{ subItem.price }}</div>
          <div class="pcard-item__priceCompare">{{ subItem.priceCompare }}</div>
          <div class="pcard-item__priceCompare"></div>
        </div>
        <div class="pcard-footer" v-if="Items.url">
          <a  class="btn-cus btn-green" :href="Items.url"
            >{{ Items.nameUrl }} </a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      productEx: {
        title: "Ưu đãi khi đặt chỗ tại Long Vân",
        items: [
          {
            name: "Mua lẻ",
            subItems: [
              {
                name: "Phần cứng",
                price: "13.000.000đ",
                priceCompare: "14.000.000đ",
              },
              {
                name: "Đặt chỗ",
                price: "8.400.000đ/6 tháng",
              },
              {
                name: " Tổng đơn hàng (Chưa tính VAT)",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán 1 lần",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán hàng tháng",
                price: "-",
              },
            ],
          },
          {
            name: "Mua và đặt chỗ 6 tháng",
            subItems: [
              {
                name: "Phần cứng",
                price: "13.000.000đ",
                priceCompare: "14.000.000đ",
              },
              {
                name: "Đặt chỗ",
                price: "8.400.000đ/6 tháng",
              },
              {
                name: " Tổng đơn hàng (Chưa tính VAT)",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán 1 lần",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán hàng tháng",
                price: "-",
              },
            ],
          },
          {
            name: "Mua và đặt chỗ 12 tháng",
            subItems: [
              {
                name: "Phần cứng",
                price: "13.000.000đ",
                priceCompare: "14.000.000đ",
              },
              {
                name: "Đặt chỗ",
                price: "8.400.000đ/6 tháng",
              },
              {
                name: " Tổng đơn hàng (Chưa tính VAT)",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán 1 lần",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán hàng tháng",
                price: "-",
              },
            ],
          },
          {
            name: "Mua và đặt chỗ 24 tháng",
            subItems: [
              {
                name: "Phần cứng",
                price: "13.000.000đ",
                priceCompare: "14.000.000đ",
              },
              {
                name: "Đặt chỗ",
                price: "8.400.000đ/6 tháng",
              },
              {
                name: " Tổng đơn hàng (Chưa tính VAT)",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán 1 lần",
                price: "13.000.000đ",
              },
              {
                name: "Thanh toán hàng tháng",
                price: "-",
              },
            ],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.btn-green {
  background: #44ce6f;
  border-radius: 6px;
  color: #fff;
}
.product-ex {
  margin-bottom: 24px;
  .product-ex-title {
    background: rgba(68, 206, 111, 0.2);
    border-radius: 6px;
    font-weight: 700;
    font-size: 22px;
    line-height: 150%;
    letter-spacing: -0.011em;
    color: #0e314c;
    padding: 10px 24px;
    margin: 65px 0 25px;
  }
  .product-ex-body {
    justify-content: center;
    .product-ex-card {
      //   &:first-child {
      //     margin: 0;
      //   }
      //   &:last-child {
      //     margin: 0;
      //   }
      background-color: #fff;

      display: flex;
      margin: 0 8px;
      flex-direction: column;
      align-items: center;
      padding: 10px 0px 14px;
      gap: 10px;
      background: #ffffff;
      border: 1px solid #e3e8ef;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
      border-radius: 6px;
      margin-bottom: 12px;

      .pcard-header {
        justify-content: center;
        align-items: center;
        width: 80%;
        font-weight: 700;
        font-size: 16px;
        line-height: 24px;
        display: flex;
        align-items: center;
        text-align: center;
        padding: 20px 0;
        letter-spacing: 0.5px;
        color: #364152;
        border-bottom: 1px solid #e3e8ef;
      }
      .pcard-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 20px 12px;
        width: 80%;
        border-bottom: 1px solid #e3e8ef;
        &:last-child {
          border-bottom: none;
        }

        .pcard-item__name {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          /* identical to box height, or 150% */

          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: 0.5px;

          /* 364152 100%- Body */

          color: #364152;
        }
        .pcard-item__price {
          font-weight: 700;
          font-size: 16px;
          line-height: 24px;
          /* identical to box height, or 150% */

          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: 0.5px;

          /* 44CE6F 100% */

          color: #44ce6f;
        }
        .pcard-item__priceCompare {
          font-weight: 400;
          font-size: 16px;
          line-height: 24px;
          display: flex;
          align-items: center;
          text-align: center;
          letter-spacing: 0.5px;
          text-decoration-line: line-through;
          color: #697586;
        }
      }
    }
  }
}
</style>
