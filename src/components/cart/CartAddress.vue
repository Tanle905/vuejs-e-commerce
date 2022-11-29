<template>
  <div class="address-list">
    <div
      v-for="address of addressList"
      v-on:click="onSelected(address)"
      class="address"
      :class="selectedAddressId === address._id ? 'address--active' : ''"
    >
      <span class="full-name__span">{{ address.fullName }}</span>
      <span class="phone__span">{{ address.phoneNumber }}</span>
      <span class="address__span">{{ address.address }}</span>
    </div>
    <div class="address address--add">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
      <span>Thêm địa chỉ</span>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { userStore } from "../../stores/store";

const addressList = ref({});
const selectedAddress = ref({});
const selectedAddressId = ref();
const emit = defineEmits(["onAddressChange"]);

watch(
  () => userStore.userProfile,
  () => {
    if (userStore.userProfile) {
      addressList.value = userStore?.userProfile?.address;
    }
  }
);

onMounted(() => {
  if (userStore.userProfile) {
    addressList.value = userStore?.userProfile?.address;
    selectedAddress.value = addressList.value[0];
  selectedAddressId.value = addressList.value[0]._id;
  }
});

function onSelected(address) {
  selectedAddress.value = address;
  selectedAddressId.value = address._id;
  emit("onAddressChange", selectedAddress.value);
}
</script>
<style lang="scss" scoped>
@import "../../assets/cartAddress.sass";
</style>
