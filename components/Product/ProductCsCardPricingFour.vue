<template>
  <div class="pricing-table">
    <div>
      <div class="pricing-header">
        <h3>{{ item.title }}</h3>
      </div>

      <div style="min-height: 70px">
        <div
          class="pricing-price justify-content-center align-items-center flex-column gap-1"
          v-if="item?.discountPrice?.length > 0"
        >
          <!-- v-for="item2 in item?.discountPrice" -->
          <span class="active justify-content-center">
            <span class="d-flex flex-wrap">
              <span>{{
                formatDetailPrice(formatRenderPrice(item)?.price)
              }}</span>
              <span>
                <!-- /{{ formatRenderPrice(item)?.quantity > 1 ? `${formatRenderPrice(item)?.quantity} ` : '' }} -->
                /{{ item.unitDTO.name }}
              </span>
            </span>
          </span>
          <del
            style="font-size: 14px; font-weight: 500"
            class="justify-content-center"
            v-if="
              formatRenderPrice(item)?.oldPrice &&
              !formatRenderPrice(item)?.hint &&
              !formatRenderPrice(item)?.hint_old
            "
          >
            <span class="d-flex flex-wrap">
              <span>{{
                formatDetailPrice(formatRenderPrice(item)?.oldPrice)
              }}</span>
              <span
                >/{{ formatRenderPrice(item)?.quantity > 1 ? `${formatRenderPrice(item)?.quantity} ` : '' }}{{ item.unitDTO.name }}</span
              >
            </span>
            <!-- {{ formatDetailPrice(formatRenderPrice(item2)?.oldPrice) }} -->
          </del>
          <smail
            style="font-size: 14px; margin-top: 5px; font-weight: 500; color: #e74c3c"
            v-if="formatRenderPrice(item)?.hint"
            >{{ formatRenderPrice(item)?.hint }}</smail
          >
          <smail
            style="font-size: 14px; margin-top: 5px; font-weight: 500; color: #e74c3c"
            v-if="formatRenderPrice(item)?.hint_old"
            >{{ formatRenderPrice(item)?.hint_old }}</smail
          >
          <!-- <span>trả theo năm</span> -->
        </div>
        <!-- <div class="pricing-price rmb" v-if="item.price">
          <span v-if="item.annualSubsPrice"> Hoặc </span>
          <span class="active-mini" :class="{ active: !item.annualSubsPrice }"
            >{{ convertPrice(item.price) }}đ/{{ item.unit }} {{ " " }}</span
          >
          <span v-if="item.annualSubsPrice"> trả theo tháng</span>
        </div> -->
      </div>
    </div>

    <div class="pricing-features active" v-html="item.shortDescription"></div>

    <div class="pricing-footer">
      <!-- <a
        v-if="`${item.btnUrl}`.includes('http')"
        :href="item.btnUrl"
        target="_blank"
        class="btn btn-primary"
        >{{ item.btnText }}</a
      > -->
      <a 
        v-if="item.handle"
        :href="`/san-pham/${item.handle}`"
        class="btn btn-primary"
        >Đăng ký ngay
      </a>
      <div v-if="item.salePolicy">
        <!-- <a
          v-if="`${item.btnUrl2}`.includes('http')"
          :href="item.btnUrl2"
          target="_blank"
          class="btn-trial"
        >
          <img src="~/assets/img/infomation.png" />
          {{ item.btnText2 }}</a
        > -->
        <a class="btn-trial">
          <img src="~/assets/img/infomation.svg" />
          {{ item.salePolicy }}
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
    formatRenderPrice(item) {
      //console.log("🚀 ~ formatRenderPrice ~ item:", item)
      //  console.log("🚀 ~ formatRenderPrice ~ item:", item);
      if (item?.type == "RENT") {
        // lấy giá mặc định
        let dataDefault = item?.discountPrice?.find(
          (c) => c?.defaultPrice == true
        );
        //console.log("🚀 ~ formatRenderPrice ~ dataDefault:", dataDefault?.type, dataDefault?.type)

        // nếu giá mặc định có type là PROMOTION thì sẽ tìm giá gốc type RENT theo số lượng
        // nếu giá mặc định có type là RENT thì sẽ tìm giá KM type PROMOTION theo số lượng

        //check type PROMOTION
        const checkPromotion =
          dataDefault?.type == "RENT"
            ? item?.discountPrice?.find(
                (c) => c.time == dataDefault?.time && c.type == "PROMOTION"
              )
            : null;

        const checkRent =
          dataDefault?.type == "PROMOTION"
            ? item?.discountPrice?.find(
                (c) => c.time == dataDefault?.time && c.type == "RENT"
              )
            : null;

        if (dataDefault?.type == "PROMOTION" || checkPromotion) {
          const data = {
            type: "PROMOTION",
            oldPrice:
              dataDefault?.oldPrice[0]?.price,
            displayPrice:
              dataDefault?.priceDiscount,
            price: dataDefault?.price,
            quantity: dataDefault?.time,
            hint: dataDefault?.hint || null,
            hint_old:
              dataDefault?.oldPrice[0]?.hint ||
              null,
          };
          // if (data?.type == "PROMOTION") {
          //   console.log("🚀 ~ formatRenderPrice ~ data:", data);
          // }

          this.is_discount = true;
          return data;
        } else {
          const dataQuantity = item?.discountPrice?.filter((c) => c.time);

          //const data = dataQuantity?.find((c) => c?.defaultPrice);

          return dataDefault
            ? {
                displayPrice:
                  dataDefault?.priceDiscount,
                price: dataDefault?.price,
                quantity: dataDefault?.time,
                type: dataDefault?.type,
                hint: dataDefault?.hint,
              }
            : dataQuantity?.length > 0
            ? {
                displayPrice: dataQuantity[0]?.priceDiscount,
                price: dataDefault?.price,
                quantity: dataQuantity[0]?.time || 1,
                type: dataQuantity[0]?.type,
                hint: dataQuantity[0]?.hint,
              }
            : {
                displayPrice: 0,
                price: 0,
                quantity: item?.time || 1,
                type: item?.type,
                hint: null,
              };
        }
      } else {
        const dataDefault = item?.discountPrice?.find(
          (c) => c?.defaultPrice == true
        );
        return {
          displayPrice:
            dataDefault?.priceDiscount,
          price: dataDefault?.price,
          type: "SELL",
          hint: dataDefault?.hint,
        };
      }
    },

    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },

    formatDetailPrice(data) {
      //console.log("🚀 ~ formatDetailPrice ~ item:", data)

      if (data > 0) {
        return `${this.convertPrice(data)}đ`;
      } else if (data == 0) {
        return ` Miễn phí `;
      } else {
        return ` Liên hệ `;
      }

      // switch (item.price) {
      //   case item.price > 0:
      //     return `${this.convertPrice(item.price)}đ/${item.unitDTO.name}`;
      //   case item.price == 0:
      //     return ` Miễn phí `;
      //   default:
      //     return ` Liên hệ `;
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-trial {
  display: flex;
  flex-direction: row;
  justify-content: center;
  //align-items: center;
  padding: 12px 24px;
  gap: 4px;
  background: #ecfaf1;
  img {
    margin: 0px;
    width: 16px;
    height: 16px;
    margin-top: 5px;
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
    min-width: 200px;
    max-width: 250px;
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
