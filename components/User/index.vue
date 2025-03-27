<template>
  <div>
    <Loader :loading="showLoader" />

    <PageTitle />
    <div class="faq-area">
      <div class="container">
        <modal
          name="change-avatar"
          :min-width="200"
          :min-height="200"
          :scrollable="true"
          :reset="true"
          width="400"
          responesive="true"
          height="auto"
        >
          <div class="modal-header">
            <h4 class="modal-title">Cập nhật ảnh đại diện</h4>
          </div>
          <div class="modal-body" style="text-align: center">
            <div class="widget-avatar" @click="$modal.show('change-avatar')">
              <img
                v-if="previewImage"
                :src="previewImage"
                class="img-fluid"
                alt="User image"
                width="100%"
                height="100%"
                style="margin-bottom: 8px"
              />
              <img
                v-else
                src="../../assets/img/2.jpg"
                class="img-fluid"
                alt="User image"
                width="100%"
                height="100%"
                style="margin-bottom: 8px"
              />
            </div>
            <input
              style="display: none"
              type="file"
              id="my-file"
              multiple=""
              data-max_length="20"
              accept="image/*"
              @change="uploadImage"
            />
            <label tabindex="0" for="my-file" class="btn btn-primary"
              >Chọn ảnh</label
            >
          </div>
          <div class="modal-footer" style="width: 100%">
            <slot name="footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="changeAvatar"
              >
                Lưu
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                @click="$modal.hide('change-avatar')"
              >
                Đóng
              </button>
            </slot>
          </div>
        </modal>
        <div class="faq-accordion">
          <div class="row g-0">
            <div class="col-lg-3 col-md-3 col-sm-12">
              <div class="sidebar">
                <div class="widget">
                  <div
                    class="widget-avatar"
                    @click="
                      $modal.show('change-avatar');
                      previewImage = user.avatar;
                    "
                  >
                    <img
                      v-if="user.avatar"
                      :src="user.avatar"
                      class="img-fluid"
                      alt="User image"
                      width="100%"
                      height="100%"
                    />
                    <img
                      v-else
                      src="../../assets/img/2.jpg"
                      class="img-fluid"
                      alt="User image"
                      width="100%"
                      height="100%"
                    />
                  </div>
                  <!-- end img -->
                  <!-- wellcome -->
                  <div class="widget-wellcome">
                    <h3>
                      {{ user.name }}
                      <p class="text-primary"></p>
                    </h3>
                  </div>

                  <ul class="widget-list">
                    <li>
                      <div id="1" class="item active" @click="getComponentName">
                        <span>Thông tin cá nhân</span>
                      </div>
                    </li>
                    <li>
                      <div id="2" class="item" @click="getComponentName">
                        <span>Đổi mật khẩu</span>
                      </div>
                    </li>
                    <li>
                      <div id="3" class="item" @click="getComponentName">
                        <span>Địa chỉ giao hàng</span>
                      </div>
                    </li>
                    <li>
                      <div id="4" class="item" @click="getComponentName">
                        <span>Đơn hàng</span>
                      </div>
                    </li>
                    <!-- <li>
                      <div id="5" class="item" @click="getComponentName">
                        <span>Thông báo</span>
                      </div>
                    </li>
                    <li>
                      <div id="6" class="item" @click="getComponentName">
                        <span>Ví</span>
                      </div>
                    </li> -->
                    <li>
                      <div class="item" @click="handleLogout">
                        <span>Đăng xuất</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-lg-9 col-md-9 col-sm-12">
              <div class="content" v-if="props !== null">
                <div class="cHeader">{{ name || "Thông tin cá nhân" }}</div>
                <component :is="componentId" :props="props"></component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChangePass from "@/components/User/ChangePass";
import UserInfo from "@/components/User/UserInfo";
import UserAddress from "@/components/User/UserAddress";
import UserNotification from "@/components/User/UserNotification";
import UserWallet from "@/components/User/UserWallet";
import UserOrder from "@/components/User/UserOrder";
import PageTitle from "@/components/Common/PageTitle";
import Loader from "@/components/Common/Loader";

