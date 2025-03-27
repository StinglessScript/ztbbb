<template>
  <div class="ticked">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(sendTicked)">
        <div class="form-ticked">
          <h3>Đăng ký dịch vụ Backup365</h3>
          <div class="row">
            <div class="col-12 col-md-12">
              <div class="form-outline mb-2 text-left">
                <ValidationProvider
                  mode="lazy"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="name"
                    >Họ tên
                    <span style="color: red">*</span>
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="name"
                    v-model="user.fullName"
                    type="name"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-outline mb-2">
                <ValidationProvider
                  name="phone"
                  width="50%"
                  rules="required|phone"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="phone"
                    >Số điện thoại
                    <span style="color: red">*</span>

                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="phone"
                    v-model="user.phone"
                    type="text"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-outline mb-2">
                <ValidationProvider
                  name="email"
                  width="50%"
                  rules="required|email"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="email"
                    >Email
                    <span style="color: red">*</span>

                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="email"
                    v-model="user.email"
                    type="text"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider>
              </div>
            </div>
          </div>
          <LoginSocial />

        </div>
        <div class="form-ticked">
          <div>
            <div class="form-ticked-item">Đối tượng</div>
            <span v-for="targetItem in targets" :key="targetItem.id">
              <input
                type="radio"
                :id="targetItem.id"
                :value="targetItem.id"
                v-model="forms.target"
              />
              <label :for="targetItem.id">{{ targetItem.name }}</label>
            </span>
          </div>
          <div>
            <div class="form-ticked-item">Chọn sản phẩm</div>
            <p>
              Vui lòng bổ xung thêm thuộc tính sản phẩm để chúng tối có thể hỗ
              trợ tốt hơn.
            </p>
            <template v-for="(product, index) in products">
              <div
                class="card-backup365"
                :class="{ active: selectedProduct == product.id }"
                :key="index"
                @click="selectedProduct = product.id"
              >
                <div class="title-backup365">{{ product.name }}</div>
                <div class="description-backup365">
                  {{ product.description }}
                </div>

                <div class="line-options">
                  <div class="form-ticked-item">
                    {{ product.userQuantityName }}:
                  </div>
                  <span
                    v-for="quantity in product.userQuantities"
                    :key="quantity"
                  >
                    <input
                      type="radio"
                      v-model="product.selectedUserQuantity"
                      :value="quantity"
                      :id="'userQuantity_' + quantity"
                      :name="'userQuantity' + product.name"
                    />
                    <label :for="'userQuantity_' + quantity">
                      {{ quantity }}
                    </label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      v-model="product.selectedUserQuantity"
                      value="other"
                      :id="'userQuantity_other' + product.name"
                      :name="'userQuantity' + product.name"
                    />
                    <label :for="'userQuantity_other' + product.name">
                      <input
                        class="orther"
                        type="text"
                        v-model="products[index].otherUserQuantity"
                        placeholder="Khác"
                      />
                    </label>
                  </span>
                </div>
                <div class="line-options">
                  <div class="form-ticked-item">
                    {{ product.storageExpansionName }}:
                  </div>
                  <span
                    v-for="storage in product.storageExpansions"
                    :key="storage"
                  >
                    <input
                      type="radio"
                      v-model="products[index].selectedStorageExpansion"
                      :value="storage"
                      :id="'storageExpansion_' + storage"
                      :name="'storageExpansion' + product.name"
                    />
                    <label :for="'storageExpansion_' + storage">
                      {{ storage }}
                    </label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      v-model="product.selectedStorageExpansion"
                      value="other"
                      :id="'storageExpansion_other' + product.name"
                      :name="'storageExpansion' + product.name"
                    />
                    <label :for="'storageExpansion_other' + product.name">
                      <input
                        :for="'storageExpansion_other' + product.name"
                        class="orther"
                        type="text"
                        placeholder="Khác"
                        v-model="products[index].otherStorageExpansion"
                      />
                    </label>
                  </span>
                 
                </div>
              </div>
            </template>
          </div>

          <div class="d-flex justify-content-center gap-2">
            <div class="btn btn-primary-light" @click="$router.go(-1)">
              Quay lại
            </div>
            <div class="btn btn-primary" v-if="loading">
              <div class="d-flex align-items-center gap-2">
                Đang gửi yêu cầu
                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
              </div>
            </div>
            <button type="submit" v-else class="btn btn-primary">
              Đăng ký dịch vụ
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "BM Standard (100GB/User)",
          description: "Phù hợp với phần lớn người dùng.",
          userQuantities: [1, 25, 50],
          userQuantity: null,
          userQuantityName: "Số lượng User",
          otherUserQuantity: null,
          storageExpansions: ["100 GB", "200 GB", "500 GB"],
          storageExpansionName: "Storage Mở rộng",
          storageExpansion: null,
          otherStorageExpansion: null,
        },
        {
          id: 2,
          name: "BM Enterprise",
          description: "Phù hợp với những tổ chức yêu cầu bảo mật cao.",

          userQuantities: [100, 200, 300],
          userQuantity: null,
          userQuantityName: "Số lượng User",
          storageExpansions: ["10 GTB", "20 TB", "50 TB"],

          storageExpansionName: "Storage",
          storageExpansion: null,
          otherStorageExpansion: null,
        },
      ],
      selectedProduct: 1,
      locations: [
        { id: "1", name: "1" },
        { id: "25", name: "25" },
        { id: "50", name: "50" },
        { id: "4", name: "4" },
      ],
      datacenterUnit: [
        { id: "viettel", name: "Viettel" },
        { id: "vnpt", name: "VNPT" },
        { id: "fpt", name: "FPT" },
        { id: "cmc", name: "CMC" },
      ],
      purpose: [
        { id: "game", name: "Game" },
        { id: "cms", name: "CMS" },
        { id: "crm", name: "CRM" },
        { id: "erp", name: "ERP" },
        { id: "Khác", name: "Khác" },
      ],
      paymentMethods: [
        { id: "Mua", name: "Mua" },
        { id: "Trả góp", name: "Trả góp" },
      ],
      targets: [
        { id: "Cá nhân", name: "Cá nhân" },
        { id: "Tổ chức", name: "Tổ chức" },
      ],

      user: {
        fullName: "",
        phone: "",
        email: "",
      },
      forms: {
        location: "Hà Nội",
        purpose: "game",
        target: "Cá nhân",
        paymentMethod: "Mua",
        datacenterUnit: "viettel",
      },
      keyName: {
        location: "Khu vực đặt",
        purpose: "Mục đích sử dụng",
        target: "Đối tượng",
        paymentMethod: "Hình thức thanh toán",
        datacenterUnit: "Datacenter",
      },
      description: "",
      loading: false,
      product: null,
    };
  },
  computed: {
    link() {
      return this.$route.query.from || "";
    },
    type() {
      return this.$route.query.type || "";
    },
    productName() {
      return this.$route.query.productName || "";
    },
    isBaremetal() {
      return this.$route.query.isBaremetal;
    },
    isPortal() {
      return this.$route.query.isPortal || true;
    },
  },
  mounted() {},
  methods: {
    convertFormsToObjectArray(formsObject) {
      if (!formsObject || typeof formsObject !== "object") {
        // Handle invalid input or missing 'forms' property
        return [];
      }

      const convertedForms = Object.keys(formsObject).map((key) => {
        console.log(
          "🚀 ~ file: SendTickedByBarebone.vue:261 ~ convertedForms ~ key:",
          key
        );

        return {
          key: this.keyName[key],
          value: formsObject[key],
        };
      });

      return convertedForms;
    },
    async getProduct() {
      try {
        this.product = await this.$store.dispatch(
          "getProductByHandle",
          this.$route.query.from
        );
      } catch (error) {
        console.error(error);
      }
    },
    getProductById(id) {
      return this.products.find((product) => product.id === id);
    },
    sendTicked() {
      const hostname = window.location.origin;
      const product = this.getProductById(this.selectedProduct);
      if (!product.selectedUserQuantity || !product.selectedStorageExpansion) {
        this.$toast.warning("Vui lòng chọn các option", {});
        return; // Prevent form submission if validation fails
      }
      if (
        product.selectedStorageExpansion == "other" &&
        !product.otherStorageExpansion
      ) {
        this.$toast.warning("Vui lòng nhập giá trị mong muốn", {});
      }
      this.loading = true;

      const payload = {
        name: `Yêu cầu tư vấn sản phẩm ` + product.name,
        description: this.description,
        referName: this.user.fullName,
        referEmail: this.user.email,
        referPhone: this.user.phone,
        priorityName: "MEDIUM",
        workEffortTypeId: process.env.WorkEffortTypeId,
        targetId: "backup-microsoft-365",
        targetType: "PRODUCT",
        targetUrl: "https://longvan.net/backup-microsoft-365",
        extSource: hostname,
        forms: [
          {
            key: "Đối tượng",
            value: this.forms.target,
          },
          {
            key: "Sản phẩm",
            value: product.name,
          },
          {
            key: product.userQuantityName,
            value:
              product.selectedUserQuantity === "other"
                ? product.otherUserQuantity
                : product.selectedUserQuantity,
          },
          {
            key: product.storageExpansionName,
            value:
              product.selectedStorageExpansion == "other"
                ? product.otherStorageExpansion
                : product.selectedStorageExpansion,
          },
        ],
      };
      this.$store
        .dispatch("sendTicked2", payload)
        .then((response) => {
          this.loading = false;
          switch (response.data.addOpportunity.status) {
            case 0:
              break;
            case 1:
              Cookies.set("opportunityId", response.data.addOpportunity.id);
              this.$router.push("/longvan-technova-dang-ky-backup-microsoft-365-thanh-cong");
              Cookies.set("authInfo", JSON.stringify(this.user));
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.orther {
  border-radius: 6px;
  border: 1px solid var(--697586100-title, #697586);
  width: 80px;
  padding: 4px 12px;
  gap: 10px;
}
.card-backup365 {
  margin: 18px 0;
  border-radius: 4px;
  padding: 24px;
  background: #fff;
  border: 1px solid #c4c4c4;
  cursor: pointer;
  &.active {
    border: 2px solid var(--16-b-364100, #16b364);
    box-shadow: 0px 4px 4px 0px rgba(64, 132, 240, 0.25);
  }
  .title-backup365 {
    color: #000;
    font-family: Roboto;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
    line-height: 26px; /* 118.182% */
  }
  .description-backup365 {
    padding-bottom: 12px;
    color: #ed0006;
    font-family: Roboto;
    font-size: 16px;
    font-style: italic;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
  }
}
.w-full {
  width: 100%;
}
.text-note {
  display: inline-flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  flex-wrap: nowrap;
  /* identical to box height, or 138% */

  /* 44CE6F 100% */

  color: #44ce6f;
  img {
    margin: 0 2px;
  }
}
.form-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  margin: 0;
  color: #000000;
}
input,
textarea {
  border: 1px solid #e3e8ef;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + *::before {
  cursor: pointer;
  content: "";
  display: inline-block;
  vertical-align: center;
  position: absolute;
  left: -20px;
  bottom: 3px;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.1rem;
  border-color: gray;
}
label {
  font-weight: 400;
  font-size: 16px;
  // line-height: 22px;
  margin-left: 1.2rem;
  padding-right: 1.2rem;
  color: #000000;
  position: relative;
}
input[type="radio"]:checked + * {
  cursor: pointer;

  //   color: #44ce6f;
}
input[type="radio"]:checked + *::before {
  cursor: pointer;

  background: radial-gradient(
    #44ce6f 0%,
    #44ce6f 40%,
    transparent 50%,
    transparent
  );
  border-color: #44ce6f;
}

/* basic layout */
fieldset {
  margin: 20px;
  max-width: 400px;
}
input[type="radio"] + * {
  cursor: pointer;
  display: inline-block;
  // padding-right: 1rem;
}
.ticked {
  display: flex;
  flex-direction: column;
  align-items: center;
  .form-ticked {
    background: #fff;

    h3 {
      font-weight: 500;
      font-size: 27px;
      line-height: 34px;
      color: #121926;
    }
    h4 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #121926;
    }
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 24px;
    gap: 24px;

    width: 827px;
    border: 1px solid #e3e8ef;
    border-radius: 6px;
    .form-ticked-item {
      // width: 100%;
      display: flex;
      gap: 12px;
      align-items: center;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin-bottom: 10px;
    }
    .line-options {
      display: flex;
      align-items: center;
      // justify-content: space-between;
      gap: 12px;
      span {
        width: 25%;
      }
      .form-ticked-item {
        width: 30%;
        display: flex;
        gap: 12px;
        align-items: center;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #000000;
        margin-bottom: 10px;
      }
    }
  }
}
.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@-webkit-keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@media (max-width: 768px) {
  .ticked {
    .form-ticked {
      width: 100%;
      .line-options {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0px;
        span {
          width: 100%;
        }
        .form-ticked-item {
          display: block;
          width: 100%;
        }
      }
    }
  }
}
</style>
