import Vue from "vue";
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import {
  required,
  email,
  min,
  max,
  handleSubmit,
} from "vee-validate/dist/rules";

// Add a rule min
extend("min", {
  ...min,
  message: "Mật khẩu phải có ít nhất 6 ký tự",
});
//confirmed
extend("password", {
  params: ["target"],
  validate(value, { target }) {
    return value === target;
  },
  message: "Mật khẩu nhập lại chưa khớp",
});

// validate emty field
extend("required", {
  validate(value) {
    return {
      required: true,
      valid: ["", null, undefined].indexOf(value) === -1,
    };
  },
  message: "Vui lòng nhập thông tin ",
  computesRequired: true,
});
// validate phone number
extend("phone", {
  validate(value) {
    return {
      phone: true,
      valid: /^\d{10}$/.test(value),
      ///^0[0-9]{9,10}$/.test(value),
    };
  },
  message: "Số điện thoại không hợp lệ",
});
//validate email
extend("email", {
  validate: (value) => {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    );
  },
  message: "Email không hợp lệ",
});
//validate code active account (6 digits)
extend("code", {
  validate: (value) => {
    return /^[0-9]{6}$/.test(value);
  },
  message: "Mã kích hoạt là 6 chữ số",
});
//validate password

// Register it globally
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
