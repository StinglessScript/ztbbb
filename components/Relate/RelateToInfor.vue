<template>
  <div class="products-Relate">
    <div class="products-Relate-header">{{ header }}</div>
    <div class="swiper-container pt-4 relateToInfor ">
      <swiper
        class="swiper gallery-top px-1"
        style="pointer-events: auto"
        :options="swiperOptionTop"
        ref="swiperTop"
      >
        <swiper-slide v-for="item in slidesData" :key="item.id">
          <div style="pointer-events: auto">
            <div
              style="width: 100%; pointer-events: auto"
              @click="navigateTo($event, item)"
              class="cursor-pointer"
            >
              <div style="width: 100%">
                <div class="product-card" style="width: 100%">
                  <div>
                    <div
                      class="product-image d-flex justify-content-center align-items-center"
                      v-if="item?.featuredImage || item.imageUrl"
                    >
                      <img
                        class="img-hover"
                        :src="item?.featuredImage || item.imageUrl"
                        alt="image"
                        width="80%"
                        style="height: 200px; width: 250px;"
                      />
                    </div>
                    <div
                      class="product-image d-flex justify-content-center align-items-center"
                      v-else
                    >
                      <img
                        src="~/assets/img/Nodata.svg"
                        style="min-height: 200px"
                      />
                    </div>
                    <div class="product-body">
                      <div class="top-card">
                        <div class="product-body-title">
                          <h3>
                            {{ item?.title }}
                          </h3>
                        </div>
                        <div
                          v-if="item?.shortDescription"
                          class="cursor-pointer"
                        >
                          <p v-html="item?.shortDescription"></p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="product-body-button"
                    v-if="item?.type === 'Product'"
                  >
                    <template v-if="!item?.categories?.some((c) => c.id == category_marketplace)">
                      <div
                        v-if="item?.price > 0"
                        class="product-button"
                        :class="{ active: item?.priceType !== 'SELL' }"
                      >
                        <div class="product-button-left">
                          {{ item?.priceTypeName }}
                        </div>
                        <div class="product-button-right">
                          <div class="product-button-right_top">
                            {{ convertPrice(item?.price ? item?.price : 0) }}
                          </div>
                          <div class="product-button-right_bottom">
                            <span class="price active" style="color: #702800">
                              /{{ item?.unitDTO?.name }}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        v-else-if="item?.price === 0"
                        class="product-button"
                        style="justify-content: center"
                      >
                        <div class="product-button-right">
                          <div class="product-button-right_top">Miễn phí</div>
                        </div>
                      </div>
                      <div
                        v-else
                        class="product-button"
                        style="justify-content: center"
                      >
                        <div class="product-button-right">
                          <div class="product-button-right_top">Liên hệ</div>
                        </div>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        class="product-button"
                        style="justify-content: center"
                      >
                        <div class="product-button-right">
                          <div class="product-button-right_top">
                            Xem chi tiết
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                  <div v-else>
                    <ul
                      class="post-metas post-meta-mobile"
                      v-if="item?.type === 'Article'"
                    >
                      <span>{{ changeDate(item.publishedAt) }}</span>
                    </ul>
                    <span style="color: #000">
                      Tác giả
                      <span class="span-author">
                        {{ item.author }}
                      </span>
                    </span>
                    <a 
                      :href="`/${item.slug}`"
                      class="read-more-btn font-a"
                    >
                      Xem thêm
                      <feather
                        class="feather-plus-circle"
                        type="plus-circle"
                      ></feather>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </swiper-slide>
        <!-- Add Pagination and Navigation -->
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import moment from "moment";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    header: String,
    slidesData: Array,
  },
  data() {
    return {
      swiperOptionTop: {
        slidesPerView: 1,
        spaceBetween: 10,
        // loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1200: { slidesPerView: 4 },
        },
      },

      category_marketplace: process.env.MARKETPLACE
    };
  },
  computed: {
    isOS() {
      return this.$route.query.os ? this.$route.query.os : null;
    },
  },
  methods: {
    convertPrice(price) {
      if (price) {
        return (
          price
            .toFixed(0)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + "đ"
        );
      } else {
        return " ";
      }
    },
    changeDate(time) {
      return moment(time).format("DD-MM-YYYY ");
    },
    navigateTo(event, item) {
      event.preventDefault();
      //console.log("vào", item.id);
      this.$router.push(
        item?.type === "Product" ? `/san-pham/${item?.handle}` : `/${item.slug}`
      );
    },

    // setEqualCardHeights() {
    //   const cards = this.$refs.swiperTop.$el.querySelectorAll(
    //     ".swiper-slide .product-card"
    //   );
    //   let maxHeight = 0;

    //   // Find the maximum height
    //   cards.forEach((card) => {
    //     card.style.height = "auto"; // Reset height for calculation
    //     const height = card.offsetHeight;
    //     if (height > maxHeight) {
    //       maxHeight = height;
    //     }
    //   });

    //   // Set all cards to the maximum height
    //   cards.forEach((card) => {
    //     card.style.height = `${maxHeight}px`;
    //   });
    // },

    async setEqualCardHeights() {
      // Chờ cho đến khi tất cả các DOM cập nhật hoàn tất
      await this.$nextTick();

      const cards = this.$refs.swiperTop?.$el.querySelectorAll(
        ".swiper-slide .product-card"
      );
      if (!cards) return;

      let maxHeight = 0;

      // Tìm chiều cao tối đa
      cards.forEach((card) => {
        card.style.height = "auto"; // Đặt lại chiều cao để tính toán
        const height = card.offsetHeight;
        if (height > maxHeight) {
          maxHeight = height;
        }
      });

      // Đặt tất cả các thẻ card có chiều cao tối đa
      cards.forEach((card) => {
        card.style.height = `${maxHeight}px`;
      });
    },
    handleResize() {
      this.setEqualCardHeights();
    },
    debounce(func, wait) {
      let timeout;
      return function (...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
      };
    },
  },
  watch: {
    slidesData: {
      handler() {
        this.$nextTick(() => {
          this.setEqualCardHeights();
        });
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.setEqualCardHeights();
    });

    this.handleResizeDebounced = this.debounce(this.handleResize, 200);
    window.addEventListener("resize", this.handleResizeDebounced);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResizeDebounced);
  },
};
</script>

