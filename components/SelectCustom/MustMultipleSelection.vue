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
      <svg
        v-if="isSelected(option)"
        @click="toggleOption(option)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check">
          <path
            id="Vector 1"
            d="M17.25 19.25H2.75C1.64543 19.25 0.75 18.3546 0.75 17.25V2.75C0.75 1.64543 1.64543 0.75 2.75 0.75H17.25C18.3546 0.75 19.25 1.64543 19.25 2.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25Z"
            stroke="#16B364"
            stroke-width="1.5"
          />
          <path
            id="Vector"
            d="M5.5 9.5L8.20603 12.5926C8.61852 13.064 9.35792 13.0445 9.74492 12.5519L14.5 6.5"
            stroke="#16B364"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </svg>
      <svg
        v-else
        @click="toggleOption(option)"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="check">
          <path
            id="Vector 1"
            d="M17.25 19.25H2.75C1.64543 19.25 0.75 18.3546 0.75 17.25V2.75C0.75 1.64543 1.64543 0.75 2.75 0.75H17.25C18.3546 0.75 19.25 1.64543 19.25 2.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25Z"
            stroke="#364152"
            stroke-width="1.5"
          />
        </g>
      </svg>
      <QuantityInput
        :initialValue="option.start_quantity"
        :min="option.min_quantity"
        :max="option.max_quantity"
      />
      <div class="name-price" :class="{ active: isSelected(option) }">
        <div class="name">{{ option.title }} </div>

        <div class="price">
          {{ handleFormatPrice(option.price) }}
        </div>
      </div>
    </div>
    <p v-if="showValidationMessage" class="validation-message">
      Vui lòng chọn ít nhất 1 lựa chọn
    </p>
  </div>
</template>

<script>
import { formatPrice } from "~/utils/currency";
import QuantityInput from "@/components/Common/QuantityInput.vue";
export default {
  data() {
    return {
      selectedOptions: [],
      showValidationMessage: false,
    };
  },
  props: ["value", "item"],
  components: { QuantityInput },
  methods: {
    decreaseValue(min, max) {
      if (this.value > min) {
        this.value--;
      }
    },
    increaseValue(min, max) {
      if (this.value < max) {
        this.value++;
      }
    },
    handleFormatPrice(price) {
      return formatPrice(price);
    },
    toggleOption(option) {
      const optionIndex = this.selectedOptions.indexOf(option);
      if (optionIndex === -1) {
        this.selectedOptions.push(option);
      } else if (this.selectedOptions.length > 1) {
        this.selectedOptions.splice(optionIndex, 1);
      }
      this.$emit("input", this.selectedOptions); // Gửi dữ liệu lên component cha thông qua sự kiện input
    },
    isSelected(option) {
      return this.selectedOptions.includes(option);
    },
  },
  // watch: {
  //   selectedOptions: {
  //     handler(newSelectedOptions) {
  //       this.showValidationMessage = newSelectedOptions.length === 0;
  //     },
  //     immediate: true,
  //   },
  // },
  created() {
 const defaultOptions = this.item.groupItemDTOS.filter(
      (option) => option.primary
    );

    if (defaultOptions.length > 0) {
      this.selectedOptions.push(...defaultOptions);
      this.$emit("input", this.selectedOptions); // Gửi dữ liệu lên component cha thông qua sự kiện input
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

  .checkbox-custom {
    width: 16px;
    height: 16px;
    border: 1px solid #697586;
    &.active {
      width: 12px;
      height: 12px;
      background: #000;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
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
.input-wrapper {
  display: flex;
  align-items: center;
  .quantity {
    width: 40px;
  }
  .input-action {
    height: 3 0px;
    display: flex;
    flex-direction: column;
  }
}

/* Your other component styles here */
</style>
<style scoped></style>
