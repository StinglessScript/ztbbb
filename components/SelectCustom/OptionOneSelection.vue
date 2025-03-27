<template>
  <div>
    <div class="group-title">{{ item.name }}</div>

    <div
      class="item-option"
      v-for="(option, index) in item.groupItemDTOS"
      :key="index"
      @click="selectOption(option)"
    >
      <div class="radio-custom" :class="{ active: isSelected(option) }"></div>
      <QuantityInput
        :initialValue="option.start_quantity"
        :min="option.min_quantity"
        :max="option.max_quantity"
        @quantity-updated="updateQuantity(option, $event)"
      />
      <div class="name-price" :class="{ active: isSelected(option) }">
        <div class="name">
          {{ option.title }}
        </div>
        <div class="price">
          {{ handleFormatPrice(option.price) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrice } from "~/utils/currency";
import QuantityInput from "@/components/Common/QuantityInput.vue";

export default {
  data() {
    return {};
  },
  props: ["value", "item"],
  components: { QuantityInput },

  computed: {
    selectedOption: {
      get() {
        return this.value; // Đọc dữ liệu từ prop value
      },
      set(newValue) {
        this.$emit("input", newValue); // Gửi dữ liệu lên component cha thông qua sự kiện input
      },
    },
  },
  methods: {
    updateQuantity(option, newQuantity) {
      option.quantity = newQuantity; // Cập nhật số lượng cho tùy chọn
    },
    handleFormatPrice(price) {
      return formatPrice(price);
    },
    selectOption(option) {
      if (this.selectedOption == option) {
        this.selectedOption = null;
      } else {
        this.selectedOption = option;
      }
    },
    isSelected(option) {
      return this.selectedOption === option;
    },
  },
  created() {
    const defaultOption = this.item.groupItemDTOS.find(
      (option) => option.primary
    );
    if (defaultOption) {
      this.selectedOption = defaultOption;
    }
  },
};
</script>

<style lang="scss" scoped>
.group-title {
  color: var(--364152100-body, #364152);
  font-size: 24px;
  font-weight: 500;
  line-height: 34px;
  padding-top: 24px;
}
.item-option {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 12px 0;
  .name-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .name {
      color: var(--364152100-body, #364152);
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 22px; /* 137.5% */
      line-height: 22px;
    }
    .price {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 22px;
    }

    &.active {
      .price {
        color: var(--44-ce-6-f-100, #44ce6f);
      }
    }
  }

  .radio-custom {
    width: 20px;
    height: 20px;
    border: 1.5px solid #364152;
    border-radius: 100%;
    &.active {
      background: #16b364;
      border: 1px solid #16b364;
      background-clip: content-box;
      padding: 2px;
    }
    .selected-option {
      background-color: #e0e0e0;
      cursor: pointer;
    }
  }
}

.validation-message {
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 6px;
  background: rgba(237, 0, 6, 0.1);
  color: var(--ed-0006100, #ed0006);
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
}
/* Your other component styles here */
</style>
