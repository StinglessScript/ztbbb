<template>
  <form @submit.prevent="submitForm">
    <div>
      http://localhost:3011/thanh-toan/20.106026?userId=20.50262
      <p>Chọn sản phẩm:</p>
      <label v-for="product in products" :key="product.id">
        <input
          type="radio"
          v-model="selectedProduct"
          :value="product"
          :id="'product_' + product.id"
          :name="'product'"
        />
        {{ product.name }}
      </label>
    </div>
    <div v-if="selectedProduct">
      <h4>{{ selectedProduct.name }}</h4>
      <label>Số lượng user:</label>
      <label v-for="quantity in selectedProduct.userQuantities" :key="quantity">
        <input
          type="radio"
          v-model="selectedProduct.userQuantity"
          :value="quantity"
          :id="'userQuantity_' + quantity"
          :name="'userQuantity_' + selectedProduct.id"
        />
        {{ quantity }}
      </label>
      <label>
        <input
          type="radio"
          v-model="selectedProduct.userQuantity"
          value="other"
          :id="'userQuantity_other'"
          :name="'userQuantity_' + selectedProduct.id"
        />
        Nhập số khác
        <input
          type="number"
          v-if="selectedProduct.userQuantity === 'other'"
          v-model="selectedProduct.otherUserQuantity"
        />
      </label>

      <label>Storage Mở rộng:</label>
      <label
        v-for="storage in selectedProduct.storageExpansions"
        :key="storage"
      >
        <input
          type="radio"
          v-model="selectedProduct.storageExpansion"
          :value="storage"
          :id="'storageExpansion_' + storage"
          :name="'storageExpansion_' + selectedProduct.id"
        />
        {{ storage }}
      </label>
      <label>
        <input
          type="radio"
          v-model="selectedProduct.storageExpansion"
          value="other"
          :id="'storageExpansion_other'"
          :name="'storageExpansion_' + selectedProduct.id"
        />
        Nhập số khác
        <input
          type="number"
          v-if="selectedProduct.storageExpansion === 'other'"
          v-model="selectedProduct.otherStorageExpansion"
        />
      </label>
    </div>
    <button type="submit">Gửi</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Sản phẩm A",
          userQuantities: [1, 25, 50],
          userQuantity: null,
          otherUserQuantity: null,
          storageExpansions: [100, 200, 500],
          storageExpansion: null,
          otherStorageExpansion: null,
        },
        {
          id: 2,
          name: "Sản phẩm B",
          userQuantities: [5, 10, 15],
          userQuantity: null,
          otherUserQuantity: null,
          storageExpansions: [50, 150, 300],
          storageExpansion: null,
          otherStorageExpansion: null,
        },
      ],
      selectedProduct: null,
    };
  },
  methods: {
    getProductById(id) {
      return this.products.find((product) => product.id === id);
    },

    submitForm() {
      // Xử lý dữ liệu sau khi người dùng gửi form
      // Ví dụ:
      const product = getProductById(selectedProduct);
      if (this.product) {
        const formData = {
          product: this.product.name,
          userQuantity:
            this.product.userQuantity === "other"
              ? this.product.otherUserQuantity
              : this.product.userQuantity,
          storageExpansion:
            this.product.storageExpansion === "other"
              ? this.product.otherStorageExpansion
              : this.product.storageExpansion,
        };
        console.log(formData); // In ra dữ liệu để kiểm tra
      }
    },
  },
};
</script>
