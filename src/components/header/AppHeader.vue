<template>
  <header class="header">
    <div class="header__left">
      <RouterLink to="/" class="header__brand">Phong Vu.</RouterLink>
      <HeaderSearch />
    </div>
    <div class="header__right">
      <button class="icon__button">
        <i class="fas fa-clipboard-list m-auto"></i> <span>Đơn hàng</span>
      </button>
      <button
        class="icon__button"
        v-on:click="!userStore.userProfile && onNavigate()"
        v-on:mouseover="isProfileHovered = true"
        v-on:mouseleave="isProfileHovered = false"
      >
        <i
          class="fas fa-user m-auto"
          v-if="!userStore?.userProfile?.imageUrl"
        ></i>
        <div class="m-auto" v-else>
          <img
            class="avatar__img"
            :src="userStore?.userProfile?.imageUrl"
            alt=""
          />
        </div>
        <span>{{
          userStore.userProfile ? userStore.userProfile.username : "Đăng nhập"
        }}</span>
      </button>
      <HeaderProfile
        v-if="userStore.userProfile && isProfileHovered"
        v-on:mouseenter="isProfileHovered = true"
        v-on:mouseleave="isProfileHovered = false"
      />
      <button
        class="icon__button"
        v-on:click="onCartNavigate()"
        v-on:mouseover="isCartHovered = true"
        v-on:mouseleave="isCartHovered = false"
      >
        <i
          class="fas fa-cart-shopping m-auto"
          style="position: relative"
          routerLink="/checkout"
        >
          <div class="cart-badge">
            <span>{{ totalProduct }}</span>
          </div></i
        >

        <span>Giỏ hàng</span>
      </button>
      <HeaderCart
        v-if="isCartHovered"
        v-on:mouseenter="isCartHovered = true"
        v-on:mouseleave="isCartHovered = false"
      />
    </div>
  </header>
</template>
<script setup>
import HeaderProfile from "@/components/header/HeaderProfile.vue";
import { onMounted, ref } from "vue";
import router from "../../router";
import { userStore } from "../../stores/store";
import UserService from "@/services/user.service";
import HeaderSearch from "./HeaderSearch.vue";
import HeaderCart from "./HeaderCart.vue";

const accessToken = localStorage.getItem("accessToken");
const isProfileHovered = ref(false);
const isCartHovered = ref(false);
const totalProduct = ref(0);

onMounted(async () => {
  if (accessToken) {
    const profileData = await UserService.getOwnProfile(accessToken);
    const cartData = await UserService.getCart(accessToken);
    userStore.setUserProfile({ ...profileData.data, cart: cartData.data.data });
    totalProduct.value = userStore.userProfile.cart.length;
  }
});

function onNavigate() {
  router.push({ name: "auth" });
}

function onCartNavigate() {
  router.push({ name: "cart" });
}
</script>
<style lang="scss" scoped>
@import "../../assets/appHeader.sass";
</style>
