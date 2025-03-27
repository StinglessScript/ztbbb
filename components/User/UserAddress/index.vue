<template>
  <div>
    <div class="list-address">
      <div class="address-item d-flex" v-for="item in addresses" :key="item.id">
        <div class="address-item-title d-flex">
          <div class="address-item-title__lable">
            <div>Tên:</div>
            <div>Số điện thoại:</div>
            <div>địa chỉ:</div>
          </div>
          <div class="address-item-title__value">
            <div>
              {{ item.name }}
              <button class="btn-cus" v-if="item.address_default === true">
                mặc định
              </button>
            </div>

            <div>{{ item.phone }}</div>
            <div>{{ item.full_address }}</div>
          </div>
        </div>
        <div class="address-item-action">
          <!-- 2 button -->
          <div class="address-item-action__button mb-4">
            <button
              class="btn-cus"
              @click="
                $modal.show('edit');
                showEditModal(item);
              "
            >
              <feather size="12" type="edit"></feather>
            </button>
            <button
              class="btn-cus btn-danger"
              v-if="!item.address_default"
              @click="deletedAddress(item.id)"
            >
              <feather size="12" type="trash"></feather>
            </button>
          </div>
          <!-- 1 button -->
          <div class="address-item-action__button">
            <button
              class="btn-cus"
              @click="setDefaultAddress(item.id)"
              v-if="item.address_default === false"
            >
              Thiết lập mặc định
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="info_user_btn">
      <button
        class="btn btn-primary"
        @click="
          $modal.show('my-modal');
          getProvinces();
          reset();
        "
      >
        Thêm địa chỉ
      </button>
    </div>
    <modal
      name="my-modal"
      :min-width="200"
      :min-height="200"
      :scrollable="true"
      :reset="true"
      width="400px"
      height="auto"
    >
      <div class="modal-header">
        <h4 class="modal-title">Thêm địa chỉ</h4>
      </div>
      <div class="modal-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updateAddress)">
            <div class="form-group">
              <label>Tên người nhận</label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Nhập tên người nhận"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="phone|required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="phone"
                  placeholder="Nhập số điện thoại"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label>Địa chỉ</label>
              <ValidationProvider
                mode="lazy"
                style="width: 100%"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="address1"
                  placeholder="Nhập địa chỉ"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- select provinces  -->
            <div class="form-group">
              <label for="province">Tỉnh/Thành phố</label>
              <select
                v-if="provinces !== []"
                class="form-control"
                v-model="province"
                @change="getDistricts"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option
                  v-for="province in provinces"
                  :key="province.id"
                  :value="province.provinceId"
                >
                  {{ province.provinceName }}
                </option>
              </select>
            </div>
            <!-- select districts  -->
            <div class="form-group">
              <label for="district">Quận/Huyện</label>

              <select
                v-if="districts !== []"
                class="form-control"
                v-model="district"
                @change="getWards"
              >
                <option value="">Chọn quận/huyện</option>
                <option
                  v-for="district in districts"
                  :key="district.id"
                  :value="district.districtId"
                >
                  {{ district.districtName }}
                </option>
              </select>
            </div>
            <!-- select wards  -->
            <div class="form-group">
              <label for="ward">Phường/Xã</label>
              <select v-if="wards !== []" class="form-control" v-model="ward">
                <option value="">Chọn phường/xã</option>
                <option
                  v-for="ward in wards"
                  :key="ward.id"
                  :value="ward.wardId"
                >
                  {{ ward.wardName }}
                </option>
              </select>
            </div>
            <div class="modal-footer" style="width: 100%">
              <slot name="footer">
                <button
                  type="button"
                  class="btn btn-default"
                  @click="$modal.hide('my-modal')"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-primary">Thêm</button>
              </slot>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </modal>
    <modal
      name="edit"
      :min-width="200"
      :min-height="200"
      :scrollable="true"
      :reset="true"
      width="400px"
      height="auto"
    >
      <div class="modal-header">
        <h4 class="modal-title">Sửa địa chỉ</h4>
      </div>
      <div class="modal-body">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(updateAddress)">
            <div class="form-group">
              <label>Tên người nhận</label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="name"
                  placeholder="Nhập tên người nhận"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label>Số điện thoại</label>
              <ValidationProvider
                style="width: 100%"
                mode="lazy"
                rules="phone|required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="phone"
                  placeholder="Nhập số điện thoại"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <div class="form-group">
              <label>Địa chỉ</label>
              <ValidationProvider
                mode="lazy"
                style="width: 100%"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="address1"
                  placeholder="Nhập địa chỉ"
                />
                <span style="color: red">{{ errors[0] }}</span>
              </ValidationProvider>
            </div>
            <!-- select provinces  -->
            <div class="form-group">
              <label for="province">Tỉnh/Thành phố</label>
              <select
                v-if="provinces !== []"
                class="form-control"
                v-model="province"
                @change="getDistricts"
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option
                  v-for="province in provinces"
                  :key="province.id"
                  :value="province.provinceId"
                >
                  {{ province.provinceName }}
                </option>
              </select>
            </div>
            <!-- select districts  -->
            <div class="form-group">
              <label for="district">Quận/Huyện</label>

              <select
                v-if="districts !== []"
                class="form-control"
                v-model="district"
                @change="getWards"
              >
                <option value="">Chọn quận/huyện</option>
                <option
                  v-for="district in districts"
                  :key="district.id"
                  :value="district.districtId"
                >
                  {{ district.districtName }}
                </option>
              </select>
            </div>
            <!-- select wards  -->
            <div class="form-group">
              <label for="ward">Phường/Xã</label>
              <select v-if="wards !== []" class="form-control" v-model="ward">
                <option value="">Chọn phường/xã</option>
                <option
                  v-for="ward in wards"
                  :key="ward.id"
                  :value="ward.wardId"
                >
                  {{ ward.wardName }}
                </option>
              </select>
            </div>
            <div class="modal-footer" style="width: 100%">
              <slot name="footer">
                <button
                  type="button"
                  class="btn btn-default"
                  @click="$modal.hide('edit')"
                >
                  Đóng
                </button>
                <button type="submit" class="btn btn-primary">Sửa</button>
              </slot>
            </div>
          </form>
        </ValidationObserver>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addresses: [],
      provinces: [],
      districts: [],
      wards: [],
      province: "",
      district: "",
      ward: "",
      name: "",
      phone: "",
      address1: "",
      check: false,
      id: "",
    };
  },
  methods: {
    reset() {
      this.name = "";
      this.phone = "";
      this.address1 = "";
      this.province = "";
      this.district = "";
      this.ward = "";
      this.check = false;
    },

    showEditModal(address) {
      this.name = address.name;
      this.id = address.id;
      this.phone = address.phone;
      this.address1 = address.address1;
      this.province = address.province_code;
      this.district = address.district_code;
      this.ward = address.ward_code;
      this.check = true;
      this.getProvinces();
      this.getDistricts();
      this.getWards();
    },

    //delete address
    async updateAddress() {
      if (this.check === true) {
        let body = {
          name: this.name,
          phone: this.phone,
          address1: this.address1,
          province_code: this.province,
          district_code: this.district,
          ward_code: this.ward,
          id: this.id,
        };
        this.$store
          .dispatch("updateOrderAddress", body)
          .then((data) => {
            switch (data.status) {
              case 0:
                this.$toast.error(data.message, {});
                break;
              case 1:
                this.$toast.success(data.message, {});
                this.$modal.hide("edit");
                this.getUserAddresses();
                break;
              case 2:
                this.this.$toast.warning(data.message, {});
            }
          })
          .catch((data) => {
            this.$toast.error(data.message, {});
          });
      } else {
        let body = {
          name: this.name,
          phone: this.phone,
          address1: this.address1,
          province_code: this.province,
          district_code: this.district,
          ward_code: this.ward,
        };
        this.$store.dispatch("createOrderAddress", body).then((data) => {
          switch (data.status) {
            case 0:
              this.$toast.error(data.message, {});
              break;
            case 1:
              this.$toast.success(data.message, {});
              this.$modal.hide("my-modal");
              this.getUserAddresses();
              break;
            case 2:
              this.this.$toast.warning(data.message, {});
          }
        });
      }
    },
    async deletedAddress(address_id) {
      this.$store
        .dispatch("deletedAddress", address_id)
        .then((data) => {
          switch (data.status) {
            case 0:
              this.$toast.error(data.message, {});
              break;
            case 1:
              this.$toast.success(data.message, {});

              this.getUserAddresses();
              break;
            case 2:
              this.this.$toast.warning(data.message, {});
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {});
        });
    },
    async setDefaultAddress(address_id) {
      this.$store
        .dispatch("setDefaultAddress", address_id)
        .then((data) => {
          switch (data.status) {
            case 0:
              this.$toast.error(data.message, {});
              break;
            case 1:
              this.$toast.success(data.message, {});

              this.getUserAddresses();
              break;
            case 2:
              this.this.$toast.warning(data.message, {});
          }
        })
        .catch((error) => {
          this.$toast.error(error.message, {});
        });
    },
    async getUserAddresses() {
      this.$store
        .dispatch("getListAddresses")
        .then((data) => {
          this.addresses = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getProvinces() {
      this.$store.dispatch("getListProvinces").then((response) => {
        this.provinces = response;
      });
    },

    async getDistricts() {
      this.$store
        .dispatch("getListDistricts", this.province)
        .then((response) => {
          this.districts = response;
        });
    },
    async getWards() {
      this.$store.dispatch("getListWards", this.district).then((response) => {
        this.wards = response;
      });
    },
  },
  mounted() {
    this.getUserAddresses();
  },
};
</script>

<style lang="scss" scoped>
.address-item-action {
  justify-content: flex-end;
}
.address-item-action__button {
  text-align: right;
}
.address-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e6e6e6;
  .address-item-title__value {
    font-size: 14px;
    font-weight: 500;
    margin-left: 12px;
  }
}
.list-address {
  margin-bottom: 20px;
}
.info_user_btn {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: right;
}
.form-group {
  display: flex;
  label {
    width: 150px;
    margin-right: 10px;
  }
}
.modal {
  overflow-y: scroll;
}
.btn-cus {
  // background-color: #4caf50; /* Green */
  border: none;
  // color: white;
  padding: 4px 8px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 4px;
}
.btn-danger {
  background-color: #f44336; /* Red */
}
</style>
