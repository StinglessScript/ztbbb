<template>
  <div class="widget-area d-none d-lg-block" id="secondary">
    <div class="widget widget_categories">
      <h3 class="widget-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9.615 18.5v-1H20v1zm0-6v-1H20v1zm0-6v-1H20v1zM5.327 19.327q-.547 0-.937-.39T4 18t.39-.937q.39-.39.937-.39t.937.39q.39.39.39.937t-.39.937q-.39.39-.937.39m0-6q-.547 0-.937-.39T4 12t.39-.937q.39-.39.937-.39t.937.39q.39.39.39.937t-.39.937q-.39.39-.937.39m0-6q-.547 0-.937-.39T4 6t.39-.937q.39-.39.937-.39t.937.39q.39.39.39.937t-.39.937q-.39.39-.937.39"
          ></path>
        </svg>

        Danh mục sản phẩm
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
              <!-- @click="handleClickAllProductToCategory(category.handle)" -->
              <!-- :href="`/cua-hang/danh-muc/${category.handle}`" -->
              <a 
                class="custom-menu-item-a"
                :href="`/cua-hang/danh-muc/${category.handle}`"
              >
                {{ category.title }}
              </a>
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
    <div class="widget widget_tag_cloud" v-if="tags?.length > 0">
      <h3 class="widget-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 36 36"
        >
          <path
            fill="currentColor"
            d="M33.16 19.13L19.58 5.55A1.92 1.92 0 0 0 18.21 5h-2.09l15.63 15.45l-10.53 10.62a1.93 1.93 0 0 0 2.73 0l9.21-9.21a1.93 1.93 0 0 0 0-2.73"
            class="clr-i-outline clr-i-outline-path-1"
          ></path>
          <circle
            cx="7.81"
            cy="11.14"
            r="1.33"
            fill="currentColor"
            class="clr-i-outline clr-i-outline-path-2"
          ></circle>
          <path
            fill="currentColor"
            d="M27.78 19.17L14.2 5.58A1.92 1.92 0 0 0 12.83 5H3.61a1.93 1.93 0 0 0-1.93 1.93v9.22a1.92 1.92 0 0 0 .57 1.36L15.84 31.1a1.93 1.93 0 0 0 2.73 0l9.21-9.21a1.93 1.93 0 0 0 0-2.72M17.26 29.69L3.69 16.15V7h9.1l13.58 13.48Z"
            class="clr-i-outline clr-i-outline-path-3"
          ></path>
          <path fill="none" d="M0 0h36v36H0z"></path>
        </svg>

        Tags
      </h3>
      <div class="tagcloud">
        <a
          v-for="(tag, index) in tags"
          :key="index"
          @click.prevent="selectTag(tag.id, tag.slug)"
          :class="{
            active:
              (slugTagActive === tag.slug && active) || tag.slug === tagQuery,
          }"
          >{{ tag.name }}</a
        >
      </div>
    </div>
    <!-- <div class="widget widget_filter">
      <h3 class="widget-title">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11 20q-.425 0-.712-.288T10 19v-6L4.2 5.6q-.375-.5-.112-1.05T5 4h14q.65 0 .913.55T19.8 5.6L14 13v6q0 .425-.288.713T13 20zm1-7.7L16.95 6h-9.9zm0 0"
          ></path>
        </svg>

        Bộ lọc
      </h3>
      <div class="filter-price">
        <h5>
        Giá
        </h5>
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
      <div class="filter-price">
        <h5>
          Khoảng giá
        </h5>
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
      </div>
    </div> -->
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
  props: ["idCategory", "categories_props"],
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
    idCategory(newValue, oldValue) {
      // console.log("idCategory", newValue);
      if (newValue != 99999) {
        this.tags = [];
        //console.log(`idCategory changed from ${oldValue} to ${newValue}`);
        this.getProductTagsToCategory(newValue);
      } else {
        this.getProductTags();
      }
    },
  },
  methods: {
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
      const categoryObj = this.categories_props.find((c) => c.id == category);
      const ids = categoryObj?.child
        ? [categoryObj.id, ...categoryObj?.child?.map((child) => child.id)]
        : [categoryObj.id];
      //console.log("🚀 ~ getProductTagsToCategory ~ category:", category, ids);
      this.tags = [];
      // this.$store
      //   .dispatch("getProductTagsToCategoryV2", category)
      //   .then((response) => {
      //     switch (response.status) {
      //       case 0:
      //         break;
      //       case 1:
      //         //console.log("response.data", response.data);
      //         this.tags = response.data;
      //         break;
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      const apiCalls = ids.map((id) => {
        let data = {
          store: this.$route.query.store,
          id,
        };
        return this.$store.dispatch("getProductTagsToCategoryV2", data);
      });
      Promise.all(apiCalls)
        .then((responses) => {
          // Kết hợp tất cả dữ liệu từ các phản hồi
          const combinedTags = responses.flatMap((response) => {
            if (response.status == 1) {
              return response.data; // Chỉ lấy dữ liệu khi status === 1
            }
            return [];
          });

          // Cập nhật this.tags với dữ liệu đã kết hợp
          this.tags = combinedTags;
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

.custom-menu-item-a {
  color: #0e314c;
  display: block;
  height: 40px;
  width: 100%;
  padding: 0px 15px;
  line-height: 40px;
  text-transform: capitalize;

  //color: #44ce6f;
  display: inline-block;
  transition: 0.5s;
  -webkit-text-decoration: none;
  text-decoration: none;
  outline: 0 !important;

  cursor: pointer;

  &:hover {
    color: #44ce6f;
  }
}

.active-customr {
  color: #44ce6f;
}
</style>
