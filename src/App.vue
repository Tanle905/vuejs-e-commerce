<script>
import AppHeader from "@/components/header/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>
<template>
  <div id="app">
    <AppHeader />
    <div class="container mt-3">
      <router-view :key="$route.fullPath" />
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