export default {
  middleware: ["checkAuth", "middlewareHeader", "auth"],
  components: {
    ChangePass,
    UserInfo,
    UserAddress,
    UserNotification,
    UserWallet,
    UserOrder,
    PageTitle,
    Loader,
  },

  data() {
    return {
      componentId: "UserInfo",
      name: "",
      nameUser: this.$store.getters.getName,
      listOrder: [],
      props: null,
      showLoader: true,
      user: {},
      previewImage: null,
      base64: "",
    };
  },
  beforeCreate() {
    let payload = {
      keyword: "",
      status: "",
      currentPage: 1,
      maxResult: 4,
    };
    this.$store
      .dispatch("getListOrder", payload)
      .then((response) => {
        switch (response.status) {
          case 0:
            break;
          case 1:
            this.listOrder = response.data;
            break;
          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    this.getUser();
  },
  watch: {
    "$store.state.countItem": function () {
      this.$store
        .dispatch("getCustomerInfo")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.user = response.data;
              this.props = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listOrder: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.showLoader = false;
        }
      },
      deep: true,
    },
  },
  methods: {
    getUser() {
      this.$store
        .dispatch("getCustomerInfo")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.user = response.data;
              this.props = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    changeAvatar() {
      this.$store
        .dispatch("changeAvatar", this.base64)
        .then((data) => {
          switch (data.status) {
            case 1:
              this.$toast(data.message, {});
              this.$modal.hide("change-avatar");
              this.getUser();
              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        })
        .catch((error) => {
          console.log(error);

        });
    },
    getComponentName(e) {
      this.name = e.target.innerText;
      let list = document.querySelectorAll(".item");
      list.forEach((item) => {
        item.classList.remove("active");
      });
      e.target.classList.add("active");
      if (e.target.tagName === "SPAN") {
        e.target.parentElement.classList.add("active");
        e.target.classList.remove("active");
      }
      switch (e.target.innerText) {
        case "Thông tin cá nhân":
          this.componentId = "UserInfo";
          this.$router.push({
            name: "trang-ca-nhan",
          });
          this.props = this.user;
          break;
        case "Đổi mật khẩu":
          this.componentId = "ChangePass";
          this.$router.push({
            name: "trang-ca-nhan",
          });
          break;
        case "Địa chỉ giao hàng":
          this.componentId = "UserAddress";
          this.$router.push({
            name: "trang-ca-nhan",
          });
          break;
        case "Đơn hàng":
          this.componentId = "UserOrder";
          this.$router.push({
            name: "trang-ca-nhan",
          });
          this.props = this.listOrder;
          break;
        // case "Thông báo":
        //   this.componentId = "UserNotification";
        //   this.$router.push({
        //     name: "trang-ca-nhan",
        //   });
        //   break;
        // case "Ví":
        //   this.componentId = "UserWallet";
        //   this.$router.push({
        //     name: "trang-ca-nhan",
        //   });
        //   break;
      }
      return this.componentId;
    },

    handleLogout() {
      google.accounts.id.disableAutoSelect();
      this.$toast.success("Đăng xuất thành công");
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
    uploadImage(e) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
        this.base64 = this.previewImage.split(",")[1];
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.container,
.faq-accordion {
  padding: 0;
  margin-bottom: 100px;
}
.cHeader {
  background: #ffffff;
  padding: 30px 20px;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 30px;
  font-size: 20px;
}
.content {
  margin: 0 8px;
}
.sidebar {
  border-right: 1px solid #eee;
  margin: 0;
  height: 100%;
}
.widget-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20px;
  img {
    border-radius: 50%;
    width: 150px;
    height: 150px;
    border: 3px solid rgba(112, 99, 99, 0.747);
  }
}
.widget-wellcome {
  text-align: center;
  margin-top: 20px;

  width: 100%;
  h3 {
    width: 100%;
    padding: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
.widget-list {
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    .active {
      border-right: #44ce6f solid 3px;
      height: 100%;
    }
    cursor: pointer;
    .item {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 20px;
      border-bottom: 1px solid #eee;
      width: 100%;
      span {
        display: block;
      }
      &:hover {
        color: #44ce6f;
      }
    }
  }
}
</style>
