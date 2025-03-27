<template>
  <div>
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(sendTicked)">
        <div
          class="d-flex pt-3"
          style="display: flex; flex-wrap: wrap; gap: 10px"
        >
          <div
            class="send-item"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 0 0 calc(50% - 10px);
              min-width: 200px;
              margin-bottom: 10px;
            "
          >
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="" for="companyName"
                  >Tên công ty <span style="color: red">*</span></label
                >
                <input
                  id="companyName"
                  v-model="companyName"
                  class="send-input"
                  type="text"
                  placeholder="Nhập tên công ty"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="send-item"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 0 0 calc(50% - 10px);
              min-width: 200px;
              margin-bottom: 10px;
            "
          >
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="" for="taxCode"
                  >Mã số thuế <span style="color: red">*</span></label
                >
                <input
                  id="taxCode"
                  v-model="taxCode"
                  class="send-input"
                  type="text"
                  placeholder="Nhập mã số thuế"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="send-item"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 0 0 calc(50% - 10px);
              min-width: 200px;
              margin-bottom: 10px;
            "
          >
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="" for="address"
                  >Địa chỉ <span style="color: red">*</span></label
                >
                <input
                  class="send-input"
                  id="address"
                  v-model="address"
                  type="text"
                  placeholder="Nhập địa chỉ"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div
            class="send-item"
            style="
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 0 0 calc(50% - 10px);
              min-width: 200px;
              margin-bottom: 10px;
            "
          >
            <ValidationProvider
              mode="lazy"
              rules="email|required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="" for="email"
                  >Email người nhận <span style="color: red">*</span></label
                >
                <input
                  class="send-input"
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="Nhập email người nhận"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
        </div>
        <div class="send-item">
          <div class="mb-4">
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
      companyName: "",
      taxCode: "",
      representative: "",
      email: "",
      description: "",
      address: "",
      // host: "",
      pageTitle: "",
      loading: false,
      checkChooseVatInfor: "yes",
      parsedData: Cookies.get("dataRequestBill")
        ? JSON.parse(Cookies.get("dataRequestBill"))
        : null,
    };
  },
  mounted() {
    //const parsedData = Cookies.get("dataRequestBill");
    //const data = parsedData;
    if (this.parsedData) {
      this.companyName = this.parsedData?.companyName;
      this.taxCode = this.parsedData?.taxCode;
      this.email = this.parsedData?.email;
      this.address = this.parsedData?.address;
    }

    if (this.parsedData?.id) {
      this.checkChooseVatInfor = "yes";
    }

    this.handleCreateBillNew();
  },

  methods: {
    handleChooseVatInfor() {
      if (!this.parsedData?.id) {
        if (this.checkChooseVatInfor == "no") {
          this.checkChooseVatInfor = "yes";
        } else {
          this.checkChooseVatInfor = "no";
        }
      }
    },

    handleShowModal() {
      this.$emit("selectOption");
    },

    sendTicked() {
      this.loading = true;
      const data = {
        companyName: this.companyName,
        taxCode: this.taxCode,
        email: this.email,
        address: this.address,
      };

      if (this.checkChooseVatInfor == "no") {
        Cookies.set("dataRequestBill", JSON.stringify(data));
        this.$emit("updateCookiesRequestBill", data);
        this.loading = false;
      } else {
        if (this.parsedData?.id) {
          this.handleUpdateVatInfo(this.parsedData?.id, data);
        } else {
          this.handleCreateVatInfo(data);
        }
      }
    },

    async handleUpdateVatInfo(id, data) {
      try {
        const updateVatInfoRequest = {
          company: data.companyName,
          taxCode: data.taxCode,
          address: data.address,
          invoiceReceiveEmail1: data.email,
        };
        const response = await this.$sdk.user.updateVatInfo(
          id,
          updateVatInfoRequest,
          this.$route.query.userId
        );
        if (response) {
          const dataResponse = {
            id: response.id,
            ...data,
          };

          Cookies.set("dataRequestBill", JSON.stringify(dataResponse));
          this.$emit("updateCookiesRequestBill", dataResponse);
          this.$emit("handleGetVatInfoByOwner");
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(error);
      }
    },

    async handleCreateVatInfo(data) {
      try {
        const createVatInfoRequest = {
          company: data.companyName,
          taxCode: data.taxCode,
          address: data.address,
          invoiceReceiveEmail1: data.email,
          ownerPartyId: this.$route.query.userId,
        };
        const response = await this.$sdk.user.createVatInfo(
          createVatInfoRequest,
          this.$route.query.userId
        );
        if (response) {
          const dataResponse = {
            id: response.id,
            ...data,
          };

          Cookies.set("dataRequestBill", JSON.stringify(dataResponse));
          this.$emit("updateCookiesRequestBill", dataResponse);
          this.$emit("handleGetVatInfoByOwner");
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
        this.$toast.error(error);
      }
    },

    handleCreateBillNew() {
      //Cookies.remove("dataRequestBill");
      this.parsedData = null;
      this.companyName = "";
      this.taxCode = "";
      this.email = "";
      this.address = "";
      this.checkChooseVatInfor = "no";
      //this.$emit("updateCookiesRequestBillNew", null);
      this.$emit("handleGetVatInfoByOwner");
    },
  },
};
</script>

<style lang="scss" scoped>
.loader-payment {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  // right: 8px;
  // top: 7px;
  left: 35%;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.modal-send {
  // z-index: 99999;
  padding: 12px 0px;
  .product-info-modal {
    margin-bottom: 8px;
    // border: 1px #44ce6f solid;
    background: #ecfaf1;

    border-radius: 3px;
    padding: 10px;
    .product-info-title {
      font-size: medium;
      font-weight: 500;
    }
    .product-info-price {
      color: #44ce6f;
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

.send-item {
  margin-bottom: 8px;
  .send-err {
    color: red;
  }
  .item-info {
    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      // margin-top: 24px;
    }
    .send-input {
      background: #ffffff;
      border: 1px solid #e3e8ef;
      border-radius: 6px;
      padding: 5px 10px;
      width: 100%;
    }
  }
}

.btn-send {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  &.active {
    background: #44ce6f;
    border-radius: 6px;
    color: #ffffff;
  }
  background: #ffffff;
  border: 1px solid #44ce6f;
  color: #44ce6f;

  border-radius: 6px;
  padding: 13px 0;
  width: 100%;
  margin: 12px 0;
  &:first-child {
    margin-top: 24px;
  }
}
</style>
