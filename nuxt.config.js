import axios from "axios";
import { crmApiUrl } from "./constants/urlApi";

export default {
  server: {
    host: 0,
    port: process.env.PORT,
  },
  ssr: true,
  target: "server",
  loading: false,
  // server: {
  //   port: process.env.PORT,
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
  //   }
  // },
  // generate: {
  //   routes: async function () {
  //     let posts = [];
  //     let users = [];
  //     let artical = [];

  //     // Fetch all posts with pagination
  //     try {
  //       let page = 1;
  //       let totalPages = 1;

  //       // Lặp qua các trang và lấy dữ liệu cho posts
  //       while (page <= totalPages) {
  //         const res = await axios.get(
  //           `${process.env.STRAPI_URL}/page-defaults?pagination[page]=${page}&pagination[pageSize]=25`
  //         );
  //         //console.log(`Fetched page ${page} for posts:`, res.data);

  //         posts = [
  //           ...posts,
  //           ...res.data.data.map((user) => "/" + user?.attributes?.slug),
  //         ];

  //         // Cập nhật totalPages từ meta
  //         totalPages = res.data.meta.pagination.pageCount;
  //         page++;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching posts API:", error);
  //     }

  //     // Fetch all articles with pagination
  //     try {
  //       let page = 1;
  //       let totalPages = 1;

  //       // Lặp qua các trang và lấy dữ liệu cho articles
  //       while (page <= totalPages) {
  //         const res = await axios.get(
  //           `${process.env.STRAPI_URL}/articles?pagination[page]=${page}&pagination[pageSize]=25`
  //         );
  //         //console.log(`Fetched page ${page} for articles:`, res.data);

  //         artical = [
  //           ...artical,
  //           ...res.data.data.map((user) => "/" + user?.attributes?.slug),
  //         ];

  //         // Cập nhật totalPages từ meta
  //         totalPages = res.data.meta.pagination.pageCount;
  //         page++;
  //       }
  //     } catch (error) {
  //       console.error("Error fetching articles API:", error);
  //     }

  //     // Fetch all products with pagination (API này khác với hai cái trên)
  //     try {
  //       let usersData = [];
  //       let page = 1;
  //       let totalPages = 1;

  //       // Lặp qua các trang và lấy dữ liệu cho products
  //       while (page <= totalPages) {
  //         const res = await axios.get(
  //           `${process.env.PRODUCT_SERVICE}/products/${process.env.ORG_ID}/${process.env.STORE_ID}`,
  //           {
  //             params: { page: page },
  //           }
  //         );
  //         //console.log(`Fetched product page ${page}:`, res.data);

  //         usersData = [
  //           ...usersData,
  //           ...res.data.data.data.map((item) => "/san-pham/" + item.handle),
  //         ];

  //         // Cập nhật totalPages từ response
  //         totalPages = res.data.data.totalPage;
  //         page++;
  //       }

  //       users = usersData;
  //     } catch (error) {
  //       console.error("Error fetching products API:", error);
  //     }

  //     // Trả về tất cả các routes đã lấy
  //     const allRoutes = [...posts, ...artical, ...users];
  //     console.log("🚀 ~ users:", users);
  //     console.log("🚀 ~ artical:", artical);
  //     console.log("🚀 ~ posts:", posts);

  //     // Kiểm tra xem có lấy đủ không (debugging)
  //     console.log("All routes fetched:", allRoutes?.length);

  //     return allRoutes; // Combine all data into one list of routes
  //   },
  // },

  env: {
    API_URL: process.env.API_URL,
    STRAPI_URL: process.env.API_URL,
    PUBLIC_API_AUTH_URL: process.env.PUBLIC_API_AUTH_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    AUTH_GRAPHQL_API_URL: process.env.AUTH_GRAPHQL_API_URL,
    CRM_API_URL: process.env.CRM_API_URL,
    PUBLIC_API_CLOUD_SERVICE_URL: process.env.PUBLIC_API_CLOUD_SERVICE_URL,

    PRODUCT_SERVICE: process.env.PRODUCT_SERVICE,
    PRODUCT_SERVICE_GRAPHQL: process.env.PRODUCT_SERVICE_GRAPHQL,
    ORG_ID: process.env.ORG_ID,
    STORE_ID: process.env.STORE_ID,
    PAYMENT_HUB_URL: process.env.PAYMENT_HUB_URL,
    INVOICE_URL: process.env.INVOICE_URL,

    WorkEffortTypeAction: process.env.WorkEffortTypeAction,

    WorkEffortTypeId: process.env.WorkEffortTypeId,

    PUBLIC_API_PARTNERID: process.env.PUBLIC_API_PARTNERID,
    PUBLIC_API_STORE_CHANNEL: process.env.PUBLIC_API_STORE_CHANNEL,
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    baseURL: process.env.baseURL,
    GG_SHOPPING: process.env.GG_SHOPPING,
    ORDER_API_URL: process.env.ORDER_API_URL,

    USER_INSIDE_URL: process.env.USER_INSIDE_URL,
    PUBLIC_API_CRM_SERVICE_URL: process.env.PUBLIC_API_CRM_SERVICE_URL,
    ARRAY_PRODUCT_ORDER: process.env.ARRAY_PRODUCT_ORDER,
    SUPPORT_V1: process.env.SUPPORT_V1,
    ACCESSTOKEN_NAME: process.env.ACCESSTOKEN_NAME,
    CONTENT_CMS_URL: process.env.CONTENT_CMS_URL,
    ENVIROMENT: process.env.ENVIROMENT,
    ANONYMOUS_ID: process.env.ANONYMOUS_ID,

    ORDER_API_STOREFRONT: process.env.ORDER_API_STOREFRONT,

    PRODUCT_OPTION_DEFAULT: process.env.PRODUCT_OPTION_DEFAULT,

    PA_SERVICE: process.env.PA_SERVICE,
    DOMAIN_CATEGORY: process.env.DOMAIN_CATEGORY,

    TIME_RENT_DEFAULT: process.env.TIME_RENT_DEFAULT,
    MARKETPLACE: process.env.MARKETPLACE,
  },
  publicRuntimeConfig: {
    baseURL: process.env.baseURL,
    STRAPI_URL: process.env.API_URL,
    CRM_API_URL: process.env.CRM_API_URL,

    WorkEffortTypeAction: process.env.WorkEffortTypeAction,
    PRODUCT_SERVICE_GRAPHQL: process.env.PRODUCT_SERVICE_GRAPHQL,
    PUBLIC_API_CLOUD_SERVICE_URL: process.env.PUBLIC_API_CLOUD_SERVICE_URL,
    WorkEffortTypeId: process.env.WorkEffortTypeId,

    PUBLIC_API_AUTH_URL: process.env.PUBLIC_API_AUTH_URL,
    AUTH_GRAPHQL_API_URL: process.env.AUTH_GRAPHQL_API_URL,
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    PAYMENT_HUB_URL: process.env.PAYMENT_HUB_URL,
    INVOICE_URL: process.env.INVOICE_URL,
    PRODUCT_SERVICE: process.env.PRODUCT_SERVICE,
    ORG_ID: process.env.ORG_ID,
    STORE_ID: process.env.STORE_ID,
    ORDER_API_URL: process.env.ORDER_API_URL,
    PUBLIC_API_URL: process.env.PUBLIC_API_URL,
    PUBLIC_API_PARTNERID: process.env.PUBLIC_API_PARTNERID,
    PUBLIC_API_STORE_CHANNEL: process.env.PUBLIC_API_STORE_CHANNEL,
    BASE_URL_IMG: process.env.baseURL,
    GG_SHOPPING: process.env.GG_SHOPPING,
    USER_INSIDE_URL: process.env.USER_INSIDE_URL,
    PUBLIC_API_CRM_SERVICE_URL: process.env.PUBLIC_API_CRM_SERVICE_URL,
    ARRAY_PRODUCT_ORDER: process.env.ARRAY_PRODUCT_ORDER,
    SUPPORT_V1: process.env.SUPPORT_V1,
    ACCESSTOKEN_NAME: process.env.ACCESSTOKEN_NAME,
    CONTENT_CMS_URL: process.env.CONTENT_CMS_URL,
    ENVIROMENT: process.env.ENVIROMENT,
    ANONYMOUS_ID: process.env.ANONYMOUS_ID,

    ORDER_API_STOREFRONT: process.env.ORDER_API_STOREFRONT,

    PRODUCT_OPTION_DEFAULT: process.env.PRODUCT_OPTION_DEFAULT,

    PA_SERVICE: process.env.PA_SERVICE,
    DOMAIN_CATEGORY: process.env.DOMAIN_CATEGORY,

    TIME_RENT_DEFAULT: process.env.TIME_RENT_DEFAULT,
    MARKETPLACE: process.env.MARKETPLACE,
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Cho thuê Server SSD, Host VPS Chất Lượng Cao",
    htmlAttrs: {
      lang: "vi",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "robots", name: "robots", content: "index, follow" },
      {
        hid: "google-site-verification",
        name: "google-site-verification",
        content: process.env.GG_SHOPPING,
      },
      {
        hid: "og:image",
        name: "og:image",
        content: `${process.env.baseURL}/uploads/logo_lvs_1300x330_b6da2e05e9.png`,
      },
      {
        hid: "image",
        name: "image",
        content: `${process.env.baseURL}/uploads/logo_lvs_1300x330_b6da2e05e9.png`,
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/logo-lvs.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
      },
    ],
    script: [
      {
        src: ["https://accounts.google.com/gsi/client"],
      },
      {
        src: ["https://sp.zalo.me/plugins/sdk.js"],
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/animate.css",
    "~/assets/css/bootstrap.min.css",
    "~/assets/css/flaticon.css",
    "~/assets/css/machine-learning.css",
    "~/assets/css/boxicons.min.css",
    "~/assets/css/main.scss",
    "~/assets/css/bigdata-analytics.scss",
    "~/assets/css/shop.scss",
    "~/assets/css/products-details.scss",
    "~/assets/css/product-detail.scss",
    "~/assets/css/product-checkout.scss",
    "~/assets/css/cart-confirm.scss",
    "~/assets/css/cart.scss",
    "~/assets/css/checkout.scss",
    "~/assets/css/features.scss",
    "~/assets/css/service-details.scss",
    "~/assets/css/feature-details.scss",
    "~/assets/css/feedback.scss",
    "~/assets/css/projects.scss",
    "~/assets/css/project-details.scss",
    "~/assets/css/team.scss",
    "~/assets/css/coming-soon.scss",
    "~/assets/css/contact.scss",
    "~/assets/css/repair-center.css",
    "~/assets/css/web-hosting.css",
    // "~/assets/css/responsive.css",
    "~/assets/css/responsive.scss",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/vue-carousel", ssr: false },
    { src: "~/plugins/vue-cool-lightbox", ssr: false },
    { src: "~/plugins/vue-backtotop", ssr: false },
    { src: "~/plugins/vue-feather", ssr: false },
    { src: "~/plugins/vue-toastification", ssr: false },
    { src: "~/plugins/vue-js-modal" },
    { src: "~/plugins/vee-validate.js", ssr: false },
    { src: "~/plugins/star-rating.js", ssr: false },
    { src: "~/plugins/v-wow", ssr: false },
    { src: "~/plugins/vue-agile", ssr: false },
    { src: "~/plugins/chat-woot", ssr: false },
    { src: "~/plugins/app.js", ssr: true },
    { src: "~/plugins/storefront-js-client.js", ssr: true },
    { src: "~/plugins/vue-select", ssr: false },
    "~/plugins/gtm.js",

    // { src: '~/plugins/vue-fb-customer-chat.js', ssr: false }
  ],

  router: {
    watchQuery: ["tags", "category"], // theo dõi query parameter "tags"
  },

  // router: {
  //   // linkExactActiveClass: "active",
  //   middleware: ["checkAuth" /*, "auth"*/],
  //   // trang-ca-nhan add middleware auth
  // },
  components: true,
  components: [{ path: "~/components", extensions: ["vue"] }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/svg", "@nuxtjs/dotenv"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/strapi",
    "@nuxt/image",
    "@nuxtjs/sitemap",
    "@nuxtjs/axios",
    // "cookie-universal-nuxt",
    ["cookie-universal-nuxt", { alias: "cookiz" }],
    "@nuxtjs/apollo",
    "@nuxtjs/gtm",
    "@nuxtjs/google-gtag",
  ],
  "google-gtag": {
    id: "AW-977351199",
    config: {
      anonymize_ip: true, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker: {
        domains: ["longvan.net"],
      },
    },
  },
  gtm: {
    id: "GTM-TDC7964",
    scriptDefer: true,
    pageTracking: true,
  },
  apollo: {
    clientConfigs: {
      default: "~/apollo/client-configs/default",
      // orderClient: "~/apollo/client-configs/order",
      orderClient: {
        httpEndpoint: process.env.ORDER_API_URL,
        httpLinkOptions: {
          headers: {
            partnerId: process.env.ORG_ID, // Thay đổi your_token_here thành token của bạn
            // partnerId: process.env.PUBLIC_API_PARTNERID, // Thay đổi your_token_here thành token của bạn
          },
        },
      },
      authClient: {
        httpEndpoint: process.env.PUBLIC_API_AUTH_URL,
      },
      userClient: {
        httpEndpoint: process.env.AUTH_GRAPHQL_API_URL,
      },
      paymentClient: {
        httpEndpoint: process.env.PAYMENT_HUB_URL,
      },
      invoiceClient: {
        httpEndpoint: process.env.INVOICE_URL,
      },
      productClient: {
        httpEndpoint: process.env.PRODUCT_SERVICE_GRAPHQL,
      },
    },

    defaultOptions: {
      $query: {
        loadingKey: "loading",
        fetchPolicy: "cache-and-network",
      },
    },
    watchLoading: "~/plugins/vue-apollo/apollo-watch-loading-handler.js",
    errorHandler: "~/plugins/vue-apollo/apollo-error-handler.js",
  },
  sitemap: {
    hostname: "https://longvan.net",
    gzip: true,
    exclude: [
      "/chekout",
      "/trang-ca-nhan",
      "/cap-nhat-dang-ky",
      "/cap-nhat-dang-ky/hoan-tat",
      "/cap-nhat-don-hang",
      "/dang-ky",
      "dang-nhap",
      "/ket-qua-thanh-toan",
      "/project",
      "/quan-ly-tai-khoan",
      "/quen-mat-khau",
      "/quen-mat-khau/verify",
      "/quen-mat-khau/reset",
      "/san-pham-yeu-thich",
      "/thanh-toan",
      "/thuc-hanh-lab",
      "/trang-ca-nhan",
      "/xac-thuc",
      "/baremetal",
      "/checkout",
      "/dang-ky-tu-van",
      "/dat-hang-thanh-cong",
      "/dat-hang",
      "/flaticon",
      "/gio-hang",
      "/hoa-don",
      "/longvan-technova-dang-ky-backup-microsoft-365-thanh-cong",
      "/longvan-technova-dang-ky-backup-microsoft-365",
      "/PaymentResult",
      "/reset",
      "/so-sanh",
      "/success",
      "/tao-don-hang",
      "/test",
      "/test12",
      "/thanh-toan",
      "/tim-kiem-domain",
      "/xac-nhan-dat-hang",
    ],
    routes: async () => {
      let posts = [];
      let users = [];
      let artical = [];

      // Fetch all posts with pagination
      try {
        let page = 1;
        let totalPages = 1;

        // Lặp qua các trang và lấy dữ liệu cho posts
        while (page <= totalPages) {
          const res = await axios.get(
            `${process.env.STRAPI_URL}/page-defaults?pagination[page]=${page}&pagination[pageSize]=1000`
          );
          //console.log(`Fetched page ${page} for posts:`, res.data);

          posts = [
            ...posts,
            ...res.data.data.map((user) => "/" + user?.attributes?.slug),
          ];

          // Cập nhật totalPages từ meta
          totalPages = res.data.meta.pagination.pageCount;
          page++;
        }
      } catch (error) {
        console.error("Error fetching posts API:", error);
      }

      // Fetch all articles with pagination
      try {
        let page = 1;
        let totalPages = 1;

        // Lặp qua các trang và lấy dữ liệu cho articles
        while (page <= totalPages) {
          const res = await axios.get(
            `${process.env.STRAPI_URL}/articles?pagination[page]=${page}&pagination[pageSize]=1000`
          );
          //console.log(`Fetched page ${page} for articles:`, res.data);

          artical = [
            ...artical,
            ...res.data.data.map((user) => "/" + user?.attributes?.slug),
          ];

          // Cập nhật totalPages từ meta
          totalPages = res.data.meta.pagination.pageCount;
          page++;
        }
      } catch (error) {
        console.error("Error fetching articles API:", error);
      }
      let categories = "";

      try {
        const res = await axios.get(
          `${process.env.PRODUCT_SERVICE}/categories/${process.env.ORG_ID}/${process.env.STORE_ID}`
        );
        if (res.status == 1) {
          categories = res?.data?.map((item) => item.id).join(",");
        } else {
          categories = "";
        }
      } catch (error) {
        console.log("🚀 ~ routes: ~ error:", error);
      }

      // Fetch all products with pagination (API này khác với hai cái trên)
      try {
        let usersData = [];
        let page = 1;
        let totalPages = 1;

        // Lặp qua các trang và lấy dữ liệu cho products
        while (page <= totalPages) {
          const res = await axios.get(
            `${process.env.PRODUCT_SERVICE}/products/${process.env.ORG_ID}/${process.env.STORE_ID}?display=PUBLIC&sub_type=CONFIG,SIMPLE,VARIABLE&status=ON_SELL&currentPage=${page}&category=${categories}`
          );
          //console.log(`Fetched product page ${page}:`, res.data);

          usersData = [
            ...usersData,
            ...res.data.data.data.map((item) => "/san-pham/" + item.handle),
          ];

          // Cập nhật totalPages từ response
          totalPages = res.data.data.totalPage;
          page++;
        }

        users = usersData;
      } catch (error) {
        console.error("Error fetching products API:", error);
      }

      // Trả về tất cả các routes đã lấy
      const allRoutes = [...posts, ...artical, ...users];
      console.log("🚀 ~ users:", users.length);
      console.log("🚀 ~ artical:", artical.length);
      console.log("🚀 ~ posts:", posts.length);

      // Kiểm tra xem có lấy đủ không (debugging)
      console.log("All routes fetched:", allRoutes?.length);

      return allRoutes; // Combine all data into one list of routes
    },
    // "https://longvan.net",
  },
  image: {
    strapi: {
      baseURL: process.env.baseURL,
    },
  },

  strapi: {
    url: process.env.STRAPI_URL,
    prefix: "/api",
    version: "v4",
    // Options
    entities: [
      { name: "index", type: "single" },
      { name: "config", type: "single" },
      { name: "categories", type: "collection" },
      { name: "footers", type: "collection" },
      { name: "sitelogo", type: "single" },
      { name: "menus" },
      { name: "default-details", type: "collection" },
      { name: "license", type: "single" },
    ],
  },
  render: {
    static: {
      setHeaders(res) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      },
    },
  },
  serverMiddleware: ["~/serverMiddleware/cache-control.js"],
};
