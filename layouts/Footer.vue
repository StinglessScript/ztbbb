<template>
  <div>
    <footer
      class="footer-area bg-f7fafd"
      v-if="
        $route.name != 'thuc-hanh-lab' && $route.name != 'thuc-hanh-lab-lab'
      "
    >
      <div class="container" v-if="footers">
        <div class="row">
          <div
            class="col-6 col-md col-lg col-sm-6"
            v-for="footer in footersSort"
            :key="footer.id"
          >
            <div class="single-footer-widget">
              <h3>{{ footer.title }}</h3>
              <ul class="list">
                <li v-for="item in footer.items" :key="item.id">
                  <a
                    v-if="`${item.link}`.includes('http')"
                    :href="item.link"
                    target="_blank"
                    >{{ item.title }}</a
                  >
                  <a v-else-if="Number(item.link)" :href="`tel:${item.link}`">{{
                    item.title
                  }}</a>
                  <a  :href="item.link" v-else>
                    {{ item.title }}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="col-lg-12 col-md-12">
            <div class="copyright-area">
              <div class="licenses">
                <a
                  :href="item.url"
                  target="_blank"
                  v-for="item in license?.data?.attributes?.licenses"
                  :key="item.id"
                >
                  <img
                    class="img-license"
                    :src="
                      $config.BASE_URL_IMG + item?.image?.data?.attributes?.url
                    "
                  />
                </a>
              </div>
              <p>Copyright &copy; {{ footers.vendors.copyRight }}</p>
            </div>
          </div>
        </div>
      </div>

      <img src="~/assets/img/map.png" class="map" alt="map" />
      <div class="shape1">
        <img src="~/assets/img/shape1.png" alt="shape" />
      </div>
      <!-- <div class="shape8 rotateme">
      <img src="~/assets/img/shape2.svg" alt="shape" />
      {{  }}
    </div> -->
    </footer>
    <!-- {{ config?.data?.attributes?.BannerFooter. }} -->
    <BannerFooter :banners="config?.data?.attributes?.BannerFooter" />
  </div>
</template>

<script>
const qs = require("qs");
const query = qs.stringify(
  {
    populate: {
      BannerFooter: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
const queryLicense = qs.stringify(
  {
    populate: {
      licenses: {
        populate: "*",
      },
    },
  },
  {
    encodeValuesOnly: true,
  }
);
export default {
  name: "Footer",
  middleware: ["checkAuth", "middlewareHeader"],

  data() {
    return {
      footers: null,
      config: null,
      license: null,
    };
  },
  mounted() {
    this.getFooter();

    //this.getConfig();
    this.getLicense();
  },
  computed: {
    footersSort() {
      return this.footers.category.sort(function (a, b) {
        if (a.id < b.id) {
          return -1;
        }
        if (a.id > b.id) {
          return 1;
        }
        return 0;
      });
    },
    currentTime() {
      return Date.now();
    },
    // showBanner() {
    //   const start = Date.parse(
    //     this.config?.data?.attributes?.BannerFooter?.startDate
    //   );
    //   const end = Date.parse(
    //     this.config?.data?.attributes?.BannerFooter?.endDate
    //   );
    //   return this.currentTime >= start && this.currentTime <= end;
    // },
  },
  methods: {
    async getFooter() {
      this.footers = await this.$strapi.find("footer/all/all");
    },
    async getConfig() {
      this.config = await this.$strapi.$config.find(query);
      console.log(this.config);
    },
    async getLicense() {
      this.license = await this.$strapi.$license.find(queryLicense);
      console.log(
        "🚀 ~ file: Footer.vue:129 ~ getLicense ~ this.license :",
        this.license
      );
    },
  },
};
</script>
<style lang="scss" scoped>
// class="d-flex justify-content-center"
//   style="gap: 20px; padding: 0 0 20px 0"
.licenses {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 0 0 20px 0;
  .img-license {
    height: 55px;
  }
}

@media (max-width: 768px) {
  .licenses {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0 0 20px 0;
    .img-license {
      height: 30px;
    }
  }
}
</style>
