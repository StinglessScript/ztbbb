<template>
  <div>
    <div
      class="row mb-2"
      v-if="
        operatingSystems.length > 0 &&
        !$route.query.domain &&
        $route.query.type != 'giahan' &&
        orderType != 'extend_order' &&
        (order?.order?.ownerPartyId || order?.order?.ownerPhone)
      "
    >
      <template v-for="(item, index) in operatingSystems">
        <div
          class="col-lg-6 col-12"
          v-if="item?.subType == null || item?.subType == 'SELECT'"
        >
          <ProductOS
            :value="checkIdProductOption(item, item?.productFeatureDTOS, 'os')"
            :operatingSystems="item"
            :loadingOperatingSystem="''"
            @handleChangeOptionSystem="handleChangeOptionSystem"
            :index="index"
            :widthSelect="100"
            :validateOption="validateOption"
            :order="order"
          />
        </div>
        <div class="col-lg-6 col-12" v-if="item?.subType == 'INPUT'">
          <ProductInput
            :value="
              checkIdProductOption(item, item?.productFeatureDTOS, 'input')
            "
            :operatingSystems="item"
            :checkQualify="checkQualify"
            :product="product"
            :loadingOperatingSystem="loadingForm"
            @handleChangeOptionSystem="handleChangeOptionSystem"
            :index="index"
            :widthSelect="100"
            :validateOption="validateOption"
          />
        </div>
      </template>
    </div>

    <!--  -->

    <div
      class="row is-pc"
      style="padding-bottom: 24px"
      v-if="productGroups.length > 0"
    >
      <div style="font-weight: 600; padding-bottom: 12px">
        {{ productGroups[0]?.product?.categories[0].title }}
        ({{ productGroups.length }})
      </div>
      <div
        class="d-flex gap-2 justify-content-between w-full"
        style="width: 100%"
      >
        <div style="width: 25%" class="d-flex justify-content-start">
          {{ parmasDomain ? "Tên miền" : "Sản phẩm" }}
        </div>
        <!-- <div style="width: 15%">Đơn giá</div> -->
        <!-- <div style="width: 32%">Đơn vị</div> -->
        <div style="width: 25%" class="d-flex justify-content-center">
          Số lượng
        </div>
        <div style="width: 25%" class="d-flex justify-content-center">
          Tổng cộng
        </div>
        <div style="width: 25%" class="d-flex justify-content-end"></div>
      </div>
      <div
        class="d-flex gap-2 justify-content-between w-full flex-column p-2"
        style="width: 100%; margin-bottom: 0.5rem"
      >
        <div
          v-for="(item, index) in dataProductTemps"
          class="d-flex justify-content-evenly w-full flex-column py-2 px-1"
          style="
            width: 100%;
            border-bottom: 1px solid rgb(229, 233, 238);
            cursor: pointer;
          "
          :class="
            items?.orderLineItem?.resourceConfigs[0]?.productId ==
            item?.product?.id
              ? ''
              : 'panel_order_product'
          "
        >
          <div
            class="d-flex gap-2 justify-content-between w-full"
            style="width: 100%"
          >
            <div
              class="d-flex gap-2 justify-content-between w-full flex-column"
              style="width: 100%"
            >
              <div
                class="d-flex w-full justify-content-between gap-2 align-items-center"
                style="width: 100%; height: 100%"
              >
                <div
                  style="width: 25%"
                  :class="parmasDomain ? `` : `d-flex justify-content-start`"
                  @click="
                    isVisibleMultiplTime?.status == false &&
                      handleUpdateItemInOrder(order?.order?.id, item?.product)
                  "
                >
                  <div style="color: rgb(24, 127, 56); font-weight: 600">
                    {{ item?.product?.title }}
                  </div>
                  <small>{{ parmasDomain }}</small>
                </div>

                <div
                  style="width: 25%"
                  class="d-flex justify-content-center"
                  @click="
                    isVisibleMultiplTime?.status == false &&
                      handleUpdateItemInOrder(order?.order?.id, item?.product)
                  "
                >
                  <div>1</div>
                </div>
                <div
                  style="width: 25%"
                  class="d-flex justify-content-center"
                  @click="
                    isVisibleMultiplTime?.status == false &&
                      handleUpdateItemInOrder(order?.order?.id, item?.product)
                  "
                >
                  <div>
                    {{
                      convertPrice(
                        getRentTime(item?.product?.dataDiscount, "product")
                          ?.priceDiscount
                      )
                    }}
                  </div>
                </div>

                <div
                  style="width: 25%; cursor: pointer"
                  class="d-flex justify-content-end"
                  :class="
                    items?.orderLineItem?.resourceConfigs[0]?.productId ==
                    item?.product?.id
                      ? 'align-items-start'
                      : 'align-items-center'
                  "
                >
                  <div
                    v-if="
                      items?.orderLineItem?.resourceConfigs[0]?.productId !=
                      item?.product?.id
                    "
                    @click="
                      handleUpdateItemInOrder(order?.order?.id, item?.product)
                    "
                    class="d-flex gap-2 button_submit_click align-items-center justify-content-center"
                    style="cursor: pointer; background: white; color: #44ce6f"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#44ce6f"
                        d="M11 9V6H8V4h3V1h2v3h3v2h-3v3zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4z"
                      />
                    </svg>
                    <div>Chọn</div>
                  </div>
                  <div
                    v-else
                    class="d-flex gap-2 button_submit align-items-center justify-content-center"
                    style="background: #44ce6f; color: white; cursor: pointer"
                    @click="handleIsOpen()"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="white"
                        d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"
                      />
                    </svg>
                    <div v-if="!isOpen">
                      {{
                        productGroups_old?.length > 1 ? "Thay đổi" : "Đã chọn"
                      }}
                    </div>
                    <div v-if="isOpen">Đóng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div
      class="row is-mobile"
      style="padding-bottom: 24px"
      v-if="productGroups.length > 0"
    >
      <div style="font-weight: 600; padding-bottom: 12px">
        {{ productGroups[0]?.product?.categories[0].title }}
        ({{ productGroups.length }})
      </div>

      <div>
        <div class="pb-2" v-for="(item, index) in dataProductTemps">
          <div
            class="d-flex flex-column gap-2"
            style="
              border-radius: 6px;
              border: 1px solid rgb(229, 233, 238);
              padding: 10px;
            "
            :class="
              items?.orderLineItem?.resourceConfigs[0]?.productId ==
              item?.product?.id
                ? 'active_package'
                : 'panel_order_product'
            "
          >
            <div v-if="item?.product" class="d-flex flex-column gap-1">
              <div class="d-flex flex-column gap-1">
                <div style="color: rgb(24, 127, 56); font-weight: 600">
                  {{ item?.product?.title }}
                </div>
                <small>{{ parmasDomain }}</small>
              </div>
              <!-- <div
                class="d-flex gap-2 justify-content-between align-items-center"
                @click="
                  handleVisibleMultipleTimeMobile(index + 1, item, 'product')
                "
              >
                <div>
                  <div class="d-flex flex-column gap-1">
                    <span class="d-flex">
                      {{
                        convertPrice(
                          getRentTime(item?.product?.dataDiscount)
                            ?.priceDiscount || 0
                        )
                      }}/{{
                        getRentTime(
                          item?.product?.dataDiscount,
                          "product",
                          index + 1
                        )?.time > 1
                          ? `${
                              getRentTime(
                                item?.product?.dataDiscount,
                                "product",
                                index + 1
                              )?.time
                            } `
                          : ""
                      }}{{ item?.product?.unitDTO?.name }}
                    </span>
                    <div
                      class="d-flex flex-column"
                      v-for="d in getRentTime(
                        item?.product?.dataDiscount,
                        'product',
                        index + 1
                      )?.oldPrice"
                    >
                      <del
                        style="
                          color: #8f8e8e;
                          font-size: 14px;
                          font-weight: 500;
                        "
                      >
                        {{ convertPrice(d?.priceDiscount) }}
                      </del>
                      <small v-if="d?.hint" style="color: rgb(24, 127, 56)">
                        {{ d?.hint }}</small
                      >
                    </div>
                  </div>

                  <small
                    style="color: rgb(24, 127, 56)"
                    v-if="
                      getRentTime(
                        item?.product?.dataDiscount,
                        'product',
                        index + 1
                      )?.hint
                    "
                  >
                    <span>{{
                      getRentTime(
                        item?.product?.dataDiscount,
                        "product",
                        index + 1
                      )?.hint
                    }}</span>
                  </small>
                </div>
              </div> -->
            </div>

            <div class="d-flex gap-1 align-content-center">
                <span>Số lượng:</span>
                <div style="color: rgb(24, 127, 56)">1</div>
              </div>

            <div class="d-flex justify-content-between align-items-center">
              <div class="d-flex gap-1 align-content-center">
                <span>Tổng cộng:</span>
                <div style="color: rgb(24, 127, 56)">
                  {{
                    convertPrice(
                      (getRentTime(item?.product?.dataDiscount, "product")
                        ?.priceDiscount || 0) +
                        (getRentTime(
                          item?.colocation?.dataDiscount,
                          "colocation"
                        )?.priceDiscount || 0)
                    )
                  }}
                </div>
              </div>
              <div class="d-flex align-items-center">
                <div
                  v-if="
                    items?.orderLineItem?.resourceConfigs[0]?.productId !=
                    item?.product?.id
                  "
                  class="d-flex gap-2 button_submit_click align-items-center justify-content-center"
                  @click="
                    handleUpdateItemInOrder(order?.order?.id, item?.product)
                  "
                  style="cursor: pointer; background: white; color: #44ce6f"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#44ce6f"
                      d="M11 9V6H8V4h3V1h2v3h3v2h-3v3zM7 22q-.825 0-1.412-.587T5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22m10 0q-.825 0-1.412-.587T15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22M1 4V2h3.275l4.25 9h7l3.9-7H21.7l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4z"
                    />
                  </svg>
                  <div>Chọn</div>
                </div>
                <div
                  v-else
                  class="d-flex gap-2 button_submit align-items-center justify-content-center"
                  style="background: #44ce6f; color: white; cursor: pointer"
                  @click="handleIsOpen()"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="white"
                      d="m9.55 17.308l-4.97-4.97l.714-.713l4.256 4.256l9.156-9.156l.713.714z"
                    />
                  </svg>
                  <div v-if="!isOpen">
                    {{ productGroups_old?.length > 1 ? "Thay đổi" : "Đã chọn" }}
                  </div>
                  <div v-if="isOpen">Đóng</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  -->
    <div
      class="d-flex flex-column"
      v-if="
        filterDataProductGroupwithOrderLineItems(
          items?.orderLineItem?.resourceConfigs[0]?.productId
        )?.product?.dataDiscount?.length > 0 &&
        !isOpen &&
        filterDataProductGroupwithOrderLineItems(
          items?.orderLineItem?.resourceConfigs[0]?.productId
        )?.product?.dataDiscount?.some((c) => c.type != 'SELL')
      "
    >
      <div style="font-weight: 600; padding-bottom: 12px">Thời gian thuê</div>
      <div
        v-if="
          filterDataProductGroupwithOrderLineItems(
            items?.orderLineItem?.resourceConfigs[0]?.productId
          )
        "
      >
        <div
          class="d-flex flex-column gap-1"
          style="position: relative; width: 100%"
        >
          <div
            class="hover-select-time align-items-center"
            v-for="itemDiscount in filterDataProductGroupwithOrderLineItems(
              items?.orderLineItem?.resourceConfigs[0]?.productId
            )?.product?.dataDiscount"
            style="
              display: flex;
              justify-content: space-between;
              cursor: pointer;
            "
            @click="
              handleChangesPackageAndTimeRent(
                itemDiscount,
                filterDataProductGroupwithOrderLineItems(
                  items?.orderLineItem?.resourceConfigs[0]?.productId
                )?.product,
                'product',
                filterDataProductGroupwithOrderLineItems(
                  items?.orderLineItem?.resourceConfigs[0]?.productId
                ),
                items?.orderLineItem?.resourceConfigs[0]?.productId
              )
            "
            :class="
              itemDiscount?.time == items?.orderLineItem?.quantity &&
              (itemDiscount?.type == 'PROMOTION' ||
                itemDiscount?.type == 'RENT')
                ? 'active'
                : ''
            "
            v-if="
              itemDiscount?.type == 'PROMOTION' || itemDiscount?.type == 'RENT'
            "
          >
            <div class="d-flex flex-column gap-2" style="width: 100%">
              <div
                v-if="
                  filterDataProductGroupwithOrderLineItems(
                    items?.orderLineItem?.resourceConfigs[0]?.productId
                  )?.product
                "
                class="d-flex justify-content-between align-items-center"
              >
                <div class="d-flex flex-column">
                  <div class="d-flex">
                    {{ itemDiscount?.time }}
                    {{
                      filterDataProductGroupwithOrderLineItems(
                        items?.orderLineItem?.resourceConfigs[0]?.productId
                      )?.product?.unitDTO?.name
                    }}
                  </div>
                  <small
                    v-if="
                      filterDataProductGroupwithOrderLineItems(
                        items?.orderLineItem?.resourceConfigs[0]?.productId
                      )?.product?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    "
                    style="color: rgb(24, 127, 56)"
                  >
                    {{
                      filterDataProductGroupwithOrderLineItems(
                        items?.orderLineItem?.resourceConfigs[0]?.productId
                      )?.product?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.hint
                    }}</small
                  >
                  <small
                    v-if="
                      filterDataProductGroupwithOrderLineItems(
                        items?.orderLineItem?.resourceConfigs[0]?.productId
                      )?.product?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.oldPrice
                    "
                    style="color: rgb(24, 127, 56)"
                    v-for="d in filterDataProductGroupwithOrderLineItems(
                      items?.orderLineItem?.resourceConfigs[0]?.productId
                    )?.product?.dataDiscount?.find(
                      (c) => c.time == itemDiscount?.time
                    )?.oldPrice"
                  >
                    {{ d?.hint }}</small
                  >
                </div>
                <div
                  class="d-flex flex-column"
                  v-if="
                    itemDiscount?.type == 'PROMOTION' ||
                    itemDiscount?.type == 'RENT'
                  "
                  style="color: rgb(24, 127, 56); font-weight: 600"
                >
                  <div class="d-flex justify-content-end">
                    {{
                      convertPrice(
                        filterDataProductGroupwithOrderLineItems(
                          items?.orderLineItem?.resourceConfigs[0]?.productId
                        )?.product?.dataDiscount?.find(
                          (c) => c.time == itemDiscount?.time
                        )?.priceDiscount
                      )
                    }}
                  </div>
                  <div
                    class="d-flex flex-column"
                    v-if="
                      filterDataProductGroupwithOrderLineItems(
                        items?.orderLineItem?.resourceConfigs[0]?.productId
                      )?.product?.dataDiscount?.find(
                        (c) => c.time == itemDiscount?.time
                      )?.oldPrice
                    "
                    v-for="d in filterDataProductGroupwithOrderLineItems(
                      items?.orderLineItem?.resourceConfigs[0]?.productId
                    )?.product?.dataDiscount?.find(
                      (c) => c.time == itemDiscount?.time
                    )?.oldPrice"
                  >
                    <small
                      class="d-flex justify-content-end"
                      style="
                        color: #8f8e8e;
                        text-decoration: line-through;
                        font-size: 13px;
                      "
                    >
                      {{ convertPrice(d?.priceDiscount) }}
                    </small>
                    <!-- <small v-if="d?.hint" style="color: rgb(24, 127, 56)">
                        {{ d?.hint }}</small
                      > -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductOS from "../../Product/ProductOS.vue";
