<template>
  <modal name="advice" :adaptive="true" :scrollable="true" height="auto">
    <div class="modal-send">
      <div class="product-info-modal" v-if="product">
        <div class="product-info-title">
          {{ product?.title }}
        </div>

      </div>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(sendTicked)">
          {{ pageTitle }}

          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="required">Họ và tên</label>
                <input
                  id="name"
                  v-model="name"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|phone"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Số điện thoại</label>
                <input
                  id="phone"
                  v-model="phone"
                  class="send-input"
                  type="text"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <ValidationProvider
              mode="lazy"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="item-info">
                <label class="form-label" for="password">Email</label>
                <input
                  class="send-input"
                  id="email"
                  v-model="email"
                  type="email"
                />
              </div>
              <div class="send-err">{{ errors[0] }}</div>
            </ValidationProvider>
          </div>
          <div class="send-item">
            <div class="item-info">
              <label class="form-label" for="description">Yêu cầu tư vấn</label>
              <textarea
                class="send-input"
                id="description"
                v-model="description"
                type=""
              >
              </textarea>
            </div>
          </div>
          <div class="send-item">
            <div class="mb-4">
              <button
                v-if="loading"
                type="submit"
                class="btn-send active"
                :disabled="loading"
              >
                Đang gửi yêu cầu

                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
                <div class="dot-loader"></div>
              </button>
              <button
                v-else
                type="submit"
                class="btn-send active"
                :disabled="loading"
              >
                Gửi yêu cầu tư vấn
              </button>
            </div>
          </div>
        </form>
      </ValidationObserver>
    </div>
  </modal>
</template>

<script>
import Cookies from "js-cookie";

export default {
  props: ["product"],
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      description: "",
      // host: "",
      pageTitle: "",
      loading: false,
    };
  },
  mounted() {
    // this.host = location.host;
  },

  methods: {
    sendTicked() {
      const hostname = window.location.origin;

      const user = {
        fullName: this.name,
        phone: this.phone,
        email: this.email,
      };
      const payload = {
        name: `Yêu cầu tư vấn ${
          this.$nuxt.$route.meta.title
            ? "sản phẩm " + this.$nuxt.$route.meta.title
            : ""
        }`,
        // goal: "ABC",
        description: this.description,
        referName: this.name,
        referEmail: this.email,
        referPhone: this.phone,
        priorityName: "MEDIUM",
        workEffortTypeId: process.env.WorkEffortTypeId,

        targetUrl: hostname + this.$route.path,
        extSource: hostname,
      };
      this.loading = true;

      this.$store
        .dispatch("sendTicked", payload)
        .then((response) => {
          this.loading = false;

          switch (response.data.addOpportunity.status) {
            case 0:
              break;
            case 1:
              this.$modal.hide("advice");
              this.$toast.success("Đã gửi yêu cầu tư vấn thành công", {});
              Cookies.set("opportunityId", response.data.addOpportunity.id);
              Cookies.set("authInfo", JSON.stringify(user));
              this.name = "";
              this.email = "";
              this.phone = "";
              this.description = "";
              this.$router.push("/success");
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
.modal-send {
  // z-index: 99999;
  padding: 48px;
  .product-info-modal {
    margin-bottom: 8px;
    // border: 1px #44ce6f solid;
    background: #ecfaf1;

    border-radius: 3px;
    padding: 10px;
    .product-info-title {
      font-size: medium;
      font-weight: 500;
    }
    .product-info-price {
      color: #44ce6f;
    }
  }
  .btn-send {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    &.active {
      background: #44ce6f;
      border-radius: 6px;
      color: #ffffff;
    }
    background: #ffffff;
    border: 1px solid #44ce6f;
    color: #44ce6f;

    border-radius: 6px;
    padding: 13px 0;
    width: 100%;
    margin: 12px 0;
    &:first-child {
      margin-top: 24px;
    }
  }
  .send-item {
    margin-bottom: 8px;
    .send-err {
      color: red;
    }
    .item-info {
      .form-label {
        font-weight: 400;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        letter-spacing: 0.5px;
        color: #0e314c;
        margin-bottom: 0;
        // margin-top: 24px;
      }
      .send-input {
        background: #ffffff;
        border: 1px solid #e3e8ef;
        border-radius: 6px;
        padding: 5px 10px;
        width: 100%;
      }
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
</style>
