import Cookies from "js-cookie";
import { HmacSHA256 } from "crypto-js";
import {
  CREATE_ORDER,
  CREATE_PAYMENT,
  SEND_TICKED,
} from "~/constants/grapqlApi/mutation";
import qs from "qs";

import SdkClientService, { UtilsService } from "js-shopify-sdk/dist";
import {
  GET_ORDER_DETAIL,
  GET_USER_DETAIL,
  GET_PAYMENT_IDS,
  GET_PAYMENTS,
  GET_INVOICE_DETAIL,
  LOGIN_GG,
  LOGIN_ZALO,
  LOGIN_FB,
  GET_USER_DETAIL_SOCIAL,
  GET_USER_BY_ID,
  GET_PRICE_FOR_PRODUCT_OPTION,
  GET_PRICE_FOR_PRODUCT_OPTION_AND_PLAN,
  GET_PRICE_PLAN,
  GET_PRICE_INSTALLMENT,
} from "../constants/grapqlApi/query";
import {
  CREATE_CONNECTOR,
  CREATE_PAYMENT_ORDER,
  CREATE_PRODUCT_ID,
  UPDATE_INFO,
  UPDATE_PRODUCT_OPTION_ORDER_LINE_ITEM,
} from "../constants/grapqlApi/mutation";
//
const AUTH_URL = process.env.PUBLIC_API_AUTH_URL;
const AUTH_GRAPHQL_API_URL = process.env.AUTH_GRAPHQL_API_URL;
const CLOUD_SERVICE_API_URL = process.env.PUBLIC_API_CLOUD_SERVICE_URL;
const CRM_SERVICE_API_URL = process.env.PUBLIC_API_CRM_SERVICE_URL;
const PRODUCT_SERVICE_GRAPHQL = process.env.PRODUCT_SERVICE_GRAPHQL;
const service = new SdkClientService(
  `${process.env.PUBLIC_API_URL}`,
  `${process.env.PUBLIC_API_PARTNERID}`,
  `${process.env.PUBLIC_API_STORE_CHANNEL}`
);

const ORG_ID = process.env.ORG_ID;
const state = () => ({
  name: "",
  token: null,
  sessionId: null,
  sessionId2: null,
  user: null,
  carts: null,
  countItem: 0,
  lengthFavorite: 0,
  categories: [],
  loader: true,
  host: "",
  titleCheckout: false,

  customer: {
    email: "",
    name: "",
    phone: "",
  },
  isLoading: true,
  isOS: null,

  itemProductOrder: null,
  itemTimeRent: null,
  storeId: process.env.STORE_ID,

  cartOrderByUser: null,
  notificationOrder: {
    isBoolean: false,
    quality: 0,
  },

  newCusomer: "",

  vuex_redirect_url: {
    type: null,
    redirect: null,
  },

  categories: null,
  logo: null,
  menus: null,
  categoryByStore: null,
});

const mutations = {
  setVuex_redirect_url(state, vuex_redirect_url) {
    state.vuex_redirect_url = {
      type: vuex_redirect_url?.type,
      redirect: vuex_redirect_url?.redirect,
    };
  },

  setNewCusomer(state, newCusomer) {
    state.newCusomer = newCusomer;
  },
  setStoreId(state, storeId) {
    state.storeId = storeId;
  },

  setCartOrderByUser(state, data) {
    state.cartOrderByUser = data;
  },

  setOpenNotificationOrder(state, data) {
    state.notificationOrder = {
      isBoolean: true,
      quality: data,
    };
  },

  setCloseNotificationOrder(state, data) {
    state.notificationOrder = {
      isBoolean: false,
      quality: data,
    };
  },

  setUpdateItemProductOrder(state, data) {
    state.itemProductOrder = data;
  },

  setUpdateItemTimeRent(state, data) {
    state.itemTimeRent = data;
  },

  setLoading(state, status) {
    state.isLoading = status;
  },
  setIsOS(state, data) {
    state.isOS = data;
  },
  setCustomer(state, payload) {
    state.customer.email = payload.email;
    state.customer.name = payload.name;
    state.customer.phone = payload.phone;
  },
  reSetCustomer(state, payload) {
    state.customer.email = "";
    state.customer.name = "";
    state.customer.phone = "";
  },
  // clear token
  clearToken(state) {
    state.token = null;
  },
  setLoader(state, loader) {
    state.loader = loader;
  },
  setUser(state, data) {
    state.user = data;
  },
  setCarts(state, payload) {
    state.carts = payload;
  },
  setTitleCheckout(state, payload) {
    state.titleCheckout = payload;
  },
  setHost(state, host) {
    state.host = host;
  },
  //set token
  setToken(state, token) {
    state.token = token;
  },

  setCategories(state, data) {
    state.categories = data;
  },
  setTokenNoLogin(state, token) {
    service.noLoginAccessToken = token;
  },
  // set count item
  setCountItem(state, countItem) {
    state.countItem += countItem;
  },
  setLengthFavorite(state, lengthFavorite) {
    state.lengthFavorite += lengthFavorite;
  },
  setSessionId(state) {
    state.sessionId = service.cartService.sessionId;
  },
  setSessionId2(state, ssid) {
    if (ssid) {
      state.sessionId2 = ssid;
    } else {
      const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      const generateSessionId = () => {
        const name = process.env.PUBLIC_API_STORE_CHANNEL;
        const time = new Date().getTime();
        const numberRd = randomIntFromInterval(100, 999);
        return `${name}-${time}-${numberRd}`;
      };

      state.sessionId2 = generateSessionId();
    }
  },
  setName(state, name) {
    state.name = name;
  },

  setCategories(state, data) {
    state.categories = data;
  },
  setLogo(state, data) {
    state.logo = data;
  },
  setMenus(state, data) {
    state.menus = data;
  },
  setCategoryByStore(state, data) {
    state.categoryByStore = data;
  },
};