import ProductInput from "../../Product/ProductInput.vue";

export default {
  props: [
    "items",
    "order",
    "handleGetDetailProduct",
    "handleGetProductGroup",
    "getRentTime",
    "handleUpdateItemInOrder",
    "handleChangesPackageAndTimeRent",
    "handleGetProductOption",
    "handleChangeOptionSystem",
    "loadingForm",
    "loadingFormOne",
    "parmasDomain",
    "productGroups_old",
    "validateOption",
  ],

  data() {
    return {
      isOpen: false,
      productGroups: [],
      dataProductTemps: [],
      isVisibleMultiplTime: {
        id: null,
        status: false,
      },
      isVisibleMultiplTime: false,
      operatingSystems: [],
      // validateOption: [],
    };
  },

  mounted() {
    this.handleCheckDataGetProductOption(this.items);
    this.handleFormatDataProductGroups(this.items);
  },

  // computed: {
  //   filterDataProductGroupwithOrderLineItems(id) {
  //     const value = this.productGroups?.find((c) => c.product?.id == id);
  //     console.log("🚀 ~ filterDataProductGroupwithOrderLineItems ~ value:", value)
  //     return value;
  //   },
  // },

  watch: {
    items: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.isOpen = false;
          this.handleCheckDataGetProductOption(this.items);
          this.handleFormatDataProductGroups(this.items);
        }
      },
    },

    isOpen: {
      handler(newVal, oldVal) {
        //console.log("newData", newVal);
        const productCopy = JSON.parse(JSON.stringify(this.productGroups));
        if (newVal == true) {
          //this.dataProductTemps = productCopy;
          const targetId =
            this.items?.orderLineItem?.resourceConfigs[0]?.productId;

          productCopy.sort((a, b) =>
            a?.product?.id == targetId ? -1 : b?.product?.id == targetId ? 1 : 0
          );
          this.dataProductTemps = productCopy;
        } else {
          this.dataProductTemps = productCopy?.filter(
            (c) =>
              c?.product?.id ==
              this.items?.orderLineItem?.resourceConfigs[0]?.productId
          );
        }
      },
      deep: true,
    },
  },

  methods: {
    handleIsOpen() {
      if (this.productGroups_old?.length > 1) {
        this.isOpen = !this.isOpen;
      }
    },

    filterDataProductGroupwithOrderLineItems(id) {
      const value = this.productGroups?.find((c) => c.product?.id == id);
      // console.log(
      //   "🚀 ~ filterDataProductGroupwithOrderLineItems ~ value:",
      //   value
      // );
      return value;
    },

    handleVisibleMultipleTime(id, type) {
      //this.dataModalTimesMobile = null;
      if (!id) {
        this.isVisibleMultiplTime = {
          id: null,
          status: false,
          type: null,
        };
      } else {
        if (!this.isVisibleMultiplTime?.id) {
          this.isVisibleMultiplTime = {
            id,
            status: true,
            type,
          };
        } else {
          if (this.isVisibleMultiplTime?.id == id) {
            this.isVisibleMultiplTime = {
              id: null,
              status: false,
              type: null,
            };
          } else {
            this.isVisibleMultiplTime = {
              id,
              status: true,
              type,
            };
          }
        }
      }
    },

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

    async handleCheckDataGetProductOption(items) {
      const productOptionResponse = await this.handleGetProductOption(
        items?.orderLineItem?.resourceConfigs[0]?.productId
      );
      //   console.log(
      //     "🚀 ~ handleCheckDataGetProductOption ~ items?.orderLineItem?.resourceConfigs[0]?.productId:",
      //     items?.orderLineItem?.resourceConfigs[0]?.productId
      //   );
      if (productOptionResponse) {
        this.operatingSystems = productOptionResponse;
      }
    },

    async handleFormatDataProductGroups(items) {
      const productDetailResponse = await this.handleGetDetailProduct(
        items?.orderLineItem?.resourceConfigs[0]?.productId
      );
      //   console.log(
      //     "🚀 ~ handleFormatDataProductGroups ~ productDetailResponse:",
      //     productDetailResponse
      //   );
      if (productDetailResponse) {
        const productGroupResponse = await this.handleGetProductGroup(
          productDetailResponse
        );

        if (productGroupResponse) {
          this.productGroups = productGroupResponse;
          const productCopy = JSON.parse(JSON.stringify(this.productGroups));
          // console.log("🚀 ~ mounted ~ productCopy:", productCopy);
          this.dataProductTemps = productCopy?.filter(
            (c) =>
              c?.product?.id ==
              items?.orderLineItem?.resourceConfigs[0]?.productId
          );
        }
      }
    },

    checkIdProductOption(item, productFeatureDTOS, type) {
      // console.log("🚀 ~ checkIdProductOption ~ item:", item);
      if (type == "os") {
        const data =
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.find(
            (c) => c?.idOption == item?.id
          );

        const checkColo = productFeatureDTOS?.find((c) =>
          this.order?.lineItems?.some(
            (b) =>
              c?.productId == b?.orderLineItem?.resourceConfigs?.[0]?.productId
          )
        );

        const dataReturn = checkColo
          ? {
              idOption: item?.id,
              name: item?.name,
              value: checkColo?.productId,
            }
          : data || {
              value: "",
            };
        //console.log("🚀 ~ checkIdProductOption ~ checkColo:", checkColo);

        return dataReturn;
      } else {
        const data =
          this.order?.lineItems[0]?.orderLineItem?.productOptions?.find(
            (c) => c?.idOption == item?.id
          );

        return (
          data || {
            value: "",
          }
        );
      }
    },

    validatePayment() {
      if (this.$route.query.type != "giahan") {
        const order = this.items;

        const requiredOptions = this.operatingSystems.filter(
          (c) => c.requireData == true
        );
        // console.log(
        //   "🚀 ~ validatePayment ~ this.operatingSystems:",
        //   requiredOptions
        // );

        const orderOptions = order?.orderLineItem?.productOptions ?? [];

        const missingOptionsColo = requiredOptions.filter((c) =>
          c.productFeatureDTOS?.some(
            (d) =>
              d.productId ==
              order?.orderLineItem?.resourceConfigs?.[0]?.productId
          )
        );

        const missingOptions = requiredOptions.filter(
          (reqOption) =>
            !orderOptions.some(
              (orderOption) => orderOption.idOption === reqOption.id
            ) 
            // &&
            // !missingOptionsColo.some(
            //   (coloOption) => coloOption.id === reqOption.id
            // )
        );

        //console.log("🚀 ~ validatePayment ~ missingOptions:", missingOptions);

        // console.log(
        //   "🚀 ~ validatePayment ~ missingOptionsColo:",
        //   missingOptionsColo
        // );

        if (missingOptions.length > 0) {
          this.validateOption = missingOptions;
          //console.log("🚀 ~ validatePayment ~ missingOptions:", missingOptions);
          this.$toast.error(
            `Vui lòng chọn ${this.formatMissingNames(missingOptions)}`
          );
          return false;
        } else {
          //   this.createFormThanhToan();
          return true;
        }
      } else {
        // this.createFormThanhToan();
        return true;
      }
    },
  },
};
</script>

<style lang="scss">
.button_submit {
  background: #44ce6f !important;
  color: white !important;
  cursor: pointer !important;

  border-radius: 6px !important;
  padding: 6px !important;
  border: 1px solid #44ce6f !important;
  width: 100px !important;
}

.button_submit_click {
  background: white !important;
  color: #44ce6f !important;
  cursor: pointer !important;

  border-radius: 6px !important;
  padding: 6px !important;
  border: 1px solid #44ce6f !important;
  width: 100px !important;
}
</style>
