<template>
  <div class="row justify-content-center" style="padding-bottom: 80px">
    <section class="col-lg-4 col-md-8 col-sm-6">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <!-- Password input -->
          <div class="form-outline mb-3">
            <label class="form-label" for="oldpassword">Mật khẩu cũ</label>
            <ValidationProvider
              mode="lazy"
              rules="required|min:6"
              v-slot="{ errors }"
            >
              <input
                id="oldpassword"
                v-model="oldpassword"
                type="password"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
              />
              <span style="color: red">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-outline mb-3">
            <label class="form-label" for="newpassword">Mật khẩu mới</label>
            <ValidationProvider
              name="password"
              rules="required|min:6"
              mode="lazy"
              v-slot="{ errors }"
            >
              <input
                id="newpassword"
                v-model="newpassword"
                type="password"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
              />
              <span style="color: red">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>
          <div class="form-outline mb-4">
            <label class="form-label" for="repassword"
              >Nhập lại mật khẩu mới</label
            >
            <ValidationProvider
              rules="required|min:6|password:@password"
              mode="lazy"
              v-slot="{ errors }"
            >
              <input
                id="repassword"
                v-model="repassword"
                type="password"
                class="form-control form-control-lg"
                placeholder="Nhập mật khẩu"
              />

              <span style="color: red">{{ errors[0] }}</span>
            </ValidationProvider>
          </div>

          <!-- Submit button -->
          <button type="submit" class="btn btn-primary btn-block">
            Đổi mật khẩu
          </button>
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oldpassword: "",
      newpassword: "",
      repassword: "",
    };
  },
  methods: {
    onSubmit() {
      // if (this.newpassword != this.repassword) {
      //   this.$toast.error("Mật khẩu không khớp");
      //   return;
      // }
      this.$store
        .dispatch("changePassword", {
          oldpassword: this.oldpassword,
          newpassword: this.newpassword,
        })
        .then((rs) => {
          switch (rs.status) {
            case 1:
              this.$toast.success(rs.message, {});
              break;
            case 0:
              this.$toast.error(rs.message, {});
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

<style lang="scss" scoped></style>
