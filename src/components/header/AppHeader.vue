<template>
  <header class="header">
    <div class="header__left">
      <RouterLink to="/" class="header__brand">Phong Vu.</RouterLink>
      <form action="" class="header__form">
        <input
          type="text"
          class="form__input"
          placeholder="Nhập từ khóa cần tìm..."
        />
        <button class="form__button">
          <i class="fas fa-search"></i>
        </button>
      </form>
    </div>
    <div class="header__right">
      <button class="icon__button">
        <i class="fas fa-tag m-auto"></i> <span>Khuyến mãi</span>
      </button>
      <button class="icon__button">
        <i class="fas fa-clipboard-list m-auto"></i> <span>Đơn hàng</span>
      </button>
      <button class="icon__button" v-on:click="onAuthNavigate()">
        <!-- <app-header-profile
          [userData]="userData"
          *ngIf="isAccountHovered && userData"
        ></app-header-profile> -->
        <i class="fas fa-user m-auto" v-if="!false || !false"></i>
        <div v-else>
          <img class="avatar__img" src="userData && userData.avatar" alt="" />
        </div>
        <span>{{ false ? false : "Đăng nhập" }}</span>
      </button>
      <button class="icon__button">
        <i class="fas fa-bell m-auto"></i> <span>Thông báo</span>
      </button>
      <button class="icon__button" v-on:click="onCartNavigate()">
        <!-- <app-header-cart *ngIf="isCartHovered"></app-header-cart> -->
        <i class="fas fa-cart-shopping m-auto" routerLink="/checkout"></i>
        <div class="cart-badge">
          <span>{{ 2 }}</span>
        </div>
        <span>Giỏ hàng</span>
      </button>
    </div>
  </header>
</template>
<script setup>
import router from "../../router";

function onAuthNavigate() {
  router.push({ name: "auth" });
}

function onCartNavigate() {
  router.push({ name: "cart" });
}
</script>
<style lang="scss" scoped>
@import "../../assets/appHeader.sass";
</style>
