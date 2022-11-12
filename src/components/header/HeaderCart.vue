<template>
  <section class="header-cart">
    <div class="cart-list">
      <div class="item" v-for="item of itemsList">
        <img
          :src="item.imageUrl"
          class="item__img"
          alt=""
          width="150"
          height="100"
        />
        <div class="span-block">
          <span v-on:click="toProduct(item._id)" class="name__p">{{
            item.title
          }}</span>
          <span class="quantity__span">Số lượng: {{ item.quantity }}</span>
          <span class="price__span">${{ item.price }}</span>
        </div>
      </div>
    </div>
    <div class="to-checkout">
      <div class="total">
        <span class="total-quantity__span"
          >Tổng tiền({{ totalQuantity }}) sản phẩm:
        </span>
        <span class="total-price__span">${{ totalPrice }}</span>
      </div>
      <button class="to-checkout__button">
        <RouterLink to="/cart" style="color: white">
          Xem giỏ hàng
        </RouterLink>
      </button>
    </div>
  </section>
</template>
<script setup>
import { onMounted, ref } from "vue";
import router from "../../router";
import { userStore } from "../../stores/store";

const itemsList = ref({});
const totalPrice = ref(0);
const totalQuantity = ref(0);

onMounted(() => {
  if (userStore.userProfile) {
    itemsList.value = userStore?.userProfile?.cart;
    itemsList.value.forEach((item) => {
      totalPrice.value = totalPrice.value + item.price * item.quantity;
    });
    totalQuantity.value = itemsList.value.length;
  }
});

function toProduct(id) {
  router.push({ name: "product", params: { id } });
}
</script>
<style lang="scss" scoped>
@import "../../assets/headerCart.sass";
</style>
