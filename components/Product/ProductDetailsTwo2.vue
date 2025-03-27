<template>
  <div class="shop-details-area ptb-80">
    <Loader :loading="showLoader" />
    <CoolLightBox :items="product.images" :index="index" @close="index = null">
    </CoolLightBox>
    <div class="container" @click="isShowOptions = fasle">
      <modal
        name="advice"
        :width="400"
        :scrollable="true"
        height="auto"
        :adaptive="true"
      >
        <div class="modal-send">
          <div class="product-info-modal">
            <div class="product-info-title">
              {{ titleDynamic }}
            </div>
            <div class="product-info-price">
              {{ convertPrice(product.price) }}{{ product.currency_code }}
            </div>
          </div>
          <div
            v-for="item in details"
            :key="item.id"
            class="product-info-modal d-flex justify-content-between"
          >
            <div class="product-info-title">
              {{ item.title }}
            </div>
            <div class="product-info-price">
              {{ convertPrice(item.price) }}{{ product.currency_code }}
            </div>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="required">Họ và tên</label>
                <input
                  id="name"
                  v-model="name"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|phone"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Số điện thoại</label>
                <input
                  id="phone"
                  v-model="phone"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Email</label>
                <input
                  class="send-input"
                  id="email"
                  v-model="email"
                  type="email"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <div class="mb-2">
              <button class="btn-send active">Gửi yêu cầu tư vấn</button>
            </div>
          </div>
        </div>
      </modal>
      <!-- <modal name="advice" :width="600" :scrollable="true" height="auto">
        <div>
          <div class="product-info-modal">
            <div class="product-info-title">
              {{ product.title }}
            </div>
            <div class="product-info-price">
              {{ convertPrice(product.price) }}{{ product.currency_code }}
            </div>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="required">Họ và tên</label>
                <input
                  id="name"
                  v-model="name"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|phone"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Số điện thoại</label>
                <input
                  id="phone"
                  v-model="phone"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Email</label>
                <input
                  class="send-input"
                  id="email"
                  v-model="email"
                  type="email"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <div class="mb-4">
              <button class="btn-send active">
                Gửi yêu cầu tư vấn
              </button>
            </div>
          </div>
        </div>
      </modal> -->
      <div class="row g-0 product">
        <div class="col-lg-4 col-md-12 col-sm-12">
          <div class="thumb-example">
            <swiper
              class="swiper gallery-top"
              :options="swiperOptionTop"
              ref="swiperTop"
            >
              <swiper-slide
                class="image"
                v-for="(imgUrl, i) in product.images"
                :key="i"
              >
                <img :src="imgUrl" alt="" srcset="" @click="index = i"
              /></swiper-slide>

              <!-- <div
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
              <div
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div> -->
            </swiper>
            <!-- swiper2 Thumbs -->
            <swiper
              class="swiper gallery-bottom"
              :options="swiperOption"
              ref="swiperBot"
            >
              <swiper-slide
                class="image"
                v-for="(imgUrl, i) in product.images"
                :key="i"
                :class="{ active: isActiveThum === i }"
              >
                <img
                  :src="imgUrl"
                  alt=""
                  srcset=""
                  @mouseover="onThumbnailChange(i)"
              /></swiper-slide>
              <div
                v-if="product.images.length > 4"
                class="swiper-button-next swiper-button-white"
                slot="button-next"
              ></div>
              <div
                v-if="product.images.length > 4"
                class="swiper-button-prev swiper-button-white"
                slot="button-prev"
              ></div>
            </swiper>
          </div>
        </div>

        <div class="col-lg-8 col-md-12 col-sm-12">
          <div class="products-details">
            <modal
              name="modal-variant"
              :adaptive="true"
              :scrollable="true"
              height="auto"
            >
              <div class="modal-body">
                <div class="products-details">
                  <!-- <div class="products-vote">
              {{
                product.rating.average_rating
                  ? product.rating.average_rating
                  : 0
              }}
              <ul class="rating">
                <li v-for="i in 5" :key="i">
                  <i
                    class="flaticon-star-1"
                    :style="
                      i <= product.rating.average_rating ? '' : 'color: #eee;'
                    "
                  ></i>
                </li>
              </ul>
              <div class="space"></div>
              <div>{{ product.rating.rating_count }} Đánh giá</div>
              <div class="space"></div>
              <div>200 Đã bán</div>
            </div> -->
                  <div class="wrapper">
                    <div class="price">
                      <h3>{{ product.title }}</h3>

                      <div class="products-price">
                        <span
                          class="price-compare"
                          v-if="
                            product.compare_at_price !== null &&
                            product.compare_at_price > 0
                          "
                        >
                          {{ convertPrice(product.compare_at_price) }}
                          {{ product.currency_code }}
                        </span>
                        <span class="price-color">
                          {{
                            product.price > 0
                              ? convertPrice(product.price) +
                                product.currency_code // + // "/" + // product.unit
                              : "Miễn phí"
                          }}
                          <!-- {{ product.currency_code }} -->
                        </span>
                      </div>
                    </div>

                    <div class="product-body">
                      <div
                        class="product-shortDes"
                        v-if="product.short_description"
                      >
                        <div class="name">Chi tiết sản phẩm</div>
                        <span v-html="product.short_description"></span>
                      </div>
                      <div
                        v-if="product?.options_full !== null"
                        class="product-option"
                      >
                        <div
                          v-for="(option, i) in product?.options_full"
                          :key="i"
                          class="option-item"
                          style="display: block"
                        >
                          <div
                            class="name"
                            style="margin: 40px 24px"
                            v-show="querys.typeId !== option.id"
                          >
                            {{ option.name }}
                          </div>
                          <div
                            class="content"
                            style="display: block"
                            v-show="querys.typeId !== option.id"
                          >
                            <!--
                            This code is doing the following things.
                             It's creating a new array called `selected` and assigning it to an empty array.
                             Then, it's checking if the product type is variable or not by comparing the value of `product.product_type` with 'VARIABLE'.
                            - generated by stenography autopilot [ 🚗👩‍✈️ ]
                            -->
                            <template
                              v-for="(value, index) in option.values_full"
                            >
                              <div
                                :key="index + option.name"
                                v-if="
                                  test?.length > 0
                                    ? test.includes(value.id)
                                    : true
                                "
                              >
                                <button
                                  ref="items"
                                  v-if="product.product_type === 'VARIABLE'"
                                  :value="value.id"
                                  class="btn-cus btn-outline-success"
                                  :class="{
                                    active:
                                      selected[i] === value.name ||
                                      (activeIndex === index && activeI === i),
                                  }"
                                  style="padding: 10px 26px"
                                  :disabled="
                                    test?.length > 0
                                      ? !test.includes(value.id)
                                      : false || product?.variants?.length === 0
                                  "
                                  @click.stop="
                                    handleVariants(option.name, value.name);
                                    checked(
                                      i,
                                      value,
                                      index,
                                      product.options_relationship
                                    );
                                  "
                                >
                                  <div class="d-flex align-items-center">
                                    <div
                                      class="radio-btn"
                                      :class="{
                                        active:
                                          selected[i] === value.name ||
                                          (activeIndex === index &&
                                            activeI === i),
                                      }"
                                    ></div>
                                    {{
                                      querys.typeId === option.id
                                        ? value.id
                                        : value.name
                                    }}
                                  </div>
                                  <div class="price-btn">
                                    {{
                                      querys.typeId === option.id
                                        ? ""
                                        : priceOptions[index]?.price
                                    }}
                                    <span class="price-old">
                                      {{
                                        priceOptions[index]?.originPrice === 0
                                          ? ""
                                          : priceOptions[index]?.originPrice
                                      }}</span
                                    >
                                  </div>
                                </button>
                                <button
                                  v-else
                                  class="btn-cus btn-outline-success"
                                  disabled
                                >
                                  {{ value.name }}
                                </button>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                    <!-- <span style="color: red; padding: 10px"> </span> -->
                  </div>

                  <div class="product-line"></div>
                  <client-only>
                    <template v-for="(detail, idO) in details">
                      <div
                        class="product-subPrice"
                        :key="idO"
                        v-if="detail.select_type_option == 'OPTION_REQUIRE'"
                      >
                        <div class="wrapper">
                          <div class="price" v-if="detail.price !== null">
                            <div class="product-title">
                              <h3>{{ detail.title }}</h3>
                            </div>
                            <div class="products-price">
                              <span
                                class="price-compare"
                                v-if="
                                  detail.compare_at_price !== null &&
                                  detail.compare_at_price > 0
                                "
                              >
                                {{ convertPrice(detail.compare_at_price) }}
                                {{ detail.currency_code }}
                              </span>
                              <span class="price-compare" v-else> </span>
                              <span class="price-color">
                                {{ convertPrice(detail.price)
                                }}{{ detail.currency_code }}
                                <!-- {{ detail.unit ? `/${detail.unit}` : "" }} -->
                              </span>
                            </div>
                            <div class="products-compare">So Sánh SP Khác</div>
                          </div>
                          <div class="product-body">
                            <div
                              class="product-shortDes"
                              v-if="detail.short_description"
                            >
                              <div class="name">
                                <span>Chi tiết</span>
                                <!-- <div class="ex"><span>?</span></div> -->
                              </div>
                              <div class="content">
                                <span v-html="detail.short_description"></span>
                              </div>
                            </div>
                            <div
                              v-if="detail?.options_full !== null"
                              class="product-option"
                              style="display: flex"
                            >
                              <div
                                v-for="(option, i) in detail?.options_full"
                                :key="i"
                                class="option-item"
                              >
                                <div class="name" style="display: flex">
                                  {{ option.name }}
                                </div>
                                <div class="content">
                                  <!--
                                  This code is checking if the product type is variable. If it's a variable, then we are going to check if there are any options that have been selected by the user.
                                  If there are no options that have been selected, then we will show all of the suboptions for each option in our dropdown menu.
                                  If there are some options that have already been selected, then we will only show those suboptions which match with what has already been chosen by the user.
                                  - generated by stenography autopilot [ 🚗👩‍✈️ ]
                                  -->
                                  <template v-if="productOption[`${idO}`]">
                                    <div
                                      v-for="(
                                        value, index
                                      ) in option.values_full"
                                      :key="index + option.name"
                                    >
                                      <button
                                        v-if="
                                          detail.product_type === 'VARIABLE'
                                        "
                                        class="btn-cus btn-outline-success"
                                        :class="{
                                          active:
                                            parsedobj[`${idO}`].selectedSub[
                                              `${i}`
                                            ] === value.name,
                                        }"
                                        :disabled="
                                          parsedobj[`${idO}`]
                                            .options_relationshipSub?.length > 0
                                            ? !parsedobj[
                                                `${idO}`
                                              ].options_relationshipSub
                                                .flat()
                                                .includes(value.id)
                                            : false ||
                                              detail?.variants?.length === 0
                                        "
                                        @click.stop="
                                          checkedSub(
                                            i,
                                            value,
                                            detail.options_relationship,
                                            idO,
                                            true
                                          )
                                        "
                                      >
                                        {{ value.name }}
                                        <!-- {{
                              parsedobj[`${detail.id}`].selectedSub[`${i}`]
                            }} -->
                                      </button>
                                    </div>
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div class="product-line"></div>
                      </div>
                      <div class="product-norequire" v-else :key="idO + 0">
                        <div
                          class="norequire-title"
                          v-if="count === 0 || count == idO"
                        >
                          <h3 @click="handleShow">Ưu đãi kèm theo</h3>
                          <!-- <feather @click="handleShow" type="chevron-down"></feather> -->
                        </div>
                        <div class="norequire-item">
                          <div class="item-header">
                            <div class="item-name">
                              <input
                                type="checkbox"
                                :id="idO"
                                :name="idO"
                                :value="idO"
                                @click="handleChecked(idO)"
                              />
                              <label :for="idO"> {{ detail.title }}</label
                              ><br />
                            </div>
                            <div class="item-price">
                              <span
                                class="price-compare"
                                v-if="
                                  detail.compare_at_price > 0 &&
                                  detail.compare_at_price
                                "
                              >
                                {{ convertPrice(detail.compare_at_price) }}
                                {{ detail.currency_code }}
                              </span>
                              <span class="price-compare" v-else> </span>
                              <span class="price-color">
                                {{ convertPrice(detail.price)
                                }}{{ detail.currency_code }}
                                <!-- {{ detail.unit ? `/${detail.unit}` : "" }} -->
                              </span>
                            </div>
                          </div>
                          <div class="item-content">
                            <div class="content-des">
                              <span> Mô tả về sản phẩm </span>
                            </div>
                            <div
                              v-if="detail?.options_full?.length > 0"
                              class="product-option"
                            >
                              <div
                                class="select-options"
                                v-if="isShowOptions"
                                @click.stop=""
                              >
                                <div
                                  v-for="(option, i) in detail?.options_full"
                                  :key="i"
                                  class="option-item"
                                >
                                  <div class="select-name">
                                    {{ option.name }}
                                  </div>
                                  <div class="select-content">
                                    <!--
                                    This code is checking if the product type is variable. If it's a variable, then we are going to check if there are any options that have been selected by the user.
                                    If there are no options that have been selected, then we will show all of the available suboptions for each option in our dropdown menu.
                                    - generated by stenography autopilot [ 🚗👩‍✈️ ]
                                    -->
                                    <template v-if="productOption[`${idO}`]">
                                      <div
                                        v-for="(
                                          value, index
                                        ) in option.values_full"
                                        :key="index + option.name"
                                      >
                                        <button
                                          v-if="
                                            detail.product_type === 'VARIABLE'
                                          "
                                          class="btn-cus btn-outline-success"
                                          :class="{
                                            active:
                                              parsedobj[`${idO}`].selectedSub[
                                                `${i}`
                                              ] === value.name,
                                          }"
                                          :disabled="
                                            parsedobj[`${idO}`]
                                              .options_relationshipSub.length >
                                            0
                                              ? !parsedobj[
                                                  `${idO}`
                                                ].options_relationshipSub
                                                  .flat()
                                                  .includes(value.id)
                                              : false ||
                                                detail?.variants?.length === 0
                                          "
                                          @click.stop="
                                            checkedSub(
                                              i,
                                              value,
                                              detail.options_relationship,
                                              idO,
                                              false
                                            )
                                          "
                                        >
                                          {{ value.name }}
                                        </button>
                                      </div>
                                    </template>
                                  </div>
                                </div>
                                <div class="select-footer">
                                  <div class="close-btn" @click="showOption">
                                    Đóng
                                  </div>
                                </div>
                              </div>
                              <div
                                v-for="(option, i) in detail?.options_full"
                                :key="i"
                                class="option-item"
                              >
                                <div class="content">
                                  <!--
                                  This code is checking if the product type is variable and then checks if the selected sub option has a value. If it does, it will add class active to that button.
                                  If there are no options_relationshipSub in parsedobj[`${idO}`] or detail?.variants?.length === 0, then we disable that button by adding disabled attribute to it.
                                  - generated by stenography autopilot [ 🚗👩‍✈️ ]
                                  -->
                                  <template v-if="productOption[`${idO}`]">
                                    <div
                                      v-for="(
                                        value, index
                                      ) in option.values_full"
                                      :key="index + option.name"
                                    >
                                      <button
                                        v-if="
                                          detail.product_type === 'VARIABLE' &&
                                          parsedobj[`${idO}`].selectedSub[
                                            `${i}`
                                          ] === value.name
                                        "
                                        class="btn-cus btn-outline-success"
                                        :class="{
                                          active:
                                            parsedobj[`${idO}`].selectedSub[
                                              `${i}`
                                            ] === value.name,
                                        }"
                                        :disabled="
                                          parsedobj[`${idO}`]
                                            .options_relationshipSub.length > 0
                                            ? !parsedobj[
                                                `${idO}`
                                              ].options_relationshipSub
                                                .flat()
                                                .includes(value.id)
                                            : false ||
                                              detail?.variants?.length === 0
                                        "
                                        @click.stop="showOption"
                                      >
                                        {{ value.name }}
                                      </button>
                                    </div>
                                  </template>
                                </div>
                              </div>
                              <feather
                                @click.stop="showOption"
                                type="chevron-down"
                              ></feather>
                            </div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <!-- <div class="product-line" v-if="isLine"></div> -->
                  </client-only>

                  <form @submit.prevent="addToCart(product)">
                    <!-- <div class="quantity" v-if="details?.length == 0">
                <span>Số lượng</span>
                <div class="input-counter">
                  <span @click="decreaseQuantity()" class="counter-btn">
                    <feather type="minus"></feather>
                  </span>
                  {{ quantity }}
                  <span @click="increaseQuantity()" class="counter-btn">
                    <feather type="plus"></feather>
                  </span>
                </div>
                <div class="add-to-wishlist-btn">
                  <span
                    class="counter-btn"
                    :class="{ active: favorite }"
                    title="Yêu thích sản phẩm "
                    @click="
                      favorite
                        ? removeFavoriteProduct(product.id)
                        : addToWishlist(product.id)
                    "
                  >
                    <feather type="heart"></feather>
                  </span>
                </div>
              </div> -->
                    <!-- <div class="buy-btn">
                      <div class="item">
                        <button type="submit">
                          <feather type="shopping-cart"></feather> Thêm Vào Giỏ
                          Hàng
                        </button>
                      </div>
                      <div class="item">
                        <button type="submit" class="test" @click="buyNow">
                          Đặt Hàng
                        </button>
                      </div>
                    </div> -->
                    <div class="buy-btn">
                      <div class="item">
                        <button type="submit">
                        Gọi ngay : 1800.6070
                        </button>
                      </div>
                      <div class="item">
                        <button type="submit" class="test" @click="buyNow">
                          Đặt Hàng
                        </button>
                      </div>
                    </div>
                  </form>
                  <!-- <div class="custom-payment-options">
              <span>Đảm bảo thanh toán an toàn:</span>

              <div class="payment-methods">
                <img src="~/assets/img/payment-image/1.svg" alt="image" />
                <img src="~/assets/img/payment-image/2.svg" alt="image" />
                <img src="~/assets/img/payment-image/3.svg" alt="image" />
                <img src="~/assets/img/payment-image/4.svg" alt="image" />
                <img src="~/assets/img/payment-image/5.svg" alt="image" />
                <img src="~/assets/img/payment-image/6.svg" alt="image" />
                <img src="~/assets/img/payment-image/7.svg" alt="image" />
              </div>
            </div> -->

                  <!-- <ShareSocial
              url="currentUrl"
              title="product.title"
              description="product.description"
              hashtags="product.tags"
            /> -->
                </div>
              </div>
            </modal>
            <!-- <div class="products-vote">
              {{
                product.rating.average_rating
                  ? product.rating.average_rating
                  : 0
              }}
              <ul class="rating">
                <li v-for="i in 5" :key="i">
                  <i
                    class="flaticon-star-1"
                    :style="
                      i <= product.rating.average_rating ? '' : 'color: #eee;'
                    "
                  ></i>
                </li>
              </ul>
              <div class="space"></div>
              <div>{{ product.rating.rating_count }} Đánh giá</div>
              <div class="space"></div>
              <div>200 Đã bán</div>
            </div> -->
            <div class="wrapper">
              <div class="price">
                <h3>{{ product.title }}</h3>

                <div class="products-price">
                  <span
                    class="price-compare"
                    v-if="
                      product.compare_at_price !== null &&
                      product.compare_at_price > 0
                    "
                  >
                    {{ convertPrice(product.compare_at_price) }}
                    {{ product.currency_code }}
                  </span>
                  <span class="price-color">
                    {{
                      product.price > 0
                        ? convertPrice(product.price) + product.currency_code // + // "/" + // product.unit
                        : "Miễn phí"
                    }}
                    <!-- {{ product.currency_code }} -->
                  </span>
                </div>
              </div>

              <div class="product-body">
                <div class="product-shortDes" v-if="product.short_description">
                  <div class="name">Chi tiết sản phẩm</div>
                  <span v-html="product.short_description"></span>
                </div>
                <div
                  v-if="product?.options_full !== null"
                  class="product-option"
                >
                  <div
                    v-for="(option, i) in product?.options_full"
                    :key="i"
                    class="option-item"
                    style="display: block"
                  >
                    <div
                      class="name"
                      style="margin: 40px 24px"
                      v-show="querys.typeId !== option.id"
                    >
                      {{ option.name }}
                    </div>
                    <div
                      class="content"
                      style="display: block"
                      v-show="querys.typeId !== option.id"
                    >
                      <!--
                      This code is doing the following things.
                       It's creating a new array called `selected` and assigning it to an empty array.
                       Then, it's looping through each item in the product options_relationship object (which contains all of the option values for this particular product).
                       For each iteration, we're checking if there are any selected items from our query string.
                      - generated by stenography autopilot [ 🚗👩‍✈️ ]
                      -->
                      <template v-for="(value, index) in option.values_full">
                        <div
                          :key="index + option.name"
                          v-if="
                            test?.length > 0 ? test.includes(value.id) : true
                          "
                        >
                          <button
                            ref="items"
                            v-if="product.product_type === 'VARIABLE'"
                            class="btn-cus btn-outline-success"
                            :value="value.id"
                            :class="{
                              active:
                                selected[i] === value.name ||
                                (activeIndex === index && activeI === i),
                            }"
                            style="padding: 10px 26px"
                            :disabled="
                              test?.length > 0
                                ? !test.includes(value.id)
                                : false || product?.variants?.length === 0
                            "
                            @click.stop="
                              handleVariants(option.name, value.name);
                              checked(
                                i,
                                value,
                                index,
                                product.options_relationship
                              );
                            "
                          >
                            <div class="d-flex align-items-center">
                              <div
                                class="radio-btn"
                                :class="{
                                  active:
                                    selected[i] === value.name ||
                                    (activeIndex === index && activeI === i),
                                }"
                              ></div>
                              {{
                                querys.typeId === option.id
                                  ? value.id
                                  : value.name
                              }}
                            </div>
                            <div class="price-btn">
                              <span class="price-old">
                                {{
                                  priceOptions[value.id]?.originPrice === 0
                                    ? ""
                                    : priceOptions[value.id]?.originPrice
                                }}</span
                              >
                              {{
                                querys.typeId === option.id
                                  ? ""
                                  : priceOptions[value.id]?.price
                              }}
                            </div>
                          </button>
                          <button
                            v-else
                            class="btn-cus btn-outline-success"
                            disabled
                          >
                            {{ value.name }}
                          </button>
                        </div>
                      </template>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <span style="color: red; padding: 10px"> </span> -->
            </div>

            <div class="product-line"></div>
            <client-only>
              <template v-for="(detail, idO) in details">
                <div
                  class="product-subPrice"
                  :key="idO"
                  v-if="detail.select_type_option == 'OPTION_REQUIRE'"
                >
                  <!-- <div class="product-title">
                    <h3>{{ detail.title }}</h3>
                    <span class="des-title"
                      >Mô tả vì sao phải bắt buộc mua kèm</span
                    >
                  </div> -->

                  <div class="wrapper">
                    <div class="price" v-if="detail.price !== null">
                      <div class="product-title">
                        <h3>{{ detail.title }}</h3>
                      </div>
                      <div class="products-price">
                        <span
                          class="price-compare"
                          v-if="
                            detail.compare_at_price &&
                            detail.compare_at_price > 0
                          "
                        >
                          {{ convertPrice(detail.compare_at_price) }}
                          {{ detail.currency_code }}
                        </span>
                        <span class="price-compare" v-else> </span>
                        <span class="price-color">
                          {{ convertPrice(detail.price)
                          }}{{ detail.currency_code }}
                          <!-- {{ detail.unit ? `/${detail.unit}` : "" }} -->
                        </span>
                      </div>
                      <div class="products-compare">So Sánh SP Khác</div>
                    </div>
                    <div class="product-body">
                      <div
                        class="product-shortDes"
                        v-if="detail.short_description"
                      >
                        <div class="name">
                          <span>Chi tiết</span>
                          <!-- <div class="ex"><span>?</span></div> -->
                        </div>
                        <div class="content">
                          <span v-html="detail.short_description"></span>
                        </div>
                      </div>
                      <div
                        v-if="detail?.options_full !== null"
                        class="product-option"
                        style="display: flex"
                      >
                        <div
                          v-for="(option, i) in detail?.options_full"
                          :key="i"
                          class="option-item"
                        >
                          <div class="name" style="display: flex">
                            {{ option.name }}
                          </div>
                          <div class="content">
                            <!--
                            This code is checking if the product type of the detail is variable. If it's a variable, then we are going to check if there are any options_relationshipSub in the parsedobj[`${detail.id}`].options_relationshipSub array. If there are any options_relationshipSub in this array, then we will check if that option value id exists inside of our parsedobj[`${detail.id}`].
                            - generated by stenography autopilot [ 🚗👩‍✈️ ]
                            -->
                            <template v-if="productOption[`${idO}`]">
                              <div
                                v-for="(value, index) in option.values_full"
                                :key="index + option.name"
                              >
                                <button
                                  v-if="detail.product_type === 'VARIABLE'"
                                  class="btn-cus btn-outline-success"
                                  :class="{
                                    active:
                                      parsedobj[`${idO}`].selectedSub[
                                        `${i}`
                                      ] === value.name,
                                  }"
                                  :disabled="
                                    parsedobj[`${idO}`].options_relationshipSub
                                      ?.length > 0
                                      ? !parsedobj[
                                          `${idO}`
                                        ].options_relationshipSub
                                          .flat()
                                          .includes(value.id)
                                      : false || detail?.variants?.length === 0
                                  "
                                  @click.stop="
                                    checkedSub(
                                      i,
                                      value,
                                      detail.options_relationship,
                                      idO,
                                      true
                                    )
                                  "
                                >
                                  {{ value.name }}
                                  <!-- {{
                              parsedobj[`${detail.id}`].selectedSub[`${i}`]
                            }} -->
                                </button>
                              </div>
                            </template>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="product-line"></div>
                </div>
                <div class="product-norequire" v-else :key="idO + 0">
                  <div
                    class="norequire-title"
                    v-if="count === 0 && count == idO"
                  >
                    <h3 @click="handleShow">Ưu đãi kèm theo2</h3>
                    <!-- <feather @click="handleShow" type="chevron-down"></feather> -->
                  </div>
                  <div class="norequire-item">
                    <div class="item-header">
                      <div class="item-name">
                        <input
                          type="checkbox"
                          :id="idO"
                          :name="idO"
                          :value="idO"
                          @click="handleChecked(idO)"
                        />
                        <label :for="idO"> {{ detail.title }}</label
                        ><br />
                      </div>
                      <div class="item-price">
                        <span
                          class="price-compare"
                          v-if="
                            detail.compare_at_price > 0 &&
                            detail.compare_at_price
                          "
                        >
                          {{ convertPrice(detail.compare_at_price) }}
                          {{ detail.currency_code }}
                        </span>
                        <span class="price-compare" v-else> </span>
                        <span class="price-color">
                          {{ convertPrice(detail.price)
                          }}{{ detail.currency_code }}
                          <!-- {{ detail.unit ? `/${detail.unit}` : "" }} -->
                        </span>
                      </div>
                    </div>
                    <div class="item-content">
                      <!-- <div class="content-des">
                        <span> Mô tả về sản phẩm </span>
                      </div> -->
                      <!-- <div
                        v-if="detail?.options_full?.length > 0"
                        class="product-option"
                      >
                        <div
                          class="select-options"
                          v-if="isShowOptions"
                          @click.stop=""
                        >
                          <div
                            v-for="(option, i) in detail?.options_full"
                            :key="i"
                            class="option-item"
                          >
                            <div class="select-name">
                              {{ option.name }}
                            </div>
                            <div class="select-content">
                              <template v-if="productOption[`${idO}`]">
                                <div
                                  v-for="(value, index) in option.values_full"
                                  :key="index + option.name"
                                >
                                  <button
                                    v-if="detail.product_type === 'VARIABLE'"
                                    class="btn-cus btn-outline-success"
                                    :class="{
                                      active:
                                        parsedobj[`${idO}`].selectedSub[
                                          `${i}`
                                        ] === value.name,
                                    }"
                                    :disabled="
                                      parsedobj[`${idO}`]
                                        .options_relationshipSub.length > 0
                                        ? !parsedobj[
                                            `${idO}`
                                          ].options_relationshipSub
                                            .flat()
                                            .includes(value.id)
                                        : false ||
                                          detail?.variants?.length === 0
                                    "
                                    @click.stop="
                                      checkedSub(
                                        i,
                                        value,
                                        detail.options_relationship,
                                        idO,
                                        false
                                      )
                                    "
                                  >
                                    {{ value.name }}
                                  </button>
                                </div>
                              </template>
                            </div>
                          </div>
                          <div class="select-footer">
                            <div class="close-btn" @click="showOption">
                              Đóng
                            </div>
                          </div>
                        </div>
                        <div
                          v-for="(option, i) in detail?.options_full"
                          :key="i"
                          class="option-item"
                        >
                          <div class="content">
                            <template v-if="productOption[`${idO}`]">
                              <div
                                v-for="(value, index) in option.values_full"
                                :key="index + option.name"
                              >
                                <button
                                  v-if="
                                    detail.product_type === 'VARIABLE' &&
                                    parsedobj[`${idO}`].selectedSub[`${i}`] ===
                                      value.name
                                  "
                                  class="btn-cus btn-outline-success"
                                  :class="{
                                    active:
                                      parsedobj[`${idO}`].selectedSub[
                                        `${i}`
                                      ] === value.name,
                                  }"
                                  :disabled="
                                    parsedobj[`${idO}`].options_relationshipSub
                                      .length > 0
                                      ? !parsedobj[
                                          `${idO}`
                                        ].options_relationshipSub
                                          .flat()
                                          .includes(value.id)
                                      : false || detail?.variants?.length === 0
                                  "
                                  @click.stop="showOption"
                                >
                                  {{ value.name }}
                                </button>
                              </div>
                            </template>
                          </div>
                        </div>
                        <feather
                          @click.stop="showOption"
                          type="chevron-down"
                        ></feather>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <!-- <div class="product-line" v-if="isLine"></div> -->
            </client-only>

            <form @submit.prevent="addToCart(product)">
              <!-- <div class="quantity" v-if="details?.length == 0">
                <span>Số lượng</span>
                <div class="input-counter">
                  <span @click="decreaseQuantity()" class="counter-btn">
                    <feather type="minus"></feather>
                  </span>
                  {{ quantity }}
                  <span @click="increaseQuantity()" class="counter-btn">
                    <feather type="plus"></feather>
                  </span>
                </div>
                <div class="add-to-wishlist-btn">
                  <span
                    class="counter-btn"
                    :class="{ active: favorite }"
                    title="Yêu thích sản phẩm "
                    @click="
                      favorite
                        ? removeFavoriteProduct(product.id)
                        : addToWishlist(product.id)
                    "
                  >
                    <feather type="heart"></feather>
                  </span>
                </div>
              </div> -->
              <!-- <div class="send-contact" @click="$modal.show('advice')">
                Tư vấn mua hàng
              </div> -->

              <div class="buy-btn">
                <div class="item">
                  <button type="submit">
                    <feather type="shopping-cart"></feather> Thêm Vào Giỏ Hàng
                  </button>
                </div>
                <div class="item">
                  <button type="submit" class="test" @click="buyNow">
                    Đặt Hàng
                  </button>
                </div>
              </div>
            </form>

            <!-- <div class="custom-payment-options">
              <span>Đảm bảo thanh toán an toàn:</span>

              <div class="payment-methods">
                <img src="~/assets/img/payment-image/1.svg" alt="image" />
                <img src="~/assets/img/payment-image/2.svg" alt="image" />
                <img src="~/assets/img/payment-image/3.svg" alt="image" />
                <img src="~/assets/img/payment-image/4.svg" alt="image" />
                <img src="~/assets/img/payment-image/5.svg" alt="image" />
                <img src="~/assets/img/payment-image/6.svg" alt="image" />
                <img src="~/assets/img/payment-image/7.svg" alt="image" />
              </div>
            </div>

            <ShareSocial
              url="currentUrl"
              title="product.title"
              description="product.description"
              hashtags="product.tags"
            /> -->
          </div>
        </div>
      </div>
      <!-- <ProductEx :productOption="details" :variants="itemVariantsByid" /> -->
      <div class="row g-0 products-description">
        <div class="description-header">Thông số kĩ thuật</div>
        <div class="description-body">
          <span v-html="product.description" class="text"></span>
        </div>
      </div>
      <!-- <div class="row g-0 products-review">
        <div class="description-body">
          <Reviews :productId="id" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Loader from "../Common/Loader.vue";
