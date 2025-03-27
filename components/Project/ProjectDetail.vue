<template>
  <div class="project-details-area ptb-80">
    <div class="container" v-if="details">
      <CoolLightBox
        :items="items"
        :index="index"
        :effect="'fade'"
        @close="index = null"
      >
      </CoolLightBox>
      <div class="row">
        <div
          class="col-lg-6 col-md-6 col-sm-6"
          v-for="(image, imageIndex) in details[0]?.attributes?.images.data"
          :key="imageIndex"
        >
          <div class="project-details-image">
            <nuxt-img
              :src="image?.attributes?.url"
              :alt="details[0]?.attributes?.title"
              provider="strapi"
            />

            <a @click="setIndex(imageIndex)" class="popup-btn">
              <feather type="plus"></feather
            ></a>
          </div>
        </div>

        <div class="col-lg-12 col-md-12">
          <div v-if="details !== null" class="project-details-desc">
            <h3>{{ details[0]?.attributes?.title }}</h3>

            <span v-html="details[0]?.attributes?.description"></span>

            <div class="project-details-information">
              <!-- <div
                class="single-info-box"
                v-for="boxe in details.boxes"
                :key="boxe.id"
              >
                <h4>{{ boxe.title }}</h4>
                <p>{{ boxe.text }}</p>
              </div> -->
              <!-- 
              <div class="single-info-box">
                <h4>Share</h4>
                <ul>
                  <li>
                    <a href="#"><feather type="facebook"></feather></a>
                  </li>
                  <li>
                    <a href="#"><feather type="twitter"></feather></a>
                  </li>
                  <li>
                    <a href="#"><feather type="instagram"></feather></a>
                  </li>
                  <li>
                    <a href="#"><feather type="linkedin"></feather></a>
                  </li>
                </ul>
              </div> -->
              <div class="single-info-box">
                <a href="#" class="btn btn-primary">Xem demo</a>
              </div>
            </div>
            <!-- 
            <div class="single-info-box">
              <a href="#" class="btn btn-primary">Xem live</a>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      images: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export default {
  name: "ProjectDetails",
  components: {
    CoolLightBox,
  },
  data: function () {
    return {
      items: [
        {
          src: require("~/assets/img/works-image/1.jpg"),
        },
        {
          src: require("~/assets/img/works-image/2.jpg"),
        },
        {
          src: require("~/assets/img/works-image/3.jpg"),
        },
        {
          src: require("~/assets/img/works-image/4.jpg"),
        },
      ],
      index: null,
      details: null,
    };
  },
  async asyncData({ details, $strapi, route }) {
    try {
      const response = await $strapi.find(
        "project-details",
        `?filters[slug][$eq]=${route.params.slug}&${query}`
      );

      details = response.data;
    } catch (e) {
      console.log("ProjectDetail",e);
    }
    return { details };
  },
  methods: {
    setIndex(index) {
      this.index = index;
    },
  },

  // created: async function () {
  //   const { slug } = this.$route.params;
  //   this.details = await this.$strapi.find(
  //     "project-details",
  //     `?filters[slug][$eq]=${slug}&${query}`
  //   );
  //   this.details = this.details.data;
  // },
};
</script>
