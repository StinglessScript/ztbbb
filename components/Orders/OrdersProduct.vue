<template>
  <div class="index cart">
    <div
      v-if="loadingCreateOrder"
      style="
        position: fixed;
        background-color: rgba(155, 151, 151, 0.26);
        z-index: 999;
        width: 100%;
        height: 100%;
        top: 0;
      "
    >
      <div class="logo-bg"></div>
      <div class="loader-bg"></div>
    </div>
    <div class="cart-area">
      <div class="container">
        <div style="position: relative">
          <div
            class="row justify-content-center"
            style="padding-top: 30px !important; padding-bottom: 30px"
          >
            <div class="col-12 col-md-12">
              <div>
                <div class="row justify-content-center gap-1 gap-lg-0">
                  <div class="col-lg-8 col-md-8 p-1">
                    <div
                      class="cart-items border-bottom"
                      style="min-height: 452px; padding-bottom: 24px"
                    >
                      <div>
                        <div class="mb-4">
                          <div class="footer-card">
                            <div class="sub-title-card">
                              <div
                                style="font-weight: 600; padding-bottom: 12px"
                              >
                                <!-- Sản phẩm liên quan -->
                                {{ product?.qualify?.replace(/_/g, " ") }}
                              </div>
                            </div>
                            <div class="row">
                              <div
                                v-for="item in displayedProducts"
                                class="col-lg-4 col-md-6 col-sm-6 pt-2 px-1"
                              >
                                <div
                                  style="height: 100%; width: 100%"
                                  @click="handleChangePackage(item)"
                                >
                                  <div
                                    class="product-card cartTimeRent mb-0"
                                    :class="
                                      productId == item.id
                                        ? 'active-time-rent active-time-rent-bg'
                                        : ''
                                    "
                                    style="padding: 1px; gap: 5px"
                                  >
                                    <div class="product-body-title">
                                      <h3>
                                        {{ item.title }}
                                      </h3>
                                    </div>
                                    <div
                                      class="product-body"
                                      style="
                                        padding-left: 16px;
                                        padding-right: 16px;
                                        padding-top: 5px;
                                        border: 1px solid white;
                                        border-radius: 6px;
                                      "
                                    >
                                      <div class="top-card">
                                        <div class="product-body-description">
                                          <p
                                            class="description-content"
                                            v-html="item.shortDescription"
                                          ></p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <!-- Nút "Xem thêm" -->
                              <div
                                v-if="
                                  productGroups.length > 3 &&
                                  visibleCount < productGroups.length
                                "
                                class="col-12 text-center my-3 checkout-btn"
                              >
                                <button
                                  @click="showMore"
                                  class="btn btn-primary-custom"
                                  style="border-radius: 6px"
                                >
                                  Xem thêm
                                </button>
                              </div>

                              <!-- Nút "Rút gọn" -->
                              <div
                                v-if="visibleCount > 3"
                                class="col-12 text-center my-3 checkout-btn"
                              >
                                <button
                                  @click="showLess"
                                  class="btn btn-primary-custom"
                                  style="border-radius: 6px"
                                >
                                  Rút gọn
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row mb-2">
                          <template v-for="(item, index) in productOption">
                            <div
                              class="col-lg-6 col-12"
                              v-if="
                                item?.subType == null ||
                                item?.subType == 'SELECT'
                              "
                            >
                              <div>
                                <ProductOS
                                  :value="parmasOs"
                                  :operatingSystems="item"
                                  :checkQualify="checkQualify"
                                  :product="product"
                                  :selectedSystem="selectedSystem"
                                  :loadingOperatingSystem="false"
                                  @handleChangeOptionSystem="
                                    handleChangeOptionSystem
                                  "
                                  :index="index"
                                  :widthSelect="100"
                                />
                              </div>
                            </div>
                            <div
                              class="col-lg-6 col-12"
                              v-if="item?.subType == 'INPUT'"
                            >
                              <ProductInput
                                :value="''"
                                :operatingSystems="item"
                                :checkQualify="checkQualify"
                                :product="product"
                                :selectedSystem="selectedSystem"
                                :loadingOperatingSystem="false"
                                @handleChangeOptionSystem="
                                  handleChangeOptionSystem
                                "
                                :index="index"
                                :widthSelect="100"
                              />
                            </div>
                          </template>
                        </div>
                      </div>

                      <div style="padding-bottom: 10px; padding-top: 10px">
                        <div class="footer-card">
                          <div class="sub-title-card">
                            <div style="font-weight: 600; padding-bottom: 12px">
                              Thời gian cho thuê
                              <span class="custom-span">*</span>
                            </div>
                          </div>
                          <div
                            class="d-flex justify-content-between"
                            style="width: 100%"
                          >
                            <div
                              class="d-md-grid d-flex flex-column justify-content-center custom-form-box"
                            >
                              <div
                                class=""
                                v-for="item in sortProductPrices"
                                :key="item.id"
                              >
                                <div
                                  class="cartTimeRent custom_min_height"
                                  :class="[
                                    item?.id == rent?.id && 'active-time-rent',
                                    item?.priceDiscount > 0 && 'custome_pb_10',
                                  ]"
                                  @click="handleChangeOptionRent(item)"
                                >
                                  <div
                                    class="d-flex gap-2 custom-radio justify-content-evenly"
                                  >
                                    <!-- :class="
                                      item?.id == rent?.id &&
                                      'custom-radio-active'
                                    " -->
                                    <input
                                      type="radio"
                                      :value="item"
                                      :id="item?.id"
                                      v-model="rent"
                                      :checked="
                                        item?.id == rent?.id ? true : false
                                      "
                                    />
                                    <div
                                      class="d-flex justify-content-center align-items-center flex-column"
                                      style="font-weight: 600"
                                      :for="item?.id"
                                    >
                                      <span
                                        >Thuê {{ item?.time }}
                                        {{ item?.unitDTO_name }}</span
                                      >
                                      <span class="price-color d-flex gap-2">
                                        {{
                                          convertPrice(parseInt(item?.price))
                                        }}
                                        / {{ item?.unitDTO_name }}
                                      </span>
                                    </div>
                                    <span style="width: 14px"></span>
                                  </div>
                                  <div
                                    v-if="item?.priceDiscount > 0"
                                    class="d-flex justify-content-center w-100 custome_pt_5 text-center"
                                  >
                                    <div class="discount-color">
                                      <span>Tiết kiệm</span>
                                      <span>{{
                                        convertPrice(
                                          parseInt(
                                            item?.priceDiscount * item?.time
                                          )
                                        )
                                      }}</span>
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

                  <div class="col-lg-4 col-md-4 d-flex gap-2 flex-column p-1">
                    <template v-if="!$store.getters.getUser">
                      <div class="cart-items" style="height: auto">
                        <div style="font-weight: 600; padding-bottom: 12px">
                          Thông tin khách hàng
                        </div>
                        <div v-if="isOpenFormKH">
                          <div>
                            <div class="row flex-column">
                              <div class="col-12">
                                <div class="form-outline mb-2">
                                  <ValidationProvider
                                    mode="lazy"
                                    rules="required"
                                    v-slot="{ errors }"
                                  >
                                    <label class="form-label" for="name"
                                      ><span>
                                        <span>Họ và tên</span>
                                        <span style="color: red">*</span>
                                      </span>
                                      <span style="color: red">{{
                                        errors[0]
                                      }}</span>
                                    </label>
                                    <input
                                      id="name"
                                      v-model="user.fullName"
                                      type="name"
                                      class="form-control"
                                      style="height: 35px; min-height: 35px"
                                      ref="nameInput"
                                      @focus="handleFocus('name')"
                                      @blur="handleBlur('name')"
                                    />
                                  </ValidationProvider>
                                </div>
                              </div>
                              <div class="col-12">
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

                                      <span style="color: red">{{
                                        errors[0]
                                      }}</span>
                                    </label>
                                    <input
                                      id="phone"
                                      v-model="user.phone"
                                      type="text"
                                      class="form-control"
                                      style="height: 35px; min-height: 35px"
                                      @focus="handleFocus('phone')"
                                      @blur="handleBlur('phone')"
                                    />
                                  </ValidationProvider>
                                </div>
                              </div>
                            </div>
                          </div>
                          <LoginSocialNoTitle v-if="!$store.getters.getUser" />
                        </div>
                        <div v-else>
                          <div class="row flex-column">
                            <div class="col-12">
                              <div>
                                <div
                                  @click="handleOpenFormKH"
                                  style="cursor: pointer"
                                >
                                  <span style="font-weight: bold"
                                    >Họ và tên:</span
                                  >
                                  <span
                                    style="
                                      color: #44ce6f;
                                      text-decoration: underline;
                                    "
                                    >{{ user.fullName }}</span
                                  >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="#44ce6f"
                                        d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 0 1-.699.409l-5.523 1.68a.75.75 0 0 1-.747-.188a.75.75 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154l4.177-1.271a.25.25 0 0 0 .1-.059l10.273-9.806l-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div class="col-12">
                              <div>
                                <div
                                  @click="handleOpenFormKH"
                                  style="cursor: pointer"
                                >
                                  <span style="font-weight: bold"
                                    >Số điện thoại:</span
                                  >
                                  <span
                                    style="
                                      color: #44ce6f;
                                      text-decoration: underline;
                                    "
                                    >{{ user.phone }}</span
                                  >
                                  <span>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        fill="#44ce6f"
                                        d="M17.263 2.177a1.75 1.75 0 0 1 2.474 0l2.586 2.586a1.75 1.75 0 0 1 0 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 0 1-.699.409l-5.523 1.68a.75.75 0 0 1-.747-.188a.75.75 0 0 1-.188-.747l1.673-5.5a1.75 1.75 0 0 1 .466-.756L14.476 4.963ZM4.708 16.361a.26.26 0 0 0-.067.108l-1.264 4.154l4.177-1.271a.25.25 0 0 0 .1-.059l10.273-9.806l-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 0 0 0-.354l-2.586-2.586a.25.25 0 0 0-.354 0L16.061 5.5Z"
                                      />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="cart-items text-center"
                        style="height: auto; padding: 18px 20px"
                      >
                        Xin chào khách hàng
                        <span style="font-weight: 600; color: #44ce6f">{{
                          user.fullName
                        }}</span>
                        đã đến với dịch vụ
                        <span style="font-weight: 600; color: #44ce6f"
                          >Long Vân Systems</span
                        >
                      </div>
                    </template>
                    <div class="cart-items" style="min-height: 200px">
                      <div style="font-weight: 600; padding-bottom: 12px">
                        Thông tin chi tiết
                      </div>
                      <div
                        class="d-flex flex-column gap-2"
                        style="border-bottom: 1px dotted #dee2e6"
                        v-for="(item, index) in order.lineItems"
                        :key="index"
                      >
                        <div class="d-flex justify-content-between py-1">
                          <div
                            class="d-flex flex-column gap-2"
                            style="width: 100%"
                          >
                            <template v-if="Array.isArray(item?.product)">
                              <div
                                v-for="(item2, idx) in item?.product"
                                :key="idx"
                              >
                                <div
                                  v-if="idx == 0"
                                  class="d-flex justify-content-between"
                                >
                                  <div>
                                    <div
                                      class="d-flex gap-1 title-name"
                                      style="cursor: pointer"
                                      @click="
                                        item2.id == products.id &&
                                          handleShowModal(item2)
                                      "
                                    >
                                      <div style="font-size: 14px">
                                        {{ formattedText(item2?.title) }}
                                      </div>
                                    </div>

                                    <!-- Chỉ hiển thị số lượng dưới sản phẩm đầu tiên -->
                                    <div
                                      v-if="idx == 0"
                                      style="
                                        color: #2bb456;
                                        font-weight: 600;
                                        padding-top: 0.5rem;
                                      "
                                    >
                                      <span style="font-size: 12px">x</span>
                                      {{ item?.quantity?.time }}
                                      {{ item?.quantity?.unitDTO_name }}
                                    </div>
                                    <span
                                      v-if="
                                        item2.shortDescription ||
                                        item2.short_description
                                      "
                                      @click="handleShowModal(item2)"
                                      style="
                                        color: #44ce6f;
                                        font-size: 14px;
                                        text-decoration: underline;
                                        cursor: pointer;
                                        padding-top: 0.5rem;
                                      "
                                      >Xem chi tiết</span
                                    >
                                  </div>
                                  <div>
                                    <div
                                      style="color: #2bb456; font-weight: 600"
                                    >
                                      {{
                                        convertPrice(
                                          (priceProductRentTime
                                            .find((c) => c.id == item2.id)
                                            ?.data.find(
                                              (d) =>
                                                d.time == item?.quantity?.time
                                            )?.price || 0) *
                                            item?.quantity?.time
                                        )
                                      }}
                                    </div>
                                  </div>
                                </div>
                                <div v-else>
                                  <div class="d-flex justify-content-between">
                                    <div
                                      class="d-flex gap-1 title-name"
                                      style="cursor: pointer"
                                    >
                                      <div style="font-size: 14px">
                                        {{ formattedText(item2?.title) }}
                                      </div>
                                    </div>
                                    <div class="d-flex flex-column">
                                      <div
                                        style="color: #2bb456; font-weight: 600"
                                      >
                                        {{
                                          convertPrice(
                                            (priceProductRentTime
                                              .find((c) => c.id == item2.id)
                                              ?.data.find(
                                                (d) =>
                                                  d.time == item?.quantity?.time
                                              )?.price || 0) *
                                              item?.quantity?.time
                                          )
                                        }}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </template>

                            <template v-else>
                              <div
                                class="d-flex justify-content-between w-full"
                              >
                                <div>
                                  <div
                                    class="d-flex gap-1 title-name"
                                    style="cursor: pointer"
                                    @click="handleShowModal(item)"
                                  >
                                    <div style="font-size: 14px">
                                      {{ formattedText(item?.product?.title) }}
                                    </div>
                                  </div>
                                  <div style="color: #2bb456; font-weight: 600">
                                    <span style="font-size: 12px">x</span>
                                    {{ item?.quantity?.time }}
                                    {{ item?.quantity?.unitDTO_name }}
                                  </div>
                                </div>
                                <div>
                                  <div style="color: #2bb456; font-weight: 600">
                                    {{
                                      convertPrice(
                                        (priceProductRentTime
                                          .find(
                                            (c) => c.id == item?.product?.id
                                          )
                                          ?.data.find(
                                            (d) =>
                                              d.time == item?.quantity?.time
                                          )?.price || 0) * item?.quantity?.time
                                      )
                                    }}
                                  </div>
                                </div>
                              </div>
                            </template>

                            <span
                              v-if="
                                !Array.isArray(item?.product) &&
                                product.shortDescription
                              "
                              @click="handleShowModal(item)"
                              style="
                                color: #44ce6f;
                                font-size: 14px;
                                text-decoration: underline;
                                cursor: pointer;
                              "
                              >Xem chi tiết</span
                            >

                            <div
                              v-if="item?.quantity?.priceDiscount > 0"
                              class="d-flex justify-content-between w-full"
                            >
                              <div
                                class="d-flex gap-1 title-name"
                                style="cursor: pointer"
                              >
                                <div style="font-size: 14px">
                                  Trước khi giảm
                                </div>
                              </div>
                              <del
                                style="
                                  text-decoration: line-through;
                                  font-size: 14px;
                                  font-weight: normal;
                                  color: #333;
                                "
                              >
                                {{
                                  convertPrice(
                                    (product?.price +
                                      (productPlace?.price || 0)) *
                                      item?.quantity?.time
                                  )
                                }}
                              </del>
                            </div>
                          </div>

                          <!-- <div
                            class="d-flex flex-column"
                            :class="
                              item?.quantity?.priceDiscount > 0 &&
                              Array.isArray(item?.product)
                                ? 'justify-content-between'
                                : 'justify-content-end align-items-end'
                            "
                          >
                            <template v-if="Array.isArray(item?.product)">
                              <div
                                style="color: #2bb456; font-weight: 600"
                                v-for="item3 in item?.product"
                              >
                                {{
                                  convertPrice(
                                    calculatePrice(
                                      item3.id,
                                      item3?.variants[0].price,
                                      item?.quantity?.time,
                                      item?.quantity?.priceDiscount
                                    )
                                  )
                                }}
                              </div>
                            </template>
                            <template v-else>
                              {{
                                convertPrice(
                                  calculatePrice(
                                    item?.product?.id,
                                    item?.product?.variants[0].price,
                                    item?.quantity?.time,
                                    item?.quantity?.priceDiscount
                                  )
                                )
                              }}
                            </template>

                            <del
                              style="
                                text-decoration: line-through;
                                font-size: 14px;
                                font-weight: normal;
                                color: #333;
                              "
                              v-if="item?.quantity?.priceDiscount > 0"
                            >
                              {{
                                convertPrice(
                                  (product?.price + productPlace?.price) *
                                    item?.quantity?.time
                                )
                              }}
                            </del>
                          </div> -->
                        </div>

                        <!-- Di chuyển "Xem chi tiết" lên ngay dưới tên sản phẩm -->

                        <div
                          v-for="(
                            itemOption, indexOption
                          ) in item.productOption"
                          :key="indexOption"
                        >
                          <div class="d-flex flex-column gap-2 py-1">
                            <template>
                              <div>
                                {{ itemOption?.name }}: {{ " " }}
                                {{ formattedText(itemOption?.title) }}
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>

                      <div class="row" style="padding-top: 24px">
                        <div class="col-8">
                          <div class="d-flex flex-column gap-2">
                            <div>Tổng tiền (chưa VAT):</div>
                            <div>VAT:</div>
                            <div style="font-weight: 600; color: #2bb456">
                              Thành tiền:
                            </div>
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="d-flex align-items-end flex-column gap-2">
                            <div>
                              {{ convertPrice(totalPrice(order?.lineItems)) }}
                            </div>
                            <div>
                              {{ convertPrice(totalVAT(order?.lineItems)) }}
                            </div>
                            <div style="color: #2bb456; font-weight: 600">
                              {{
                                convertPrice(
                                  totalPrice(order?.lineItems) +
                                    totalVAT(order?.lineItems)
                                )
                              }}
                            </div>
                          </div>
                        </div>
                        <div
                          class="checkout-action-button"
                          style="padding: 15px 0 0 0 !important"
                        >
                          <div
                            class="btn btn-primary checkout-btn"
                            style="
                              width: 524px;
                              padding: 12px 24px;
                              cursor: default;
                            "
                            v-if="loadingCreateOrder"
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
                            @click="handleValidate"
                          >
                            Tạo đơn
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
      </div>
    </div>
    <template v-if="openModalShortDes == true && product.shortDescription">
      <ModalShortDescription
        :handleShowModal="handleShowModal"
        :dataProduct="shortDescription"
      />
    </template>
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle";
import Cookies from "js-cookie";
import SVGDelete from "~/assets/img/remove.svg";
import SVGCart2 from "~/assets/img/cart-2.svg";
import SVGCart1 from "~/assets/img/1.svg";
import ViewPayment from "@/components/Checkout/ViewPayment";
import { data } from "~/utils/imagesPayment.js";
import AlreadyPaymentSuccess from "@/components/AlreadyPaymentSuccess";
import ProductOS from "../../components/Product/ProductOS.vue";
import ProductInput from "../../components/Product/ProductInput.vue";
import ModalShortDescription from "@/components/Modal/ModalShortDescription";
import LoginSocialNoTitle from "@/components/Auth/LoginSocialNoTitleV2.vue";

