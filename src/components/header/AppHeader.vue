<template>
  <header class="header">
    <div class="header__left">
      <RouterLink to="/" class="header__brand">Phong Vu.</RouterLink>
      <HeaderSearch />
    </div>
    <div class="header__right">
      <button class="icon__button">
        <i class="fas fa-tag m-auto"></i> <span>Khuyến mãi</span>
      </button>
      <button class="icon__button">
        <i class="fas fa-clipboard-list m-auto"></i> <span>Đơn hàng</span>
      </button>
      <button
        class="icon__button"
        v-on:click="!userStore.userProfile && onNavigate()"
        @mouseover="
          () => {
            isProfileHovered = true;
          }
        "
        @mouseleave="
          () => {
            isProfileHovered = false;
          }
        "
      >
        <HeaderProfile v-if="userStore.userProfile && isProfileHovered" />
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
      <button class="icon__button">
        <i class="fas fa-bell m-auto"></i> <span>Thông báo</span>
      </button>
      <button class="icon__button" v-on:click="onCartNavigate()">
        <!-- <app-header-cart *ngIf="isCartHovered"></app-header-cart> -->
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

const accessToken = localStorage.getItem("accessToken");
const isProfileHovered = ref(false);
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
