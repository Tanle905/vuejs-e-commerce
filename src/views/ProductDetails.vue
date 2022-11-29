<template>
  <div v-if="productDetails" class="product">
    <div class="product-upper">
      <img class="detail__img" :src="productDetails.imageUrl" alt="" />
      <div class="detail-info">
        <span class="title__span">{{ productDetails.title }}</span>
        <span class="price__span">${{ productDetails.price }}</span>
        <div class="button">
          <button
            v-on:click="onAddToCart(productDetails._id)"
            class="add-to-cart__button"
            :disabled="isLoading"
          >
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
import { notification } from "ant-design-vue";
import UserService from "@/services/user.service";
import { userStore } from "../stores/store";

const router = useRoute();
const productDetails = ref();
const accessToken = localStorage.getItem("accessToken");
const isLoading = ref(false);

onMounted(() => {
  UserService.getProductDetails(router.params.id).then((result) => {
    productDetails.value = result.data;
  });
});
function onAddToCart(productId) {
  isLoading.value = true;
  UserService.addItemToCart(accessToken, productId).then(async (value) => {
    const cartData = await UserService.getCart(accessToken);
    userStore.userProfile.cart = cartData.data.data;
    notification.success({ message: "Thêm vào giỏ hàng thành công !" });
    isLoading.value = false;
  });
}
</script>
<style lang="scss" scoped>
@import "../assets/productDetails.sass";
</style>
