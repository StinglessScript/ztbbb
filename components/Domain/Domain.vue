<template>
  <section class="domain-search-area ptb-80">
    <div class="container">
      <div class="domain-search-content">
        <h2>TÌM KIẾM TÊN MIỀN TỐT NHẤT</h2>

        <form
          method="post"
          :action="url + params"
          enctype="application/x-www-form-urlencoded"
        >
         <div class="mobile">
          <input
            type="text"
            name="domain-search"
            id="domain-search"
            v-model="params"
            placeholder="Nhập tên miền bạn muốn đăng ký"
            class="form-control "
          />
          <div class="domain-select">
            <select class="form-control">
              <option v-for="domain in block.domains" :key="domain.id">
                {{ domain.name }}
              </option>
            </select>
          </div>
         </div>
          <button type="submit">Kiểm tra</button>
        </form>
        <ul class="domain-price">
          <li
            v-for="domain in block.domains"
            :key="domain.id"
            class="domain-price-item"
          >
            <span class="domain-name">
              {{ domain.name }}</span
            >
            <br /><span>{{ domain.price }}</span
            ><br /><span style="text-decoration: line-through; color: red">{{
              domain.originalPrice
            }}</span>
          </li>
        </ul>
      </div>
      <!-- <DomainManager /> -->
    </div>
  </section>
</template>

<script>
import DomainManager from "./DomainManager.vue";

export default {
  name: "Domain",
  components: { DomainManager },
  props: {
    block: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      url: "https://support.longvan.net/domain/tim-kiem-domain.xhtml?ten-mien=",
      params: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.domain-price {
  // margin: 20px 0 10px;
  display: flex;
  justify-content: space-between;

  .domain-price-item {
  }
}
</style>