<style scoped>
/* Your styles here */
</style>

<style lang="scss" scoped>
.relateToInfor {
  .swiper-container {
    width: 100%;
    height: auto;
    pointer-events: auto;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      pointer-events: auto;

      .slide-content {
        max-width: 100%;
        text-align: center; // Căn giữa nội dung trong slide
        padding: 20px;
        pointer-events: auto;

        h2 {
          margin: 0;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        p {
          margin: 10px 0;
        }

        img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin-bottom: 10px; // Khoảng cách giữa ảnh và nội dung khác
        }
      }
    }

    .swiper-pagination {
      bottom: 10px;
      text-align: center; // Căn giữa pagination
    }

    .swiper-button-next,
    .swiper-button-prev {
      //display: none !important;
      color: #ffffff; // Màu sắc nút điều hướng
      background-color: #44ce70;
      //background-color: rgba(0, 0, 0, 0.5); // Nền màu tối cho nút điều hướng
      border-radius: 50%; // Bo góc nút điều hướng
      width: 40px; // Kích thước nút điều hướng
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem; // Kích thước biểu tượng
    }

    .swiper-button-disabled {
      opacity: 0 !important;
    }

    .swiper-button-next {
      right: 5px;
    }

    .swiper-button-prev {
      left: 5px;
    }
  }

  .product-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 380px;
    //92%;
    padding: 10px;
    overflow: hidden;
    gap: 0.5rem;
    background: #ffffff;
    border: 1px solid #16b364;
    border-radius: 6px;
  }

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

  .product-body {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    .top-card {
      height: 100%;

      .product-body-title {
        h3 {
          font-weight: 500;
          font-size: 22px;
          line-height: 26px;
          text-align: center;
          color: #44ce6f;
          cursor: pointer;
          //min-height: 50px;
          //max-height: 50px;
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

  .name-option {
    font-weight: 500;
  }

  .single-blog-post-item {
    background: #f7fafd !important;
    // background: #f7fafd;
    transition: 0.5s;
    width: 98%;
    min-height: 470px;

    //#f7fafd
    &:hover {
      background: #fff !important;
      transition: all 0.5s;
      box-shadow: 0 2px 48px 0 rgba(0, 0, 0, 0.08);
      border-radius: 5px;
    }
  }

  .post-metas {
    border-radius: 50px;
    padding: 8px 16px;
    width: 120px;
    /* border: 1px solid linear-gradient(135deg, #23bdb8, #43e794); */
    background: linear-gradient(135deg, #23bdb8, #43e794) !important;
    color: white;
    margin: 0;
  }

  .post-meta-h5 {
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    text-align: center;
    color: #44ce6f;
    cursor: pointer;
  }

  .span-author {
    color: #6084a4;
    line-height: 1.9;
    padding-left: 5px;
  }

  @media only screen and (max-width: 767px) {
    .post-meta-mobile {
      top: -25px !important;
    }
  }

  // .learn-more-btn {
  //   color: #0e314c !important;
  //   line-height: 30px;

  //   &:hover {
  //     color: #44ce6f !important;
  //     transition: all 0.5s;
  //   }
  // }

  .font-a {
    display: flex;
    padding: 0px;
    gap: 0.25rem;
  }

  .feather-plus-circle {
    width: 20px;
    height: 24px;
    //padding-left: 5px;
    display: block;
  }
}

.products-Relate {
  padding: 0;
  background: #ffffff;
  //border: 1px solid #d9d9d9;
  margin-top: 50px;

  .products-Relate-header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(68, 206, 111, 0.2);
    color: #44ce6f;
    border: 1px solid #d9d9d9;
    font-weight: 700;
    padding: 10px 0;
    font-size: 22px;
    line-height: 150%;
    letter-spacing: -0.011em;
    border-radius: 6px;
  }
}
</style>
