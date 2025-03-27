<template>
  <div v-if="block">
    <MainBanner :product="block" />
    <div
      class="page-title-area"
      style="margin-top: -50px"
      v-if="block?.pageTitle"
    >
      <div class="d-table">
        <div class="d-table-cell">
          <h1>{{ block?.pageTitle }}</h1>
        </div>
      </div>

      <div class="shape1">
        <img src="~/assets/img/shape1.png" alt="shape" />
      </div>
      <div class="shape2 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
      <div class="shape3">
        <img src="~/assets/img/shape3.svg" />
      </div>
      <div class="shape4">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape5">
        <img src="~/assets/img/shape5.png" alt="shape" />
      </div>
      <div class="shape6 rotateme">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape7">
        <img src="~/assets/img/shape4.svg" />
      </div>
      <div class="shape8 rotateme">
        <img src="~/assets/img/shape2.svg" />
      </div>
    </div>
    <div
      class="services-area ptb-80"
      v-for="category in categories"
      :key="category?.attributes?.order"
    >
      <div
        v-if="category?.attributes?.slug?.includes('Manage')"
        class="container"
      >
        <component
          :is="category?.attributes?.slug?.split('_').pop()"
          :groupId="category?.attributes?.prefix"
        />
      </div>
      <div class="container" v-else>
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-lg-7 col-md-12 services-content">
            <div class="section-title">
              <a  :href="`/${category?.attributes?.slug}`">
                <h2>{{ category?.attributes?.title }}</h2>
              </a>
              <div class="bar"></div>
              <p>{{ category?.attributes?.description }}</p>
            </div>
            <div class="row">
              <template v-for="item in category?.attributes?.ListPages">
                <div
                  class="col-lg-6 col-md-6 col-sm-6"
                  :key="item?.page_default?.data?.id"
                  v-if="item?.page_default?.data?.attributes?.enabled !== false"
                >
                  <a 
                    class="box"
                    :href="`/${item?.page_default.data?.attributes?.slug}`"
                    style="gap: 10px; min-height: 80px"
                  >
                    <feather
                      :type="item?.page_default?.data?.attributes?.icon"
                    ></feather>
                    <p
                      v-if="item?.name"
                      v-html="fixImagePaths(item.name)"
                      class="textInBox"
                    ></p>
                  </a>
                </div>
              </template>
            </div>
          </div>
          <div class="col-lg-5 col-md-12 services-right-image">
            <img
              v-if="category?.attributes?.imageUrl"
              :src="category?.attributes?.imageUrl"
              class="wow fadeInDown"
              v-wow
              data-wow-delay="0.6s"
              alt="main-pic"
              style="width: 350px"
            />

            <nuxt-img
              v-else-if="
                !category?.attributes?.imageUrl &&
                category?.attributes?.image.data
              "
              :src="category?.attributes?.image.data?.attributes?.url"
              width="350"
              class="wow fadeInDown"
              v-wow
              data-wow-delay="0.6s"
              alt="main-pic"
              provider="strapi"
            />
            <img
              v-else
              src="~/assets/img/services-right-image/cercle-shape.png"
              class="bg-image rotateme"
              alt="shape"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBanner from "@/components/Index/MainBanner";
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";

export default {
  name: "CategoryOne",
  components: {
    Shape2,
    Shape3,
    Shape4,
  },
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      categories: null,
    };
  },

  components: {
    MainBanner,
  },
  mounted() {
    console.log("Props block:", this.block);

    this.categories = this.block?.child_categories?.data?.sort((a, b) => {
      return a?.attributes?.order - b?.attributes?.order;
    });
    console.log("Danh sách categories:", this.categories);

    // Log danh sách ListPages và richTextName
    this.categories?.forEach((category) => {
      category?.attributes?.ListPages?.forEach((item) => {
        console.log("Item:", item);
        console.log("name:", item?.name);
      });
    });

    // console.log(
    //   "data",
    //   (this.categories = this.block.child_categories.data.sort((a, b) => {
    //     return a?.attributes?.order - b?.attributes?.order;
    //   }))
    // );
  },
  methods: {
    fixImagePaths(content) {
      if (!content) return "";

      const baseURL = `${this.$config.baseURL}`;

      // Xử lý src
      content = content.replace(
        /src=['"]\/uploads\//g,
        `src="${baseURL}/uploads/`
      );

      // Xử lý srcset
      content = content
        .replace(/srcset=['"]\/uploads\//g, `srcset="${baseURL}/uploads/`)
        .replace(/,\s*\/uploads\//g, `, ${baseURL}/uploads/`); // Xử lý các đường dẫn trong srcset

      return content;
    },
  },
};
</script>

<style lang="scss" scoped>
.textInBox {
  p {
    margin-bottom: 0 !important;
  }

  img {
    display: inline-block;
  }
}

p {
  margin: 0;
}

.services-area:nth-of-type(2n-1) {
  background: #f7fafd;

  .row {
    flex-direction: row-reverse;

    .row {
      flex-direction: row;

      .textInBox {
        p {
          margin-bottom: 0 !important;
        }

        img {
          display: inline-block;
        }
      }
    }
  }
}
</style>
<style>
@media (max-width: 768px) {
  .ptb-80 {
    padding-top: 40px;
  }
}
</style>