export default {
  //name: "Cart",
  props: [
    "products",
    "productOptionSSR",
    "productRentalDiscountSSR",
    "productGroups",
  ],
  data() {
    return {
      user: {},
      name: "",
      phone: "",
      email: "",
      note: "",
      carts: null,
      product: {},
      parsedobj: null,
      productParse: {},
      items: [],
      idOp: [],
      id: null,
      toggle: false,
      demo: false,
      showLoader: true,
      loading: false,
      orderId: "",
      isNextStep: false,
      //order: {},
      quantity: 1,
      paymentMethods: [],
      loadingForm: false,
      loadingCreateOrder: false,
      idActive: "",
      paymentItem: "",
      selectedSystem: "",
      operatingSystems: [],
      sortProductPrices: [],
      rent: null,
      quantityYearRent: 1,
      productPlace: null,
      paymentCode: null,
      selectOptionSystem: null,
      maxNumberByDefault: 1,
      disable: false,
      serviceId: null,
      serviceDetail: null,
      show: false,
      moneyProductQuantityPromotionAction: [],
      customTime: [],
      allProductUnit: [],
      customTimeMonth: [
        {
          id: 1,
          time: 1,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 3,
          time: 3,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 6,
          time: 6,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 12,
          time: 12,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
        {
          id: 24,
          time: 24,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "THANG",
          unitDTO_name: "THANG",
        },
      ],

      customTimeYear: [
        {
          id: 1,
          time: 1,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
        {
          id: 2,
          time: 2,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
        {
          id: 3,
          time: 3,
          price: 0,
          priceDiscount: 0,
          unitDTO_id: "NAM",
          unitDTO_name: "NAM",
        },
      ],

      idProductOption: null,

      dataOptionProduct: [],

      openModalShortDes: false,
      dataProduct: {},
      listProduct: [],

      productSelect: [],

      order: [],
      rawOrder: [],
      productId: null,
      focusedInputs: new Set(),

      isOpenFormKH: true,
      blurTimeout: null,
      visibleCount: 3,

      priceDiscount: [],
      inputDomain: "",
      productRentalDiscount: [],
      shortDescription: null,
      isChange: false,

      priceProductRentTime: [],

      oldProductOption: [],
      productOption: [],
    };
  },

  components: {
    SVGDelete,
    SVGCart2,
    SVGCart1,
    PageTitle,
    ViewPayment,
    AlreadyPaymentSuccess,
    LoginSocialNoTitle,
  },
  computed: {
    type() {
      return this.$route.query.type || "";
    },

    parmasOs() {
      const value = this.$route.query.os || "";
      return { value };
    },
    displayedProducts() {
      // Trả về các sản phẩm hiện đang được hiển thị
      return this.productGroups.slice(0, this.visibleCount);
    },
  },

  mounted() {
    if (this.productOptionSSR) {
      this.productOption = this.productOptionSSR;
    }
    if (this.productRentalDiscountSSR) {
      this.productRentalDiscount = this.productRentalDiscountSSR;
    }
    if (this.products) {
      //console.log("🚀 ~ mounted ~ this.products:", this.products);
      if (this.products?.qualify == "BARE_METAL") {
        this.handleGetProductColocation(this.products);
      } else {
        this.handleUpdateProduct(this.products);
      }
    }

    if (this.$route.query.os) {
      const filterProductOption = this.productOption?.find((c) =>
        c.productFeatureDTOS?.some((d) => d.productId == this.$route.query.os)
      );
      //console.log("🚀 ~ mounted ~ filterProductOption:", filterProductOption);
      this.handleChangeOptionSystem(
        this.$route.query.os,
        filterProductOption?.id,
        filterProductOption?.name,
        2
      );
    }

    if (this.$store.getters.getUser) {
      this.user = this.$store.getters.getUser;
    }
  },

  methods: {
    handleChangePackage(item) {
      this.productId = item.id;
      this.isChange = true;
    },

    async handleGetProductOption(id) {
      try {
        const response = await this.$sdk.product.getProductOption(id);
        if (response) {
          const formattedOptions = response.map((data) => ({
            id: data.id,
            name: data.name,
            productFeatureDTOS: data.productFeatureDTOS.flatMap(
              (feature) =>
                feature?.productOptionGroupItemDTOS?.map((item) => ({
                  id: item.id,
                  productId: item.productId,
                  productName: item.productName,
                  price: item.price,
                })) || []
            ),
            requireData: data.requireData,
            subType: data.subType,
          }));
          this.productOption = formattedOptions;
        }
      } catch (error) {
        console.log("🚀 ~ handleGetProductOption ~ error:", error);
      }
    },

    async handleGetMoneyDiscount(products, customTime) {
      try {
        this.productRentalDiscount = [];
        const response =
          await this.$sdk.crm_camping.searchProductQuantityPromotionAction(
            products.id
          );
        //console.log("🚀 ~ handleGetMoneyDiscount ~ response:", response);
        if (response[products.id]?.length > 0) {
          this.productRentalDiscount = response[products.id];
          this.getSortProductPrices(
            products,
            customTime,
            this.productRentalDiscount
          );
        } else {
          this.getSortProductPrices(
            products,
            customTime,
            this.productRentalDiscount
          );
        }
      } catch (error) {
        console.log("🚀 ~ handleGetMoneyDiscount ~ error:", error);
      }
    },

    async handleGetProductColocation(products) {
      try {
        this.customTime = [];
        this.productPlace = null;
        this.handleUpdateProduct(products);
        if (
          products?.productAttributes?.find(
            (c) => c.attributeName == "COLOCATION"
          )?.attributeValue
        ) {
          const response = await this.$store.dispatch(
            "getProductById",
            products?.productAttributes?.find(
              (c) => c.attributeName == "COLOCATION"
            )?.attributeValue
          );
          if (response.data.status != 0) {
            this.productPlace = response.data;

            this.customTime =
              this.product?.unitDTO?.name?.toLowerCase() == "tháng"
                ? this.customTimeMonth
                : this.customTimeYear;

            const data = {
              ...this.productPlace,
              number: 12,
              type: "Product",
            };
            this.handleGetMoneyDiscount(this.productPlace, this.customTime);
            //this.getSortProductPrices();
            this.handleUpdateOrder(data);
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleGetProductColocation ~ error:", error);
        //this.$toast.error(error);
      }
    },

    calculatePrice(id, price, time, discount) {
      // if (Array.isArray(this.order.lineItems[0]?.product)) {
      //   // Tính giá sau chiết khấu
      //   const effectivePrice = price - (discount || 0);
      //   const data = effectivePrice * time;

      //   // Cập nhật danh sách chiết khấu
      //   const existingDiscount = this.priceDiscount.find((c) => c.id == id);
      //   if (existingDiscount) {
      //     existingDiscount.price = effectivePrice; // Cập nhật giá chiết khấu
      //   } else {
      //     this.priceDiscount.push({
      //       id,
      //       price: effectivePrice, // Thêm mới nếu chưa tồn tại
      //     });
      //   }

      //   // In ra danh sách chiết khấu nếu cần (comment lại nếu không cần)
      //   // console.log("🚀 ~ calculatePrice ~ this.priceDiscount:", this.priceDiscount);

      //   return data; // Trả về giá sau chiết khấu
      // } else {
      //   const data = price * time - (discount * time || 0);

      //   this.priceDiscount = price - discount;
      //   // console.log(
      //   //   "🚀 ~ calculatePrice ~ this.priceDiscount:",
      //   //   this.priceDiscount
      //   // );
      //   return data;
      // }
      // Tính giá sau chiết khấu
      const effectivePrice = price - (discount || 0);
      const data = effectivePrice * time;

      // Cập nhật danh sách chiết khấu
      const existingDiscount = this.priceDiscount.find((c) => c.id == id);
      if (existingDiscount) {
        existingDiscount.price = effectivePrice; // Cập nhật giá chiết khấu
      } else {
        this.priceDiscount.push({
          id,
          price: effectivePrice, // Thêm mới nếu chưa tồn tại
        });
      }

      // In ra danh sách chiết khấu nếu cần (comment lại nếu không cần)
      // console.log("🚀 ~ calculatePrice ~ this.priceDiscount:", this.priceDiscount);

      return data; // Trả về giá sau chiết khấu
    },
    handleValidate() {
      const order = this.order?.lineItems[0];
      const requiredOptions =
        this.productOption?.filter((c) => c.requireData) || [];
      const orderOptions = order?.productOption || [];

      const missingOptions = requiredOptions.filter(
        (reqOption) =>
          !orderOptions.some((orderOption) => orderOption.id === reqOption.id)
      );

      if (missingOptions.length > 0) {
        this.$toast.error(
          `Vui lòng chọn ${this.formatMissingNames(missingOptions)}`
        );
      } else if (!this.user?.fullName || !this.user.phone) {
        this.$toast.error("Vui lòng điền đầy đủ thông tin khách hàng");
      } else {
        this.handleValidateUser();
      }
    },

    formatMissingNames(options) {
      const names = options.map((option) => option.name);
      if (names.length === 0) return "";
      if (names.length === 1) return names[0];
      if (names.length === 2) return names.join(" và ");
      return names.slice(0, -1).join(", ") + " và " + names[names.length - 1];
    },

    async handleValidateUser() {
      try {
        const payloadCustomer = {
          name: this.user?.fullName,
          phone: this.user?.phone,
        };

        if (this.$store.getters.getUser) {
          Cookies.set("authInfo", JSON.stringify(this.$store.getters.getUser));
          this.handleCreateOrder(this.user?.partyId);
        } else {
          const resCustomer = await this.$store.dispatch(
            "createCustomerV2",
            payloadCustomer
          );

          if (resCustomer?.data?.createCustomerV2 != null) {
            const data = {
              partyId: resCustomer?.data?.createCustomerV2?.id,
              fullName: resCustomer?.data?.createCustomerV2?.name,
              ...resCustomer?.data?.createCustomerV2,
            };
            Cookies.set("authInfo", JSON.stringify(data));
            this.handleCreateOrder(resCustomer?.data?.createCustomerV2?.id);
          } else {
            if (resCustomer.errors[0].message == "Số điện thoại đã tồn tại") {
              const resCustomerByPhone = await this.$store.dispatch(
                "getCustomerByPhone",
                this.user.phone
              );
              if (resCustomerByPhone?.data?.getCustomerByPhone?.id) {
                const data = {
                  partyId: resCustomerByPhone?.data?.getCustomerByPhone?.id,
                  fullName: resCustomerByPhone?.data?.getCustomerByPhone?.name,
                  ...resCustomerByPhone?.data?.getCustomerByPhone,
                };
                Cookies.set("authInfo", JSON.stringify(data));
                this.handleCreateOrder(
                  resCustomerByPhone?.data?.getCustomerByPhone?.id
                );
              }
            }
          }
        }
      } catch (error) {
        this.$toast.error(error);
      }
    },

    async handleCreateOrder(id) {
      try {
        this.loadingCreateOrder = true;
        const order = this.order?.lineItems[0];
        const productOptions = order?.productOption?.map((c) => ({
          idOption: c.id,
          name: c.name,
          value: c.productId,
        }));
        // console.log(
        //   "🚀 ~ mapData ~ this.priceDiscount:",
        //   order.product,
        //   this.priceDiscount
        // );
        let mapData = [];

        if (Array.isArray(order.product)) {
          const temp = order.product?.map((c) => {
            const discount =
              this.priceProductRentTime
                ?.find((d) => d.id == c.id)
                ?.data.find((d) => d.time == order?.quantity?.time)?.price || 0;

            //console.log(`Checking price for product ID ${c.id}:`, discount); // In ra để kiểm tra

            const item = {
              quantity: order?.quantity?.time,
              variant: {
                id: c?.id,
                product: { id: c?.id },
                price: {
                  amount: discount || 0, // Trả về 0 nếu không tìm thấy giá
                  currencyCode: "VND",
                },
                unitPrice: {
                  amount: c?.price || 0, // Trả về 0 nếu không tìm thấy giá
                  currencyCode: "VND",
                },
              },
              customAttributes: [{ key: "SERVICE_TYPE", value: c?.qualify }],
              unitType: c?.unitDTO?.id,
              orderStatus: 10,
            };

            // Chỉ thêm productOptions nếu c.id bằng productId
            if (c.id == this.productId) {
              item.productOptions = productOptions;
            }

            return item;
          });
          mapData = temp;
        }

        //console.log("🚀 ~ handleCreateOrder ~ data:", this.priceDiscount);

        const data = {
          order: {
            shopId: process.env.STORE_ID,
            ownerPartyId: id,
            orderType: "SERVICE",
          },
          orderLineItems: Array.isArray(order.product)
            ? mapData
            : [
                {
                  quantity: order?.quantity?.time,
                  variant: {
                    id: order.product?.id,
                    product: { id: order.product?.id },
                    price: {
                      amount: order?.quantity?.price,
                      currencyCode: "VND",
                    },
                    unitPrice: {
                      amount: order?.product?.price || 0, // Trả về 0 nếu không tìm thấy giá
                      currencyCode: "VND",
                    },
                  },
                  customAttributes: [
                    { key: "SERVICE_TYPE", value: order.product?.qualify },
                  ],
                  unitType: order.product?.unitDTO?.id,
                  productOptions,
                  orderStatus: 10,
                },
              ],
          byUser: id,
        };

        const response = await this.$sdk.order_graphQL.createOrder(data);
        // console.log("🚀 ~ handleCreateOrder ~ data:", data)
        if (response) {
          this.$router.push(
            `/thanh-toan/${response?.id}?userId=${id}&type=${this.type}`
          );
        }
      } catch (error) {
        this.$toast.error(error);
        this.loadingCreateOrder = false;
      }
    },

    handleOpenFormKH() {
      this.isOpenFormKH = true;
    },
    handleFocus(field) {
      this.focusedInputs.add(field);

      if (this.blurTimeout) {
        clearTimeout(this.blurTimeout);
        this.blurTimeout = null;
      }
    },
    handleBlur(field) {
      this.focusedInputs.delete(field);

      // Kiểm tra sau khi mất focus nếu không còn trường input nào đang được focus
      this.$nextTick(() => {
        if (this.focusedInputs.size === 0) {
          if (this.user.fullName && this.user.phone) {
            this.blurTimeout = setTimeout(() => {
              console.log("All inputs lost focus");
              this.isOpenFormKH = false;
            }, 3000);
          }
        }
      });
    },

    autoFocusNameInput() {
      // Hàm để tự động focus vào trường input name
      this.$nextTick(() => {
        if (this.$refs.nameInput) {
          this.$refs.nameInput.focus();
        } else {
          console.error("Ref for nameInput not found");
        }
      });
    },
    handleUpdateProduct(product) {
      this.customTime = [];
      this.product = product;
      this.productId = this.product?.id;

      this.customTime =
        this.product?.unitDTO?.name?.toLowerCase() == "tháng"
          ? this.customTimeMonth
          : this.customTimeYear;

      const data = {
        ...this.product,
        type: "Product",
      };
      this.handleGetProductOption(this.productId);
      this.handleGetMoneyDiscount(product, this.customTime);
      //this.getSortProductPrices(this.customTime);
      this.handleUpdateOrder(data);
      // if (this.productRentalDiscount?.length > 0) {
      //   this.getSortProductPrices();
      // }
    },
    showMore() {
      this.visibleCount += 3; // Tăng số lượng sản phẩm hiển thị lên 2
    },
    showLess() {
      this.visibleCount = 3; // Rút gọn về 2 sản phẩm
      const selectedProduct = this.productGroups.find(
        (item) => item.id == this.productId
      );
      if (selectedProduct) {
        this.productGroups = this.productGroups.filter(
          (item) => item.id != this.productId
        );
        this.productGroups.unshift(selectedProduct);
      }
    },
    handleShowModal(item) {
      this.shortDescription = item;
      this.openModalShortDes = !this.openModalShortDes;
    },
    totalPrice(order) {
      //console.log("🚀 ~ totalPrice ~ order:", order);
      // Tính tổng giá trước thuế cho tất cả sản phẩm
      const total = order?.reduce((total, item) => {
        const price = item.quantity.price || 0;
        // this.priceDiscount?.reduce(
        //   (acc, product) => acc + (product.price || 0),
        //   0
        // );
        // Array.isArray(item.product)
        //   ? this.priceDiscount?.reduce(
        //       (acc, product) => acc + (product.price || 0),
        //       0
        //     )
        //   : item.product?.variants[0]?.price || 0;
        //console.log("🚀 ~ total ~ price:", item.product?.variants[0]?.price);
        const quantity = item.quantity?.time || 0;
        //console.log("🚀 ~ total ~ quantity:", quantity);
        return total + price * quantity;
      }, 0);

      return total;
    },

    totalVAT(order) {
      // Tính tổng VAT cho tất cả sản phẩm
      const total = order?.reduce((total, item) => {
        const price = item.quantity.price || 0;
        // this.priceDiscount?.reduce(
        //   (acc, product) => acc + (product.price || 0),
        //   0
        // );
        // Array.isArray(item.product)
        //   ? this.priceDiscount?.reduce(
        //       (acc, product) => acc + (product.price || 0),
        //       0
        //     )
        //   : item.product?.variants[0]?.price || 0;

        const quantity = item.quantity?.time || 0;

        // Lấy VAT cho từng sản phẩm
        const vatRate = Array.isArray(item.product)
          ? item.product.reduce((acc, product) => acc + (product.vat || 0), 0) /
            item.product.length // Tính VAT trung bình
          : item.product?.vat || 0;
        //console.log("🚀 ~ total ~ vatRate:", vatRate)
        return total + (price * quantity * vatRate) / 100;
      }, 0);

      return total || 0; // Trả về 0 nếu total là undefined
    },

    formattedText(text) {
      let trimmedTextLocation = "";
      if (text) {
        const locationDescription = text;

        if (
          typeof locationDescription == "string" &&
          locationDescription.trim() != ""
        ) {
          const wordsLocation = locationDescription.split(" ");
          trimmedTextLocation = wordsLocation.slice(0, 4).join(" ");

          if (wordsLocation.length > 4) {
            return (trimmedTextLocation += "...");
          } else if (wordsLocation.length <= 4) {
            return locationDescription;
          }
        }
      }
    },
    checkQualify(qualify) {
      switch (qualify) {
        case "CLOUD_LAB":
          return true;
        case "SMART_CLOUD_SERVER":
          return true;
        default:
          return false;
      }
    },

    getSortProductPrices(product, customTime, productRentalDiscount) {
      // console.log("🚀 ~ getSortProductPrices ~ customTime:", customTime);
      // console.log("🚀 ~ getSortProductPrices ~ product:", product?.id);
      const timeRent = JSON.parse(JSON.stringify(customTime));

      const data = timeRent?.map((c) => {
        const maxPercentDiscount = Math.max(
          ...productRentalDiscount
            ?.filter((d) => d?.minimumQuantity == c?.time)
            .map((item) => item?.percentDiscount || 0),
          0
        );

        const totalDiscount = (product?.price * maxPercentDiscount) / 100;
        const totalAfterDiscount = (product?.price || 0) - totalDiscount;

        return {
          ...c,
          price: totalAfterDiscount || 0,
          priceDiscount: totalDiscount || 0,
          unitDTO_id: product?.unitDTO?.id,
          unitDTO_name: product?.unitDTO?.name,
        };
      });
      // console.log(
      //   "🚀 ~ data ~ this.productRentalDiscount:",
      //   productRentalDiscount
      // );
      console.log("🚀 ~ data ~ data:", data);
      this.priceProductRentTime.push({ id: product.id, data: [...data] });
      const updateData = data.map((item) => ({
        ...item,
        number: 10,
        type: "Time",
      }));

      if (this.sortProductPrices.length > 1) {
        updateData.forEach((newItem) => {
          const existing = this.sortProductPrices.find(
            (existing) => existing.id == newItem.id
          );
          if (existing) {
            existing.price += newItem.price;
            existing.priceDiscount += newItem.priceDiscount;
          } else {
            this.sortProductPrices.push(newItem);
          }
        });
        const dataMinium = this.sortProductPrices?.find((c) => c.time == 12);
        //console.log("🚀 ~ getSortProductPrices ~ dataMinium:", dataMinium);

        this.rent = {
          ...dataMinium,
          number: 10,
          type: "Time",
        };

        this.handleUpdateOrder(this.rent);
      } else {
        // Nếu chỉ có 1 mục hoặc không có, thêm tất cả vào
        this.sortProductPrices.push(...updateData);

        const dataMinium = this.sortProductPrices?.find((c) => c.time == 12);
        //console.log("🚀 ~ getSortProductPrices ~ dataMinium:", dataMinium);

        this.rent = {
          ...dataMinium,
          number: 10,
          type: "Time",
        };

        this.handleUpdateOrder(this.rent);
      }
      // console.log(
      //   "🚀 ~ getSortProductPrices ~ this.sortProductPrices:",
      //   this.sortProductPrices
      // );

      //this.sortProductPrices = updateData;
    },

    handleChangeOptionRent(item) {
      this.rent = {
        ...item,
        number: 10,
        type: "Time",
      };
      this.handleUpdateOrder(this.rent);
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

    async handleChangeOptionSystem(dataSelect, id, name, index, type) {
      try {
        if (type == "input") {
          const data = {
            id,
            name,
            title: dataSelect,
            productId: dataSelect,
            number: index,
            type: "ProductOption",
          };

          this.handleUpdateOrder(data);
        } else {
          const response = await this.$sdk.product.getProductById(dataSelect);
          if (response) {
            const data = {
              id,
              name,
              title: response.title,
              productId: response.id,
              number: index,
              type: "ProductOption",
            };

            this.handleUpdateOrder(data);
          }
        }
      } catch (error) {
        console.log("🚀 ~ handleChangeOptionSystem ~ error:", error);
      }
    },

    handleUpdateOrder(data) {
      const index = this.rawOrder.findIndex(
        (item) => item.number == data.number
      );
      //console.log("🚀 ~ handleUpdateOrder ~ this.rawOrder:", this.rawOrder);

      if (index !== -1) {
        this.rawOrder.splice(index, 1, data);
        this.handleFormatData(this.rawOrder);
      } else {
        this.rawOrder.push(data);
        this.handleFormatData(this.rawOrder);
      }
    },

    handleFormatData(rawOrder) {
      //console.log("🚀 ~ handleFormatData ~ rawOrder:", rawOrder);
      const product = rawOrder?.filter((c) => c.type == "Product");
      const productOption = rawOrder?.filter((c) => c.type == "ProductOption");
      const timeRent = rawOrder?.filter((c) => c.type == "Time");

      // if (this.oldProductOption.length > 0) {
      //   if (productOption.length > 0) {
      //     // Cập nhật this.oldProductOption nếu có sự thay đổi
      //     productOption.forEach((newOption) => {
      //       const oldOptionIndex = this.oldProductOption.findIndex(
      //         (oldOption) => oldOption.id === newOption.id
      //       );
      //       if (oldOptionIndex !== -1) {
      //         // Nếu tìm thấy, cập nhật giá trị
      //         this.oldProductOption[oldOptionIndex] = {
      //           ...this.oldProductOption[oldOptionIndex],
      //           ...newOption,
      //         };
      //       } else {
      //         // Nếu không tìm thấy, thêm mới
      //         this.oldProductOption.push(newOption);
      //       }
      //     });
      //   }
      // } else {
      //   // Nếu this.oldProductOption rỗng, gán trực tiếp
      //   this.oldProductOption = productOption;
      // }

      const data = {
        lineItems: [
          {
            product:
              Array.isArray(product) && product.length > 1
                ? product
                : product[0],
            productOption: productOption,
            quantity: timeRent?.length == 1 ? timeRent[0] : timeRent,
          },
        ],
      };

      this.order = data;
      // console.log("🚀 ~ handleFormatData ~ this.order:", data);
    },
  },

  watch: {
    productId(newProduct, oldProduct) {
      console.log("🚀 ~ productId ~ newProduct:", newProduct, oldProduct);
      if (newProduct && this.isChange) {
        this.priceProductRentTime = [];
        this.sortProductPrices = [];
        this.rawOrder = [];
        this.order = [];
        this.productOption = [];
        const data = this.productGroups.find((c) => c.id == newProduct);
        // console.log("🚀 ~ productId ~ data:", data);
        if (data.qualify == "BARE_METAL") {
          this.handleGetProductColocation(data);
        } else {
          this.handleUpdateProduct(data);
        }
      }
    },
    isOpenFormKH(newVal) {
      if (newVal == true) {
        if (this.user.fullName && this.user.phone) {
          this.autoFocusNameInput(); // Auto-focus input when isOpenFormKH changes to true
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.back-page {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
}

.payment-list-title {
  display: block;
  font-weight: 600;
  width: 100%;
}

.textPrimary {
  color: #44ce6f;
}

.py-8 {
  padding: 8px 0;
}

.back {
  padding: 32px 0;
  font-size: 20px;
  font-weight: 500;
}

.index {
  z-index: 1;
}

.spinner-3 {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: s3 1s infinite linear;
}

@keyframes s3 {
  to {
    transform: rotate(1turn);
  }
}

.send-bottom {
  .btn-send {
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
}

.send-item {
  .item-info {
    .form-label {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: right;
      letter-spacing: 0.5px;
      color: #0e314c;
      margin-bottom: 0;
      margin-top: 24px;
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

.is-pc {
  padding-top: 36px;
}

.price-total {
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #44ce6f;
}

.cart-pay {
  display: flex;
  align-items: center;

  .radio-btn {
    width: 18px;
    height: 18px;
    border: #44ce6f 1px solid;
    border-radius: 50%;
    margin-right: 16px;
  }

  background: #ffffff;
  padding: 20px;
  border-radius: 6px;
  margin-top: 48px;
  border: 1px solid #44ce6f;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
}

.cart-area {
  background-color: #fcfcfd;
}

.remove {
  color: red;
  margin-left: 25px;
  position: relative;
  top: -1px;
  float: right;
}

.order-item__product {
  img {
    min-width: 80px;
    height: 80px;
    object-fit: cover;
    flex-basis: 10%;
  }
}

.order-item__bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.order-product-item {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
}

.order-product-item__info {
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
}

.order-product-item__title {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  padding: 0 10px;
}

.dongia {
  p {
    font-size: 16px;
  }
}

.order-item__btn {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 10px;
  padding: 10px;
  justify-content: flex-end;
}

.btn-danger {
  background-color: #f44336;
}

.loader {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid rgb(22, 179, 100);
  width: 18px;
  height: 18px;
  position: absolute;
  left: 12px;
  animation: spin 2s linear infinite;
}

.loader-bg {
  width: 80px;
  height: 80px;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -90px;
  background: transparent;
  border-top: 4px solid #03a9f4;
  border-right: 2px solid transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite;
}

.logo-bg {
  height: 55px;
  width: 55px;
  background-image: url("~/assets/img/logo-lvs.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  position: absolute;
  right: 0;
  left: 0;
  top: 50%;
  margin-top: -75px;
}

.checkout-action-button {
  padding: 20px 0;
  display: flex;
  justify-content: center;

  .checkout-btn {
    display: flex;
    width: 524px;
    padding: 12px 24px;
    justify-content: center;
    cursor: pointer;
    align-items: center;
    gap: 10px;
    border-radius: 6px;
    background: #44ce6f;
    color: #fff;
  }
}

.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

.custom_min_height {
  min-height: 120px;
}

.custome_pb_10 {
  padding-bottom: 10px !important;
}

.custome_pt_5 {
  padding-top: 10px !important;
}

.discount-color {
  min-width: 140px;
  padding: 3px 7px;
  border-radius: 8px;
  color: #4caf50;
  border: 1px solid #4caf50;
}

.custom-form-box {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}

.custom-span {
  color: red;
  font-size: 12px;
  position: relative;
  bottom: 5px;
}

.custom-radio input {
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

// .custom-radio.custom-radio-active input:checked::after {
//   content: "";
//   width: 6px;
//   height: 6px;
//   border-radius: 50%;
//   background-color: #4caf50;
//   position: absolute;
//   top: 50%;
//   left: 52%;
//   transform: translate(-50%, -50%);
//   z-index: 2;
// }

.custom-radio-active input {
  // content: "";
  // width: 6px;
  // height: 6px;
  // border-radius: 50%;
  // background-color: #4caf50;
  // position: absolute;
  // top: 50%;
  // left: 52%;
  // transform: translate(-50%, -50%);
  // z-index: 2;
  background-color: #4caf50;
}

.custom-radio input:checked::after {
  content: "";
  width: 10px;
  height: 10px;
  border-radius: 50%;
  //border: 1px solid #4caf50 !important;
  background-color: #4caf50; /* Màu xanh lá khi được chọn */
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

.disBlock {
  display: none !important;
}

.last-item {
  border-bottom: none !important;
}

.border-dotted-bottom-cumstom {
  border-bottom: 1px dotted #dee2e6 !important;
}

// Responsive styles
@media (max-width: 768px) {
  .w-full-custom {
    width: 100% !important;
  }

  .cart-header {
    padding-bottom: 0 !important;
    height: auto !important;
  }

  .input-counter {
    display: flex;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
  }

  .is-mobile {
    display: block;
  }

  .is-pc {
    display: none;
  }

  .flex-container-custom-reverse {
    display: flex !important;
    flex-flow: column-reverse !important;
  }

  .flex-container-custom {
    display: flex !important;
    flex-flow: column !important;
    gap: 0.5rem;

    .flex-item-custom {
      padding: 0 !important;
    }
  }

  .item-payment {
    width: 300px !important;
  }

  .disNone {
    display: none !important;
  }

  .disBlock {
    display: block !important;
  }
}

.product-card {
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  height: 100%;
  //92%;
  padding: 12px;
  overflow: hidden;
  gap: 12px;
  background: #ffffff;
  //border: 1px solid #16b364;
  border-radius: 6px;
  .product-image {
    &.active {
      img {
        cursor: pointer;
        width: 100%;
        height: -moz-max-content;
        height: -webkit-max-content;
        height: max-content;
        -o-object-fit: contain;
        object-fit: cover;
        aspect-ratio: 1/1;
      }
    }
    img {
      cursor: pointer;
      width: 100%;
      height: -moz-max-content;
      height: -webkit-max-content;
      height: max-content;
      -o-object-fit: contain;
      object-fit: cover;
      aspect-ratio: 1/0.4;
    }
  }
  .product-body-title {
    padding-top: 5px;
    h3 {
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
  .product-body {
    background: white;
    padding-bottom: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    .top-card {
      height: 100%;

      .product-body-title {
        h3 {
          font-weight: 500;
          font-size: 18px;
          line-height: 26px;
          text-align: center;
          color: #44ce6f;
          cursor: pointer;
          //min-height: 50px;
          //max-height: 50px;
          margin-bottom: 0px;

          padding: 5px 10px;
        }
      }
      .product-body-description {
        width: 100%;
        margin-bottom: 8px;
        .options {
          display: flex;
          //flex-flow: column;
          // display: inline-grid;
          // grid-template-columns: auto auto;
          margin-bottom: 4px;
          gap: 6px;
          .name-option {
            color: #000;
            font-size: 10px;
            line-height: 14px;
            //width: 80px;
            min-width: 85px;
          }
          .list-option {
            .value-option {
              color: #000;
              font-size: 10px;
              line-height: 14px;
            }
          }
        }

        // padding: 12px 0;
        // p {
        //   font-weight: 400;
        //   font-size: 12px;
        //   line-height: 22px;
        //   color: #000000;
        // }
      }
    }
    .product-body-button {
      display: flex;
      flex-direction: column;
      // justify-content: space-between;
      gap: 8px;
      .product-button {
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 52px;
        padding: 6px 12px;
        gap: 8px;
        background: #44ce6f;
        color: #fff;
        border-radius: 6px;
        .product-button-left {
          font-weight: 500;
          font-size: 12px;
          line-height: 16px;
          color: #ffffff;
          text-transform: uppercase;
        }
        .product-button-right {
          display: flex;
          flex-direction: column;
          .product-button-right_top {
            font-weight: 500;
            font-size: 16px;
            line-height: 22px;
            color: #702800;
          }
          .product-button-right_bottom {
            font-weight: 400;
            font-size: 12px;
            line-height: 16px;
            text-align: right;
            .price {
              text-decoration-line: line-through;
              color: #ffffff;
              &.active {
                text-decoration-line: none;
              }
            }

            .per {
              margin-left: 4px;
            }
          }
        }
        &.active {
          background: #00a5e3;
        }
      }
    }
  }
  .name-option {
    font-weight: 500;
  }
}

.btn-primary-custom {
  text-transform: capitalize;
  border-radius: 0;
  background-color: #44ce6f;
  padding: 8px 30px;
  box-shadow: 5px 5px 5px #a6f5be;
  margin-right: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}
</style>
