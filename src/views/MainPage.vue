<template>
  <div v-if="products" class="main-page">
    <div class="product">
      <span class="title__span">Sản phẩm</span>
      <div class="product-container">
        <div
          v-for="product in products"
          v-on:click="onNavigate(product)"
          class="product__detail"
        >
          <img class="product-image__img" :src="product.imageUrl" alt="" />
          <p class="product-name__p">{{ product.title }}</p>
          <span class="product-price__span">${{ product.price }}</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup>
import UserService from "@/services/user.service";
import { onMounted, ref } from "vue";
import router from "../router";

const products = ref();

onMounted(() => {
  UserService.getProducts().then((result) => {
    products.value = result.data.data;
  });
});

function onNavigate(product) {
  router.push({
    name: "product",
    params: { id: product._id },
  });
}
</script>
<style lang="sass" scoped>
@import "../assets/mainPage.sass"
</style>
