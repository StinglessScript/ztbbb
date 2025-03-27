<template>
  <div class="banner-ads-cate">
    <img src="@/assets/img/banner2.png" />

    <div class="container">
      <!-- <div class="banner-ads-content">
        <div class="row">
          <div class="col-10">
            <h1>DỊCH VỤ MÁY CHỦ TẠI LONG VÂN SYSTEM</h1>
            <p>
              Chúng tôi cung cấp máy chủ chính hãng và dịch vụ Datacenter như
              “THUÊ MÁY CHỦ”, “BÁN MÁY CHỦ”. “THUÊ CHỖ ĐẶT MÁY CHỦ” tiêu chuẩn
              Quốc tế và chất lượng hàng đầu tại Việt Nam.
            </p>
            <div class="banner-ads-card">
              <div class="ads-card-tilte">Ưu đãi đặt biệt</div>
              <div class="ads-card-body">
                <div class="card-item">
                  <div class="card-ads-icon">
                    <img src="~/assets/img/ticked.svg" width="8px" />
                  </div>
                  <div class="card-ads-title">Tặng miễn phí tường lửa</div>
                </div>
                <div class="card-item">
                  <div class="card-ads-icon">
                    <img src="~/assets/img/ticked.svg" width="8px" />
                  </div>
                  <div class="card-ads-title">
                    Chuyển đổi gói dịch vụ linh hoạt khi đang sử dụng
                  </div>
                </div>
                <div class="card-item">
                  <div class="card-ads-icon">
                    <img src="~/assets/img/ticked.svg" width="8px" />
                  </div>
                  <div class="card-ads-title">
                    Có thể mua lại máy chủ với giá ưu đãi sau 6 tháng thuê
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="banner-ads-img"></div>
      <img class="img-banner" src="~/assets/img/img-banner-ads.svg" /> -->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>
<style lang="scss" scoped>

.banner-ads-cate {
  background: #f8f8f8;
  position: relative;
  overflow: hidden;
  .banner-ads-img {
    position: absolute;
    overflow: hidden;
    width: 295.55px;
    height: 600.88px;
    right: 5%;
    top: -40%;

    background: linear-gradient(
      180.41deg,
      rgba(0, 165, 227, 0.4) 14.38%,
      rgba(231, 240, 252, 0.4) 87.75%
    );
    border-radius: 0px;
    transform: rotate(22.64deg);
  }
  .img-banner {
    position: absolute;
    bottom: 0;
    right: 8%;
  }

  .banner-ads-content {
    padding: 20px 0;
    h1 {
      color: #44ce6f;
      font-weight: 500;
      font-size: 32px;
      line-height: 34px;
      padding-bottom: 20px;
    }
    .banner-ads-right {
      position: relative;
    }
    .banner-ads-card {
      padding: 24px;
      width: 464px;
      height: 186px;
      background: #ecfaf1;
      border: 1px solid #e3e8ef;
      box-shadow: 0px 5px 14px rgba(20, 20, 21, 0.12);
      border-radius: 6px;
      .ads-card-tilte {
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #171717;
        text-transform: uppercase;
        padding-bottom: 16px;
      }
      .ads-card-body {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 16px;
        .card-item {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          .card-ads-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12px;
            height: 12px;
            background: #44ce6f;
            border-radius: 2px;
          }
          .card-ads-title {
          }
        }
      }
    }
  }
}
@media (max-width: 768px) {
  .banner-ads-cate {
  background: #f8f8f8;
  position: relative;
  overflow: hidden;
  .banner-ads-img {
    position: absolute;
    overflow: hidden;
    width: 295.55px;
    height: 600.88px;
    right: 5%;
    top: -40%;

    background: linear-gradient(
      180.41deg,
      rgba(0, 165, 227, 0.4) 14.38%,
      rgba(231, 240, 252, 0.4) 87.75%
    );
    border-radius: 0px;
    transform: rotate(22.64deg);
  }
  .img-banner {
    display:none;
    position: absolute;
    bottom: 0;
    right: 8%;
  }

  .banner-ads-content {
    padding: 20px 0;
    h1 {
      color: #44ce6f;
      font-weight: 500;
      font-size: 32px;
      line-height: 34px;
      padding-bottom: 20px;
    }
    .banner-ads-right {
      position: relative;
    }
    .banner-ads-card {
      padding: 24px;
      width: 364px;
      height: auto;
      background: #ecfaf1;
      border: 1px solid #e3e8ef;
      box-shadow: 0px 5px 14px rgba(20, 20, 21, 0.12);
      border-radius: 6px;
      .ads-card-tilte {
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        color: #171717;
        text-transform: uppercase;
        padding-bottom: 16px;
      }
      .ads-card-body {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 16px;
        .card-item {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 4px;
          .card-ads-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 12px;
            height: 12px;
            background: #44ce6f;
            border-radius: 2px;
          }
          .card-ads-title {
          }
        }
      }
    }
  }
}
}
</style>
