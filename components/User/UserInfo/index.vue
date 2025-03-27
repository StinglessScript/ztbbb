<template>
  <div>
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
        <h4 class="modal-title">Sửa thông tin</h4>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="">Họ và tên :</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label for="">Số điện thoại :</label>
          <input type="text" class="form-control" v-model="phone" />
        </div>
        <div class="form-group">
          <label for="">Địa chỉ Email :</label>
          <input
            type="text"
            class="form-control"
            disabled
            v-model="user.email"
          />
        </div>
        <div class="form-group">
          <label for="">Ngày sinh :</label>
          <date-picker
            class="form-control"
            v-model="time"
            :clearable="false"
            valueType="timestamp"
            format="DD-MM-YYYY"
          ></date-picker>
        </div>
        <div class="form-group">
          <label for="">Giới tính :</label>

          <input type="radio" id="one" value="M" v-model="gender" />
          <label for="one" style="margin-right: 4px">Nam</label>

          <input type="radio" id="two" value="F" v-model="gender" />
          <label for="two">Nữ</label>
        </div>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            type="button"
            class="btn btn-default"
            @click="$modal.hide('my-modal')"
          >
            Đóng
          </button>
          <button type="button" class="btn btn-primary" @click="updateInfo">
            Lưu
          </button>
        </slot>
      </div>
    </modal>
    <div class="row" v-if="user !== null">
      <!-- show info -->
      <section class="col-lg-6 col-md-8 col-sm-6">
        <div class="info_user_content">
          <div class="info_user_content_item d-flex">
            <p>Họ và tên:</p>
            <span>{{ user.name }}</span>
          </div>
          <div class="info_user_content_item d-flex">
            <p>Số điện thoại:</p>
            <span>{{ user.phone }}</span>
          </div>
          <div class="info_user_content_item d-flex">
            <p>Địa chỉ Email:</p>
            <span>{{ user.email }}</span>
          </div>
          <div class="info_user_content_item d-flex">
            <p>Ngày sinh:</p>
            <span>{{ user.birthday }}</span>
          </div>
        </div>
        <div class="info_user_btn">
          <button class="btn btn-primary" @click="$modal.show('my-modal')">
            Sửa thông tin
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "user-info",
  components: { DatePicker },
  props: ["props"],
  data() {
    return {
      user: {},
      name:"",
      phone:"",
      edit: false,
      phone: "",
      email: "",
      birthday: "",
      gender: "",
      time: "",
    };
  },
  mounted() {
    this.user = this.props;
    this.name = this.props.name
    this.phone= this.props.phone
    this.time = this.props.birthday_time_long;
    this.gender = this.props.gender;
  },
  methods: {
    getUserInfo() {
      this.$store
        .dispatch("getCustomerInfo")
        .then((response) => {
          switch (response.status) {
            case 0:
              break;
            case 1:
              this.user = response.data;
              break;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateInfo() {
      let body = {
        name: this.name,
        phone: this.phone,
        email: this.user.email,
        birthday_time_long: this.time,
        gender: this.gender,
      };
      this.$store.dispatch("updateCustomerInfo", body).then((data) => {
        switch (data.status) {
          case 0:
            this.$toast.error(data.message, {});
            break;
          case 1:
            this.$toast.success(data.message, {});
            this.$modal.hide("my-modal");
            this.getUserInfo();
            // this.$store.commit("setCountItem", +1);
            break;
          case 2:
            this.this.$toast.warning(data.message, {});
        } 
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info_user_content {
  padding: 20px;
  margin-bottom: 20px;
}

p {
  font-size: 1rem;
}
span {
  font-size: 1rem;
  margin: 0 0 0 0.5rem;
}

.mx-datepicker {
  width: 100%;
}
</style>
<style>
.mx-input {
  display: inline-block;
  width: 100%;
  background-color: #eee;
  color: #0e314c;
  border: none;
  border-radius: none;
  -webkit-box-shadow: none;
  box-shadow: none;
  height:inherit;
  padding:0;
}
</style>
