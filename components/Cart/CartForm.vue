<template>
  <div class="card_form_list d-flex flex-column gap-3">
    <div class="d-flex flex-column gap-2">
      <div class="d-flex gap-2">
        <span style="width: 80px; font-weight: 600">Tên công ty:</span>
        <span style="color: #44ce6f; font-weight: 400">{{ item.company }}</span>
      </div>
      <div class="d-flex gap-2">
        <span style="width: 80px; font-weight: 600">Mã số thuế:</span>
        <span style="color: #44ce6f; font-weight: 400">{{ item.taxCode }}</span>
      </div>
      <div class="d-flex gap-2">
        <span style="width: 80px; font-weight: 600">Email:</span>
        <span style="color: #44ce6f; font-weight: 400"
          >{{ item.invoiceReceiveEmail1 }}
          {{
            item.invoiceReceiveEmail2 && `, ${item.invoiceReceiveEmail2}`
          }}</span
        >
      </div>
      <div class="d-flex gap-2">
        <span style="width: 80px; font-weight: 600">Địa chỉ:</span>
        <span style="color: #44ce6f; font-weight: 400">{{ item.address }}</span>
      </div>
    </div>
    <div class="d-flex gap-3 justify-content-center">
      <div class="card_buton_green" @click="$emit('handleChooseVatInfo', item)">
        Chọn
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
};
</script>

<style>
.card_form_list {
  border: 1px solid #bef6cf56;
  border-radius: 10px;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, transform 0.3s, height 0.3s; /* Thêm height vào transition */
  /* overflow: hidden; */
  height: 100%;
}

/* .card_form_list:hover {
  box-shadow: 0 4px 8px rgba(34, 115, 56, 0.2);
  transform: translateY(-2px);
  height: calc(140px + 40px);
} */

.card-function {
  opacity: 0; /* Bắt đầu với độ mờ bằng 0 */
  transform: translateY(10px); /* Dịch xuống 10px */
  transition: opacity 0.3s, transform 0.3s; /* Hiệu ứng chuyển đổi */
}

.card_form_list:hover .card-function {
  opacity: 1; /* Độ mờ khi hover */
  transform: translateY(0); /* Quay lại vị trí ban đầu */
}


</style>