import Reviews from "./Reviews.vue";
// import ShareSocial from "@/components/Common/ShareSocial";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "ProductsDetails",
  props: ["product", "id", "querys"],
  components: {
    Loader,
    Reviews,
    Swiper,
    SwiperSlide,
    // ShareSocial,
    CoolLightBox,
  },

  data() {
    return {
      titleDynamic: "",
      name: "",
      phone: "",
      email: "",
      checkShowModal: false,
      index: null,
      asNavFor1: [],
      asNavFor2: [],
      swiperOptionTop: {
        // loop: true,
        // loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        // navigation: {
        //   nextEl: ".swiper-button-next",
        //   prevEl: ".swiper-button-prev",
        // },
      },
      swiperOption: {
        slidesPerView: 4,
        // centeredSlides: true,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      idVar: null,
      autoPlay: true,
      page: null,
      quantity: 1,
      selectedOption: [],
      favorite: false,
      image: "",
      comment: "",
      isBuyNow: false,
      showLoader: false,
      isSelete: 1,
      test: [],
      productOption: {},
      selected: [],
      activeIndex: null,
      activeI: null,
      options_relationship1: {},
      isSuccess: false,
      defaultProduct: {
        price: "",
        title: "",
        slug: "",
        id: "",
      },
      currentUrl: "",
      idOption: [],
      parsedobj: null,
      options_relationshipSub: {},
      selectedOptionSub: [],
      carts: [],
      cartsNOrq: [],
      count: 0,
      isShowOptions: false,
      isLine: false,
      toggleSubProuct: false,
      details: null,
      isActiveThum: 0,
      priceOptions: [],

      itemVariantsByid: [],
    };
  },

  created() {
    this.getProductOptions(this.id);
  },
  beforeMount() {
    this.handleImagesProduct();
    const price = this.product.price;
    this.product.variants.forEach((item) => {
      item.options_ids?.forEach((element) => {
        if (element === this.querys.valueId) {
          this.itemVariantsByid.push(item);
          this.priceOptions[
            item.options_ids.find((element) => element !== this.querys.valueId)
          ] = {
            price: this.convertPrice(item.price) + this.product.currency_code,
            originPrice:
              price !== item.price
                ? this.convertPrice(price) + this.product.currency_code
                : 0,
          };
        }
      });
    });
  },
  computed: {
    hanldeSale() {
      return (
        100 -
        (this.product.price / this.product.compare_at_price) * 100
      ).toFixed();
    },
  },
  mounted() {
    this.handleShow();
    if (this.id == this.product.id) {
      this.$refs.items[1].click();
    }

    if (this.product.product_type === "VARIABLE") {
      if (this.$route.query.showBy) {
        this.$refs.items.filter((item, index) => {
          if (this.querys.valueId.indexOf(`${item.innerText}`.trim()) !== -1) {
            this.$refs.items[index].click();
          }
        });
      }
      let item = this.product.variants;
      for (let index = 0; index < item?.length; index++) {
        const element = item[index];
        if (this.id === element.id || item?.length === 1) {
          this.$refs.items.filter((item, index) => {
            if (element.options_ids.indexOf(item.value) !== -1) {
              if (this.querys.valueId !== item.value) {
                this.$refs.items[index].click();
              }
            }
          });
        }
      }
    }
    this.currentUrl = window.location.pathname;
    this.asNavFor1.push(this.$refs.thumbnails);
    this.asNavFor2.push(this.$refs.main);
    if (this.$store.getters.isAuthenticated) {
      this.checkFavorite(this.id);
    }
    this.defaultProduct.price = this.product.price;
    this.defaultProduct.title = this.product.title;
    this.defaultProduct.slug = this.product.handle;
    this.defaultProduct.id = this.product.id;
  },

  methods: {
    onThumbnailChange(id) {
      this.isActiveThum = id;
      this.$refs.swiperTop.$swiper.slideTo(id);
      this.$refs.swiperBot.$swiper.slideTo(id);
    },
    handleImagesProduct() {
      if (this.product.images.indexOf(this.product.featured_image) === -1) {
        this.product.images.unshift(this.product.featured_image);
      }
      if (this.product.variants?.length > 1) {
        let item = this.product.variants; // get variants of product
        for (let index = 0; index < item?.length; index++) {
          const element = item[index];

          if (this.product.images.indexOf(element.featured_image) === -1) {
            this.product.images.push(element.featured_image);
          } else {
          }
        }
      }
    },
    handleProductOptions() {
      this.details = this.details.sort(function (a, b) {
        if (
          a.select_type_option.toLowerCase() >
          b.select_type_option.toLowerCase()
        ) {
          return -1;
        }
        if (
          a.select_type_option.toLowerCase() <
          b.select_type_option.toLowerCase()
        ) {
          return 1;
        }
        return 0;
      });
      if (this.details) {
        this.details?.forEach((element, index) => {
          if (element.select_type_option == "OPTION_REQUIRE") {
            this.carts[index] = {
              product_id: element.id,
              quantity: "1",
              allow_delete: false,
            };
            this.productOption[`${index}`] = {
              selectedSub: "",
              isSuccessSub: element?.variants?.length > 0 ? false : true,
              options_relationshipSub: [],
              options_relationshipSub1: {},
              name: {},
              checked: element?.variants?.length > 0 ? false : true,
            };
            this.parsedobj = JSON.parse(JSON.stringify(this.productOption));
            this.parsedobj = JSON.parse(JSON.stringify(this.parsedobj));
          } else {
            this.isLine = true;
            this.cartsNOrq[index] = {
              product_id: element.id,
              quantity: "1",
              allow_delete: true,
            };
            this.productOption[`${index}`] = {
              selectedSub: "",
              isSuccessSub: true,
              options_relationshipSub: [],
              options_relationshipSub1: {},
              name: {},
              checked: false,
            };
            this.parsedobj = JSON.parse(JSON.stringify(this.productOption));
            this.parsedobj = JSON.parse(JSON.stringify(this.parsedobj));
          }
          if (
            element.select_type_option == "OPTION_REQUIRE" &&
            element.product_type === "VARIABLE"
          ) {
            this.count = this.count + 1;
          } else {
          }
        });
      }
      this.handleShow();
    },

    getProductOptions(id) {
      this.$store
        .dispatch("getProductOptions", id)
        .then((data) => {
          this.details = data.data;
          this.handleProductOptions();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    disbleModal() {
      this.checkShowModal = false;
    },
    showOption() {
      this.isShowOptions = !this.isShowOptions;
    },
    //checked item option
    handleShow() {
      this.toggleSubProuct = !this.toggleSubProuct;
      this.details?.forEach((element, i) => {
        if (
          element.select_type_option !== "OPTION_REQUIRE" &&
          element.product_type === "VARIABLE"
        ) {
          element.variants[0]?.options_full.forEach((element2, index) => {
            this.checkedSub(
              index,
              element2.values_full[0],
              element.options_relationship,
              i,
              true
            );
          });
        } else {
          element.variants[0]?.options_full.forEach((element2, index) => {
            if (element.variants?.length === 1) {
              this.checkedSub(
                index,
                element2.values_full[0],
                element.options_relationship,
                i,
                true
              );
            }
          });
        }
      });
    },

    handleChecked(id) {
      this.parsedobj[id].checked = !this.parsedobj[id].checked;
      if (this.parsedobj[id].checked) {
        this.carts[id] = this.cartsNOrq[id];
      } else {
        delete this.carts[id];
      }
    },
    checked(i, value, index, options_relationship) {
      if (this.selected[i] === value.name) {
        this.selected[i] = null;
        this.activeIndex = null;
        this.activeI = null;
        this.isSuccess = false;
        // if (this.product.images?.length > 1) {
        //   this.$refs.thumbnails.goTo(0);
        // }
        this.product.price = this.defaultProduct.price; // set price of product
        // set price of product
        this.product.title = this.defaultProduct.title;
        // history.pushState({}, null, this.defaultProduct.handle);
        delete this.options_relationship1[i];
      } else {
        this.selected[i] = value.name;
        this.activeIndex = index;
        this.activeI = i;
        this.options_relationship1[i] = options_relationship[value.id];
      }
      this.test = Object.values(this.options_relationship1).flat();
      if (Object.keys(this.options_relationship1)?.length > 1) {
        const arry = this.test;
        const toFindDuplicates = (arry) =>
          arry.filter((item, index) => arry.indexOf(item) !== index);
        const duplicateElementa = toFindDuplicates(arry);
        this.test = duplicateElementa;
      } else {
        this.test = Object.values(this.options_relationship1).flat();
      }
    },
    checkedSub(i, value, options_relationship, idO, check) {
      if (this.parsedobj[`${idO}`].selectedSub[`${i}`] === value.name) {
        if (check) {
          this.parsedobj[`${idO}`].name[`${i}`] = "";
          delete this.parsedobj[`${idO}`].options_relationshipSub1[i];
          const test = Object.values(
            this.parsedobj[`${idO}`].options_relationshipSub1
          );
          this.parsedobj[`${idO}`] = {
            selectedSub: this.parsedobj[`${idO}`].name,
            isSuccessSub: !this.parsedobj[`${idO}`].isSuccessSub,
            checked: this.parsedobj[`${idO}`].checked,
            options_relationshipSub:
              test?.length > 1
                ? Object.values(
                    this.parsedobj[`${idO}`].options_relationshipSub1
                  )
                    .flat()
                    .filter(
                      (item, index) =>
                        index !==
                        Object.values(
                          this.parsedobj[`${idO}`].options_relationshipSub1
                        )
                          .flat()
                          .indexOf(item)
                    )
                : test,
            options_relationshipSub1:
              this.parsedobj[`${idO}`].options_relationshipSub1,
            name: this.parsedobj[`${idO}`].name,
          };
        }
      } else {
        this.parsedobj[`${idO}`].name[`${i}`] = value.name;
        this.parsedobj[`${idO}`].options_relationshipSub1[`${i}`] =
          options_relationship[value.id];
        const test = Object.values(
          this.parsedobj[`${idO}`].options_relationshipSub1
        );
        this.parsedobj[`${idO}`] = {
          selectedSub: this.parsedobj[`${idO}`].name,
          options_relationshipSub:
            test?.length > 1
              ? Object.values(this.parsedobj[`${idO}`].options_relationshipSub1)
                  .flat()
                  .filter(
                    (item, index) =>
                      index !==
                      Object.values(
                        this.parsedobj[`${idO}`].options_relationshipSub1
                      )
                        .flat()
                        .indexOf(item)
                  )
              : test,
          name: this.parsedobj[`${idO}`].name,
          checked: this.parsedobj[`${idO}`].checked,
          options_relationshipSub1:
            this.parsedobj[`${idO}`].options_relationshipSub1,
        };

        this.details[idO].variants.forEach((element) => {
          if (element.options !== null) {
            let variantsList = Object.values(element.options); // get values of variants
            if (
              variantsList.sort().toString() ===
              Object.values(this.parsedobj[`${idO}`].selectedSub)
                .sort()
                .toString()
            ) {
              // this.details[idO].title = element.title;
              this.details[idO].id = element.id;
              if (this.details[idO].select_type_option == "OPTION_REQUIRE") {
                this.carts[idO].product_id = element.id;
              } else {
                this.cartsNOrq[idO].product_id = element.id;
              }
              this.details[idO].price = element.price; // set price of product
              this.parsedobj[idO].isSuccessSub = true;
              this.checkIsSuccessAll();
            }
          }
        });
      }
    },
    checkIsSuccessAll() {
      if (this.isSuccess && this.checkIsSuccessSub()) {
        this.checkShowModal = false;
      }
    },
    selete(value) {
      this.isSelete = value;
    },
    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    checkFavorite(id) {
      this.$store
        .dispatch("checkFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.favorite = data.data;
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    buyNow() {
      this.isBuyNow = true;
    },
    addToWishlist(id) {
      this.$store
        .dispatch("addFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {});
              this.$store.commit("setLengthFavorite", +1);
              this.checkFavorite(id);
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          this.$toast.error("Đăng nhập để thêm sản phẩm vào mục yêu thích", {});
          this.$router.push("/dang-nhap");
        });
    },
    removeFavoriteProduct(id) {
      this.$store
        .dispatch("removeFavoriteProduct", id)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {});
              this.$store.commit("setLengthFavorite", -1);
              this.checkFavorite(id);
              break;
            case 0:
              this.$router.push("/dang-nhap");
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleVariants(name, value) {
      if (value === this.selectedOption[name]) {
        delete this.selectedOption[name];
        this.isSuccess = false;
        // history.pushState({}, null, this.defaultProduct.slug);
        history.pushState(
          {},
          null,
          this.defaultProduct.slug + "?showBy=" + this.$route.query.showBy
        );
        this.getProductOptions(this.defaultProduct.id);
      } else {
        this.selectedOption[name] = value; // set selected option
        let obj = { ...this.selectedOption }; // clone selected option
        let variants = Object.values(obj); // get values of selected option
        let item = this.product.variants; // get variants of product
        for (let index = 0; index < item.length; index++) {
          const element = item[index];
          if (element.options !== null) {
            let variantsList = Object.values(element.options); // get values of variants
            if (variantsList.sort().toString() === variants.sort().toString()) {
              // history.pushState({}, null, element.handle);
              history.pushState(
                {},
                null,
                element.handle + "?showBy=" + this.$route.query.showBy
              );
              this.product.price = element.price; // set price of product
              this.titleDynamic = element.title; // set price of product
              this.idVar = element.id;
              if (
                this.product.images.indexOf(element.featured_image) !== -1 &&
                this.product.images.length > 1
              ) {
                // this.$refs.thumbnails.goTo(
                //   this.product.images.indexOf(element.featured_image)
                // );
              }
              this.getProductOptions(element.id);
              this.autoPlay = false;
              this.isSuccess = true;
              this.checkIsSuccessAll();
            }
          }
        }
      }
    },
    checkIsSuccessSub() {
      if (this.details) {
        let a = true;
        if (this.parsedobj) {
          Object.values(this.parsedobj).forEach((element, index) => {
            if (element.checked) {
              if (!element.isSuccessSub) {
                a = element.isSuccessSub;
              }
            }
          });
        }
        return a;
      } else {
        return true;
      }
    },
    addToCart() {
      const cart_child = this.carts.filter(Boolean || {});
      let product = {
        id: this.idVar ? this.idVar : this.product.id,
        quantity: this.quantity,
        allow_delete: true,
        supplier_id: this.product.supplier_id,
        cart_child: cart_child,
      };
      if (this.product.type == "SIMPLE") {
        this.isSuccess = true;
      }
      //check success
      if (this.isSuccess && this.checkIsSuccessSub()) {
        this.$store
          .dispatch("addToCart", product)
          .then((data) => {
            switch (data.status) {
              case 1:
                this.$toast.success(data.message, {});
                this.isBuyNow
                  ? this.$router.push("/gio-hang")
                  : this.$modal.hide("modal-variant");
                this.$store.commit("setCountItem", +1);
                this.$store.commit("setSessionId");
                Cookies.set("sessionId", this.$store.getters.getSessionId);
                break;
              case 0:
                break;
            }
          })
          .catch((error) => {
            this.$toast.error(error.message, {});
          });
      } else {
        this.$modal.show("modal-variant");
        this.$toast.warning("Vui lòng chọn tính năng ", {});
      }
    },
    updateQuantity(value) {
      this.$store.dispatch("updateQuantity", value);
    },

    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.product {
  .products-details {
    .product-body {
      .product-option {
        margin: 10px 10px 25px 0px;
        width: 100%;
      }
    }
  }
}

// .option-item {
//   display: block;
//   .content {
//   }
// }
.send-contact {
  color: #44ce6f;
  text-decoration: underline;
  cursor: pointer;
}
.btn-cus {
  width: 100%;
  // padding: 10px 26px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  &.btn-outline-success {
    &:hover {
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
    &.active {
      &::before {
        display: none;
      }
      &::after {
        display: none;
      }
    }
  }
  .radio-btn {
    border: 1.5px solid #697586;
    margin-right: 22px;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    &.active {
      background: #44ce6f;
      /* 44CE6F 100% */

      border: 1.5px solid #44ce6f;
    }
  }
  .price-btn {
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    /* identical to box height, or 150% */

    letter-spacing: 0.5px;

    /* 44CE6F 100% */

    color: #44ce6f;
  }
}
.products-details.p {
  line-height: 100px;
}
ul {
  margin: 0;
}

.form-select {
  width: max-content;
  margin: 10px;
}
.wrapper {
  position: relative;

  .ztbee {
    position: absolute;
    width: 100%;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
    top: 0;
    z-index: 80;
  }
}
.modal {
  display: block; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
.swiper {
  .swiper-slide {
    background-size: cover;
    background-position: center;
    width: 100%;
    height: max-content;
    object-fit: contain;
    aspect-ratio: 1/1;
    padding: 2px;
    img {
      width: 100%;
      height: max-content;
      object-fit: contain;
      aspect-ratio: 1/1;
    }
  }
  .swiper-button-next {
    color: #44ce6f;
    font-size: 8px !important;
  }
  .swiper-button-prev {
    color: #44ce6f;
    font-size: 8px !important;
  }
  &.gallery-top {
    height: 80%;
    width: 100%;
    .image {
      border-radius: 6px;
      cursor: zoom-in;
    }
  }
  &.gallery-bottom {
    overflow: hidden;
    height: 20%;
    box-sizing: border-box;
    padding: 2px 0;
    .image {
      border: 1px solid #eee;
      border-radius: 6px;
      &.active {
        border-color: #44ce6f;
      }
    }
  }
}
.modal-send {
  padding: 48px;
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
.price-old {
  padding-left: 10px;
  text-decoration: line-through;
  color: #697586;
}
</style>
<style>
:root {
  --swiper-navigation-size: 20px;
}
</style>
