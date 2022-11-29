<template>
  <div
    v-if="banners"
    id="carouselControl"
    class="carousel slide"
    data-ride="carousel"
  >
    <div class="carousel-inner carousel">
      <div
        class="carousel-item"
        :class="{ active: index == 0 }"
        v-for="(banner, index) in banners"
      >
        <a v-bind:href="banner.linkTo"><img class="img-fluid d-block w-100" :src="banner.imageUrl" /></a>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselControl"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselControl"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
  <div v-if="products" class="main-page">
    <div class="product">
      <span class="title__span">Sản phẩm</span>
      <div class="product-container">
        <div
          v-for="product in products"
          :key="product._id"
          v-on:click="onNavigate(product)"
          class="product__detail"
        >
          <img class="product-image__img" :src="product.imageUrl" alt="" />
          <p class="product-name__p">{{ product.title }}</p>
          <span class="product-price__span">${{ product.price }}</span>
        </div>
      </div>
      <nav class="m-1">
        <ul class="pagination">
          <li
            class="page-item"
            :class="{ disabled: isFetching || pagination.page <= 1 }"
          >
            <button
              class="page-link"
              v-on:click="handlePagination('previous')"
              :disabled="isFetching"
            >
              Trang trước
            </button>
          </li>
          <li
            class="page-item"
            v-for="n in totalPages"
            :class="{ disabled: isFetching, active: n == pagination.page }"
          >
            <button
              class="page-link"
              v-on:click="handlePagination(n)"
              :disabled="isFetching"
            >
              {{ n }}
            </button>
          </li>
          <li
            class="page-item"
            :class="{ disabled: isFetching || pagination.page >= totalPages }"
          >
            <button
              class="page-link"
              v-on:click="handlePagination('next')"
              :disabled="isFetching"
            >
              Trang kế tiếp
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>
<script setup>
import UserService from "@/services/user.service";
import { onMounted, reactive, ref } from "vue";
import router from "../router";

const products = ref({});
const banners = ref({});
const totalPages = ref(0);
const isFetching = ref(false);
const pagination = reactive({ page: 0, pageSize: 0, count: 0 });
const handleSetProductAndPagi = (result) => {
  products.value = result.data.data;
  pagination.page = result.data.page;
  pagination.count = result.data.count;
  pagination.pageSize = result.data.pageSize;
  totalPages.value = Math.ceil(pagination.count / pagination.pageSize);
};

onMounted(() => {
  UserService.getProducts().then((result) => {
    handleSetProductAndPagi(result);
  });
  UserService.getBanners().then((result) => {
    banners.value = result.data.data;
  });
});

function onNavigate(product) {
  router.push({
    name: "product",
    params: { id: product._id },
  });
}

function handlePagination(action) {
  switch (action) {
    case "next":
      if (pagination.page >= totalPages.value) break;
      isFetching.value = true;
      UserService.getProducts(null, parseInt(pagination.page) + 1, 10).then(
        (result) => {
          handleSetProductAndPagi(result);
          isFetching.value = false;
        }
      );
      break;
    case "previous":
      if (pagination.page <= 1) break;
      isFetching.value = true;
      UserService.getProducts(null, parseInt(pagination.page) - 1, 10).then(
        (result) => {
          handleSetProductAndPagi(result);
          isFetching.value = false;
        }
      );
      break;

    default:
      if (action < 1 || action > totalPages.value || action == pagination.page)
        break;
      isFetching.value = true;
      UserService.getProducts(null, action, 10).then((result) => {
        handleSetProductAndPagi(result);
        isFetching.value = false;
      });
      break;
  }
}
</script>
<style lang="sass" scoped>
@import "../assets/mainPage.sass"
</style>
