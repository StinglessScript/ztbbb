AutosizeInput
<template>
  <div>
    <div
      style="
        position: fixed;
        z-index: 999;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #02020250;
        margin-top: 0px !important;
      "
      @click="handleCloseModal"
      v-if="showModale == true"
    ></div>
    <div
      v-if="showModale == true"
      class="widget-area widget-area-modal"
      :class="showModale ? 'widget-area-modal' : 'widget-area-modal-close'"
      style="
        position: fixed;
        top: 30%;
        z-index: 1000;
        padding: 0 15px 0 15px;
        background-color: #fff;
        height: 100%;
        overflow: auto;
        width: 100%;
      "
      id="secondary"
    >
      <div style="position: relative; height: 100%; margin-bottom: 30px">
        <span
          style="float: right; position: relative; bottom: 25px"
          @click="handleCloseModal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="12"
            viewBox="0 0 384 512"
          >
            <path
              d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"
            />
          </svg>
        </span>
        <div class="widget widget_categories">
          <h3 class="widget-title">
            <SVGMenu style="margin: 0 13px 0 0" />Danh mục sản phẩm
          </h3>
          <div class="ulMenu">
            <template v-for="(category, index) in categories">
              <div class="liMenu" v-if="category.level === 1" :key="index">
                <div
                  class="menu-item"
                  :class="{ active: category.id == idCategory }"
                >
                  <img
                    :src="category.icon"
                    v-if="category.icon"
                    width="18px"
                    height="20px"
                    alt=""
                  />
                  <a  :href="`/cua-hang/danh-muc/${category.handle}`">{{
                    category.title
                  }}</a>
                  <feather
                    :type="
                      indexActive === index && isToggle
                        ? 'chevron-up'
                        : 'chevron-down'
                    "
                    style="padding: 8px; cursor: pointer"
                    v-if="category.child"
                    @click="showSubMenu(index)"
                  ></feather>
                </div>
                <div class="item-sub">
                  <div
                    class="ulSub"
                    :class="{ active: index === indexActive && isToggle }"
                    v-if="category.child"
                  >
                    <div
                      class="liSub"
                      v-for="item in category.child"
                      :class="{ active: item.id == idCategory }"
                      :key="item.id"
                    >
                      <a 
                        :href="
                          item.product_filter
                            ? `/cua-hang/${category.handle}/${item.handle}?${item.product_filter}`
                            : `/cua-hang/${category.handle}/${item.handle}`
                        "
                        class="nav-link"
                        >{{ item.title }}</a
                      >
                      <!-- <a  :href="`/cua-hang/${category.handle}/${item.handle}`">{{
                    item.title
                  }}</a> -->
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="widget widget_tag_cloud" v-if="tags.length > 0">
          <h3 class="widget-title"><SVTag style="margin: 0 13px 0 0" />Tags</h3>
          <div class="tagcloud">
            <a
              v-for="(tag, index) in tags"
              :key="index"
              @click.prevent="selectTag(tag.id, tag.slug)"
              :class="{
                active:
                  (slugTagActive === tag.slug && active) ||
                  tag.slug === tagQuery,
              }"
              >{{ tag.name }}</a
            >
          </div>
        </div>
        <div class="widget widget_filter" style="height: 40%">
          <!-- <h3 class="widget-title">
            <SVGFilter style="margin: 0 13px 0 0" />Bộ lọc
          </h3>
          <div class="filter-price">
            <h5>Giá</h5>
            <a
              @click="selectPrice([0, 5000000], 1)"
              class="btn-default"
              :class="{ 'btn-green': indexActivePrice === 1 }"
            >
              Dưới 5.000.000đ</a
            >
            <a
              @click="selectPrice([5000000, 10000000], 2)"
              class="btn-default"
              :class="{ 'btn-green': indexActivePrice === 2 }"
              >Từ 5.000.000đ đến 10.000.000đ</a
            >
            <a
              @click="selectPrice([10000000, 15000000], 3)"
              class="btn-default"
              :class="{ 'btn-green': indexActivePrice === 3 }"
              >Từ 10.000.000đ đến 15.000.000đ</a
            >
            <a
              @click="selectPrice([15000000, 10000000000], 4)"
              class="btn-default"
              :class="{ 'btn-green': indexActivePrice === 4 }"
              >Trên 15.000.000đ</a
            >
          </div>
          <div class="filter-price" style="border: none;">
            <h5>Khoảng giá</h5>
            <div style="width: 80%">
              <vue-slider
                v-model="value"
                :min="min"
                :tooltip-placement="['bottom', 'top']"
                :interval="100000"
                :tooltip-formatter="formatter2"
                :max="max"
              ></vue-slider>
            </div>

            <a class="btn-default"
              >Từ {{ value[0] == 0 ? value[0] : convertPrice(value[0]) }}đ</a
            >
            <a class="btn-default"
              >Đến {{ value[1] == 0 ? value[1] : convertPrice(value[1]) }}đ</a
            >

            <a @click="selectPrice(value, 5)" class="btn-default btn-green">
              Áp dụng</a
            >
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import component
import VueSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
// import theme
import "vue-slider-component/theme/default.css";
import SVGMenu from "~/assets/img/list.svg";
import SVGFilter from "~/assets/img/filter-2.svg";
import SVTag from "~/assets/img/label.svg";

