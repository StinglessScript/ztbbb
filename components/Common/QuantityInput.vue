<template>
  <div class="quantity">
    <input
      type="number"
      v-model.number="quantityValue"
      @input="handleInputChange"
      :min="min"
      :max="max"
    />
    <div class="quantity-nav">
      <button class="quantity-button quantity-up" @click="incrementQuantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m12 10.8l-4.6 4.6L6 14l6-6l6 6l-1.4 1.4l-4.6-4.6Z"
          />
        </svg>
      </button>
      <button class="quantity-button quantity-down" @click="decrementQuantity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6l-6-6l1.41-1.41z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    initialValue: {
      type: Number,
      default: 0,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: Infinity,
    },
  },
  data() {
    return {
      quantityValue: this.initialValue,
    };
  },
  watch: {
    quantityValue(newQuantity) {
      this.$emit("quantity-updated", newQuantity); // Phát ra sự kiện khi số lượng thay đổi
    },
  },
  methods: {
    handleInputChange() {
      if (this.quantityValue < this.min) {
        this.quantityValue = this.min;
      } else if (this.quantityValue > this.max) {
        this.quantityValue = this.max;
      }
    },
    incrementQuantity() {
      if (this.quantityValue < this.max) {
        this.quantityValue++;
      }
    },
    decrementQuantity() {
      if (this.quantityValue > this.min) {
        this.quantityValue--;
      }
    },
  },
};
</script>
<style scoped>
/* Your CSS code here */
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background: #34495e;
  font-size: 1rem;
}

.quantity {
  position: relative;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.quantity input {
  width: 70px;
  height: 30px;
  line-height: 1.65;
  float: left;
  display: block;
  padding: 0;
  margin: 0;
  padding-left: 20px;
  border: none;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.08);
  font-size: 1rem;
  border-radius: 4px;
}

.quantity input:focus {
  outline: 0;
}

.quantity-nav {
  float: left;
  position: relative;
  height: 30px;
}

.quantity-button {
  position: relative;
  cursor: pointer;
  border: none;
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  width: 21px;
  text-align: center;
  color: #333;
  font-size: 13px;
  font-family: "FontAwesome" !important;
  line-height: 1.5;
  padding: 0;
  background: #fafafa;
  -webkit-transform: translateX(-100%);
  transform: translateX(-100%);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

.quantity-button:active {
  background: #eaeaea;
}

.quantity-button.quantity-up {
  position: absolute;
  height: 50%;
  top: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  font-family: "FontAwesome";
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 4px 0 0;
  line-height: 1.6;
}

.quantity-button.quantity-down {
  position: absolute;
  bottom: 0;
  height: 50%;
  font-family: "FontAwesome";
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 4px 0;
}
</style>
