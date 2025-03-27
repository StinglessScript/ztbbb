<template>
  <section class="pricing-area ptb-80 bg-f7fafd">
    <div class="container">
      <div class="section-title">
        <h2>{{ block?.header?.title }}</h2>
        <div class="bar"></div>
        <p>
          {{ block?.header?.description }}
        </p>
      </div>

      <div class="section-pricessl__table">
        <table class="table active">
          <thead>
            <tr>
              <td scope="col">Tên miền</td>
              <td scope="col">1 Năm</td>
              <td scope="col">2 Năm</td>
              <td v-if="checkData2" scope="col">3 Năm</td>
              <td v-if="checkData" scope="col">
                Gia hạn<br />
                <span> (1 Năm) </span>
              </td>
              <td scope="col"></td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in block.pricings" :key="item.id">
              <td>{{ item?.name }}</td>
              <td>{{ item?.oneYear ? item?.oneYear + "đ" : "Liên hệ" }}</td>

              <td>{{ item?.twoYear ? item?.twoYear + "đ" : "Liên hệ" }}</td>

              <td v-if="checkData2">{{ item?.threeYear ? item?.threeYear + "đ" : "Liên hệ" }}</td>

              <td v-if="checkData">
                {{ item?.extend ? item?.extend + "đ" : "Liên hệ" }}
              </td>
              <td>
                <a
                  v-if="`${item?.btnUrl}`.includes('http')"
                  :href="item?.btnUrl"
                  target="_blank"
                  class="btn-reg"
                  >{{ item?.btnText }}</a
                >
                <a  v-else :href="item?.btnUrl" class="btn-reg">
                  {{ item?.btnText }}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- <div class="shape8 rotateme">
      <img src="/img/shape2.27038015.svg" alt="shape" />
    </div>
    <div class="shape2 rotateme">
      <img src="/img/shape2.27038015.svg" alt="shape" />
    </div>
    <div class="shape7"><img src="/img/shape4.f044bf53.svg" alt="shape" /></div>
    <div class="shape4"><img src="/img/shape4.f044bf53.svg" alt="shape" /></div> -->
  </section>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {

    checkData2() {
      return (
        this.block?.pricings.find((item) => item.threeYear !== null) !== undefined
      );
    },
    checkData() {
      return (
        this.block?.pricings.find((item) => item.extend !== null) !== undefined
      );
    },
  },
  mounted() {
    // console.log(this.block);
    this.block;
  },
};
</script>

<style lang="scss" scoped>
.pricing-features-item {
  border-bottom: 1px #eee dotted;
  .features-item-price {
    font-weight: 500;
    font-size: 18px;
    color: #44ce6f;
    span {
      font-size: 14px;
    }
  }
}
.section-pricessl__table {
  overflow-x: auto;
  padding: 6px;

  .table {
    &.active {
      thead {
        tr {
          td {
            background: #ecfaf1;
          }
        }
      }
      border-collapse: collapse;
      border-radius: 10px;
      overflow: hidden;
      background-color: #fff;
      border: 1px solid #ddd;

      box-shadow: 0 0 4px rgb(0 0 0 / 27%);
      tr {
        border-bottom: 1px solid #ddd;
      }
      td {
        border: 1px solid #ddd;
        text-align: center;
        align-items: center;
        overflow: hidden;
        padding: 20px;
      }
      .title {
        font-weight: 500;
        font-size: 20px;
      }
      .btn-reg {
        color: #fff;
        padding: 4px 8px;
        border-radius: 6px;
        text-align: center;
        background: #44ce6f;
      }
    }
  }
}
@media (max-width: 768px) {
  .section-pricessl__table {
    overflow-x: auto;
    padding: 2px;

    .table {
      &.active {
        border-collapse: collapse;
        border-radius: 6px;
        overflow: hidden;
        background-color: #fff;
        border: 1px solid #ddd;

        box-shadow: 0 0 3px rgb(0 0 0 / 27%);
        tr {
          border-bottom: 1px solid #ddd;
        }
        td {
          border: 1px solid #ddd;
          overflow: hidden;
          font-size: 10px;
          padding: 6px;
          &:first-child {
            background: #ecfaf1;
          }
        }
        .title {
          font-size: 15px;
        }

        .btn-reg {
          color: #fff;
          padding: 2px 4px;
          border-radius: 4px;
          text-align: center;
          background: #44ce6f;
        }
      }
    }
  }
}
</style>
