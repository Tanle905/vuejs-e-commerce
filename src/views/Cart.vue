<template>
  <section v-if="userStore.userProfile" class="checkout">
    <span class="title__span">Giỏ hàng</span>
    <div class="row">
      <div class="item-list">
        <div class="header-row">
          <span class="name-header__span">Tên mặt hàng</span>
          <span class="price-header__span">Đơn giá</span>
          <span class="quantity-header__span">Số lượng</span>
          <span class="total-price-header__span">Thành tiền</span>
          <span class="remove-item-header__span">Xóa</span>
        </div>
        <div v-for="item of itemsList" class="item-detail-row">
          <img :src="item.image" class="image__img" alt="" />
          <div class="name-sku">
            <p class="item-name__p">{{ item.title }}</p>
          </div>
          <span class="price__span">${{ item.price }}</span>
          <Field
            name="quantity"
            type="number"
            class="quantity__input"
            min="1"
            v-model="item.quantity"
          />
          <span class="total-price-item__span"
            >${{ item.price * item.quantity }}</span
          >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="remove-item__svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            v-on:click="onDeleteItem(item._id)"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>
      </div>
      <div class="checkout-section">
        <div class="checkout-row checkout-row--address">
          <CartAddress
            @on-address-change="(address) => onAddressChange(address)"
            @on-add-new-address="onAddNewAddress()"
          />
          <CartAddressAddModal :is-modal-visible="isModalVisible" />
        </div>
        <div class="checkout-row">
          <span class="checkout-title__span">Thanh toán</span>
          <div class="total-price">
            <span class="total-price-title__span">Thành tiền: </span>
            <span class="total-price__span">${{ totalPrice }}</span>
          </div>
          <button class="checkout__button" v-on:click="onCheckout()">
            <span>Thanh toán</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <div v-else>Loading...</div>
</template>
<script setup>
import { notification } from "ant-design-vue";
import { Field } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import CartAddress from "../components/cart/CartAddress.vue";
import CartAddressAddModal from "../components/cart/CartAddressAddModal.vue";
import userService from "../services/user.service";
import { userStore } from "../stores/store";

const itemsList = ref({});
const totalPrice = ref(0);
const accessToken = localStorage.getItem("accessToken");
const selectedAddress = ref({});
const isModalVisible = ref(false);

watch(
  () => userStore.userProfile,
  () => {
    if (userStore.userProfile) {
      itemsList.value = userStore?.userProfile?.cart;
      itemsList.value.forEach((item) => {
        totalPrice.value = totalPrice.value + item.price * item.quantity;
      });
    }
  }
);

watch(
  () => userStore?.userProfile?.cart,
  () => {
    if (userStore?.userProfile?.cart) {
      itemsList.value = userStore?.userProfile?.cart;
      itemsList.value.forEach((item) => {
        totalPrice.value = totalPrice.value + item.price * item.quantity;
      });
    }
  }
);

onMounted(() => {
  if (userStore.userProfile) {
    itemsList.value = userStore?.userProfile?.cart;
    itemsList.value.forEach((item) => {
      totalPrice.value = totalPrice.value + item.price * item.quantity;
    });
  }
});

async function onDeleteItem(id) {
  if (accessToken) {
    await userService.deleteItemInCart(accessToken, id);
    const cartData = await userService.getCart(accessToken);
    userStore.userProfile.cart = cartData.data.data;
    notification.success({ message: "Xóa khỏi giỏ hàng thành công !" });
  }
}

function onAddressChange(address) {
  selectedAddress.value = address;
}

function onAddNewAddress() {
  isModalVisible.value = !isModalVisible.value;
}

function onCheckout() {
  const checkoutDetails = {
    orderStatus: "pending",
    currency: "USD",
    items: itemsList.value,
    address: selectedAddress.value,
    paymentStatus: "paid",
    totalPrice: totalPrice.value,
  };

  userService.checkout(accessToken, checkoutDetails).then(async (result) => {
    notification.success({ message: "Thanh toán thành công !" });
    await userService.clearCart(accessToken, userStore.userProfile._id);
    window.location.href = "/";
  });
}
</script>
<style lang="scss" scoped>
@import "../assets/cart.sass";
</style>