const actions = {
  updateStoreId({ commit }, storeId) {
    commit("setStoreId", storeId);
  },

  startLoading({ commit }) {
    commit("setLoading", true);
  },
  stopLoading({ commit }) {
    commit("setLoading", false);
  },

  //ticked

  async sendTicked(store, payload) {
    try {
      const client = this.app.apolloProvider.defaultClient;
      const apiParams = {
        partyId: "LONGVAN",
        performerId: "ANONYMOUS",
        addOpportunityRequest: payload,
      };
      return await client.mutate({
        mutation: SEND_TICKED,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async sendTicked2(store, payload) {
    try {
      const client = this.app.apolloProvider.defaultClient;
      const apiParams = {
        partyId: "TECHNOVA",
        performerId: "ANONYMOUS",
        addOpportunityRequest: payload,
      };
      return await client.mutate({
        mutation: SEND_TICKED,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  //end- ticked
  async createNewOrder(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.orderClient;
      const apiParams = {
        input: payload,
      };
      return await client.mutate({
        mutation: CREATE_ORDER,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getOrderDetail(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.orderClient;
      const apiParams = {
        orderId: payload,
      };
      console.log("GET_ORDER_DETAIL", GET_ORDER_DETAIL)
      return await client.query({
        query: GET_ORDER_DETAIL,
        variables: { ...apiParams },
        fetchPolicy: "network-only",
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getListOrder(store, payload) {
    let { keyword, status, currentPage, maxResult } = payload;
    service.accessToken = store.state.token;
    return service.orderService.getListOrders({
      keyword: keyword ? keyword : "",
      status: status ? status : "",
      currentPage: currentPage ? currentPage : 1,
      maxResult: maxResult ? maxResult : 4,
    });
  },
  getOrdersStatus(store) {
    service.accessToken = store.state.token;
    return service.orderService.getOrdersStatus();
  },
  getOrderInfo(store, orderId) {
    service.accessToken = store.state.token;
    return service.orderService.getOrderInfo(orderId);
  },
  cancelOrder(store, payload) {
    service.accessToken = store.state.token;
    return service.orderService.cancelOrder({
      order_id: payload.order_id,
      reason: payload.reason,
    });
  },
  confirmReceivedOrder(store, orderId) {
    service.accessToken = store.state.token;
    return service.orderService.confirmReceivedOrder(orderId);
  },
  async createOrderWithoutLoginById(store, payload) {
    payload.time = Date.now();
    const query_string = `${payload.customer.email},${payload.customer.phone},${payload.customer.name},${payload.time}`;
    const apiSecret = "laTbFOX3J2cghZgL81aw2wIEHYPaMSI3";
    const hashDigest = HmacSHA256(query_string, apiSecret).toString();
    store.commit("setTokenNoLogin", hashDigest);
    console.log(hashDigest);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Ecomos-Access-Token": hashDigest,
      },
      body: JSON.stringify(payload),
    };
    const res = await fetch(
      `${process.env.PUBLIC_API_URL}/v1/orders/express/${process.env.PUBLIC_API_PARTNERID}/${process.env.PUBLIC_API_STORE_CHANNEL}/cart?platform=WEB`,
      requestOptions
    );
    const data = await res.json();
    return data;
  },
  createOrderWithoutLogin(store, payload) {
    payload.time = Date.now();
    const query_string = `${payload.customer.email},${payload.customer.phone},${payload.customer.name},${payload.time}`;
    const apiSecret = "laTbFOX3J2cghZgL81aw2wIEHYPaMSI3";
    const hashDigest = HmacSHA256(query_string, apiSecret).toString();
    store.commit("setTokenNoLogin", hashDigest);
    return service.orderService.createOrderWithoutLogin(
      {
        platform: "WEB",
      },
      payload
    );
  },
  async createOrderWithLoginByCartId(store, payload) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Ecomos-Access-Token": store.state.token,
      },
      body: JSON.stringify(payload),
    };
    const res = await fetch(
      `${process.env.PUBLIC_API_URL}/v1/orders/${process.env.PUBLIC_API_PARTNERID}/${process.env.PUBLIC_API_STORE_CHANNEL}/cart?platform=WEB`,
      requestOptions
    );
    const data = await res.json();
    return data;
  },
  createOrderWithLogin(store, payload) {
    // https://api-dev.ecomos.vn/storefront-service/v1/orders/LVS/website-longvancloud?platform=WEB
    service.accessToken = store.state.token;
    return service.orderService.createOrderWithLogin(
      {
        platform: "WEB",
      },
      payload
    );
  },
  //review
  getProductReviews(store, payload) {
    return service.reviewService.getProductReviews(
      payload.productId,
      payload.params
    );
  },
  createReviewWithoutLogin(store, payload) {
    if (Cookies.get("sessionId")) {
      payload.body.session_id = Cookies.get("sessionId");
    } else {
      const sessionId = UtilsService.generateSessionIdForCart(8);
      payload.body.session_id = sessionId;
      store.commit("setSessionId2", sessionId);
    }
    payload.body.time = Date.now();
    const query_string = `${payload.body.reviewer_name},${payload.body.reviewer_phone},${payload.body.reviewer_email},${payload.body.time}`;
    const apiSecret = "laTbFOX3J2cghZgL81aw2wIEHYPaMSI3";
    const hashDigest = HmacSHA256(query_string, apiSecret).toString();
    store.commit("setTokenNoLogin", hashDigest);
    return service.reviewService.createReviewWithoutLogin(
      payload.productId,
      payload.body
    );
  },
  createReview(store, payload) {
    service.accessToken = store.state.token;
    let sessionId = Cookies.get("sessionId");
    if (sessionId) {
      service.reviewService.sessionId = sessionId;
    }
    payload.body.session_id = service.reviewService.sessionId;
    store.commit("setSessionId2", payload.body.session_id);
    return service.reviewService.createReview(payload.productId, payload.body);
  },
  //account
  changeAvatar(store, payload) {
    service.accessToken = store.state.token;
    return service.customerService.changeAvatar({ encodedBase64: payload });
  },
  getCustomerInfo(store) {
    service.accessToken = store.state.token;
    return service.customerService.getCustomerInfo();
  },
  updateCustomerInfo(store, payload) {
    service.accessToken = store.state.token;
    return service.customerService.updateCustomerInfo(payload);
  },
  changePassword(store, payload) {
    let { oldpassword, newpassword } = payload;
    service.accessToken = store.state.token;
    return service.customerService.changePassword({
      old_password: oldpassword,
      new_password: newpassword,
    });
  },
  sendCodeActiveAgain(store, payload) {
    const { email, platform, url_active_account } = payload;
    return service.customerService.sendCodeActiveAgain(email, {
      platform,
      url_active_account,
    });
  },
  async sendCodeActive(store, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{
          sendSmsVerifyCode(orgId:"LONGVAN" ,
          phone: "${payload?.phone}", userLoginId: "${payload?.userLoginId}" ){
            id
            code
            username
            timeExpired
          }
       }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async createCustomerV2(store, payload) {
    const response = await fetch(AUTH_GRAPHQL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          createCustomerV2(
            name: "${payload.name}"
            phone: "${payload.phone}"
            tenantId: "${ORG_ID}"
          ) {
            id
            name
            address
            gender
            identityNumber
            birthDate
            email
            phone
            createdStamp
            createdBy
            memberLevel
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async preFillment(store, payload) {
    const response = await fetch(process.env.ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          preFillment(partnerId: "${ORG_ID}", orderId: "${payload.orderID}", updateBy: "${payload.useID}")
        }        
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async getServiceDetail(store, payload) {
    const response = await fetch(CLOUD_SERVICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Partnerid: "LONGVAN" },
      body: JSON.stringify({
        query: `query{
          serviceDetail(serviceId: "${payload}") {
            service {
              serviceId
              partnerId
              serviceName
              type
              status
              ownerId
              startDate
              endDate
              urlPrivate
              urlPublic
              username
              password
              otherData{
                domainService{
                  domainId
                  domainName
                }
                baremetalService{
                  ips
                  location
                }
                cloudServiceVPS{
                  ips
                  computingId
                  location
                }
              }
            }
            resources {
              type
              name
              total
              unit
              value
              component
            }
            configs {
              configId
              name
              configValue
            }
          }
        }        
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async getCustomerByPhone(store, payload) {
    const response = await fetch(AUTH_GRAPHQL_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query {
          getCustomerByPhone(phone: "${payload}", tenantId: "${ORG_ID}") {
            id
            name
            address
            gender
            identityNumber
            birthDate
            email
            phone
            createdStamp
            createdBy
            memberLevel
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async checkUsernameExisted(store, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          checkUsernameExisted(username: "${payload}", orgId: "${ORG_ID}")
        }        
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async activeAccountV2(store, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{
          verifyCode(orgId:"${ORG_ID}",verifyCodeRequest:{
            username: "${payload.userLoginId}",
            code:"${payload.code}" 
          })
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));

    return response;
  },
  async updateInfo(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        orgId: ORG_ID,
        accessToken: payload.accessToken,
        type: payload.type || null,
        password: payload.password || "",
        updateUserRequest: payload.updateUserRequest,
      };

      const response = await client.mutate({
        mutation: UPDATE_INFO,
        variables: { ...apiParams },
      });

      // Handle successful response here
      return response;
    } catch (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const errorMessage = error.graphQLErrors[0].message;
        console.error("GraphQL Error:", errorMessage);
        throw errorMessage; // Throw the error message as an exception
      } else {
        console.error("Non-GraphQL Error:", error);
        throw "Non-GraphQL Error occurred"; // You can customize this message as needed
      }
    }
  },
  // async updateRegister(store, payload) {
  //   const response = await fetch(AUTH_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `mutation {
  //     completeRegistration(orgId: "LONGVAN", completeRegistrationRequest: {
  //       userLoginId:"${payload.userLoginId}"
  //       token:"${payload.token}"
  //       newPassword:"${payload.password}"
  //       email:"${payload.email}"
  //       fullName:"${payload.name}"
  //     })
  //   }`,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => res)
  //     .catch((error) => console.log("Error", error));

  //   return response;
  // },
  activeAccount(store, payload) {
    let { code, email } = payload;
    return service.customerService.activeAccount({ code }, email);
  },
  getListAddresses(store) {
    service.accessToken = store.state.token;
    return service.customerService.getListAddresses();
  },
  createOrderAddress(store, payload) {
    service.accessToken = store.state.token;
    return service.customerService.createOrderAddress(payload);
  },
  updateOrderAddress(store, payload) {
    let { id, ...body } = payload;
    service.accessToken = store.state.token;
    return service.customerService.updateOrderAddress(body, id);
  },
  setDefaultAddress(store, payload) {
    service.accessToken = store.state.token;
    return service.customerService.setDefaultAddress(payload);
  },
  deletedAddress(store, payload) {
    service.accessToken = store.state.token;
    return service.customerService.deletedAddress(payload);
  },
  forgotPassword(store, payload) {
    return service.customerService.forgotPassword(payload);
  },
  // resetPassword(store, payload) {
  //   let { email, code, password } = payload;
  //   return service.customerService.resetPassword(email, {
  //     code: code,
  //     new_password: password,
  //   });
  // },
  async resetPassword(store, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
          resetPassword(
            orgId: "LONGVAN"
            newPassword: "${payload.newPassword}"
            username:"${payload.username}"
            accessToken: "${payload.token}"
          )
        }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  //  get SEO
  getSEO(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/seos/${payload.seo_obj_id}/${payload.seo_type}`;
    return this.$axios
      .get(url)
      .then((response) => response.data.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch person data");
      });
  },

  getBlogsInPortal(store, payload) {
    const url = `${process.env.CONTENT_CMS_URL}/content/public/cms/articles?ids=${payload}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch categories data");
      });
  },

  getRelateToArtical(store, payload) {
    const url = `${process.env.CONTENT_CMS_URL}/content/public/cms/articles/related-info/${payload}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch categories data");
      });
  },

  //category
  getCategories(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/categories/${
      process.env.ORG_ID
    }/${payload ? payload : process.env.STORE_ID}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch categories data");
      });
  },
  getSeoByIDProduct(store, payload) {
    //console.log("payload", payload);
    const url = `${process.env.PRODUCT_SERVICE}/seos/${payload.id}/${payload.type}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch categories data");
      });
  },
  getCategoriesSDK(store) {
    return service.categoryService.getCategories();
  },
  getCategoryById(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/categories/${process.env.ORG_ID}/${process.env.STORE_ID}/${payload}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch detail categories data");
      });
  },
  getDeltailCategoryByHandle(store, payload) {
    console.log("🚀 ~ getDeltailCategoryByHandle ~ payload:", payload);
    const url = `${process.env.PRODUCT_SERVICE}/categories/${
      process.env.ORG_ID
    }/${payload.store ? payload.store : process.env.STORE_ID}/handle/${
      payload?.slug
    }`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch detail categories data");
      });
  },
  getCategoryByIdSDK(store, payload) {
    return service.categoryService.getCategoryById(payload);
  },
  getCategoryByHandle(store, payload) {
    return service.categoryService.getCategoryByHandle(payload);
  },
  //payment
  // GET_PAYMENT_IDS GET_INVOICE_DETAIL
  async getPaymentDetail(store) {
    try {
      const client = this.app.apolloProvider.clients.invoiceClient;
      const apiParams = {
        orgId: process.env.ORG_ID,
        storeChannelId: process.env.STORE_ID,
      };
      return await client.query({
        query: GET_PAYMENTS,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getStatusInvoice(store, invoiceId) {
    console.log(
      "🚀 ~ file: index.js:500 ~ getStatusInvoice ~ invoiceId:",
      invoiceId
    );
    try {
      const client = this.app.apolloProvider.clients.invoiceClient;
      const apiParams = {
        invoiceId: invoiceId,
      };
      console.log(
        "🚀 ~ file: index.js:506 ~ getStatusInvoice ~ apiParams:",
        apiParams
      );
      const res = await client.query({
        query: GET_INVOICE_DETAIL,
        variables: { ...apiParams },
        fetchPolicy: "network-only",
      });
      console.log("🚀 ~ file: index.js:511 ~ getStatusInvoice ~ res:", res);
      return res;
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async createPayment(store, data) {
    try {
      const client = this.app.apolloProvider.clients.invoiceClient;
      const apiParams = {
        orgId: process.env.ORG_ID,
        storeChannel: process.env.STORE_ID,
        orderId: data.orderId,
        paymentMethod: data.paymentMethod,
        source: "CLOUD_ORDER_V2",
        returnUrl: data.returnUrl,
        createBy: data.createBy,
      };
      return await client.mutate({
        mutation: CREATE_PAYMENT,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit(“SET_ERROR”, error);
      console.log(error);
    }
  },

  async createPaymentOrder(store, data) {
    // try {
    //   const client = this.app.apolloProvider.clients.invoiceClient;
    //   const apiParams = {
    //     orgId: process.env.ORG_ID,
    //     storeId: process.env.STORE_ID,
    //     orderId: data.orderId,
    //     paymentMethod: data.paymentMethod,
    //     source: "CLOUD_ORDER_V2",
    //     returnUrl: data.returnUrl,
    //     createBy: data.createBy,
    //   };
    //   return await client.mutate({
    //     mutation: CREATE_PAYMENT_ORDER,
    //     variables: { ...apiParams },
    //   });
    // } catch (error) {
    //   // commit(“SET_ERROR”, error);
    //   console.log(error);
    //   return error;
    // }

    const response = await fetch(process.env.INVOICE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation {
          createPaymentOrder(
            orgId: "${process.env.ORG_ID}"
            orderId: "${data.orderId}"
            paymentMethod: "${data.paymentMethod}"
            storeId: "${data?.store ? data?.store : process.env.STORE_ID}"
            source: "CLOUD_ORDER_V2"
            returnUrl: "${data.returnUrl}"
            createBy: "${data.createBy}"
          ) {
            code
            message
            data
            qrCodeUrl
            deeplink
            deeplinkMiniApp
            invoiceId
            orderId
          }
        }
        
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  // getPaymentServices(store) {
  //   return service.paymentService.getPaymentServices();
  // },
  async updateOperatingSystem(store, dataOptionSystem) {
    const response = await fetch(process.env.ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        mutation {
          addProductOSIntoOrder(
            partnerId: "${ORG_ID}"
            orderId: "${dataOptionSystem.orderID}"
            productId: "${dataOptionSystem.productID}"
            updateBy: "${dataOptionSystem.useID}"
          ) {
            cancelReason
            currencyCode
            currentSubtotalPrice {
              amount
              currencyCode
            }
            currentTotalDuties {
              amount
              currencyCode
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            currentTotalTax {
              amount
              currencyCode
            }
            edited
            financialStatus
            fulfillmentStatus
            orderStatus
            id
            partnerId
            ownerName
            ownerEmail
            ownerPhone
            orderNumber
            originalTotalDuties {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              address2
              city
              company
              country
              countryCode
              firstName
              formattedArea
              id
              lastName
              latitude
              longitude
              name
              phone
              province
              provinceCode
              zip
            }
            subtotalPrice {
              amount
              currencyCode
            }
            totalPrice {
              amount
              currencyCode
            }
            totalRefunded {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            discountTotalPrice {
              amount
              currencyCode
            }
            cod {
              amount
              currencyCode
            }
            rawData
            orderId
            note
            pending
            checkCommodities
            shipmentNote
            shopId
            facilityId
            orderType
            shippingServiceId
            carrierId
            fromOrderId
            externalCode
            createdAt
            createdStamp
            canceledAt
            updatedAt
            approvedAt
            processedAt
            completedAt
            createdBy
            saleName
            salePartyId
            ownerPartyId
            customerLocale
            orderParentId
            totalVAT {
              amount
              currencyCode
            }
            shopName
            version
            discountApplications {
              allocationMethod
              targetSelection
              targetType
              title
            }
          }
        }
        
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  async getServiceIdFromOrderId(store, orderID) {
    const response = await fetch(process.env.ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `
        query {
          getServiceIds(partnerId: "${ORG_ID}", orderId: "${orderID}")
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  // async updateProductOptionOrderLineItem(store, payload) {
  //   const response = await fetch(process.env.ORDER_API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //       mutation {
  //         updateProductOptionOrderLineItem(
  //           orderLineItemId: "${payload.id}"
  //           productOptionUpdate: "${JSON.stringify()}"
  //           updateBy: "${payload.useID}"
  //         )
  //       }
  //     `,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => res)
  //     .catch((error) => console.log("Error", error));
  //   return response;
  // },

  async updateProductOptionOrderLineItem(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.orderClient;
      const apiParams = {
        orderLineItemId: payload.id,
        productOptionUpdate: payload.productOptionId,
        updateBy: payload.useID,
      };
      return await client.mutate({
        mutation: UPDATE_PRODUCT_OPTION_ORDER_LINE_ITEM,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },

  async getOrderLineItem(store, payload) {
    const response = await fetch(process.env.ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `  
        {
          getOrderLineItem(
            partnerId: "${ORG_ID}"
            orderId: "${payload.orderId}"
            productId: "${payload.productId}"
          ) {
            id
            partnerId
            currentQuantity
            customAttributes {
              key
              value
            }
            discountedTotalPrice {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            quantity
            variant {
              availableForSale
              barcode
              compareAtPrice{
                amount
                currencyCode
              }
              currentlyNotInStock
              id
              image{
                altText
                height
                id
                url
                width
              }
              price{
                amount
                currencyCode
              }
              quantityAvailable
              requiresShipping
              sku
              title
              unitPrice{
                amount
                currencyCode
              }
              weight
              weightUnit
            }
            orderId
            orderItemId
            fulfilledQuantity
            fulfillingQuantity
            orderItemName
            note
            createdStamp
            updatedStamp
            completedAt
            orderLineItemParentId
            orderStatus
            totalVAT {
              amount
              currencyCode
            }
            vatRate {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            unitType
            productOptions {
              idOption
              name
              value
            }
          }
        }
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  // async updateQuantityRenting(store, dataQuantityRenting) {
  //   const response = await fetch(process.env.ORDER_API_URL, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       query: `
  //         mutation {
  //           updateQuantityRenting(
  //             partnerId: "${ORG_ID}"
  //             orderId: "${dataQuantityRenting.orderID}"
  //             month: ${dataQuantityRenting.productID}
  //             updateBy: "${dataQuantityRenting.useID}"
  //           ) {
  //             cancelReason
  //             currencyCode
  //             currentSubtotalPrice {
  //               amount
  //               currencyCode
  //             }
  //             currentTotalDuties {
  //               amount
  //               currencyCode
  //             }
  //             currentTotalPrice {
  //               amount
  //               currencyCode
  //             }
  //             currentTotalTax {
  //               amount
  //               currencyCode
  //             }
  //             edited
  //             financialStatus
  //             fulfillmentStatus
  //             orderStatus
  //             id
  //             partnerId
  //             ownerName
  //             ownerEmail
  //             ownerPhone
  //             orderNumber
  //             originalTotalDuties {
  //               amount
  //               currencyCode
  //             }
  //             originalTotalPrice {
  //               amount
  //               currencyCode
  //             }
  //             shippingAddress {
  //               address1
  //               address2
  //               city
  //               company
  //               country
  //               countryCode
  //               firstName
  //               formattedArea
  //               id
  //               lastName
  //               latitude
  //               longitude
  //               name
  //               phone
  //               province
  //               provinceCode
  //               zip
  //             }
  //             subtotalPrice {
  //               amount
  //               currencyCode
  //             }
  //             totalPrice {
  //               amount
  //               currencyCode
  //             }
  //             totalRefunded {
  //               amount
  //               currencyCode
  //             }
  //             totalShippingPrice {
  //               amount
  //               currencyCode
  //             }
  //             totalTax {
  //               amount
  //               currencyCode
  //             }
  //             discountTotalPrice {
  //               amount
  //               currencyCode
  //             }
  //             cod {
  //               amount
  //               currencyCode
  //             }
  //             rawData
  //             orderId
  //             note
  //             pending
  //             checkCommodities
  //             shipmentNote
  //             shopId
  //             facilityId
  //             orderType
  //             shippingServiceId
  //             carrierId
  //             fromOrderId
  //             externalCode
  //             createdAt
  //             createdStamp
  //             canceledAt
  //             updatedAt
  //             approvedAt
  //             processedAt
  //             completedAt
  //             createdBy
  //             saleName
  //             salePartyId
  //             ownerPartyId
  //             customerLocale
  //             orderParentId
  //             totalVAT {
  //               amount
  //               currencyCode
  //             }
  //             shopName
  //             version
  //             discountApplications {
  //               allocationMethod
  //               targetSelection
  //               targetType
  //               title
  //             }
  //           }
  //         }
  //     `,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((res) => res)
  //     .catch((error) => console.log("Error", error));
  //   return response;
  // },
  async updateQuantityRenting(store, dataQuantityRenting) {
    const response = await fetch(process.env.ORDER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `  
        mutation {
          updateQuantity(
            partnerId: "${ORG_ID}"
            orderId: "${dataQuantityRenting.orderID}"
            quantity: ${dataQuantityRenting.productID}
            unitType: "${dataQuantityRenting.unitType}"
            updateBy: "${dataQuantityRenting.useID}"
          ) {
            cancelReason
            currencyCode
            currentSubtotalPrice {
              amount
              currencyCode
            }
            currentTotalDuties {
              amount
              currencyCode
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            currentTotalTax {
              amount
              currencyCode
            }
            edited
            financialStatus
            fulfillmentStatus
            orderStatus
            id
            partnerId
            ownerName
            ownerEmail
            ownerPhone
            orderNumber
            originalTotalDuties {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              address2
              city
              company
              country
              countryCode
              firstName
              formattedArea
              id
              lastName
              latitude
              longitude
              name
              phone
              province
              provinceCode
              zip
            }
            subtotalPrice {
              amount
              currencyCode
            }
            totalPrice {
              amount
              currencyCode
            }
            totalRefunded {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            discountTotalPrice {
              amount
              currencyCode
            }
            cod {
              amount
              currencyCode
            }
            rawData
            orderId
            note
            pending
            checkCommodities
            shipmentNote
            shopId
            facilityId
            orderType
            shippingServiceId
            carrierId
            fromOrderId
            externalCode
            createdAt
            createdStamp
            canceledAt
            updatedAt
            approvedAt
            processedAt
            completedAt
            createdBy
            saleName
            salePartyId
            ownerPartyId
            customerLocale
            orderParentId
            totalVAT {
              amount
              currencyCode
            }
            shopName
            version
            discountApplications {
              allocationMethod
              targetSelection
              targetType
              title
              value{
                amount
                currencyCode
              }
            }
          }
        }         
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  async updateQuantityRentingDisocunt(store, dataQuantityRenting) {
    try {
      const mutation = `
        mutation UpdateQuantityV2($partnerId: String!,$orderId: String!,$updateItemInputs: [UpdateItemInput]! ,$updateBy: String! ) {
          updateQuantityV2(
            partnerId: $partnerId
            orderId: $orderId
            updateItemInputs: $updateItemInputs
            updateBy: $updateBy
          ) {
            cancelReason
            currencyCode
            currentSubtotalPrice {
              amount
              currencyCode
            }
            currentTotalDuties {
              amount
              currencyCode
            }
            currentTotalPrice {
              amount
              currencyCode
            }
            currentTotalTax {
              amount
              currencyCode
            }
            edited
            financialStatus
            fulfillmentStatus
            orderStatus
            id
            partnerId
            ownerName
            ownerEmail
            ownerPhone
            orderNumber
            originalTotalDuties {
              amount
              currencyCode
            }
            originalTotalPrice {
              amount
              currencyCode
            }
            shippingAddress {
              address1
              address2
              city
              company
              country
              countryCode
              firstName
              formattedArea
              id
              lastName
              latitude
              longitude
              name
              phone
              province
              provinceCode
              zip
            }
            subtotalPrice {
              amount
              currencyCode
            }
            totalPrice {
              amount
              currencyCode
            }
            totalRefunded {
              amount
              currencyCode
            }
            totalShippingPrice {
              amount
              currencyCode
            }
            totalTax {
              amount
              currencyCode
            }
            discountTotalPrice {
              amount
              currencyCode
            }
            cod {
              amount
              currencyCode
            }
            rawData
            orderId
            note
            pending
            checkCommodities
            shipmentNote
            shopId
            facilityId
            orderType
            shippingServiceId
            carrierId
            fromOrderId
            externalCode
            createdAt
            createdStamp
            canceledAt
            updatedAt
            approvedAt
            processedAt
            completedAt
            createdBy
            saleName
            salePartyId
            ownerPartyId
            customerLocale
            orderParentId
            totalVAT {
              amount
              currencyCode
            }
            shopName
            version
            discountApplications {
              allocationMethod
              targetSelection
              targetType
              title
            }
          }
        }
      `;

      const variables = {
        partnerId: ORG_ID,
        orderId: dataQuantityRenting.orderID,
        updateItemInputs: dataQuantityRenting.updateItemInputs,
        updateBy: dataQuantityRenting.useID,
      };

      const response = await fetch(process.env.ORDER_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables }),
      });

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error creating opportunity:", error);
      throw error;
    }
  },

  async searchProductQuantityPromotionAction(store, data) {
    const response = await fetch(CRM_SERVICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `  
        query {
          searchProductQuantityPromotionAction(
            productId: "${data?.id}"
            partyId: "${process.env.ORG_ID}"
            storeChannel: "${data?.store ? data?.store : process.env.STORE_ID}"
          )
        }         
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  getPaymentServicesSDK(store) {
    return service.paymentService.getPaymentServices();
  },
  // product
  async createProductId(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.productClient;
      const apiParams = {
        partnerId: process.env.ORG_ID,
        storeChannel: process.env.STORE_ID,
        createBy: "LongVan",
        productParentId: payload.id,
        productOptionGroupItems: payload.productOptionGroupItems,
      };
      return await client.mutate({
        mutation: CREATE_PRODUCT_ID,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getPiceProductOptions(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.productClient;
      const apiParams = {
        partnerId: process.env.ORG_ID,
        storeChannel: process.env.STORE_ID,
        productParentId: payload.id,
        productOptionGroupItemDTOS: payload.productOptionGroupItemDTOS,
      };
      return await client.query({
        query: GET_PRICE_FOR_PRODUCT_OPTION,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getPriceForProductOptionAndPricePlan(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.productClient;
      const apiParams = {
        partnerId: process.env.ORG_ID,
        storeChannel: process.env.STORE_ID,
        productParentIds: payload.productParentIds,
      };
      return await client.query({
        query: GET_PRICE_FOR_PRODUCT_OPTION_AND_PLAN,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getPricePlan(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.productClient;
      const apiParams = {
        partnerId: process.env.ORG_ID,
        storeChannel: process.env.STORE_ID,
        productId: payload.productId,
      };
      return await client.query({
        query: GET_PRICE_PLAN,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async getPriceInstallment(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.orderClient;
      const apiParams = {
        partnerId: process.env.ORG_ID,
        storeId: process.env.STORE_ID,
        productBareId: payload.productBareId,
        productCollId: payload.productCollId,
        pricePlanId: payload.pricePlanId,
      };
      return await client.query({
        query: GET_PRICE_INSTALLMENT,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  getOptionList(state, payload) {
    console.log("🚀 ~ file: index.js:656 ~ getOptionList ~ payload:", payload);
    const idParam = payload.join(",");
    const url = `${process.env.PRODUCT_SERVICE}/products/${process.env.ORG_ID}/${process.env.STORE_ID}/option-v2?id=${idParam}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getDetailProductUnit(state, id) {
    const url = `${process.env.PRODUCT_SERVICE}/product-units/${process.env.ORG_ID}/${id}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getAllProductUnit(state) {
    const url = `${process.env.PRODUCT_SERVICE}/product-units/${process.env.ORG_ID}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getProductTags(store) {
    return service.productService.getProductTags();
  },
  getProductTagsV2(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/product-tag/${
      process.env.ORG_ID
    }/${payload ? payload : process.env.STORE_ID}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getTagsFlowProduct(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/product-tag/${process.env.ORG_ID}/${process.env.STORE_ID}/${payload}/tags`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getProductTagsToCategoryV2(store, payload) {
    const url = `${process.env.PRODUCT_SERVICE}/product-tag/${
      process.env.ORG_ID
    }/${payload.store ? payload.store : process.env.STORE_ID}/${payload?.id}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getProductByHandle(store, data) {
    const url = `${process.env.PRODUCT_SERVICE}/products/${
      process.env.ORG_ID
    }/${data?.store ? data?.store : process.env.STORE_ID}/handle/${
      data.handle
    }?build_type=${data.build_type}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },
  getProductByHandleSDK(store, handle) {
    return service.productService.getProductByHandle(handle);
  },
  getProductByIdSDK(store, id) {
    return service.productService.getProductById(id);
  },
  getProductById(store, data) {
    const url = `${process.env.PRODUCT_SERVICE}/products/${
      process.env.ORG_ID
    }/${data?.store ? data?.store : process.env.STORE_ID}/${data?.id}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product by handle data");
      });
  },

  removeItemInOrder(store, data) {
    const url = `${process.env.ORDER_API_STOREFRONT}/v2/orders/${process.env.ORG_ID}/${process.env.STORE_ID}/${data.orderId}/${data.orderItemId}`;
    const headers = {
      Authorization: "Bearer YOUR_TOKEN",
      "Content-Type": "application/json",
    };
    return this.$axios
      .delete(url, { headers })
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch removeItemInOrder by handle data");
      });
  },

  addItemInOrder(store, id, data) {
    const url = `${process.env.ORDER_API_STOREFRONT}/v2/orders/${process.env.ORG_ID}/${process.env.STORE_ID}/${id}/orderLineItem`;

    return this.$axios
      .post(url, data) // data đã là mảng theo định dạng bạn đã cung cấp
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to add item in order");
      });
  },

  checkDomain(store, data) {
    const url = `${process.env.PA_SERVICE}/v2/getwhois/${data.toString()}`;

    return this.$axios
      .get(url) // data đã là mảng theo định dạng bạn đã cung cấp
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to add item in order");
      });
  },

  async getTemplateOfServiceType(context, item) {
    const response = await fetch(CLOUD_SERVICE_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          getTemplateOfServiceType(partnerId: "${ORG_ID}", keyQualify: "${item}") {
            id
            name
            productMapping {
              id
              name
            }
          }
        }        
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  async getProductOptionV2(context, item) {
    const response = await fetch(PRODUCT_SERVICE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          getProductOption(partnerId: "${ORG_ID}", storeChannel: "${
          item?.store ? item?.store : process.env.STORE_ID
        }", productId: "${item?.id}") {
            id
            name
            position
            type
            subType
            fill
            requireData
            values
            valuesFull {
              id
              name
            }
            valuesPortal {
              id
              name
            }
            productFeatureDTOS {
              id
              featureTypeId
              productOptionGroupItemDTOS{
                id
                price
                productId
                productName
                qualify
              }
              productOptionConfigs{
                id
                price
                productId
                productName
                qualify
              }
            }
            createStamp
            createdBy
          }
        }        
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  getProducts(store, payload) {
    const queryString = qs.stringify(payload.data, {
      encodeValuesOnly: true,
    });
    const url = `${process.env.PRODUCT_SERVICE}/products/${
      process.env.ORG_ID
    }/${payload?.store ? payload?.store : process.env.STORE_ID}?${queryString}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch products data");
      });
  },
  getProductsSDK(store, payload) {
    return service.productService.getProducts(payload);
  },
  getProductOptions(store, id) {
    const url = `${process.env.PRODUCT_SERVICE}/products/${process.env.ORG_ID}/${process.env.STORE_ID}/option-v2/${id}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product option data");
      });
  },
  getProductCombo(store, id) {
    const url = `${process.env.PRODUCT_SERVICE}/products/product-combo/${process.env.ORG_ID}/${id}/${process.env.STORE_ID}`;
    return this.$axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch product option data");
      });
  },
  getProductOptionsSDK(store, payload) {
    return service.productService.getProductOptions(payload);
  },
  getFavoriteProducts(store, payload) {
    service.accessToken = store.state.token;
    return service.productService.getFavoriteProducts(payload);
  },
  addFavoriteProduct(store, productId) {
    service.accessToken = store.state.token;
    return service.productService.addFavoriteProduct(productId);
  },
  removeFavoriteProduct(store, productId) {
    service.accessToken = store.state.token;
    return service.productService.removeFavoriteProduct(productId);
  },
  checkFavoriteProduct(store, productId) {
    service.accessToken = store.state.token;
    return service.productService.checkFavoriteProduct(productId);
  },
  ///crm
  //auth
  async getPersonByPartyId(store, partyId) {
    try {
      const client = this.app.apolloProvider.clients.userClient;
      const apiParams = {
        partyId: partyId,
      };
      return await client.query({
        query: GET_USER_BY_ID,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },

  async getUserByToken(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        orgId: payload.orgId,
        accessToken: payload.token,
      };
      return await client.query({
        query: GET_USER_DETAIL,
        variables: { ...apiParams },
        fetchPolicy: "network-only",
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },

  async getUserDetail(context, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          getUserDetail(orgId: "${payload.orgId}", accessToken: "${payload.token}") {
            partyId
            orgId
            fullName
            email
            phone
            address
            identityNumber
            gender
            birthDate
            avatarUrl
            accessToken
            username
            readyV2
            orgPermissionsMap
            orgPositionsMap
            orgRolesMap
          }
        }       
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  async createConnector(store) {
    try {
      const client = this.app.apolloProvider.clients.userClient;
      const apiParams = {
        updateBy: "Longvan",
        createRequest: {
          type: "ORDER_SESSION",
          weight: 1,
          status: 1,
        },
      };
      return await client.mutate({
        mutation: CREATE_CONNECTOR,
        variables: { ...apiParams },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getUserByTokenSocial(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        orgId: payload.orgId,
        accessToken: payload.token,
        extAuthId: payload.extAuthId,
        providerId: payload.providerId,
      };
      return await client.query({
        query: GET_USER_DETAIL_SOCIAL,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },

  async fetchUserInfo(store, payload) {
    const res = await this.$axios.get(
      `${AUTH_URL}/public/LONGVAN/oauth2/api/v1/token/${payload}`
    );
    Cookies.set("authInfo", JSON.stringify(res.data));

    return res;
  },
  // async getUserByToken(store, payload) {
  //   try {
  //     const client = this.app.apolloProvider.clients.authClient;
  //     const apiParams = {
  //       orgId: payload.orgId,
  //       accessToken: payload.accessToken,
  //     };
  //     return await client.query({
  //       query: GET_USER_DETAIL,
  //       variables: { ...apiParams },
  //     });
  //   } catch (error) {
  //     // commit("SET_ERROR", error);
  //     console.log(error);
  //   }
  // },

  async login(store, payload) {
    return await this.$axios.$post(
      `${AUTH_URL}/public/oauth2/api/v1/login`,
      payload
    );
  },
  async newLogin(context, item) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation {
        login(
          loginRequest: { orgId: "${ORG_ID}", username: "${item.username}", password: "${item.password}" }
        ) {
          partyId
          orgId
          fullName
          email
          phone
          address
          identityNumber
          gender
          birthDate
          avatarUrl
          accessToken
          username
          orgPermissionsMap
          orgPositionsMap
          orgRolesMap
          readyV2
        }
      }
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },
  async loginGoogle(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        redirectUrl: payload.redirectUrl,
        orgId: process.env.ORG_ID,
        type: payload.type,
        partyId: null,
      };
      return await client.query({
        query: LOGIN_GG,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async loginFacebook(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        redirectUrl: payload.redirectUrl,
        orgId: process.env.ORG_ID,
        type: payload.type,
        partyId: null,
      };
      return await client.query({
        query: LOGIN_FB,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async loginZalo(store, payload) {
    try {
      const client = this.app.apolloProvider.clients.authClient;
      const apiParams = {
        redirectUrl: payload.redirectUrl,
        orgId: process.env.ORG_ID,
        type: payload.type,
        partyId: null,
      };
      return await client.query({
        query: LOGIN_ZALO,
        variables: { ...apiParams },
      });
    } catch (error) {
      // commit("SET_ERROR", error);
      console.log(error);
    }
  },
  async register(store, payload) {
    return await this.$axios.$post(
      `${AUTH_URL}/public/oauth2/api/v1/register`,
      payload
    );
  },
  async register(store, payload) {
    return await this.$axios.$post(
      `${AUTH_URL}/public/oauth2/api/v1/register`,
      payload
    );
  },
  async registerV2(store, payload) {
    const response = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `mutation{
        register(orgId:"LONGVAN",registerRequest: {
          username: "${payload.userLoginId}",
          fullName: "${payload.fullName}"
        }) {
          id
          partyId
          username
          status
          accessToken
        }
      }`,
      }),
    })
      .then((response) => response.json())
      .then((response) => response)
      .catch((error) => console.log("Error", error));
    return response;
  },
  async loginFb(store, payload) {
    console.log("🚀 ~ file: index.js:411 ~ loginFb ~ payload:", payload);
    const url = `${AUTH_URL}/facebook-login?redirectUrl=${payload}&orgId=LONGVAN&type=login`;
    return await this.$axios.$post(url);
  },
  loginV2(store, payload) {
    let { username, password, access_token, type, platform } = payload;
    return service.authService.login(
      { username: username, password: password, access_token, platform },
      type
    );
  },
  registerv2(store, payload) {
    return service.authService.register(payload);
  },
  logout(store) {
    store.commit("clearToken");
    //store.commit("setUser", null);
    //Cookies.remove("token");
    Cookies.remove(process.env.ACCESSTOKEN_NAME, {
      domain: ".longvan.net",
      path: "/",
    });
  },
  initAuth(store, req) {
    let token;
    if (req) {
      if (!req.headers.cookie) {
        return false;
      }
      const tokenKey = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("token="));
      if (!tokenKey) {
        return false;
      }
      token = tokenKey.split("=")[1];
      store.commit("setToken", token);
    } else {
      token = Cookies.get(process.env.ACCESSTOKEN_NAME, {
        domain: ".longvan.net",
        path: "/",
      });
      if (token !== undefined) {
        store.commit("setToken", token);
      } else {
        return false;
      }
    }
  },
  initSSid(store, req) {
    let token;
    if (req) {
      if (!req.headers.cookie) {
        return false;
      }
      const tokenKey = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("sessionId="));
      if (!tokenKey) {
        return false;
      }
      token = tokenKey.split("=")[1];
      store.commit("setSessionId2", token);
    } else {
      token = Cookies.get("sessionId");
      if (token !== undefined) {
        store.commit("setSessionId2", token);
      } else {
        return false;
      }
    }
  },
  initSSid2(store, req) {
    let token;
    if (req) {
      if (!req.headers.cookie) {
        return false;
      }
      const tokenKey = req.headers.cookie
        .split(";")
        .find((c) => c.trim().startsWith("sessionId2="));
      if (!tokenKey) {
        return false;
      }
      token = tokenKey.split("=")[1];

      store.commit("setSessionId2", token);
    } else {
      token = Cookies.get("sessionId2");
      if (token !== undefined) {
        store.commit("setSessionId2", token);
      } else {
        return false;
      }
    }
  },

  //action cart
  getCart(store, payload) {
    if (payload) {
      service.cartService.sessionId = payload;
    }
    return service.cartService.getCartInfo();
  },
  getCart2(store, payload) {
    if (payload) {
      service.cartService.sessionId = payload;
    }
    return service.cartService.getCartInfo();
  },
  async addToCart(store, payload) {
    let sessionId = Cookies.get("sessionId");
    if (sessionId) {
      service.cartService.sessionId = sessionId;
    }
    return service.cartService.addToCart({
      quantity: payload.quantity,
      product_id: payload.id,
      allow_delete: payload.allow_delete,
      cart_child: payload.cart_child,
    });
  },
  async addToCart2(store, payload) {
    let sessionId = store.state.sessionId2;
    if (sessionId) {
      service.cartService.sessionId = sessionId;
    }
    return service.cartService.addToCart({
      quantity: payload.quantity,
      product_id: payload.id,
      allow_delete: payload.allow_delete,
      cart_child: payload.cart_child,
    });
  },

  async getPriceMenus(context, item) {
    const response = await fetch(PRODUCT_SERVICE_GRAPHQL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `{
          getPriceMenus(partnerId: "${ORG_ID}", storeId: "${process.env.STORE_ID}", categoryId: "${item}") {
            name
            products {
              id
              title
              description
              sku
              shortDescription
              vat
              unitDTO{
                id
                name
              }
              qualify
              parentId
              handle
              price
              priceType
              salePolicy
              priceTypeName
              priceVaries
              tags
              options
              optionsRelationship
              compareAtPrice
            }
          }
        }               
      `,
      }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log("Error", error));
    return response;
  },

  async updateCart(store, payload) {
    let { product_id, quantity } = payload;
    let sessionId = Cookies.get("sessionId");
    if (sessionId) {
      service.cartService.sessionId = sessionId;
    }
    return service.cartService.updateCartQuantity({
      product_id: product_id,
      quantity: quantity,
      supplier_id: null,
    });
  },
  deleteItemFromCart(store, payload) {
    let sessionId = Cookies.get("sessionId");
    if (sessionId) {
      service.cartService.sessionId = sessionId;
    }

    return service.cartService.deleteItemFromCart(payload);
  },
  deleteCart(store) {
    let sessionId = Cookies.get("sessionId");
    if (sessionId) {
      service.cartService.sessionId = sessionId;
    }
    return service.cartService.deleteCart();
  },

  //location
  getListProvinces() {
    return service.locationService.getListProvinces();
  },

  getListDistricts(store, payload) {
    return service.locationService.getListDistricts(payload);
  },
  getListWards(store, payload) {
    return service.locationService.getListWards(payload);
  },
  //get user
};

const getters = {
  vuex_redirect_url: (state) => state.vuex_redirect_url,
  isLoading: (state) => state.isLoading,
  itemProductOrder: (state) => state.itemProductOrder,
  notificationOrder: (state) => state.notificationOrder,
  cartOrderByUser: (state) => state.cartOrderByUser,
  newCusomer: (state) => state.newCusomer,
  itemTimeRent: (state) => state.itemTimeRent,
  isOS: (state) => state.isOS,
  isAuthenticated(state) {
    return state.token !== null;
  },
  getSessionId(state) {
    return state.sessionId;
  },
  getCounterItem(state) {
    return state.countItem;
  },
  getName(state) {
    return state.name;
  },
  getCategories(state) {
    return state.categories;
  },
  getUser(state) {
    return state.user;
  },
  getLoader(state) {
    return state.loader;
  },
  getHost(state) {
    return state.host;
  },
  getLengthFavorite(state) {
    return state.lengthFavorite;
  },
  getBaseURL(state) {
    return state.BASE_URL;
  },
  getTitleCheckout(state) {
    return state.titleCheckout;
  },
  getCustomer(state) {
    return state.customer;
  },
  categories(state) {
    return state.categories;
  },
  logo(state) {
    return state.logo;
  },
  menus(state) {
    return state.menus;
  },
  categoryByStore(state) {
    return state.categoryByStore;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
