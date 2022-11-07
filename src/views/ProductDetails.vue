<template>
  <div v-if="productDetails" class="product">
    <div class="product-upper">
      <img class="detail__img" :src="productDetails.image" alt="" />
      <div class="detail-info">
          <span class="title__span">{{ productDetails.name }}</span>
          <span class="price__span">{{ productDetails.price }}</span>
        <div class="button">
          <button v-on:click="onBuyNow()" class="buy-now__button">
            MUA NGAY
          </button>
          <button v-on:click="onAddToCart()" class="add-to-cart__button">
            THÊM VÀO GIỎ HÀNG
          </button>
        </div>
      </div>
    </div>
    <div v-html="productDetails.description" class="product-detail"></div>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import UserService from "@/services/user.service";

const router = useRoute();
const productDetails = ref();

onMounted(() => {
  UserService.getProductDetails(router.params.id).then((result) => {
    productDetails.value = result.data.data;
  });
});
</script>
<style lang="scss" scoped>
@import "../assets/productDetails.sass";
</style>
