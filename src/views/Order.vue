<template>
  <span class="order-title">Đơn hàng</span>
  <p class="order-item-count">{{ itemsCount }} Đơn hàng</p>
  <section class="order-list">
    <div v-for="order in orderList" class="order">
      <p class="order-id">Mã đơn hàng: {{ order._id }}</p>
      <p class="order-status">Trạng thái: {{ order.orderStatus }}</p>
      <div class="order-row">
        <span>Sản phẩm</span>
        <span class="title-header__span">Tên sản phẩm</span>
        <span class="quantity-header__span">Số lượng</span>
        <span class="price-header__span">Giá thành</span>
      </div>
      <div v-for="item in order.items" class="order-detail-row">
        <img :src="item.imageUrl" alt="" class="image__img" />
        <p class="item-title__p">{{ item.title }}</p>
        <span class="quantity__span">{{ item.quantity }}</span>
        <span class="price__span">{{ item.price }}</span>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { userStore } from "../stores/store";

const orderList = ref();
const itemsCount = ref();

watch(
  () => userStore.userProfile,
  () => {
    if (userStore.userProfile) {
      orderList.value = userStore.userProfile.order;
      itemsCount.value = orderList.value.length;
    }
  }
);

onMounted(() => {
  if (userStore.userProfile) {
    orderList.value = userStore.userProfile.order;
    itemsCount.value = orderList.value.length;
  }
});
</script>
<style lang="scss" scoped>
@import "../assets/order.sass";
</style>
