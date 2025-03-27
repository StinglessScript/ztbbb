<template>
  <div class="contact-footer">
    <div class="container">
      <div
        class="d-flex justify-content-between align-items-center"
        style="width: 100%"
      >
        <a href="tel:18006070" style="width: 25%">
          <div class="contact-item">
            <div class="contact-icon">
              <img src="~/assets/img/contact-footer/call.svg" alt="" />
            </div>
            <div class="contact-content">
              <div class="contact-name">1800.6070</div>
              <div class="contact-description">Hotline liên hệ</div>
            </div>
          </div>
        </a>

        <div
          class="contact-item"
          @click="$refs.modal.$modal.show('advice')"
          style="width: 25%"
        >
          <div class="contact-icon">
            <img src="~/assets/img/contact-footer/doc.svg" alt="" />
          </div>
          <div class="contact-content">
            <div class="contact-name">Tạo yêu cầu</div>
            <div class="contact-description">Được xử lý nhanh chóng</div>
          </div>
        </div>

        <a
          href="https://zalo.me/1365034174709453259"
          target="_blank"
          rel="noopener noreferrer"
          style="width: 25%"
        >
          <div class="contact-item">
            <div class="contact-icon">
              <img src="~/assets/img/contact-footer/zalo.svg" alt="" />
            </div>
            <div class="contact-content" onclick="window.Zalo.Widget.show()">
              <div class="contact-name" style="color: #00a5e3">Chat Zalo</div>
              <div class="contact-description" style="color: #00a5e3">
                Trò chuyện ngay
              </div>
            </div>
          </div>
        </a>

        <div class="chatwoot" style="width: 20%">
          <div class="contact-item"></div>
        </div>
      </div>
    </div>
    <ModalTicket ref="modal" />
  </div>
</template>

<script>
import ModalTicket from "../Modal/ModalTicket.vue";

export default {
  components: {
    ModalTicket,
  },
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      note: "",
    };
  },
  mounted() {
    console.log("🚀 ~ mounted ~ this.$route:", this.$route);
    this.checkRouteAndLoadScript(this.$route); // Kiểm tra route và load script nếu cần
  },

  watch: {
    // Theo dõi thay đổi của $route
    $route(newPath, oldPath) {
      //console.log("🚀 ~ newPath:", newPath);
      this.checkRouteAndLoadScript(newPath); // Gọi lại hàm kiểm tra khi path thay đổi
    },
  },

  methods: {
    loadChatwootScript() {
      console.log("vào rồix");
      const BASE_URL = "https://chat.longvan.net";

      // Cấu hình trước khi tải SDK
      window.chatwootSettings = {
        locale: "vi",
        launcherTitle: "Live Chat",
        type: "expanded_bubble",
        useBrowserLanguage: false,
        showPopoutButton: true,
        hideMessageBubble: true,
        showUnreadMessagesDialog: true,
        darkMode: "auto",
      };

      const script = document.createElement("script");
      script.src = `${BASE_URL}/packs/js/sdk.js`;
      script.defer = true;
      script.async = true;

      script.onload = () => {
        window.chatwootSDK.run({
          websiteToken: "qw5ro7fduWYzcEHGSrmovwbB",
          baseUrl: BASE_URL,
        });

        // Loại bỏ class 'woot-hidden' sau khi khởi tạo
        const chatwootElement = document.querySelector(".chatwoot-launcher");
        if (chatwootElement) {
          chatwootElement.classList.remove("woot-hidden");
        }

        // Lấy phần tử có id "cw-bubble-holder" sau khi Chatwoot đã được load
        const bubbleHolder = document.getElementById("cw-bubble-holder");
        setTimeout(() => {
          if (bubbleHolder) {
            console.log(
              "🚀 ~ loadChatwootScript ~ bubbleHolder:",
              bubbleHolder
            );
            // Thêm class "blockScript" để áp dụng display: block !important
            bubbleHolder.classList.add("blockScript");

            // Tìm thẻ div có class "chatwoot" và gắn phần tử bubbleHolder vào đó
            // const chatwootContainer = document.querySelector(".chatwoot");
            // if (chatwootContainer) {
            //   chatwootContainer.appendChild(bubbleHolder);
            // }
          }
        }, 1000);
      };

      // Thêm script vào đầu trang
      document.head.appendChild(script);
    },

    // Kiểm tra route và load script nếu cần
    checkRouteAndLoadScript(route) {
      console.log("🚀 ~ checkRouteAndLoadScript ~ this.$route.:", route.name);
      if (route.name != "thuc-hanh-lab" && route.name != "thuc-hanh-lab-lab") {
        this.loadChatwootScript(); // Gọi hàm load khi không phải là /thuc-hanh-lab
      } else {
        this.removeChatwootScript(); // Xóa script khi ở trang /thuc-hanh-lab
      }
    },

    // Hàm xóa script Chatwoot
    removeChatwootScript() {
      console.log("vào rồi");

      // Tìm thẻ div chứa id là cw-bubble-holder
      const bubbleHolder = document.getElementById("cw-bubble-holder");

      if (bubbleHolder) {
        // Xóa class "blockScript" để hủy bỏ display: block !important
        bubbleHolder.classList.remove("blockScript");
        console.log("Đã xóa class 'blockScript' khỏi bubbleHolder");
      }

      // Kiểm tra nếu có thẻ chatwoot launcher, thì ẩn nó đi
      const chatwootElement = document.querySelector(".chatwoot-launcher");
      if (chatwootElement) {
        chatwootElement.classList.add("woot-hidden"); // Ẩn launcher nếu có
      }
    },
  },
};
</script>

<style scoped>
/* Thêm CSS nếu cần */
</style>

<style lang="scss" scoped>
.modal-send {
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
    margin-bottom: 6px;
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
.contact-item {
  justify-content: center;
}
.contact-footer {
  display: flex;
  align-items: center;
  background: white;
  height: 60px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  .contact-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    .contact-icon {
      margin-right: 4px;
    }
    .contact-content {
      .contact-name {
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        color: #44ce6f;
        &.mb {
          display: none;
        }
      }
      .contact-description {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        color: #44ce6f;
      }
    }
  }
}
@media (max-width: 768px) {
  .contact-footer {
    display: flex;
    align-items: center;
    background: white;
    height: 50px;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    .contact-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .contact-icon {
        margin-right: 4px;
        max-width: 24px;
      }
      .contact-content {
        .contact-name {
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          // line-height: 24px;
          color: #44ce6f;
          &.pc {
            display: none;
          }
          &.mb {
            display: block;
          }
        }
        .contact-description {
          display: none;
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          color: #44ce6f;
        }
      }
    }
  }
}
</style>
