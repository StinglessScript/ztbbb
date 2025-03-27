<template>
  <div>
    <Login />
  </div>
</template>

<script>
import PageTitle from "../../components/Common/PageTitle.vue";
import Login from "../../components/Auth/Loginv2.vue";
import Cookies from "js-cookie";
export default {
  name: "dang-nhap",
  middleware: ["checkAuth", "middlewareHeader"],
  data() {
    return {
      host: "21",
    };
  },
  components: {
    PageTitle,
    Login,
  },
  mounted() {
    const token = Cookies.get(process.env.ACCESSTOKEN_NAME);
    //console.log('check token', token)
    if (token) {
      window.location.assign("/");
    } else {
      return;
    }
    this.$store.commit("setLoading", false);
  },
};
</script>
