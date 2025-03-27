<template>
  <div>
    <chatwoot-widget />
    <div class="row justify-content-center">
      <div class="col-lg-12 col-md-12">
        <div class="cart-items" style="overflow: auto; width: 100%">
          <div class="cart-header">
            <div class="row border-bottom w-500" style="flex-wrap: nowrap">
              <div class="col-lg-5 col-3 font-weight-bold">Tên</div>
              <div class="col-lg-2 col-3 font-weight-bold">Đơn giá</div>
              <div class="col-lg-2 col-3 font-weight-bold">Số tháng</div>
              <div class="col-lg-3 col-3 font-weight-bold">Thành tiền</div>
            </div>
          </div>
          <div
            class="cart-item border-dotted-bottom-cumstom w-500"
            v-for="cart in order.lineItems"
            :key="cart.id"
            :class="{
              'last-item': index === order.lineItems.length - 1,
            }"
          >
            <div class="row item w-500" style="flex-wrap: nowrap">
              <div class="col-lg-5 col-3">
                {{ cart.orderLineItem.variant.title }}
              </div>
              <div class="col-lg-2 col-3">
                {{ convertPrice(cart.orderLineItem.variant.price.amount) }}
              </div>
              <div class="col-lg-2 col-3">
                {{ cart.orderLineItem.quantity }}
              </div>
              <div class="col-lg-3 col-3">
                {{
                  convertPrice(
                    cart.orderLineItem.variant.price.amount *
                      cart.orderLineItem.quantity
                  )
                }}
              </div>
            </div>
          </div>
          <!-- <div class="border-bottom"></div> -->
          <div class="row py-8 disNone">
            <div class="col-5 font-weight-bold"></div>
            <div class="col-2 font-weight-bold"></div>
            <div class="col-2">Tổng cộng</div>
            <div class="col-3 textPrimary">
              {{ convertPrice(totalCart) }}
            </div>
            <div class="col-5 font-weight-bold"></div>
            <div class="col-2 font-weight-bold"></div>
            <div class="col-2">VAT</div>
            <div class="col-3 textPrimary">
              {{ convertPrice(VAT) }}
            </div>
          </div>
          <div class="border-bottom disNone"></div>
          <div class="row py-8 disNone">
            <div class="col-5 font-weight-bold"></div>
            <div class="col-2 font-weight-bold"></div>
            <div class="col-2 font-weight-bold">Tổng thanh toán</div>
            <div class="col-3 textPrimary font-weight-bold">
              {{ convertPrice(order.order?.currentTotalPrice.amount) }}
            </div>
          </div>
          <div class="disBlock py-8 w-500" style="padding-bottom: 20px">
            <div class="d-flex" style="flex-flow: column; gap: 0.5rem">
              <div class="d-flex" style="flex-flow: column; gap: 0.5rem">
                <div>
                  <span>Tổng cộng</span>
                  <span class="textPrimary">{{ convertPrice(totalCart) }}</span>
                </div>
                <div>
                  <span>VAT</span>
                  <span class="textPrimary">{{ convertPrice(VAT) }}</span>
                </div>
              </div>
              <div>
                <span class="font-weight-bold">Tổng thanh toán</span>
                <span class="textPrimary font-weight-bold">{{
                  convertPrice(order.order?.currentTotalPrice.amount)
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  head: {
    script: [{ src: "https://app.chatwoot.com/web/js/bundle.js", async: true }],
  },
};
</script>
  