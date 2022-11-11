<template>
  <form action="" class="header__form">
    <Field
      name="title"
      type="text"
      class="form__input"
      placeholder="Nhập từ khóa cần tìm..."
      v-on:input="handleSearchDebounce"
      v-on:focus="isSearchFocus = true"
      v-on:blur="!isSearchHover ? (isSearchFocus = false) : null"
    />
    <button class="form__button">
      <i class="fas fa-search"></i>
    </button>
  </form>
  <div
    class="product-search"
    v-if="isSearchFocus"
    v-on:mouseover="isSearchHover = true"
    v-on:mouseleave="isSearchHover = false"
  >
    <div
      class="product-search-detail"
      v-for="product in matchedProduct"
      v-on:click="onNavigate(product)"
    >
      <div class="image-wraper">
        <img
          style="border-radius: 5%"
          :src="product.imageUrl"
          width="150"
          height="80"
        />
      </div>
      <p class="product-search-detail__p">{{ product.title }}</p>
    </div>
  </div>
</template>
<script setup>
import { debounce } from "lodash";
import { Field } from "vee-validate";
import UserService from "@/services/user.service";
import { ref } from "vue";
import router from "../../router";

const matchedProduct = ref();
const isSearchFocus = ref(false);
const isSearchHover = ref(false);

const handleSearchDebounce = debounce(async (event) => {
  if (event.target.value.length == 0) {
    isSearchFocus.value = false;
    matchedProduct.value = [];
    return;
  }
  const response = await UserService.getProducts(event.target.value);
  matchedProduct.value = response.data.data;
}, 800);

function onNavigate(product) {
  router.push({
    name: "product",
    params: { id: product._id },
  });
  isSearchFocus.value = false;
}
</script>
<style lang="scss" scoped>
@import "../../assets/headerSearch.sass";
</style>
