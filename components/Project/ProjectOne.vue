<template>
  <div class="ml-projects-area pt-80 ptb-80" v-if="content">
    <div class="container">
      <div class="section-title">
        <h2>CÁC DỰ ÁN ĐÃ TRIỂN KHAI</h2>
        <div class="bar"></div>
        <p>Ù à ù ập , Flatinor, Topway, Freshfast ,...</p>
      </div>
    </div>

    <div class="container-fluid">
      <div class="ml-projects-slides owl-carousel owl-theme">
        <carousel
          :autoplay="true"
          :paginationEnabled="true"
          :loop="true"
          :smartSpeed="1000"
          :autoplayTimeout="5000"
          :perPageCustom="[
            [0, 1],
            [576, 2],
            [768, 2],
            [1024, 3],
            [1200, 4],
          ]"
        >
          <slide v-for="item in content" :key="item.id">
            <div
              class="single-ml-projects-box"
              v-if="item?.attributes?.imageUrl"
            >
              <img :src="item?.attributes?.imageUrl" />

              <div class="plus-icon">
                <a  :href="`/project/${item?.attributes?.slug}`">
                  <span></span>
                </a>
              </div>
            </div>
            <div
              class="single-ml-projects-box"
              v-else-if="
                !item?.attributes?.imageUrl && item?.attributes?.cover.data
              "
            >
              <nuxt-img
                :src="item?.attributes?.cover.data?.attributes?.url"
                :alt="item?.attributes?.title"
                provider="strapi"
              />

              <div class="plus-icon">
                <a  :href="`/project/${item?.attributes?.slug}`">
                  <span></span>
                </a>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </div>

    <div class="shape2 rotateme">
      <Shape2 />
    </div>
    <div class="shape3"><Shape3 /></div>
    <div class="shape4"><Shape4 /></div>
    <div class="shape6 rotateme">
      <Shape4 />
    </div>
    <div class="shape7"><Shape4 /></div>
    <div class="shape8 rotateme">
      <Shape2 />
    </div>
  </div>
</template>

<script>
import Shape2 from "~/assets/img/shape2.svg";
import Shape3 from "~/assets/img/shape3.svg";
import Shape4 from "~/assets/img/shape4.svg";
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      cover: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export default {
  name: "ProjectOne",
  components: {
    Shape2,
    Shape3,
    Shape4,
  },
  data() {
    return {
      content: null,
    };
  },
  async created() {
    await this.$strapi
      .find("project-details", query)
      .then((data) => {
        this.content = data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
