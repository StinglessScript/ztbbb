<template>
  <div class="col-lg-12 col-md-12">
    <div class="pagination-area">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item">
            <a
              href="#"
              class="page-link"
              @click.prevent="onClickFirstPage"
              :class="isInFirstPage ? 'disabled' : ''"
              :disabled="isInFirstPage"
              ><img
                src="~/assets/img/pi-step-backward.svg"
                :class="{ 'btn-dis': isInFirstPage }"
            /></a>
          </li>
          <li class="page-item">
            <a
              href="#"
              class="page-link"
              @click.prevent="onClickPreviousPage"
              :class="isInFirstPage ? 'disabled' : ''"
              :disabled="isInFirstPage"
              ><img
                src="~/assets/img/pi-caret-left.svg"
                :class="{ 'btn-dis': isInFirstPage }"
            /></a>
          </li>
          <li :key="page.id" v-for="page in pages" class="page-item">
            <a
              href="#"
              class="page-link"
              @click.prevent="onClickPage(page.name)"
              :disabled="page.isDisabled"
              :class="{ active: isPageActive(page.name) }"
              >{{ page.name }}</a
            >
          </li>
          <li class="page-item">
            <a
              href="#"
              class="page-link"
              @click.prevent="onClickNextPage"
              :class="isInLastPage ? 'disabled' : ''"
              :disabled="isInLastPage"
              ><img
                src="~/assets/img/pi-caret-right.svg"
                :class="{ 'btn-dis': isInLastPage }"
            /></a>
          </li>
          <li class="page-item">
            <a
              href="#"
              class="page-link"
              @click.prevent="onClickLastPage"
              :class="isInLastPage ? 'disabled' : ''"
              :disabled="isInLastPage"
              ><img
                src="~/assets/img/pi-step-forward.svg"
                :class="{ 'btn-dis': isInLastPage }"
            /></a>
          </li>
          <li class="page-item">
            <select v-model="maxResultInt" style="border: none; color: #6c757d">
              <option :value="maxResultInt">{{ maxResultInt }}</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import BackWard from "../../assets/img/pi-step-backward.svg";
import Back from "../../assets/img/pi-caret-left.svg";
import Next from "../../assets/img/pi-caret-right.svg";
import ForWarrd from "../../assets/img/pi-step-forward.svg";
export default {
  components: {
    BackWard,
    Back,
    Next,
    ForWarrd,
  },
  name: "pagination",
  data() {
    return {
      maxResultInt: 30,
    };
  },
  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3,
    },
    totalPages: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    maxResult: {
      type: Number,
      required: true,
    },
  },
  watch: {
    maxResultInt: function () {
      this.maxResultP(this.maxResultInt);
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },
    isInLastPage() {
      if (this.totalPages === 0) {
        return true;
      }
      return this.currentPage === this.totalPages;
    },
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }
      // When on the last page
      if (this.totalPages < this.maxVisibleButtons) {
        return 1;
      }
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons + 1;
      }
      // When in between
      return this.currentPage - 1;
    },
    endPage() {
      if (this.totalPages === 0) {
        return 1;
      }
      if (this.totalPages < this.maxVisibleButtons) {
        return this.totalPages;
      }
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.totalPages
      );
    },
    pages() {
      const range = [];
      for (let i = this.startPage; i <= this.endPage; i++) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage,
        });
      }
      return range;
    },
  },
  methods: {
    maxResultP(maxResult) {
      this.$emit("maxResultChange", maxResult);
    },
    onClickFirstPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", 1);
    },
    onClickPreviousPage() {
      if (this.isInFirstPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit("pagechanged", page);
    },
    onClickNextPage() {
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pagechanged", this.currentPage + 1);
    },
    onClickLastPage() {
      console.log("onClickLastPage");
      if (this.isInLastPage) {
        return false;
      }
      this.$emit("pagechanged", this.totalPages);
    },
    isPageActive(page) {
      return this.currentPage === page;
    },
  },
};
</script>
<style lang="scss" scoped>
.pagination {
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-content: center;
  float: right;
  margin: 10px auto;
  width: 100%;
  .page-item {
    display: flex;
    color: #ddd;
    margin: 0 2px;
    justify-content: center;
    align-content: center;
    background-color: transparent;
    border: none;
    a.disabled {
      cursor: not-allowed;
      svg {
        path {
          fill: #000;
        }
      }
    }
    .page-link {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #6c757d;
      background-color: transparent;
      border-radius: 3px;
      padding: 12px;
      box-shadow: none;
      border: 1px transparent solid;

      &:hover {
        border: 1px #44ce6f solid;
      }
      &.active {
        background-color: #44ce6f;
        color: #ffffff !important;
        font-size: 14px;
        line-height: 14px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
}
button[disabled],
html input[disabled] {
  cursor: default;
  color: lightgray;
}
</style>
