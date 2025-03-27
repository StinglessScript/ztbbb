<template>
  <div>
    <select
      class="w-full-custom w100"
      v-model="selectedVatInfo"
      style="
        height: 35px;
        border-radius: 5px;
        border: 1px solid rgb(221, 221, 221);
        background-color: white;
        /* box-shadow: rgb(0 0 0 / 10%) 0px 0px 20px; */
      "
      @change="handleChooseVatInfo($event.target.value)"
    >
      <option disabled selected value="">Chọn mã số thuế đã lưu</option>
      <option
        v-for="item in dataVatInfoUser"
        :key="item?.id"
        :value="JSON.stringify(item)"
      >
        <div>
          {{ item.company }}
          <span v-if="item.taxCode">
            , <span class="font-bold">mst:</span>
            <span class="pl-1">{{ item.taxCode }}</span>
          </span>
        </div>
      </option>
    </select>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import CartForm from "../Cart/CartForm.vue";

export default {
  props: ["dataVatInfoUser", "isBoolean"],
  data() {
    return {
      parsedData: Cookies.get("dataRequestBill")
        ? JSON.parse(Cookies.get("dataRequestBill"))
        : null,
      selectedVatInfo: "",
    };
  },
  mounted() {
    if (this.parsedData?.id) {
      this.selectedVatInfo = JSON.parse(JSON.stringify(this.parsedData));
      console.log("🚀 ~ mounted ~ this.selectedVatInfo:", this.selectedVatInfo);
      console.log("dataVatInfoUser",this.dataVatInfoUser)
    }
  },

  watch: {
    isBoolean: {
      handler(newVal, oldVal) {
        if (newVal == true) {
          this.selectedVatInfo = "";
        }
      },
      deep: true,
    },

    parsedData: {
      handler(newVal, oldVal) {
        //console.log("🚀 ~ handler ~ newVal:", newVal);
        if (newVal) {
          if (newVal.id) {
            this.selectedVatInfo = JSON.stringify(newVal);
          }
        }
      },
      deep: true,
    },
  },

  methods: {
    handleShowModal() {
      this.$emit("handleShowFullVat");
    },

    handleChooseVatInfo(item) {
      const formatItem = JSON.parse(item);

      const data = {
        id: formatItem.id,
        companyName: formatItem.company,
        taxCode: formatItem.taxCode,
        email: formatItem.invoiceReceiveEmail1,
        address: formatItem.address,
      };
      this.selectedVatInfo = item;

      Cookies.set("dataRequestBill", JSON.stringify(data));

      this.$emit("updateCookiesRequestBill", data);
      this.$emit("handleShowFullVat");
    },

    handleChooseUpdateVatInfo(item) {
      const data = {
        id: item.id,
        companyName: item.company,
        taxCode: item.taxCode,
        email: item.invoiceReceiveEmail1,
        address: item.address,
      };

      Cookies.set("dataRequestBill", JSON.stringify(data));
      this.$emit("handleShowFullVat");
      this.$emit("selectOption");
    },

    async handleChooseDeleteVatInfo(item) {
      try {
        const response = await this.$sdk.user.deleteVatInfo(
          item.id,
          this.$route.query.userId
        );

        if (response) {
          if (this.parsedData && this.parsedData.id == item.id) {
            Cookies.remove("dataRequestBill");
            this.$emit("updateCookiesRequestBill", null);
          } else {
            this.$toast.success("Xóa mẫu yêu cầu thành công.");
          }

          this.$emit("handleGetVatInfoByOwner");
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