// import theme
export default {
  name: "CategorySidebar",
  props: ["showModale", "idCategory", "categories_props"],
  components: {
    VueSlider,
    SVGMenu,
    SVGFilter,
    SVTag,
  },
  data() {
    return {
      formatter2: (v) => `${("" + v).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
      value: [5000000, 15000000],
      min: 0,
      max: 20000000,
      errorMsg: "",
      tags: [],
      id: "",
      slugTagActive: this.$route.query.tags ? this.$route.query.tags : "",
      indexActivePrice: "",
      active: false,
      indexActive: null,
      isToggle: false,
      slug: null,
      categories: null,
      price: null,
      tagQuery: this.$route.query.tags ? this.$route.query.tags : "",
    };
  },
  mounted() {
    this.getCategories();

    if (this.idCategory != 99999) {
      this.tags = [];
      //console.log(`idCategory changed from ${oldValue} to ${newValue}`);
      this.getProductTagsToCategory(this.idCategory);
    } else {
      this.getProductTags();
    }

    // if (this.idCategory) {
    //   //console.log(`idCategory changed from ${oldValue} to ${newValue}`);
    //   this.getProductTagsToCategory(this.idCategory);
    // } else {
    //   this.getProductTags();
    // }

    //this.getProductTags();
  },
  watch: {
    indexActive: function () {
      this.isToggle = true;
    },
    id: function () {
      this.active = true;
      const setTag = {
        id: this.id,
        slug: this.slug,
        page: 1,
      };

      if (this.tagQuery === this.slugTagActive || this.slug === "") {
        this.slug = "";
      } else {
        this.tagQuery = this.slug;
      }
      this.$emit("sortTag", setTag);
    },

    active(active) {
      if (active) {
      } else {
        const setTag = {
          id: "",
          slug: "",
          page: 1,
        };
        //console.log("🚀 ~ active ~ setTag:", setTag);
        this.$emit("sortTag", setTag);
      }
    },
    // idCategory(newValue, oldValue) {
    //   console.log("idCategory", newValue);
    //   if (newValue != 99999) {
    //     this.tags = [];
    //     //console.log(`idCategory changed from ${oldValue} to ${newValue}`);
    //     this.getProductTagsToCategory(newValue);
    //   } else {
    //     this.getProductTags();
    //   }
    // },
  },
  methods: {
    handleCloseModal() {
      this.$emit("closeShowModale");
    },
    // handleClickAllProductToCategory(categoryHandle) {
    //   this.$router.push({
    //     path: `/cua-hang/danh-muc/${categoryHandle}`,
    //   });

    //   this.getProductTagsToCategory(categoryHandle);
    // },

    convertPrice(price) {
      if (price) {
        return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
    },
    check(categories) {
      categories?.forEach((element, i) => {
        if (element.level === 1) {
          element.child?.forEach((childE) => {
            if (this.idCategory === childE.id) {
              this.showSubMenu(i);
            }
          });
        }
      });
    },
    getCategories() {
      this.$store
        .dispatch("getCategories", this.$route.query.store)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.categories = data.data;
              this.check(data.data);

              break;
            case 0:
              console.log(data.message);
              break;
          }
        })
        .catch((data) => {
          this.$toast.error(data.message, {});
        });
    },
    showSubMenu(index) {
      this.indexActive = index;
      this.isToggle = !this.isToggle;
    },
    selectTag(id, slug) {
      if (slug === this.tagQuery) {
        window.history.pushState({}, "", window.location.pathname);
        this.tagQuery = "";
        this.id = "";
        this.slugTagActive = "";
        this.slug = "";
        const setTag = {
          id: "",
          slug: "",
          page: 1,
        };
        //console.log("🚀 ~ selectTag ~ setTag:", setTag);
        this.$emit("sortTag", setTag);
        this.$emit("closeShowModale");
      } else {
        this.id = id;
        this.slug = slug;
        this.slugTagActive = slug;
        this.active = !this.active;
        if (window.location.pathname) {
          this.$router.push({
            path: window.location.pathname,
            query: {
              tags: slug,
            },
          });
        }
        //this.$router.name
        else {
          this.$router.push({
            path: "/cua-hang",
            query: {
              tags: slug,
            },
          });
        }
      }
    },

    selectPrice(price, id) {
      if (this.indexActivePrice !== id || id === 5) {
        this.indexActivePrice = id;
        this.$emit("sortPrice", price);
      } else {
        this.indexActivePrice = "";
        this.$emit("sortPrice", []);
      }
    },
    getProductTags() {
      this.tags = [];
      this.$store
        .dispatch("getProductTagsV2", this.$route.query.store)
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              //console.log("response.data", response.data);
              this.tags = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getProductTagsToCategory(category) {
      const categoryObj = this.categories_props?.find((c) => c.id == category);
      const ids = categoryObj?.child
        ? [categoryObj.id, ...categoryObj?.child?.map((child) => child.id)]
        : [categoryObj.id];
      //console.log("🚀 ~ getProductTagsToCategory ~ category:", category, ids);
      this.tags = [];

      const apiCalls = ids.map((id) =>
        this.$store.dispatch("getProductTagsToCategoryV2", id)
      );
      Promise.all(apiCalls)
        .then((responses) => {
          // Kết hợp tất cả dữ liệu từ các phản hồi
          const combinedTags = responses.flatMap((response) => {
            if (response.status == 1 && response.data.length > 0) {
              return response.data; // Chỉ lấy dữ liệu khi status === 1
            }
            return [];
          });

          // Cập nhật this.tags với dữ liệu đã kết hợp
          this.tags.push(...combinedTags);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
<style lang="scss">
$light-green-color: #44ce6f;

.vue-slider-dot-tooltip-inner {
  border-color: $light-green-color;
  background-color: $light-green-color;
}

.vue-slider-process {
  background: $light-green-color;
}

/* dot style */
.vue-slider-dot-handle {
  background: $light-green-color;
}

.vue-slider-dot-handle-focus {
  background: $light-green-color;
}

.vue-slider-rail {
  border-radius: 15px;
  border: 1px solid #ccc;
  background-color: #fff;
}

.widget-area-modal {
  animation: slideInFromBottom 0.3s ease-out;
}

.widget-area-modal-close {
  animation: slideInFromTop 0.3s ease-out;
}

@keyframes slideInFromTop {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  25% {
    opacity: 1;
    transform: translateY(0);
  }
  75% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes slideInFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
