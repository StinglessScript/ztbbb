<template>
  <div class="cart-items" style="min-height: 200px; padding: 12px !important">
    <div style="font-weight: 600; padding-bottom: 12px">Thông tin chi tiết</div>
    <div
      class="d-flex flex-column gap-3"
      style="border-bottom: 1px solid rgb(229, 233, 238); padding-bottom: 10px"
      v-if="order?.lineItems"
    >
      <div
        v-for="(item, index) in order?.lineItems"
        :key="index"
        :style="{
          'border-bottom':
            order?.lineItems.length > 1 && index < order?.lineItems.length - 1
              ? '1px solid rgb(229, 233, 238)'
              : 'none',
          'padding-bottom':
            order?.lineItems.length > 1 && index < order?.lineItems.length - 1
              ? '10px'
              : '0px',
        }"
      >
        <div class="d-flex flex-column gap-2">
          <div class="d-flex flex-column">
            <div style="font-weight: 500">Dịch vụ:</div>
            <div style="margin-left: 10px">
              <div class="d-flex justify-content-between py-1">
                <div class="d-flex flex-column gap-2">
                  <template v-if="item?.orderLineItem?.variant?.title">
                    <div
                      class="d-flex gap-1"
                      :class="
                        index == 0 &&
                        item?.productDetails?.shortDescription &&
                        'title-name'
                      "
                      style="cursor: pointer"
                      @click="
                        index == 0 &&
                          item?.productDetails?.shortDescription &&
                          this.$emit(
                            'handleShowModal',
                            item?.orderLineItem?.variant?.id
                          )
                      "
                    >
                      <div
                        style="
                          font-size: 14px;
                          white-space: nowrap;
                          overflow: hidden;
                          text-overflow: ellipsis;
                          width: 200px;
                        "
                      >
                        {{ item?.orderLineItem?.variant?.title }}
                      </div>
                    </div>
                  </template>
                  <div style="color: #2bb456; font-weight: 600">
                    <span style="font-size: 12px">x</span
                    >{{ item?.orderLineItem?.quantity }}
                    {{
                      allProductUnit?.find(
                        (c) => c?.id == item.orderLineItem.unitType
                      )?.name
                    }}
                  </div>
                </div>
                <div
                  class="d-flex flex-column align-items-end"
                  :class="
                    rent?.priceDiscount > 0 &&
                    item?.orderLineItem?.variant?.id == product?.id
                      ? 'justify-content-between'
                      : 'justify-content-end'
                  "
                >
                  <div style="color: #2bb456; font-weight: 600">
                    {{
                      convertPrice(
                        (item?.orderLineItem?.variant?.price?.amount || 0) *
                          (item?.orderLineItem?.quantity || 1)
                      )
                    }}
                  </div>
                  <del
                    v-if="
                      (item?.orderLineItem?.variant?.price?.amount || 0) !=
                        (item?.orderLineItem?.variant?.unitPrice?.amount ||
                          0) &&
                      item?.orderLineItem?.variant?.unitPrice?.amount > 0
                    "
                    style="
                      text-decoration: line-through;
                      font-size: 14px;
                      font-weight: normal;
                      color: #333;
                    "
                    >{{
                      convertPrice(
                        item?.orderLineItem?.variant?.unitPrice?.amount *
                          item?.orderLineItem?.quantity
                      )
                    }}</del
                  >
                </div>
              </div>
              <span
                v-if="item?.productDetails?.shortDescription"
                @click="
                  this.$emit(
                    'handleShowModal',
                    item?.orderLineItem?.variant?.id
                  )
                "
                style="
                  color: #44ce6f;
                  font-size: 14px;
                  text-decoration: underline;
                  cursor: pointer;
                "
                >Xem chi tiết</span
              >
            </div>
          </div>
          <div
            class="d-flex flex-column gap-1"
            v-if="item?.orderLineItem?.resourceItems?.length > 0"
          >
            <div style="font-weight: 500">Tài nguyên:</div>
            <div class="d-flex flex-column gap-2" style="margin-left: 10px">
              <div class="d-flex flex-column gap-2">
                <div
                  class="d-flex gap-1"
                  v-for="resource in item?.orderLineItem?.resourceItems"
                >
                  <span
                    >{{ resource?.name }}:
                    <span
                      >{{ resource?.quantity }} {{ resource?.unit }}</span
                    ></span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        style="border-top: 1px solid rgb(229, 233, 238); padding-top: 10px"
        class="d-flex flex-column"
        v-if="dataOptionProduct?.length > 0"
      >
        <div style="font-weight: 500">Thông tin tùy chọn:</div>
        <div
          style="margin-left: 10px"
          v-for="(itemOption, indexOption) in dataOptionProduct"
          :key="indexOption"
        >
          <div class="d-flex flex-column gap-2 py-1">
            <template
              v-if="
                this.$emit(
                  'handleFilterData',
                  operatingSystems,
                  itemOption?.optionValue,
                  'name'
                ) && itemOption?.productData?.title
              "
            >
              <div>
                {{
                  this.$emit(
                    "handleFilterData",
                    operatingSystems,
                    itemOption?.optionValue,
                    "name"
                  )
                }}: {{ " " }}
                {{ itemOption?.productData?.title }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="padding-top: 24px">
      <div class="col-8">
        <div class="d-flex flex-column gap-2">
          <div>Tổng tiền (chưa VAT):</div>
          <div>VAT:</div>
          <div style="font-weight: 600; color: #2bb456">Thành tiền:</div>
        </div>
      </div>
      <div class="col-4">
        <div class="d-flex align-items-end flex-column gap-2">
          <div>
            {{
              convertPrice(
                order?.lineItems?.reduce(
                  (total, item) =>
                    total +
                    item.orderLineItem?.variant?.price?.amount *
                      item.orderLineItem?.quantity,
                  0
                )
              )
            }}
          </div>
          <div>
            {{
              convertPrice(
                order?.lineItems?.reduce(
                  (total, item) =>
                    total + (item.orderLineItem?.totalVAT?.amount || 0),
                  0
                )
              )
            }}
          </div>
          <div style="color: #2bb456; font-weight: 600">
            {{ convertPrice(order?.order?.currentTotalPrice?.amount) }}
          </div>
        </div>
      </div>
      <div class="checkout-action-button" style="padding: 15px !important">
        <div
          class="btn btn-primary checkout-btn"
          style="width: 524px; padding: 12px 24px; cursor: default"
          v-if="loadingFormSubmit && loadingForm"
        >
          <div class="d-flex align-items-center gap-2">
            Đang tiến hành
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
            <div class="dot-loader"></div>
          </div>
        </div>
        <div
          v-else
          class="checkout-btn"
          style="position: relative"
          @click="this.$emit('validatePayment')"
        >
          Thanh toán
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "order",
    "allProductUnit",
    "dataOptionProduct",
    "loadingFormSubmit",
    "loadingForm",
    "operatingSystems",
  ],

  methods: {
    convertPrice(price) {
      if (price !== null && price !== undefined) {
        if (price === 0) {
          return "0đ";
        } else {
          return (
            price
              .toFixed(0)
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
          );
        }
      } else {
        return price;
      }
    },
  },
};
</script>
