<template>
  <div class="quantity">
    <button @click="decrease">-</button>
    <input type="text" v-model="quantity" @input="updateQuantity" />
    <button @click="increase">+</button>
  </div>
</template>

<script>
export default {
  props: ["quantity"],
  methods: {
    updateQuantity() {
      this.$emit("update", this.quantity);
    },
    increase() {
      this.$emit("increase");
    },
    decrease() {
      this.$emit("decrease");
    },
  },
};
</script>
<style scoped lang="scss">
.quantity {
  display: flex;
  padding: 3px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 3px;
  border: 1px solid var(--cdd-5-df-100-line-button, #cdd5df);
  button {
    /* Reset default styles */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: none;
    background-color: transparent;
    padding: 0;
    margin: 0;
  }
  input {
    width: 30px;
    text-align: center;
    border: none;
  }
}
</style>
