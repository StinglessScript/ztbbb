<template>
  <div class="ticked">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(sendTicked)">
        <div class="form-ticked">
          <h3>Đăng ký tư vấn</h3>
          <div class="row">
            <div class="col-12 col-md-6">
              <div class="form-outline mb-2 text-left">
                <ValidationProvider
                  mode="lazy"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="name"
                    >Họ tên
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="name"
                    v-model="user.fullName"
                    type="name"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="form-outline mb-2">
                <ValidationProvider
                  name="phone"
                  width="50%"
                  rules="required|phone"
                  mode="lazy"
                  v-slot="{ errors }"
                >
                  <label class="form-label" for="phone"
                    >Số điện thoại
                    <span style="color: red">{{ errors[0] }}</span>
                  </label>
                  <input
                    id="phone"
                    v-model="user.phone"
                    type="text"
                    class="form-control form-control-lg"
                  />
                </ValidationProvider>
              </div>
            </div>
          </div>
          <LoginSocial />
        </div>
        <div class="form-ticked">
          <h4>
            Vui lòng bổ sung thêm thông tin để chúng tôi có thể hỗ trợ tốt hơn.
          </h4>
          <div>
            <div class="form-ticked-item">Đối tượng</div>
            <span v-for="targetItem in targets" :key="targetItem.id">
              <input
                type="radio"
                :id="targetItem.id"
                :value="targetItem.id"
                v-model="forms.target"
              />
              <label :for="targetItem.id">{{ targetItem.name }}</label>
            </span>
          </div>
          <!-- <div>
            <div class="form-ticked-item">Khu vực đặt</div>
            <span v-for="locationItem in locations" :key="locationItem.id">
              <input
                type="radio"
                :id="locationItem.id"
                :value="locationItem.id"
                v-model="forms.location"
              />
              <label :for="locationItem.id">{{ locationItem.name }}</label>
            </span>
          </div> -->
          <!-- <div>
            <div class="form-ticked-item">Datacenter</div>
            <span
              v-for="datacenterItem in datacenterUnit"
              :key="datacenterItem.id"
            >
              <input
                type="radio"
                :id="datacenterItem.id"
                :value="datacenterItem.id"
                v-model="forms.datacenterUnit"
              />
              <label :for="datacenterItem.id">{{ datacenterItem.name }}</label>
            </span>
          </div> -->
          <!-- <div>
            <div class="form-ticked-item">Hình thức thanh toán</div>
            <span
              v-for="paymentMethodItem in paymentMethods"
              :key="paymentMethodItem.id"
            >
              <input
                type="radio"
                :id="paymentMethodItem.id"
                :value="paymentMethodItem.id"
                v-model="forms.paymentMethod"
              />
              <label :for="paymentMethodItem.id"
                >{{ paymentMethodItem.name }}
              </label>
            </span>
          </div> -->
          <!-- <div>
            <div class="form-ticked-item">Mục đích sử dụng</div>
            <span v-for="purposeItem in purpose" :key="purposeItem.id">
              <input
                type="radio"
                :id="purposeItem.id"
                :value="purposeItem.id"
                v-model="forms.purpose"
              />
              <label :for="purposeItem.id">{{ purposeItem.name }}</label>
            </span>
          </div> -->
          <div>
            <div class="form-ticked-item">Ghi chú thêm</div>
            <textarea
              class="form-control form-control-lg"
              id="description"
              v-model="description"
              type=""
            >
            </textarea>
          </div>
          <div class="d-flex justify-content-center gap-2">
            <div class="btn btn-primary-light" @click="$router.go(-1)">
              Quay lại
            </div>
            <div class="btn btn-primary" v-if="loading">
              <div class="d-flex align-items-center gap-2">
                Đang gửi yêu cầu
                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
              </div>
            </div>
            <button type="submit" v-else class="btn btn-primary">
              Đăng ký tư vấn
            </button>
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {
      locations: [
        { id: "Hà Nội", name: "Hà Nội" },
        { id: "Hồ Chí Minh", name: "Hồ Chí Minh" },
      ],
      datacenterUnit: [
        { id: "viettel", name: "Viettel" },
        { id: "vnpt", name: "VNPT" },
        { id: "fpt", name: "FPT" },
        { id: "cmc", name: "CMC" },
      ],
      purpose: [
        { id: "game", name: "Game" },
        { id: "cms", name: "CMS" },
        { id: "crm", name: "CRM" },
        { id: "erp", name: "ERP" },
        { id: "Khác", name: "Khác" },
      ],
      paymentMethods: [
        { id: "Mua", name: "Mua" },
        { id: "Trả góp", name: "Trả góp" },
      ],
      targets: [
        { id: "Cá nhân", name: "Cá nhân" },
        { id: "Doanh nghiệp", name: "Doanh nghiệp" },
      ],

      user: {
        fullName: "",
        phone: "",
        email: "",
      },
      forms: {
        // location: "Hà Nội",
        // purpose: "game",
        target: "Cá nhân",
        // paymentMethod: "Mua",
        // datacenterUnit: "viettel",
      },
      keyName: {
        location: "Khu vực đặt",
        purpose: "Mục đích sử dụng",
        target: "Đối tượng",
        paymentMethod: "Hình thức thanh toán",
        datacenterUnit: "Datacenter",
      },
      description: "",
      loading: false,
      product: null,
    };
  },
  computed: {
    link() {
      return this.$route.query.from || "";
    },
    type() {
      return this.$route.query.type || "";
    },
    productName() {
      return this.$route.query.productName || "";
    },
    isBaremetal() {
      return this.$route.query.isBaremetal;
    },
    isPortal() {
      return this.$route.query.isPortal || true;
    },
  },
  mounted() {
    this.getProduct();
    this.getUser(
      Cookies.get(process.env.ACCESSTOKEN_NAME, { domain: ".longvan.net", path: "/" })
    );
  },
  methods: {
    async getUser(accessToken) {
      try {
        const res = await this.$store.dispatch("getUserByToken", {
          token: accessToken,
          orgId: process.env.ORG_ID,
        });
        console.log("res", res);
        this.user.fullName = res.data?.getUserDetail?.fullName;
        this.user.phone = res.data?.getUserDetail?.phone;
        this.user.email = res.data?.getUserDetail?.email;
      } catch (error) {
        //Cookies.remove("token");
      }
    },
    convertFormsToObjectArray(formsObject) {
      if (!formsObject || typeof formsObject !== "object") {
        // Handle invalid input or missing 'forms' property
        return [];
      }

      const convertedForms = Object.keys(formsObject).map((key) => {
        console.log(
          "🚀 ~ file: SendTickedByBarebone.vue:261 ~ convertedForms ~ key:",
          key
        );

        return {
          key: this.keyName[key],
          value: formsObject[key],
        };
      });

      return convertedForms;
    },
    async getProduct() {
      try {
        const data = {
          handle: this.$route.query.from,
          build_type: "SIMPLE",
          store: this.$route.query.store
        };

        this.product = await this.$store.dispatch("getProductByHandle", data);
        // console.log(
        //   "🚀 ~ file: SendTicked.vue:216 ~ getProduct ~ this.product:",
        //   this.product
        // );
      } catch (error) {
        console.error(error);
      }
    },
    sendTicked() {
      this.loading = true;
      const hostname = window.location.origin;

      // console.log(
      //   "🚀 ~ file: SendTickedByBarebone.vue:284 ~ sendTicked ~ this.forms:",
      //   this.forms
      // );
      const id = this.product
        ? /[^-]*$/.exec(`${this.link}`)[0]
        : this.productName;
      const targetUrl = this.product
        ? hostname + "/san-pham/" + this.link
        : hostname + "/" + this.link;
      const payload = {
        name: `Yêu cầu tư vấn sản phẩm ${
          this.product?.title || this.productName
        }`,
        description: this.description,
        referName: this.user.fullName,
        referEmail: this.user.email,
        referPhone: this.user.phone,
        priorityName: "MEDIUM",
        workEffortTypeId: process.env.WorkEffortTypeId,
        //targetId: id,
        //targetType: "PRODUCT",
        targetUrl: targetUrl,
        extSource: hostname,
        forms: this.convertFormsToObjectArray(this.forms),
      };
      this.$store
        .dispatch("sendTicked", payload)
        .then((response) => {
          this.loading = false;
          switch (response.data.addOpportunity.status) {
            case 0:
              break;
            case 1:
              Cookies.set("opportunityId", response.data.addOpportunity.id);
              const build_type = this.$route.query.build_type;
              this.$router.push(
                // this.$route.query.type == "thue"
                //   ? "/san-pham/" +
                //       this.$route.query.from +
                //       "/dat-hang?&type=" +
                //       this.$route.query.type +
                //       "&connectorId=" +
                //       this.$route.query.connectorId +
                //       "&userId=" +
                //       response.data.addOpportunity.ownerId +
                //       (build_type ? "&build_type=" + build_type : "")
                //   :
                "/success"
              );
              Cookies.set("authInfo", JSON.stringify(this.user));
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}
.text-note {
  display: inline-flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  flex-wrap: nowrap;
  /* identical to box height, or 138% */

  /* 44CE6F 100% */

  color: #44ce6f;
  img {
    margin: 0 2px;
  }
}
.form-label {
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #000000;
}
input,
textarea {
  border: 1px solid #e3e8ef;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + *::before {
  cursor: pointer;
  content: "";
  display: inline-block;
  vertical-align: center;
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  border-style: solid;
  border-width: 0.1rem;
  border-color: gray;
}
label {
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  color: #000000;
}
input[type="radio"]:checked + * {
  cursor: pointer;

  //   color: #44ce6f;
}
input[type="radio"]:checked + *::before {
  cursor: pointer;

  background: radial-gradient(
    #44ce6f 0%,
    #44ce6f 40%,
    transparent 50%,
    transparent
  );
  border-color: #44ce6f;
}

/* basic layout */
fieldset {
  margin: 20px;
  max-width: 400px;
}
input[type="radio"] + * {
  cursor: pointer;
  display: inline-block;
  padding-right: 1rem;
}
.ticked {
  display: flex;
  flex-direction: column;
  align-items: center;
  .form-ticked {
    background: #fff;

    h3 {
      font-weight: 500;
      font-size: 27px;
      line-height: 34px;
      color: #121926;
    }
    h4 {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #121926;
    }
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: left;
    padding: 24px;
    gap: 24px;

    width: 827px;
    border: 1px solid #e3e8ef;
    border-radius: 6px;
    .form-ticked-item {
      width: 100%;
      display: flex;
      gap: 12px;
      align-items: center;
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      color: #000000;
      margin-bottom: 10px;
    }
  }
}
.dot-loader {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-color: #fff;
  position: relative;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite;
  animation: 1.2s scaleDown ease-in-out infinite;
}

.dot-loader:nth-child(2) {
  margin: 0 2px;
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
  animation: 1.2s scaleDown ease-in-out infinite 0.15555s;
}

.dot-loader:nth-child(3) {
  -webkit-animation: 1.2s scaleDown ease-in-out infinite 0.3s;
  animation: 1.2s scaleDown ease-in-out infinite 0.3s;
}

@-webkit-keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scaleDown {
  0%,
  80%,
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  40% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@media (max-width: 768px) {
  .ticked {
    .form-ticked {
      width: 100%;
      .form-ticked-item {
        display: block;
      }
    }
  }
}
</style>
