<template>
  <div class="container product-custom">
    <div class="content">
      <div class="main">
        <div class="card-product-custom">
          <div
            class="product-custom-item"
            v-for="(component, index) in productOption"
            :key="component.id"
          >
            <div>
              <div>
                <component
                  v-model="selectedOptions[index]"
                  :is="getComponentName(component.condition)"
                  :item="component"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="side">
        <div class="card-product-custom">
          <div class="new-product-title">{{ product.title }} [Tuỳ biến]</div>
          <div
            class="py-1"
            v-for="(component, index) in productOption"
            :key="index"
          >
            <span class="title-option">
              {{ component.name }}
            </span>

            <span v-if="Array.isArray(selectedOptions[index])">
              <span
                v-for="(subItem, subIndex) in selectedOptions[index]"
                :key="subIndex"
              >
                <!-- <p>{{ subItem?.title }}</p> -->
                {{ subItem.quantity ? subItem.quantity : subItem.min_quantity }}
                x {{ subItem.title }}<span>, </span>
              </span>
            </span>
            <span v-else>
              {{
                selectedOptions[index]?.quantity
                  ? selectedOptions[index]?.quantity
                  : selectedOptions[index]?.min_quantity
              }}
              x
              {{ selectedOptions[index]?.title }}
            </span>

            <!-- <div v-for="item in selectedOptions[index]" :key="item.id">
              <div v-if="Array.isArray(item)">
                <div v-for="(subItem, subIndex) in item" :key="subIndex">
                  <p>{{ subItem?.title }}</p>
                </div>
              </div>
            </div> -->
          </div>
          <div class="total-price">
            TỔNG: {{ handleFormatPrice(totalPrice) }}
          </div>
          <div class="buy-now" @click="createProductId">Mua ngay</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MustOneSelection from "@/components/SelectCustom/MustOneSelection.vue";
import MustMultipleSelection from "@/components/SelectCustom/MustMultipleSelection.vue";
import OptionOneSelection from "@/components/SelectCustom/OptionOneSelection.vue";
import OptionMoreSelection from "@/components/SelectCustom/OptionMoreSelection.vue";
import { formatPrice } from "~/utils/currency";

export default {
  name: "ProductDetailBareMetal",
  props: ["productOption", "product"],
  data() {
    return {
      selectedOptions: [], // Initialize with an empty array
      totalPrice: "",
      selectedOptionsView: [],
      productId: "",
    };
  },
  mounted() {
    console.log("productOption", this.productOption);
  },
  watch: {
    selectedOptions: {
      deep: true, // Watch for nested changes
      handler(newVal, oldVal) {
        this.getPriceProductOptions();
      },
    },
  },
  components: {
    MustOneSelection,
    MustMultipleSelection,
    OptionOneSelection,
    OptionMoreSelection,
  },
  methods: {
    async getProductById(id) {
      const rs = await this.$store.dispatch("getProductById", id);
      this.addToCart(rs.data.handle, "mua");
    },
    async addToCart(slug, type) {
      const res = await this.$store.dispatch("createConnector");

      this.$router.push(
        "/dang-ky-tu-van?from=" +
          slug +
          "&productType=SendTickedByBarebone&type=" +
          type +
          "&connectorId=" +
          res.data.createConnector._id +
          "&build_type=ORDER"
      );
    },
    async createProductId() {
      this.selectedOptionsView = this.selectedOptions.flat(Infinity);
      const selectedItems = this.selectedOptionsView.map((item) => ({
        quantity: item.quantity ? item.quantity : item.start_quantity,
        id: item.group_item_id,
        productId: item.id,
      }));
      const rs = await this.$store.dispatch("createProductId", {
        id: this.product.id,
        productOptionGroupItems: selectedItems,
      });
      this.productId = rs.data.createProductBare.id;
      this.getProductById(this.productId);
    },
    handleFormatPrice(price) {
      return formatPrice(price);
    },
    async getPriceProductOptions() {
      this.selectedOptionsView = this.selectedOptions.flat(Infinity);
      const selectedItems = this.selectedOptionsView.map((item) => ({
        quantity: item.quantity ? item.quantity : item.start_quantity,
        id: item.group_item_id,
        productId: item.id,
        price: item.price,
      }));
      const res = await this.$store.dispatch("getPiceProductOptions", {
        id: this.product.id,
        productOptionGroupItemDTOS: selectedItems,
      });
      this.totalPrice = res.data.getPriceForProductOption;
    },
    getComponentName(condition) {
      if (condition === "MUST_ONE") {
        return "MustOneSelection";
      } else if (condition === "MUST_MORE") {
        return "MustMultipleSelection";
      } else if (condition === "OPTION_ONE") {
        return "OptionOneSelection";
      } else {
        return "OptionMoreSelection"; // Default component or handle other cases
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.title-option {
  color: #44ce6f;
  font-family: Roboto;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 22px;
  argin-right: 6px;
}
.buy-now {
  border-radius: 6px;
  background: var(--44-ce-6-f-100, #44ce6f);
  display: flex;
  padding: 12px 24px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  cursor: pointer;
  color: #fff;
}
.total-price {
  background: var(--eff-4-ff-100, #ecfaf1);
  color: var(--16-b-364100, #16b364);
  margin: 30px 0;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px; /* 133.333% */
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
}
.container {
  padding: 20%;
}

.header,
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  background: #eee;
}

.content {
  display: flex;
  padding: 20px 0;
}

.main {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  .card-product-custom {
    width: 100%;
    border-radius: 6px;
    border: 1px solid var(--cdd-5-df-100-line-button, #cdd5df);
    background: var(--ffffff, #fff);
    padding: 24px;
    .product-custom-item {
      padding-bottom: 24px;
      border-bottom: 1px solid var(--cdd-5-df-100-line-button, #cdd5df);
      .product-custom-title {
        color: var(--364152100-body, #364152);
        font-size: 22px;
        font-style: normal;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }
}
.side {
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  width: 440px;
  height: max-content;
  .card-product-custom {
    width: 100%;
    border-radius: 6px;
    border: 1px solid var(--cdd-5-df-100-line-button, #cdd5df);
    padding: 24px;
    height: 100%;
    .new-product-title {
      color: #000;
      font-size: 20px;
      font-style: normal;
      font-weight: 700;
      line-height: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #cdd5df;
    }
  }
}
.sticky-column {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 100vh; /* Make the sticky column fill the viewport height */
  overflow: auto; /* Add scrolling when content exceeds viewport */
}
.product-custom {
  position: relative;
  padding: 80px 0;
  background: #fff;
}

@media (max-width: 768px) {
  .content {
    display: block;
    width: 100%;
  }
  .side {
    width: 100%;
  }
}
</style>
