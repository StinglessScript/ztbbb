<template>
  <div>
    <client-only>
      <v-facebook-login
        app-id="435168538098441"
        @login="getUserData"
      >
    </v-facebook-login>
    </client-only>
  </div>
</template>

<script>
import Cookies from "js-cookie";

export default {
  data() {
    return {};
  },
  components: {
    VFacebookLogin: () =>
      process.client ? import("vue-facebook-login-component") : null,
  },
  methods: {
    async getUserData(response) {
      let loginRequest = {
        access_token: response?.authResponse?.accessToken,
        type: "facebook",
        platform: "WEB",
      };
      if (response) {
        this.$store.dispatch("loginV2", loginRequest).then((data) => {
          switch (data.status) {
            case 1:
              this.$toast.success(data.message, {}),
                this.$store.commit("setToken", data.data.token);
              this.$store.commit("setLengthFavorite", -1);
              //Cookies.set("token", data.data.token);
              Cookies.set(process.env.ACCESSTOKEN_NAME, data.data.token, { domain: '.longvan.net', path:"/" });
              this.$router.push("/");
              break;
            case 0:
              this.$toast.error(data.message, {});
              break;
          }
        });
      }
    },
  },
};
</script>
