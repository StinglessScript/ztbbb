<template>
  <section class="domain-search-area ptb-80">
    <div class="container">
      <div class="domain-search-content">
        <h2>TÌM KIẾM TÊN MIỀN TỐT NHẤT</h2>

        <form
          method="post"
          action="https://support.longvan.net/domain/tim-kiem-domain.xhtml"
          enctype="application/x-www-form-urlencoded"
        >
          <input
            type="text"
            name="domain-search"
            id="domain-search"
            placeholder="Nhập tên miền bạn muốn đăng ký"
            class="form-control"
          />
          <div class="domain-select">
            <select class="form-control">
              <option v-for="domain in block.domains" :key="domain.id">
                {{ domain.name }}
              </option>
            </select>
          </div>
          <button type="submit">Kiểm tra</button>
        </form>
        <!-- <div class="domain-price">
          <div v-for="domain in block.domains" :key="domain.id">
            {{ domain.name }}<br /><span style="font-size: 24px">{{
              domain.price
            }}</span
            ><br /><span style="text-decoration: line-through; color: red">{{
              domain.originalPrice
            }}</span>
          </div>
        </div> -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Domain",
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang="scss" scoped></style>
