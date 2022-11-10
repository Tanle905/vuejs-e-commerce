<template>
  <div class="header-profile">
    <div class="profile-info">
      <img
        :src="userStore.userProfile && userStore.userProfile.imageUrl"
        class="header__img"
      />
      <div class="title">
        <span class="title__span">{{
          userStore.userProfile && userStore.userProfile.username
        }}</span>
        <span class="email__span">{{
          userStore.userProfile && userStore.userProfile.email
        }}</span>
      </div>
    </div>
    <div routerLink="/account" class="option" v-on:click="onNavigate()">
      <span>Thông tin tài khoản</span>
    </div>
    <a class="logout__button" v-on:click="onLogout()">Đăng xuất</a>
  </div>
</template>
<script setup>
import router from "../../router";
import { userStore } from "../../stores/store";

function onNavigate() {
  router.push({ name: "profile" });
}

function onLogout() {
  localStorage.removeItem("accessToken");
  userStore.setUserProfile(null);
  window.location.href = "/";
}
</script>
<style lang="scss" scoped>
@import "../../assets/headerProfile.sass";
</style>
