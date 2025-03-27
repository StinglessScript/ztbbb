<template>
  <div>
    <div class="group-title">
      {{ item.name }}
      <span style="color: red">*</span>
    </div>

    <div
      class="item-option"
      v-for="(option, index) in item.groupItemDTOS"
      :key="index"
    >
      <div class="d-flex gap-2 align-items-center">
        <div
          class="radio-custom"
          @click="selectOption(option)"
          :class="{ active: isSelected(option) }"
        ></div>
        <QuantityInput
          :initialValue="option.start_quantity"
          :min="option.min_quantity"
          :max="option.max_quantity"
          @quantity-updated="updateQuantity(option, $event)"
        />
      </div>
      <div
        class="name-price"
        @click="selectOption(option)"
        :class="{ active: isSelected(option) }"
      >
        <div class="name">
          {{ option.title }}
        </div>
        <div class="price">
          {{ handleFormatPrice(option.price) }}
        </div>
      </div>
    </div>
    <p v-if="showValidationMessage" class="validation-message">
      Please select an option.
    </p>
  </div>
</template>

<script>
import { formatPrice } from "~/utils/currency";
import QuantityInput from "@/components/Common/QuantityInput.vue";

export default {
  data() {
    return {
      showValidationMessage: false,
      quantity: 1,
    };
  },
  props: ["value", "item"],
  // ...các phần khác của component con
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
  components: { QuantityInput },

  methods: {
    updateQuantity(option, newQuantity) {
      option.quantity = newQuantity; // Cập nhật số lượng cho tùy chọn
    },
    handleFormatPrice(price) {
      return formatPrice(price);
    },
    selectOption(option) {
      this.selectedOption = option;
      this.showValidationMessage = false; // Reset validation message
    },
    isSelected(option) {
      return this.selectedOption === option;
    },
    handleGenSelectOption(min, max) {
      const options = [];
      for (let i = min; i <= max; i++) {
        options.push({
          label: i.toString(),
          value: i,
        });
      }
      return options;
    },
    submitSelection() {
      if (this.selectedOption !== null) {
        const selectedOption = this.options[this.selectedOption];
        console.log("Selected option:", selectedOption);
        this.showValidationMessage = false;
      } else {
        this.showValidationMessage = true; // Show validation message
      }
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
