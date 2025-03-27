<template>
  <div>
    <div class="container checkout-v2">
      <div
        v-if="isVisibleMultiplTime?.status == true"
        style="
          position: fixed;
          z-index: 90;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: transparent;
          margin-top: 0px !important;
          cursor: pointer;
        "
        @click="handleVisibleMultipleTime(null)"
      ></div>
      <div class="row" style="position: relative">
        <div class="col-12 col-md-8">
          <div class="product-checkout h-auto">
            <div
              class="content-card-checkout gap-4"
              style="
                width: 100%;
                border-bottom: 1px dotted rgb(135, 137, 138);
                padding: 12px;
              "
            >
              <div style="padding-bottom: 15px">
                <div class="is-pc">
                  <div
                    v-if="$route.query.os && productOption"
                    style="
                      border-bottom: 1px dotted rgb(135, 137, 138);
                      margin-bottom: 15px;
                    "
                  >
                    <!-- <div style="font-weight: 600; padding-bottom: 12px">
                    {{ productOption?.name }}
                  </div> -->
                    <div class="row mb-2">
                      <template v-for="item in getProductOption">
                        <div
                          class="col-lg-6 col-12"
                          v-if="
                            item?.subType == null || item?.subType == 'SELECT'
                          "
                        >
                          <div>
                            <ProductOS
                              :value="checkIdProductOption(item)"
                              :operatingSystems="item"
                              :loadingOperatingSystem="false"
                              @handleChangeOptionSystem="
                                handleChangeOptionSystem
                              "
                              :index="index"
                              :widthSelect="100"
                              :validateOption="validateOption"
                            />
                          </div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div
                    class="list-product row mt-0"
                    style="
                      padding-bottom: 0.5rem;
                      border-bottom: none;
                      border-bottom: 1px dotted rgb(135, 137, 138);
                    "
                  >
                    <div style="font-weight: 600; padding-bottom: 12px">
                      {{ product[0]?.product?.categories[0]?.title }}
                      ({{ product.length }})
                    </div>

                    <div class="d-flex gap-2 w-full" style="width: 100%">
                      <div style="width: 25%">
                        {{ parmasDomain ? "Tên miền" : "Sản phẩm" }}
                      </div>
                      <!-- <div style="width: 15%">Đơn giá</div> -->
                      <div style="width: 32%">Đơn vị</div>
                      <div style="width: 13%">Số lượng</div>
                      <div style="width: 15%; text-align: center">Tổng</div>
                      <div style="width: 15%"></div>
                    </div>
                    <div
                      class="d-flex gap-2 w-full flex-column p-2"
                      style="width: 100%"
                    >
                      <div
                        v-for="(item, index) in dataProductTemps"
                        :ref="'item-' + item?.product?.id"
                        class="d-flex gap-2 justify-content-evenly w-full flex-column py-2 px-1"
                        style="
                          width: 100%;
                          border-bottom: 1px solid rgb(229, 233, 238);
                          cursor: pointer;
                        "
                        :class="
                          packageProduct?.product?.id == item?.product?.id
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
                              v-if="item?.product"
                              class="d-flex w-full justify-content-between gap-2"
                              style="width: 100%; height: 100%"
                              :class="
                                packageProduct?.product?.id == item?.product?.id
                                  ? 'align-items-start'
                                  : 'align-items-center'
                              "
                            >
                              <div
                                style="width: 25%; display: flex"
                                @click="
                                  isVisibleMultiplTime?.status == false &&
                                    handleChangePackage(item)
                                "
                                :class="
                                  parmasDomain
                                    ? 'flex-column'
                                    : 'align-items-center'
                                "
                              >
                                <div
                                  style="
                                    color: rgb(24, 127, 56);
                                    font-weight: 600;
                                  "
                                >
                                  {{ item?.product?.title }}
                                </div>
                                <small>{{ parmasDomain }}</small>
                              </div>

                              <div
                                v-if="
                                  packageProduct?.product?.id ==
                                  item?.product?.id
                                "
                                style="
                                  width: 35%;
                                  display: flex;
                                  align-items: center;
                                  position: relative;
                                "
                              >
                                <!-- @click="
                                  item?.product?.dataDiscount?.length > 1 &&
                                    getRentTime(
                                      item?.product?.dataDiscount,
                                      'product',
                                      index + 1
                                    )?.type != 'SELL' &&
                                    handleVisibleMultipleTime(
                                      index + 1,
                                      'product'
                                    )
                                " -->
                                <div
                                  class="d-flex flex-column gap-1"
                                  style="position: relative; width: 100%"
                                >
                                  <div
                                    class="hover-select-time"
                                    v-for="(itemDiscount, indexDis) in item
                                      ?.product?.dataDiscount"
                                    style="
                                      display: flex;
                                      justify-content: space-between;
                                    "
                                    @click="
                                      handleChooseTimeRent(
                                        itemDiscount,
                                        item?.product,
                                        'product',
                                        item,
                                        indexDis + 1
                                      )
                                    "
                                    :class="
                                      itemDiscount?.time == rent?.time &&
                                      (itemDiscount?.type == 'PROMOTION' ||
                                        itemDiscount?.type == 'RENT')
                                        ? 'active'
                                        : ''
                                    "
                                    v-if="
                                      itemDiscount?.type == 'PROMOTION' ||
                                      itemDiscount?.type == 'RENT'
                                    "
                                  >
                                    <div
                                      class="d-flex flex-column gap-2"
                                      style="width: 100%"
                                    >
                                      <div
                                        v-if="item?.product"
                                        class="d-flex justify-content-between"
                                      >
                                        <div
                                          class="d-flex flex-column w-6"
                                          style="width: 50%"
                                        >
                                          <div class="d-flex">
                                            {{ itemDiscount?.time }}
                                            {{ item?.product?.unitDTO?.name }}
                                          </div>
                                          <small
                                            v-if="
                                              item?.product?.dataDiscount?.find(
                                                (c) =>
                                                  c.time == itemDiscount?.time
                                              )?.hint
                                            "
                                            style="color: rgb(24, 127, 56)"
                                          >
                                            {{
                                              item?.product?.dataDiscount?.find(
                                                (c) =>
                                                  c.time == itemDiscount?.time
                                              )?.hint
                                            }}</small
                                          >
                                        </div>
                                        <div
                                          class="d-flex flex-column w-6"
                                          v-if="
                                            itemDiscount?.type == 'PROMOTION' ||
                                            itemDiscount?.type == 'RENT'
                                          "
                                          style="
                                            color: rgb(24, 127, 56);
                                            font-weight: 600;
                                            width: 50%;
                                          "
                                        >
                                          <div
                                            class="d-flex justify-content-end"
                                          >
                                            {{
                                              convertPrice(
                                                item?.product?.dataDiscount?.find(
                                                  (c) =>
                                                    c.time == itemDiscount?.time
                                                )?.priceDiscount
                                              )
                                            }}
                                          </div>
                                          <div
                                            class="d-flex flex-column"
                                            v-if="
                                              item?.product?.dataDiscount?.find(
                                                (c) =>
                                                  c.time == itemDiscount?.time
                                              )?.oldPrice
                                            "
                                            v-for="d in item?.product?.dataDiscount?.find(
                                              (c) =>
                                                c.time == itemDiscount?.time
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
                                              {{
                                                convertPrice(d?.priceDiscount)
                                              }}
                                            </small>
                                            <small
                                              v-if="d?.hint"
                                              style="color: rgb(24, 127, 56)"
                                            >
                                              {{ d?.hint }}</small
                                            >
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                v-else
                                style="
                                  width: 35%;
                                  display: flex;
                                  align-items: center;
                                  position: relative;
                                "
                                @click="
                                  item?.product?.dataDiscount?.length > 1 &&
                                    getRentTime(
                                      item?.product?.dataDiscount,
                                      'product',
                                      index + 1
                                    )?.type != 'SELL' &&
                                    handleVisibleMultipleTime(
                                      index + 1,
                                      'product'
                                    )
                                "
                              >
                                <div
                                  class="d-flex flex-column gap-1"
                                  style="position: relative; width: 100%"
                                >
                                  <div
                                    class="d-flex gap-1 align-items-center justify-content-between"
                                    style="width: 100%"
                                  >
                                    <div>
                                      <div class="d-flex flex-column gap-1">
                                        <span class="d-flex">
                                          <span
                                            >{{
                                              convertPrice(
                                                getRentTime(
                                                  item?.product?.dataDiscount,
                                                  "product",
                                                  index + 1
                                                )?.priceDiscount
                                              )
                                            }}
                                          </span>
                                          <span>
                                            /{{
                                              getRentTime(
                                                item?.product?.dataDiscount,
                                                "product",
                                                index + 1
                                              )?.time > 1
                                                ? `${
                                                    getRentTime(
                                                      item?.product
                                                        ?.dataDiscount,
                                                      "product",
                                                      index + 1
                                                    )?.time
                                                  } `
                                                : ""
                                            }}{{ item?.product?.unitDTO?.name }}
                                          </span>
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
                                          <small
                                            v-if="d?.hint"
                                            style="color: rgb(24, 127, 56)"
                                          >
                                            {{ d?.hint }}</small
                                          >
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      v-if="
                                        item?.product?.dataDiscount?.length >
                                          1 &&
                                        getRentTime(
                                          item?.product?.dataDiscount,
                                          'product',
                                          index + 1
                                        )?.type != 'SELL'
                                      "
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="30"
                                        height="30"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="#44ce6f"
                                          d="m12 15l-5-5h10z"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                  <small
                                    v-if="
                                      getRentTime(
                                        item?.product?.dataDiscount,
                                        'product',
                                        index + 1
                                      )?.hint
                                    "
                                    style="color: rgb(24, 127, 56)"
                                  >
                                    {{
                                      getRentTime(
                                        item?.product?.dataDiscount,
                                        "product",
                                        index + 1
                                      )?.hint
                                    }}</small
                                  >

                                  <div
                                    style="
                                      position: absolute;
                                      top: 20px;
                                      z-index: 91;
                                      left: -10px;
                                      /* background: #cdd5df; */
                                    "
                                    v-if="
                                      isVisibleMultiplTime?.id == index + 1 &&
                                      isVisibleMultiplTime?.status == true &&
                                      isVisibleMultiplTime?.type == 'product'
                                    "
                                  >
                                    <div
                                      style="
                                        border-radius: 6px;
                                        background: #fff;
                                        padding: 5px;
                                        border: 1px solid #cdd5df;
                                        display: flex;
                                        flex-direction: column;
                                        gap: 0.5rem;
                                        min-width: 235px;
                                      "
                                    >
                                      <div
                                        class="hover-select"
                                        v-for="(itemDiscount, indexDis) in item
                                          ?.product?.dataDiscount"
                                        style="
                                          display: flex;
                                          justify-content: space-between;
                                        "
                                        @click="
                                          handleChooseTimeRent(
                                            itemDiscount,
                                            item?.product,
                                            'product',
                                            item,
                                            indexDis + 1
                                          )
                                        "
                                        :class="
                                          itemDiscount?.time == rent?.time &&
                                          (itemDiscount?.type == 'PROMOTION' ||
                                            itemDiscount?.type == 'RENT')
                                            ? 'active'
                                            : ''
                                        "
                                        v-if="
                                          itemDiscount?.type == 'PROMOTION' ||
                                          itemDiscount?.type == 'RENT'
                                        "
                                      >
                                        <div
                                          class="d-flex flex-column gap-2"
                                          style="width: 100%"
                                        >
                                          <div
                                            v-if="item?.product"
                                            class="d-flex justify-content-between"
                                          >
                                            <div class="d-flex flex-column">
                                              <div class="d-flex">
                                                {{ itemDiscount?.time }}
                                                {{
                                                  item?.product?.unitDTO?.name
                                                }}
                                              </div>
                                              <small
                                                v-if="
                                                  item?.product?.dataDiscount?.find(
                                                    (c) =>
                                                      c.time ==
                                                      itemDiscount?.time
                                                  )?.hint
                                                "
                                                style="color: rgb(24, 127, 56)"
                                              >
                                                {{
                                                  item?.product?.dataDiscount?.find(
                                                    (c) =>
                                                      c.time ==
                                                      itemDiscount?.time
                                                  )?.hint
                                                }}</small
                                              >
                                            </div>
                                            <div
                                              class="d-flex flex-column"
                                              v-if="
                                                itemDiscount?.type ==
                                                  'PROMOTION' ||
                                                itemDiscount?.type == 'RENT'
                                              "
                                              style="
                                                color: rgb(24, 127, 56);
                                                font-weight: 600;
                                              "
                                            >
                                              <div
                                                class="d-flex justify-content-end"
                                              >
                                                {{
                                                  convertPrice(
                                                    item?.product?.dataDiscount?.find(
                                                      (c) =>
                                                        c.time ==
                                                        itemDiscount?.time
                                                    )?.priceDiscount
                                                  )
                                                }}
                                              </div>
                                              <div
                                                class="d-flex flex-column"
                                                v-if="
                                                  item?.product?.dataDiscount?.find(
                                                    (c) =>
                                                      c.time ==
                                                      itemDiscount?.time
                                                  )?.oldPrice
                                                "
                                                v-for="d in item?.product?.dataDiscount?.find(
                                                  (c) =>
                                                    c.time == itemDiscount?.time
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
                                                  {{
                                                    convertPrice(
                                                      d?.priceDiscount
                                                    )
                                                  }}
                                                </small>
                                                <small
                                                  v-if="d?.hint"
                                                  style="
                                                    color: rgb(24, 127, 56);
                                                  "
                                                >
                                                  {{ d?.hint }}</small
                                                >
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                style="
                                  width: 10%;
                                  display: flex;
                                  align-items: center;
                                "
                                @click="
                                  isVisibleMultiplTime?.status == false &&
                                    handleChangePackage(item)
                                "
                              >
                                <div>1</div>
                              </div>
                              <div
                                style="
                                  width: 17%;
                                  display: flex;
                                  align-items: center;
                                  justify-content: center;
                                "
                                @click="
                                  isVisibleMultiplTime?.status == false &&
                                    handleChangePackage(item)
                                "
                              >
                                <div
                                  style="
                                    color: rgb(24, 127, 56);
                                    font-weight: 600;
                                  "
                                >
                                  {{
                                    convertPrice(
                                      getRentTime(
                                        item?.product?.dataDiscount,
                                        "product",
                                        index + 1
                                      )?.priceDiscount
                                    )
                                  }}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            style="width: 15%; cursor: pointer; display: flex"
                            class="d-flex"
                            :class="
                              packageProduct?.product?.id == item?.product?.id
                                ? 'align-items-start'
                                : 'align-items-center'
                            "
                          >
                            <div
                              v-if="
                                packageProduct?.product?.id != item?.product?.id
                              "
                              class="d-flex gap-2 button_submit align-items-center justify-content-center"
                              @click="handleClick(item)"
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
                              <div>Đổi gói</div>
                            </div>
                            <div
                              v-else
                              class="d-flex gap-2 button_submit align-items-center justify-content-center"
                              style="background: #44ce6f; color: white"
                              @click="isOpen = !isOpen"
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
                              <div v-if="!isOpen">Thay đổi</div>
                              <div v-if="isOpen">Đóng</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="is-mobile">
                  <div
                    class="list-product row mt-0"
                    style="padding-bottom: 0.5rem; border-bottom: none"
                  >
                    <div style="">
                      <!-- <div style="font-weight: 600">Hệ điều hành</div> -->
                      <div v-if="$route.query.os && productOption">
                        <div class="row mb-2">
                          <template v-for="item in getProductOption">
                            <div
                              class="col-lg-6 col-12"
                              v-if="
                                item?.subType == null ||
                                item?.subType == 'SELECT'
                              "
                            >
                              <div>
                                <ProductOS
                                  :value="checkIdProductOption(item)"
                                  :operatingSystems="item"
                                  :loadingOperatingSystem="false"
                                  oi
                                  @handleChangeOptionSystem="
                                    handleChangeOptionSystem
                                  "
                                  :index="index"
                                  :widthSelect="100"
                                  :validateOption="validateOption"
                                />
                              </div>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>

                    <div style="padding-bottom: 24px">
                      <!--  v-if="product[0]?.product?.qualify !== 'DOMAIN'" -->
                      <div style="font-weight: 600; padding-bottom: 12px">
                        {{ product[0]?.product?.categories[0]?.title }}
                        ({{ product.length }})
                      </div>
                      <div>
                        <div
                          class="pb-2"
                          v-for="(item, index) in dataProductTemps"
                          :ref="'item-' + item?.product?.id"
                        >
                          <div
                            class="d-flex flex-column gap-2"
                            style="
                              border-radius: 6px;
                              border: 1px solid rgb(229, 233, 238);
                              padding: 10px;
                            "
                            :class="
                              packageProduct?.product?.id == item?.product?.id
                                ? 'active_package'
                                : 'panel_order_product'
                            "
                          >
                            <div
                              v-if="item?.product"
                              class="d-flex flex-column gap-1"
                            >
                              <div class="d-flex flex-column gap-1">
                                <div style="font-weight: 600">
                                  {{ item?.product?.title }}
                                </div>
                                <small>{{ parmasDomain }}</small>
                              </div>
                              <div
                                class="d-flex gap-2 justify-content-between align-items-center"
                                @click="
                                  item?.product?.dataDiscount?.length > 1 &&
                                    getRentTime(
                                      item?.product?.dataDiscount,
                                      'product',
                                      index + 1
                                    )?.type != 'SELL' &&
                                    handleVisibleMultipleTimeMobile(
                                      index + 1,
                                      item,
                                      'product'
                                    )
                                "
                              >
                                <div>
                                  <div class="d-flex flex-column gap-1">
                                    <span class="d-flex">
                                      {{
                                        convertPrice(
                                          getRentTime(
                                            item?.product?.dataDiscount
                                          )?.priceDiscount || 0
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
                                      <small
                                        v-if="d?.hint"
                                        style="color: rgb(24, 127, 56)"
                                      >
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
                                <div
                                  v-if="
                                    item?.product?.dataDiscount?.length > 1 &&
                                    getRentTime(
                                      item?.product?.dataDiscount,
                                      'product',
                                      index + 1
                                    )?.type != 'SELL'
                                  "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 24 24"
                                  >
                                    <path fill="#44ce6f" d="m12 15l-5-5h10z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div
                              class="d-flex justify-content-between align-items-center"
                            >
                              <div class="d-flex flex-column">
                                <div class="d-flex gap-1 align-content-center">
                                  <span>Giá:</span>
                                  <div style="color: rgb(24, 127, 56)">
                                    {{
                                      convertPrice(
                                        (getRentTime(
                                          item?.product?.dataDiscount,
                                          "product",
                                          index + 1
                                        )?.priceDiscount || 0) +
                                          (getRentTime(
                                            item?.colocation?.dataDiscount,
                                            "colocation",
                                            index + 1
                                          )?.priceDiscount || 0)
                                      )
                                    }}
                                  </div>
                                </div>
                              </div>
                              <div class="d-flex align-items-center">
                                <div
                                  v-if="
                                    packageProduct?.product?.id !=
                                    item?.product?.id
                                  "
                                  class="d-flex gap-2 button_submit align-items-center justify-content-center"
                                  @click="
                                    isVisibleMultiplTime?.status == false &&
                                      handleChangePackage(item)
                                  "
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
                                  style="background: #44ce6f; color: white"
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
                                  <div>Đổi gói</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="row total-product">
                <div class="col-md-7"></div>
                <div class="col-md-5">
                  <div class="total-product-item" style="font-size: 17px">
                    <div style="font-size: 17px">Tổng cộng:</div>
                    <div class="price-total" style="font-size: 17px">
                      {{ convertPrice(totalOrder) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4" style="position: relative">
          <div
            class="product-checkout h-auto"
            style="position: sticky; top: 134px"
          >
            <div
              class="content-card-checkout fontSize12"
              style="padding: 20px 15px !important"
            >
              <ValidationObserver v-slot="{ handleSubmit }">
                <div
                  class="title-card"
                  style="margin-bottom: 20px; text-align: center"
                >
                  Thông tin khách hàng
                </div>
                <form @submit.prevent="handleSubmit(createCustomer)">
                  <div style="padding-bottom: 15px">
                    <div class="row flex-column">
                      <div class="col-12">
                        <div class="form-outline mb-2 text-left">
                          <ValidationProvider
                            mode="lazy"
                            rules=""
                            v-slot="{ errors }"
                            v-if="!$store.getters.getUser"
                          >
                            <label class="form-label" for="name"
                              ><span>
                                <span>Họ tên</span>
                                <!-- <span style="color: red">*</span> -->
                              </span>
                              <span style="color: red">{{ errors[0] }}</span>
                            </label>
                            <input
                              id="name"
                              v-model="user.fullName"
                              type="text"
                              class="form-control form-control-lg"
                            />
                          </ValidationProvider>
                          <div v-else>
                            <label class="form-label" for="name"
                              ><span>
                                <span>Họ tên: </span>
                                <span style="padding-left: 5px">{{
                                  user.fullName
                                }}</span>
                                <!-- <span style="color: red">*</span> -->
                              </span>
                            </label>
                            <!-- <span id="name" class="form-control form-control-lg">{{
                        user.fullName
                      }}</span> -->
                          </div>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form-outline mb-2">
                          <ValidationProvider
                            name="phone"
                            width="50%"
                            rules="phone|required"
                            mode="lazy"
                            v-slot="{ errors }"
                            v-if="!$store.getters.getUser"
                          >
                            <label class="form-label" for="phone"
                              >Số điện thoại
                              <span style="color: red">*</span>

                              <span style="color: red">{{ errors[0] }}</span>
                            </label>
                            <input
                              id="phone"
                              pattern="\d*"
                              v-model="user.phone"
                              type="text"
                              class="form-control form-control-lg"
                            />
                          </ValidationProvider>
                          <div v-else>
                            <label class="form-label" for="phone"
                              ><span>Số điện thoại:</span
                              ><span style="padding-left: 5px">{{
                                user.phone
                              }}</span>
                              <!-- <span style="color: red">*</span> -->
                            </label>

                            <!-- <span id="phone" class="form-control form-control-lg">{{
                        user.phone
                      }}</span> -->
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <LoginSocialNoTitle v-if="!$store.getters.getUser" />
                  <div
                    class="checkout-action"
                    style="padding: 15px 0 0 0 !important"
                  >
                    <div
                      class="btn btn-primary checkout-btn"
                      style="width: 524px; padding: 12px 24px; cursor: default"
                      v-if="isDisable == true && loading == true"
                    >
                      <div class="d-flex align-items-center gap-2">
                        {{
                          type == "thue" ? "Đang tiến hành" : "Đang mua hàng"
                        }}
                        <div class="dot-loader"></div>
                        <div class="dot-loader"></div>
                        <div class="dot-loader"></div>
                      </div>
                    </div>
                    <button
                      class="checkout-btn"
                      v-else-if="isDisable == false && loading == false"
                      type="submit"
                      href="javascript:void(0)"
                      style="border: transparent"
                    >
                      {{
                        type == "thue"
                          ? "Tiếp tục"
                          : type == "giahan"
                          ? "Thanh toán"
                          : "Mua hàng"
                      }}
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalChooseTimeRent
      :showModale="isVisibleMultiplTimeMobile?.status"
      :dataModalTimesMobile="dataModalTimesMobile"
      @handleVisibleMultipleTimeMobile="handleVisibleMultipleTimeMobile"
      @handleChooseTimeRent="handleChooseTimeRent"
      :rent="dataModalTimesMobile?.type == 'product' ? rent : rent_colo"
      class="is-mobile"
    />
  </div>
</template>

<script>
import Cookies from "js-cookie";
import LoginSocialNoTitle from "@/components/Auth/LoginSocialNoTitle.vue";
import ProductCheckoutTimeAndHDH from "@/components/Product/ProductCheckoutTimeAndHDH.vue";
import ProductOS from "./ProductOS.vue";
import ProductInput from "./ProductInput.vue";
import { formatShowPrice } from "../../utils/Price/formatShowPrice.js";
import ModalChooseTimeRent from "../../components/Modal/ModalChooseTimeRent.vue";
import { formatDate } from "../../utils/dateUtils.js";

export default {
  props: ["product", "id", "targetID", "type", "moneyDiscount"],
  data() {
    return {
      typeBuy: "",
      quantity: 1,
      user: {},
      priceData: 0,
      pricePlans: [],
      checked: "",
      priceInstallment: {},
      rent: null,
      quantityYearRent: 1,
      quantityYearRentProductPlace: 1,
      loading: false,
      productPlace: null,
      arrayQuantityYearRent: [],
      yearChecked: null,
      operatingSystems: [],
      selectedUbuntu: "Chọn hệ điều hành",
      selectedWindows: null,
      order: {},
      window: [],
      ubuntu: [],

      selectOptionSystem: null,

      maxNumberByDefault: 1,

      unitProduct: "tháng",
      unitProductPlace: "tháng",
      isDisable: false,

      openFormOptionTimeAndHdh: false,
      setDataOrder_id: null,
      setDataUser_id: null,
      setDataType: "mua",
      setDataOS: [],

      packageProduct: null,

      productOption: [],
      sortProductPrices: [],

      dataFullProductOption: [],

      getProductOption: [],

      isVisibleMultiplTime: {
        id: null,
        status: false,
      },

      dataModalTimesMobile: null,
      isVisibleMultiplTimeMobile: {
        id: null,
        status: false,
      },
      rent_default: process.env.TIME_RENT_DEFAULT,

      rent_colo: null,
      anonymous: process.env.ANONYMOUS_ID,

      isSticky: false, // Biến theo dõi trạng thái sticky
      stickyOffset: 0, // Vị trí ban đầu của phần tử khi cuộn

      dataService: null,
      productDetailTemp: [],
      productDetail: [],
      productIdOfService: [],

      isOpen: false,
      dataProductTemps: [],
    };
  },
  components: {
    LoginSocialNoTitle,
    ProductCheckoutTimeAndHDH,
  },
  mounted() {
    this.tokenAmounious();
    //this.validateCreateOrder();
    this.typeBuy = this.type;
    const packageData = this.product.find(
      (c) => c.product.handle == this.$route.params.slug
    );

    //console.log("🚀 ~ mounted ~ this.product:", this.product);
    //this.getPriceProductOptions();
    // if (this.type == "thue" || this.type == "giahan") {
    //   this.handleGetProductCollection();
    // }

    if (this.$store.getters.getUser) {
      this.user = this.$store.getters.getUser;
      //console.log("user", this.user);
    }

    if (packageData) {
      if (this.$store.getters.itemProductOrder) {
        this.packageProduct = this.$store.getters.itemProductOrder;

        if (this.$route.query.os) {
          this.handleDataOS(this.$route.query.os, this.packageProduct);
        } else {
          this.handleDataOS(
            this.packageProduct?.product?.id,
            this.packageProduct
          );
        }
      } else {
        this.packageProduct = packageData;
        this.$store.commit("setUpdateItemProductOrder", this.packageProduct);
        if (this.$route.query.os) {
          this.handleDataOS(this.$route.query.os, this.packageProduct);
        } else {
          this.handleDataOS(
            this.packageProduct?.product?.id,
            this.packageProduct
          );
        }
      }

      // const data = this.mergeDiscountData(
      //   this.packageProduct?.product?.dataDiscount,
      //   this.packageProduct?.colocation?.dataDiscount
      // );
      // console.log("🚀 ~ mounted ~ data:", data);

      const dataRent = this.packageProduct?.product?.dataDiscount?.find(
        (c) => c.defaultPrice == true
      );
      // console.log(
      //   "🚀 ~ mounted ~ this.packageProduct?.product:",
      //   this.packageProduct?.product
      // );

      const dataTimeLargest = this.packageProduct?.product?.dataDiscount[0];
      // this.packageProduct?.product?.dataDiscount?.find(
      //   (c) => c?.time == Math.max(...data.map((c) => c.time))
      // );

      const dataRentColo = this.packageProduct?.colocation?.dataDiscount?.find(
        (c) => c.defaultPrice == true
      );

      const dataTimeLargestColo =
        this.packageProduct?.colocation?.dataDiscount[0];
      // this.packageProduct?.colocation?.dataDiscount?.find(
      //   (c) => c?.time == Math.max(...data.map((c) => c.time))
      // );

      this.rent = {
        time: dataRent ? dataRent?.time : dataTimeLargest?.time,
      };

      this.rent_colo = {
        time: dataRentColo ? dataRentColo?.time : dataTimeLargestColo?.time,
      };
      const productCopy = JSON.parse(JSON.stringify(this.product));
      console.log("🚀 ~ mounted ~ productCopy:", productCopy);
      this.dataProductTemps = productCopy?.filter(
        (c) => c?.product?.id == this.packageProduct?.product?.id
      );

      //this.scrollToItem(this.packageProduct?.product?.id);
      setTimeout(() => {
        this.scrollToItem(this.packageProduct?.product?.id);
        if (this.$store.getters.getUser) {
          this.createCustomer();
        }
      }, 100);
      //console.log("🚀 ~ mounted ~ this.rent:", this.rent);
      //this.sortProductPrices = data;
      //console.log("🚀 ~ mounted ~ this.packageProduct:", this.packageProduct);
    }
    if (this.type == "giahan") {
      this.handleGetService();
    }
    // console.log("store.state.storeId", this.$store.state.storeId);
  },

  watch: {
    productDetailTemp(newData, oldData) {
      if (
        newData.length == this.productIdOfService.length &&
        this.type == "giahan"
      ) {
        this.formatDataPrice();
      }
    },

    isOpen: {
      handler(newVal, oldVal) {
        console.log("newData", newVal);
        const productCopy = JSON.parse(JSON.stringify(this.product));
        if (newVal == true) {
          const targetId = this.packageProduct?.product?.id;

          productCopy.sort((a, b) =>
            a?.product?.id == targetId ? -1 : b?.product?.id == targetId ? 1 : 0
          );
          this.dataProductTemps = productCopy;
        } else {
          this.dataProductTemps = productCopy?.filter(
            (c) => c?.product?.id == this.packageProduct?.product?.id
          );
        }
      },
      deep: true,
    },
  },
  computed: {
    parmasDomain() {
      const value = this.$route.query.domain || "";
      return value;
    },

    parmasOs() {
      const value = this.$route.query.os || "";
      return { value };
    },
    type() {
      return this.$route.query.type || "";
    },
    connectorId() {
      return this.$route.query.connectorId || "";
    },
    userId() {
      return this.$route.query.userId || "";
    },
    VAT() {
      const value =
        (this.quantity *
          (this.product?.price ? this.product?.price : 0) *
          this.product?.vat) /
        100;

      return value || 0;
    },
    VAT_Option() {
      const value =
        (this.quantity *
          (this.productPlace?.price ? this.productPlace?.price : 0) *
          this.productPlace?.vat) /
        100;
      return value || 0;
    },
    totalPrice() {
      // const value =
      //   this.quantity *
      //   ((this.productPlace?.price ? this.productPlace?.price : 0) +
      //     (this.product?.price ? this.product?.price : 0));
      const value =
        (this.packageProduct?.product?.price || 0) * this.rent?.time +
        (this.packageProduct?.colocation?.price || 0) * this.rent?.time;

      return value || 0;
    },
    totalOrder() {
      const priceProductDiscount =
        this.packageProduct?.product?.dataDiscount?.find(
          (c) => c.time == this.rent?.time
        );
      // console.log(
      //   "🚀 ~ totalOrder ~ this.packageProduct:",
      //   this.packageProduct,
      //   this.rent
      // );

      const priceProductDiscountLargest =
        this.packageProduct?.product?.dataDiscount[0];

      const priceColocationDiscount =
        this.packageProduct?.colocation?.dataDiscount?.find(
          (c) => c.time == this.rent_colo?.time
        );
      // console.log(
      //   "🚀 ~ totalOrder ~ priceColocationDiscount:",
      //   priceColocationDiscount,
      //   priceProductDiscount
      // );

      const priceColocationDiscountLargest =
        this.packageProduct?.colocation?.dataDiscount[0];

      const priceTotalProductDiscount =
        (priceProductDiscount?.price * priceProductDiscount?.time || 0) +
        (priceColocationDiscount?.price * priceColocationDiscount?.time || 0);

      const priceTotalProductDiscountLargest =
        (priceProductDiscountLargest?.price *
          priceProductDiscountLargest?.time || 0) +
        (priceColocationDiscountLargest?.price *
          priceColocationDiscountLargest?.time || 0);

      const value = priceTotalProductDiscount
        ? priceTotalProductDiscount
        : priceTotalProductDiscountLargest;

      // console.log(
      //   "🚀 ~ totalOrder ~ priceTotalProductDiscount:",
      //   priceTotalProductDiscount
      // );
      return value || 0;
    },
  },

  methods: {
    handleClick(item) {
      if (!this.isVisibleMultiplTime?.status) {
        this.handleChangePackage(item);
        this.isOpen = false;
      }
    },

    async formatDataPrice() {
      const formattedPrices = await formatShowPrice(
        this,
        this.productDetailTemp
      );
      if (formattedPrices) {
        this.productDetail = formattedPrices;
      }
      // console.log("Formatted Prices:", formattedPrices);

      // console.log(
      //   "🚀 ~ formatDataPrice ~ this.productDetailTemp:",
      //   this.productDetailTemp
      // );
    },

    async handleGetService() {
      try {
        const response = await this.$sdk.cloud.serviceDetail(
          this.$route.query.serviceId
        );

        if (response) {
          this.dataService = response;
          this.handleGetProductsOfService();
        }
      } catch (error) {
        console.log("🚀 ~ handleGetService ~ error:", error);
        this.$toast.error("handleGetService", error);
      }
    },

    async handleGetProductsOfService() {
      try {
        // Gọi API để lấy dữ liệu sản phẩm
        const response = await this.$sdk.cloud.getProductsOfService(
          this.$route.query.serviceId
        );

        // Kiểm tra xem response có dữ liệu không
        if (response?.length > 0) {
          //console.log("🚀 ~ handleGetProductsOfService ~ response:", response);
          this.productIdOfService = response;
          // Tạo danh sách các Promise để gọi handleGetProduct cho từng sản phẩm
          const promises = response.map(async (c) => {
            await this.handleGetProduct(c);
            return c;
          });

          // Chờ tất cả các Promise hoàn thành
          await Promise.all(promises);
        }
      } catch (error) {
        // Xử lý lỗi nếu có
        console.log("🚀 ~ handleGetProductsOfService ~ error:", error);
        this.$toast.error("handleGetProductsOfService", error);
      }
    },

    async handleGetProduct(id) {
      try {
        const response = await this.$sdk.product.getProductById(id);
        //console.log("🚀 ~ getProductById ~ id:", id);
        // console.log("🚀 ~ handleGetProduct ~ response:", response)

        // Xử lý trường hợp thành công
        if (response && !response?.errors) {
          const filteredResponse = {
            product: {
              id: response.id,
              title: response.title,
              unitDTO: response.unitDTO,
              price: response.priceType == "RENT" ? response.price : 0,
              vat: response.vat,
              type: response.subType,
              qualify: response.qualify,
              priceType: response.priceType,
              handle: response.handle,
            },
          };
          this.productDetailTemp = [
            ...(Array.isArray(this.productDetailTemp)
              ? this.productDetailTemp
              : []),
            filteredResponse,
          ];
          return; // Nếu thành công, kết thúc hàm ở đây
        }
      } catch (error) {
        console.log("🚀 ~ handleGetProduct ~ error:", error);
        const responseVARIABLE = await this.$sdk.product.getProductVariantById(
          id
        );
        //console.log("🚀 ~ handleGetProduct ~ responseVARIABLE:", responseVARIABLE)
        if (responseVARIABLE) {
          const filteredResponse = {
            product: {
              id: responseVARIABLE.id,
              title: responseVARIABLE.title,
              unitDTO: responseVARIABLE.unitDTO,
              price: responseVARIABLE.priceType == "RENT" ? response.price : 0,
              vat: responseVARIABLE.vat,
              type: responseVARIABLE.subType,
              qualify: responseVARIABLE.qualify,
              priceType: responseVARIABLE.priceType,
              handle: responseVARIABLE.handle,
            },
          };
          this.productDetailTemp = [
            ...(Array.isArray(this.productDetailTemp)
              ? this.productDetailTemp
              : []),
            filteredResponse,
          ];
        }
      }
    },

    checkIdProductOption(item) {
      //console.log("🚀 ~ checkIdProductOption ~ item:", item);

      const data = this.productOption?.find(
        (c) => c.idOption == item?.id
      )?.value;
      //console.log("🚀 ~ checkIdProductOption ~ data:", data);

      const checkItem = item?.productFeatureDTOS?.find(
        (c) => c.productId == data
      );
      console.log(
        "🚀 ~ checkIdProductOption ~ checkItem:",
        checkItem,
        item?.id
      );
      // console.log(
      //   "🚀 ~ checkIdProductOption ~ this.productOption:",
      //   this.productOption
      // );

      if (checkItem) {
        return {
          value: data,
        };
      } else {
        this.productOption?.filter(
          (c) => c.idOption != item?.id && c.idOption != undefined
        );

        console.log(
          "🚀 ~ checkIdProductOption ~ this.productOption:",
          this.productOption,
          item
        );
        return {
          value: "",
        };
      }
    },
    validateProductOption(productOption) {
      //const order = this.order?.lineItems[0];

      const requiredOptions = this.getProductOption.filter(
        (c) => c.requireData == true
      );
      // console.log(
      //   "🚀 ~ validateProductOption ~ this.getProductOption:",
      //   this.getProductOption
      // );

      const orderOptions = productOption || [];
      //console.log("🚀 ~ validateProductOption ~ productOption:", productOption);

      const missingOptions = requiredOptions.filter(
        (reqOption) =>
          !orderOptions.some(
            (orderOption) => orderOption.idOption === reqOption.id
          )
      );

      this.validateOption = missingOptions;

      if (missingOptions.length > 0) {
        //console.log("🚀 ~ validatePayment ~ missingOptions:", missingOptions);
        this.$toast.error(
          `Vui lòng chọn ${this.formatMissingNames(missingOptions)}`
        );
        return false;
      } else {
        return true;
      }
    },

    formatMissingNames(options) {
      const names = options.map((option) => option.name);
      if (names.length === 0) return "";
      if (names.length === 1) return names[0];
      if (names.length === 2) return names.join(" và ");
      return names.slice(0, -1).join(", ") + " và " + names[names.length - 1];
    },

    getRentTime(dataDiscount, type) {
      const dataQuantity = dataDiscount?.filter((c) => c.time);
      const data = dataQuantity?.find(
        (c) =>
          c.time == (type == "product" ? this.rent?.time : this.rent_colo?.time)
      );
      const dataDefault = dataQuantity?.find((c) => c.defaultPrice == true);

      // const dataTimeLargest = dataQuantity?.find(
      //   (c) => c?.time == Math.max(...dataQuantity.map((c) => c.time))
      // );
      // return data
      //     ? data
      //     : dataQuantity?.length > 0
      //     ? dataQuantity[0]
      //     : {
      //         displayPrice: item?.discountPrice?.price,
      //         quantity: 1,
      //       };

      return data ? data : dataDefault ? dataDefault : null;
    },

    handleVisibleMultipleTime(id, type) {
      this.dataModalTimesMobile = null;
      if (!id) {
        this.isVisibleMultiplTime = {
          id: null,
          type: null,
          status: false,
        };
      } else {
        if (!this.isVisibleMultiplTime?.id) {
          this.isVisibleMultiplTime = {
            id,
            type,
            status: true,
          };
        } else {
          if (this.isVisibleMultiplTime?.id == id) {
            this.isVisibleMultiplTime = {
              id: null,
              type: null,
              status: false,
            };
          } else {
            this.isVisibleMultiplTime = {
              id,
              type,
              status: true,
            };
          }
        }
      }
    },

    handleVisibleMultipleTimeMobile(id, item, type) {
      if (!id) {
        this.isVisibleMultiplTimeMobile = {
          id: null,
          status: false,
          type: null,
        };
        this.dataModalTimesMobile = null;
      } else {
        if (!this.isVisibleMultiplTimeMobile?.id) {
          this.isVisibleMultiplTimeMobile = {
            id,
            status: true,
            type,
          };
          this.dataModalTimesMobile = {
            type,
            productOrColocation:
              type == "product" ? item?.product : item?.colocation,
            item,
          };
        } else {
          if (this.isVisibleMultiplTimeMobile?.id == id) {
            this.isVisibleMultiplTimeMobile = {
              id: null,
              status: false,
              type: null,
            };
            this.dataModalTimesMobile = null;
          } else {
            this.isVisibleMultiplTimeMobile = {
              id,
              status: true,
              type,
            };
            this.dataModalTimesMobile = {
              type,
              productOrColocation:
                type == "product" ? item?.product : item?.colocation,
              item,
            };
          }
        }
      }
    },

    handleChooseTimeRent(item, data, type, packageData) {
      const checkTimeInProduct = data?.dataDiscount?.find(
        (c) => c.time == item.time
      );

      if (!checkTimeInProduct) {
        this.handleVisibleMultipleTimeMobile(null, null);
        this.$toast.error(
          `Gói dịch vụ ${data?.title} này chưa được cấu hình ${item.time} ${item.unitDTO_name}`
        );
      } else {
        this.handleVisibleMultipleTimeMobile(null, null);
        //console.log("🚀 ~ handleChooseTimeRent ~ item:", item);
        if (type == "product") {
          this.rent = item;
        } else {
          this.rent_colo = item;
        }
        this.handleChangePackage(packageData);
        //this.$store.commit("setUpdateItemTimeRent", this.rent);
      }
    },
    mergeDiscountData(data1, data2) {
      // Nếu data2 không có, chỉ trả về data1
      if (!data2) return data1;

      return [...data1, ...data2].reduce(
        (
          acc,
          {
            time,
            percentDiscount,
            price,
            priceDiscount,
            unitDTO_id,
            unitDTO_name,
            defaultPrice,
          }
        ) => {
          const existing = acc.find((item) => item.time === time);

          if (existing) {
            // Cộng dồn nếu đã tồn tại `time`
            existing.percentDiscount += percentDiscount;
            existing.price += price;
            existing.priceDiscount += priceDiscount;
          } else {
            // Thêm mới nếu không có
            acc.push({
              time,
              percentDiscount,
              price,
              priceDiscount,
              unitDTO_id,
              unitDTO_name,
              defaultPrice,
            });
          }
          return acc;
        },
        []
      );
    },
    handleChangePackage(item) {
      this.packageProduct = item;
      this.$store.commit("setUpdateItemProductOrder", this.packageProduct);
      // const data = this.mergeDiscountData(
      //   this.packageProduct?.product?.dataDiscount,
      //   this.packageProduct?.colocation?.dataDiscount
      // );
      //console.log("🚀 ~ mounted ~ data:", data);
      this.rent =
        this.packageProduct?.product?.dataDiscount?.find(
          (c) => c.time == this.rent?.time
        ) || this.packageProduct?.product?.dataDiscount[0];
      this.rent_colo =
        this.packageProduct?.colocation?.dataDiscount?.find(
          (c) => c.time == this.rent_colo?.time
        ) || this.packageProduct?.colocation?.dataDiscount[0];
      //this.$store.commit("setUpdateItemTimeRent", this.rent);
      //this.sortProductPrices = data;
      if (this.$route.query.os) {
        this.handleDataOS(this.$store.getters.isOS, this.packageProduct);
      } else {
        this.handleDataOS(
          this.packageProduct?.product?.id,
          this.packageProduct
        );
      }
      
      this.isOpen = false;
    },

    scrollToItem(itemId) {
      console.log("🚀 ~ scrollToItem ~ itemId:", itemId);
      const target = this.$refs[`item-${itemId}`][0]; // Truy cập phần tử theo ref
      if (target) {
        // Lấy tọa độ phần tử so với toàn bộ trang
        const elementPosition =
          target.getBoundingClientRect().top + window.scrollY;

        // Quy định khoảng cách so với đỉnh màn hình (ví dụ: 100px)
        const offset = 100;

        // Cuộn đến vị trí với khoảng cách đã điều chỉnh
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth", // Cuộn mượt
        });
      }
    },

    async handleDataOS(id, packageData) {
      try {
        //this.getProductOption = [];
        const response = await this.$sdk.product.getProductById(
          id,
          this.$route.query.store
        );
        if (response) {
          const responseOs = await this.$store.dispatch("getProductOptionV2", {
            id: packageData?.product?.id,
            store: this.$route.query.store,
          });

          const data = JSON.parse(
            JSON.stringify(responseOs?.data?.getProductOption)
          );

          if (this.$route.query.os) {
            const option = data?.find((c) =>
              c.productFeatureDTOS?.some((d) =>
                d.productOptionGroupItemDTOS?.some((e) => e.productId === id)
              )
            );
            const formatData = {
              idOption: option?.id,
              name: option?.name,
              value: id,
            };

            const formattedOptions = data?.map((data) => ({
              id: data.id,
              name: data.name,
              productFeatureDTOS: data.productFeatureDTOS.flatMap(
                (feature) =>
                  feature?.productOptionGroupItemDTOS?.map((item) => ({
                    id: item.id,
                    productId: item.productId,
                    productName: item.productName,
                    price: item.price,
                    qualify: item.qualify,
                  })) || []
              ),
              requireData: data.requireData,
              subType: data.subType,
            }));

            const promises = formattedOptions.flatMap((option) =>
              option.productFeatureDTOS.map(async (c) => {
                return this.$store
                  .dispatch("getProductById", {
                    id: c?.productId,
                    store: this.$route.query.store,
                  })
                  .then((response) => {
                    if (response) {
                      c.productDetail = response?.data;
                    }
                  })
                  .catch((error) => {
                    console.error(
                      `Error fetching detail for product with ID ${c.productName}:`,
                      error
                    );
                    c.productDetail = null;
                  });
              })
            );

            await Promise.all(promises);

            this.getProductOption = formattedOptions;

            // Kiểm tra xem có cần thêm đối tượng mới vào productOption
            if (this.productOption.length === 0) {
              // Nếu productOption rỗng, gắn luôn phần tử mới
              this.productOption.push(formatData);
            } else {
              // Nếu productOption không rỗng, kiểm tra trùng idOption
              const index = this.productOption.findIndex(
                (item) => item.idOption === formatData.idOption
              );
              if (index !== -1) {
                // Nếu tìm thấy trùng, xóa phần tử cũ và thêm phần tử mới
                this.productOption.splice(index, 1, formatData);
              } else {
                // Nếu không trùng, thêm phần tử mới vào
                this.productOption.push(formatData);
              }
            }

            this.$store.commit("setIsOS", id);
          } else {
            const formatData = {
              idOption: data[0]?.id,
              name: data[0]?.name,
              value: this.parmasDomain,
            };

            // Kiểm tra và thêm đối tượng mới vào productOption
            if (this.productOption.length === 0) {
              // Nếu productOption rỗng, gắn luôn phần tử mới
              this.productOption.push(formatData);
            } else {
              // Nếu productOption không rỗng, kiểm tra trùng idOption
              const index = this.productOption.findIndex(
                (item) => item.idOption === formatData.idOption
              );
              if (index !== -1) {
                // Nếu tìm thấy trùng, xóa phần tử cũ và thêm phần tử mới
                this.productOption.splice(index, 1, formatData);
              } else {
                // Nếu không trùng, thêm phần tử mới vào
                this.productOption.push(formatData);
              }
            }
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleDataOS ~ error:", error);
        this.$toast.error(error, {});
      }
    },
    formatTmeProduct(value) {
      const lowerCaseValue = value.toLowerCase();
      switch (lowerCaseValue) {
        case "tháng":
          return "THANG";
        case "năm":
          return "NAM";
        default:
          return lowerCaseValue;
      }
    },

    // handleChangeProductOptionItem(item, id, name, qualify) {
    //   console.log(
    //     "🚀 ~ handleChangeProductOptionItem ~ item, id, name:",
    //     item,
    //     id,
    //     name,
    //     qualify
    //   );
    //   const formatData = {
    //     idOption: id,
    //     name: name,
    //     value: item,
    //   };
    //   this.productOption = formatData;
    //   this.setDataOS.push({
    //     qualify,
    //     id: item,
    //   });
    //   //this.$store.commit("setIsOS", this.setDataOS);
    // },

    validateCreateOrder() {
      if (this.$store.getters.getUser) {
        return true;
      } else {
        const phoneRegex = /^\d{10}$/;
        return this.user.phone ? phoneRegex.test(this.user.phone) : false;
      }
    },

    async handleGetProductCollection() {
      if (this.product?.qualify == "CLOUD_LAB") {
        const payload = {
          category: this.product?.productAttributes?.find(
            (c) => c.attributeName == "OS_CATEGORY"
          )?.attributeValue,
          // display: "PUBLIC",
          // sub_type: "CONFIG,SIMPLE,VARIABLE",
          // status: "ON_SELL",
        };
        const get = await this.$store.dispatch("getProducts", {
          data: payload,
          store: this.$route.query.store,
        });
        this.operatingSystems = get?.data?.data;
        //console.log("get", get);
      } else if (this.product?.qualify == "BARE_METAL") {
        const get = await this.$store.dispatch("getProductById", {
          id: this.product?.productAttributes?.find(
            (c) => c.attributeName == "COLOCATION"
          )?.attributeValue,
          store: this.$route.query.store,
        });
        this.productPlace = get.data;

        // console.log("get", this.productPlace);
      }
    },

    async createCustomer() {
      try {
        if (this.$store.getters.getUser) {
          if (this.type == "giahan") {
            if (this.productDetail?.length > 0) {
              this.loading = true;
              this.isDisable = true;
              this.createOrderExpires(this.user.partyId || this.user.id);
            } else {
              this.loading = false;
              this.isDisable = false;
            }
          } else {
            this.loading = true;
            this.isDisable = true;
            this.createOrder(this.user.partyId || this.user.id);
          }
        } else {
          if (!this.user.phone) {
            //this.$toast.error("Vui lòng nhập đầy đủ thông tin khách hàng", {});
            return;
          } else {
            if (this.validateCreateOrder()) {
              if (this.type == "giahan") {
                if (this.productDetail?.length > 0) {
                  this.loading = true;
                  this.isDisable = true;
                  this.createOrderExpires();
                } else {
                  this.loading = false;
                  this.isDisable = false;
                }
              } else {
                this.loading = true;
                this.isDisable = true;
                this.createOrder();
              }
            }
          }
        }
      } catch (error) {
        console.log("error", error);
        this.loading = false;
        this.isDisable = false;
        this.$toast.error(error.message || "Đã có lỗi xảy ra", {});
      }
    },

    async handleCreateUserByPhone(name, phone) {
      try {
        const payloadCustomer = {
          name: name || "khách hàng mới",
          phone,
        };
        const response = await this.$store.dispatch(
          "createCustomerV2",
          payloadCustomer
        );

        if (response?.data?.createCustomerV2 != null) {
          this.setCustomerData(
            response?.data?.createCustomerV2?.id,
            response?.data?.createCustomerV2?.name
          );
        }
      } catch (error) {
        console.log("🚀 ~ handleCreateUserByPhone ~ error:", error);
        this.$toast.error(error);
      }
    },

    setCustomerData(partyId, fullName) {
      const customerData = { partyId, fullName };
      Cookies.set("authInfo", JSON.stringify(customerData));
      this.createOrder(partyId);
    },

    async createOrder(id) {
      try {
        const pushDataOrderLineItems = [];

        if (this.packageProduct.product) {
          const campain_product =
            this.packageProduct?.product?.dataDiscount?.find(
              (c) => c.time == this.rent?.time
            )?.attributes;

          const data = {
            quantity: this.rent?.time,
            variant: {
              id: this.packageProduct?.product?.id,
              product: { id: this.packageProduct?.product?.id },
              unitPrice: {
                amount:
                  this.packageProduct?.product?.dataDiscount?.find(
                    (c) => c.time == this.rent?.time
                  )?.oldPrice?.length > 0
                    ? this.packageProduct?.product?.dataDiscount?.find(
                        (c) => c.time == this.rent?.time
                      )?.oldPrice[0]?.price
                    : this.packageProduct?.product?.dataDiscount?.find(
                        (c) => c.time == this.rent?.time
                      )?.price,
                currencyCode: "VND",
              },
              price: {
                amount: this.packageProduct?.product?.dataDiscount?.find(
                  (c) => c.time == this.rent?.time
                )?.price,
                currencyCode: "VND",
              },
              campaignId:
                campain_product?.campain?.find((c) => c.attrName == "CAMPAIN")
                  ?.attrValue || null,
              campaignActionId:
                campain_product?.campain?.find(
                  (c) => c.attrName == "CAMPAIGN_ACTION"
                )?.attrValue || null,
            },
            customAttributes: [
              {
                key: "SERVICE_TYPE",
                value: "SERVICE_TYPE",
              },
            ],
            unitType: this.packageProduct?.product?.unitDTO?.id,
            orderStatus: 10,
          };

          if (this.$route.query.os || this.parmasDomain) {
            data.productOptions = this.productOption;
          }

          pushDataOrderLineItems.push(data);

          if (this.packageProduct.colocation) {
            const campain_colocation =
              this.packageProduct?.colocation?.dataDiscount?.find(
                (c) => c.time == this.rent_colo?.time
              )?.attributes;
            const dataColo = {
              quantity: this.rent_colo?.time,
              variant: {
                id: this.packageProduct?.colocation?.id,
                product: { id: this.packageProduct?.colocation?.id },
                unitPrice: {
                  amount:
                    this.packageProduct?.colocation?.dataDiscount?.find(
                      (c) => c.time == this.rent_colo?.time
                    )?.oldPrice?.length > 0
                      ? this.packageProduct?.colocation?.dataDiscount?.find(
                          (c) => c.time == this.rent_colo?.time
                        )?.oldPrice[0]?.price
                      : this.packageProduct?.colocation?.dataDiscount?.find(
                          (c) => c.time == this.rent_colo?.time
                        )?.price,
                  currencyCode: "VND",
                },
                price: {
                  amount: this.packageProduct?.colocation?.dataDiscount?.find(
                    (c) => c.time == this.rent_colo?.time
                  )?.price,
                  currencyCode: "VND",
                },
                campaignId:
                  campain_colocation?.campain?.find(
                    (c) => c.attrName == "CAMPAIN"
                  )?.attrValue || null,
                campaignActionId:
                  campain_colocation?.campain?.find(
                    (c) => c.attrName == "CAMPAIGN_ACTION"
                  )?.attrValue || null,
              },
              customAttributes: [
                {
                  key: "SERVICE_TYPE",
                  value: "SERVICE_TYPE",
                },
              ],
              unitType: this.packageProduct?.colocation?.unitDTO?.id,
              orderStatus: 10,
            };

            pushDataOrderLineItems.push(dataColo);
          }
        }

        const data = {
          order: {
            shopId: this.$route.query.store
              ? this.$route.query.store
              : process.env.STORE_ID,
            ownerPartyId: id || null,
            ownerName: this.user.fullName || "",
            ownerPhone: this.user.phone || "",
            orderType: "SERVICE",
            note: `${this.user.fullName}, ${this.user.phone}`,
          },
          orderLineItems: pushDataOrderLineItems,
          byUser: id || this.anonymous,
        };

        if (this.validateProductOption(this.productOption)) {
          const res = await this.$store.dispatch("createNewOrder", data);
          //console.log("🚀 ~ createOrder ~ res:", res);
          if (res?.data?.createOrder) {
            const response = await this.$sdk.order_graphQL.getOrderDetail(
              res?.data?.createOrder?.id
            );

            if (this.type == "thue") {
              if (response) {
                this.$store.commit("setUpdateItemProductOrder", null);
                this.$store.commit("setUpdateItemTimeRent", null);

                this.$router.push(
                  `/cap-nhat-don-hang/${res?.data?.createOrder?.id}?userId=${
                    id || this.anonymous
                  }&type=${this.type}${
                    this.$route.query.store
                      ? `&store=${this.$route.query.store}`
                      : ""
                  }${this.parmasDomain ? `&domain=${this.parmasDomain}` : ""}`
                );
              }
            } else if (this.type == "mua") {
              this.$router.push(
                `/thanh-toan/${res?.data?.createOrder?.id}?userId=${
                  id || this.anonymous
                }&type=${this.type}${
                  this.$route.query.store
                    ? `&store=${this.$route.query.store}`
                    : ""
                }`
              );
            }
          } else {
            this.isDisable = false;
            this.loading = false;
            this.$toast.error("Tạo đơn không thành công");
          }
        }
      } catch (error) {
        console.log("🚀 ~ createOrder ~ error:", error);
        this.isDisable = false;
        this.loading = false;
        this.$toast.error(error, {});
      }
    },

    async createOrderExpires(id) {
      try {
        const arrayOrderLineItems = this.productDetail
          ?.map((a) => {
            const productCONFIG = this.productDetail?.find(
              (c) => c.type == "CONFIG"
            );

            const campain_product = a?.product?.dataDiscount?.find(
              (c) => c.time == this.rent?.time
            )?.attributes;

            // Tạo đối tượng temp với thông tin từ dataProductTime
            return {
              quantity: this.rent?.time,
              variant: {
                id: a.product.id,
                product: { id: a.product.id },
                unitPrice: {
                  amount:
                    a?.product?.dataDiscount?.find(
                      (c) => c.time == this.rent?.time
                    )?.oldPrice?.length > 0
                      ? a?.product?.dataDiscount?.find(
                          (c) => c.time == this.rent?.time
                        )?.oldPrice[0]?.price
                      : a?.product?.dataDiscount?.find(
                          (c) => c.time == this.rent?.time
                        )?.price,
                  currencyCode: "VND",
                },
                price: {
                  amount: a?.product?.dataDiscount?.find(
                    (c) => c.time == this.rent?.time
                  )?.price,
                  currencyCode: "VND",
                },
                campaignId:
                  campain_product?.campain?.find((c) => c.attrName == "CAMPAIN")
                    ?.attrValue || null,
                campaignActionId:
                  campain_product?.campain?.find(
                    (c) => c.attrName == "CAMPAIGN_ACTION"
                  )?.attrValue || null,
              },
              customAttributes: [
                { key: "SERVICE_TYPE", value: "SERVICE_TYPE" },
                { key: "SERVICE_ID", value: this.$route.query.serviceId },
                {
                  key: "END_DATE_SERVICE",
                  value: formatDate(this.dataService?.service?.endDate),
                },
              ],
              unitType: a?.product?.unitDTO?.id,
              orderLineItemParentId:
                a.type != "CONFIG" ? productCONFIG?.id && a.id : null,
              orderStatus: 10,
            };
          })
          .filter((item) => item !== null); // Loại bỏ các giá trị null

        const data = {
          order: {
            shopId: this.$route.query.store
              ? this.$route.query.store
              : process.env.STORE_ID,
            ownerPartyId: id || null,
            ownerName: this.user.fullName || "",
            ownerPhone: this.user.phone || "",
            orderType: "RENEWALS",
            customAttributes: [
              {
                key: "SERVICE_ID",
                value: this.$route.query.serviceId,
              },
            ],
          },
          orderLineItems: arrayOrderLineItems,
          byUser: id || null,
        };
        console.log("🚀 ~ createOrderExpires ~ data:", data);

        const res = await this.$store.dispatch("createNewOrder", data);
        //console.log("🚀 ~ createOrder ~ res:", res);
        if (res?.data?.createOrder) {
          const response = await this.$sdk.order_graphQL.getOrderDetail(
            res?.data?.createOrder?.id
          );

          this.$router.push(
            `/thanh-toan/${res?.data?.createOrder?.id}?userId=${id}&type=${
              this.type
            }${
              this.$route.query.store ? `&store=${this.$route.query.store}` : ""
            }`
          );
        } else {
          this.isDisable = false;
          this.loading = false;
          this.$toast.error("Tạo đơn không thành công");
        }
      } catch (error) {
        console.log("🚀 ~ createOrder ~ error:", error);
        this.isDisable = false;
        this.loading = false;
        this.$toast.error(error, {});
      }
    },

    async tokenAmounious() {
      try {
        const response = await this.$sdk.auth.login({
          username: "anonymous",
          password: "anonymous",
          type: "PW",
        });
        if (response) {
          Cookies.set("token_anonymous", response?.accessToken);
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ tokenAmounious ~ error:", error);
        this.$toast.error(error, {});
      }
    },

    async handleUpdateDiscountMoney(orderId, orderItemId, requestData) {
      try {
        const tokenAnony = Cookies.get("token_anonymous");
        await this.$sdk.order.setToken(tokenAnony);
        const response = await this.$sdk.order.updateDiscountPriceInOrder(
          orderId,
          orderItemId,
          requestData
        );
        if (response) {
          return response;
        } else {
          return null;
        }
      } catch (error) {
        console.log("🚀 ~ handleUpdateDiscountMoney ~ error:", error);
        this.$toast.error(error, {});
      }
    },

    increase() {
      this.quantity++;
    },
    decrease() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    handleChangeOption() {
      this.$router
        .replace({ query: { ...this.$route.query, type: this.typeBuy } })
        .then(() => {
          this.$nuxt.refresh();
        });
    },

    handleChangeOptionSystem(item, id, name) {
      // console.log(
      //   "🚀 ~ handleChangeOptionSystem ~ this.productOption:",
      //   item,
      //   id,
      //   name,
      //   this.productOption
      // );
      if (item && id && name) {
        const json = {
          idOption: id,
          name: name,
          value: item,
        };

        // Kiểm tra xem có phần tử nào với idOption giống id hay không
        const checkIdOption = this.productOption?.findIndex(
          (c) => c.idOption == id
        );

        if (checkIdOption !== -1) {
          // Nếu tìm thấy phần tử, cập nhật giá trị
          this.productOption[checkIdOption].name = name;
          this.productOption[checkIdOption].value = item;
        } else {
          // Nếu không tìm thấy, thêm đối tượng mới vào
          this.productOption.push(json);
        }
      }
    },
    convertPrice(price) {
      //this.product.currency_code;
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      } else {
        return "0" + "đ";
      }
    },
  },
};
</script>

<style lang="scss" scope>
.button_submit {
  border-radius: 6px;
  padding: 6px;
  background: #f6f6f6;
  border: 1px solid #44ce6f;
  width: 100px;
  color: #44ce6f;
}

.panel_order_product {
  &:hover {
    border-radius: 6px;
    background-color: #efefef;
  }
}

.active_package {
  background: rgb(234, 255, 240);
  border-radius: 6px;
  &:hover {
    background-color: rgb(234, 255, 240);
  }
}

.label-radio-price {
  display: flex !important;
  justify-content: space-between;
  width: 100%;
}

.is-mobile {
  display: none;
}

@media (max-width: 768px) {
  .fontSize12 {
    font-size: 12px !important;
  }

  .is-mobile {
    display: block;

    .cart-header {
      label {
        padding-left: 0;
      }
    }
  }

  .is-pc {
    display: none;
  }
}

.custom-form-box {
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;

  .custom_min_height {
    min-height: 130px;
  }
}

.custom-span {
  color: red;
  font-size: 12px;
  position: relative;
  bottom: 5px;
}

.custom-radio input {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  border: 1px solid #bbb;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  z-index: 2;
}

.custom-radio-active input {
  border: 1px solid #4caf50 !important;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
  z-index: 2;
}

// .custom-radio::before {
//   content: "";
//   width: 15px;
//   height: 15px;
//   border-radius: 50%;
//   background-color: transparent;
//   border: 1px solid #4caf50; /* Màu xanh lá khi được chọn */
//   position: absolute;
//   top: -2px;
//   left: -2px;
//   z-index: 1;
// }

.custom-radio input:checked::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  //border: 1px solid #4caf50 !important;
  background-color: #4caf50;
  /* Màu xanh lá khi được chọn */
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.active-time-rent {
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  border-top-width: 4px !important;
  color: #2bb456;
}

.active-time-rent-bg {
  background-color: rgba(68, 206, 112) !important;
  transition: background-color 0.5s ease;

  .product-body-title {
    h3 {
      color: #fff;
      font-weight: 500;
      font-size: 18px;
      line-height: 26px;
      text-align: center;
      // color: #44ce6f;
      cursor: pointer;
      //min-height: 50px;
      //max-height: 50px;
      margin-bottom: 0px;

      padding: 5px 10px;
    }
  }
}

.cartTimeRent {
  border: 1px solid #ddd;
  border-top-width: 4px;
  padding: 24px 0;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 20px;
  }
}

.active-time-rent-green {
  //background: #5fd2835c;
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  border-top-width: 4px !important;
  // color: #2bb456;
}

.active-payment {
  border-color: rgb(68, 206, 111) !important;
  border: 1px solid rgb(68, 206, 111) !important;
  //border-top-width: 4px !important;
}

.cartTimeRent {
  border: 1px solid #ddd;
  border-top-width: 4px;
  padding: 24px 0 24px 0;
  cursor: pointer;
  border-radius: 5px;
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

// .sticky-column {
//   // padding: 15px;
//   // background-color: #f0f0f0;
//   transition: top 0.3s; /* Thêm hiệu ứng khi sticky */
//   position: absolute; /* Ban đầu đặt vị trí tuyệt đối */
// }

// .sticky {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 1000; /* Đảm bảo phần tử không bị chồng lấn */
//   width: auto; /* Không thay đổi chiều rộng */
//   max-width: 33.33333%; /* Giới hạn chiều rộng */
// }
</style>
