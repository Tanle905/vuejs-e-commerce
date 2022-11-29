<template>
  <Modal
    :visible="isModalVisible"
    :closable="true"
    @cancel="onModalCancel"
    @ok="onSubmit"
    title="Thêm địa chỉ"
  >
    <Form :on-submit="(data) => submitProfile(data)">
      <div>
        <label>Họ Tên:</label>
        <Field
          class="input"
          required
          type="text"
          name="fullName"
          v-model="address.fullName"
        />
      </div>
      <div>
        <label>SĐT:</label>
        <Field
          class="input"
          required
          type="number"
          name="phoneNumber"
          v-model="address.phoneNumber"
        />
      </div>
      <div>
        <label>Địa chỉ:</label>
        <Field
          class="input"
          name="address"
          type="text"
          v-model="address.address"
        />
      </div>
      <div>
        <label>Thành phố:</label>

        <Select
          :options="citiesData"
          class="input__select"
          v-model:value="address.city"
        />
      </div>
    </Form>
  </Modal>
</template>
<script setup>
import { Modal, Select } from "ant-design-vue";
import { Field, Form } from "vee-validate";
import { onMounted, ref, watch } from "vue";
import userService from "../../services/user.service";

const props = defineProps({ isModalVisible: { required: true } });
const accessToken = localStorage.getItem("accessToken");
const isModalVisible = ref(props.isModalVisible);
const citiesData = ref([]);
const address = ref({});

onMounted(() => {
  userService.fetchCity().then((result) => {
    result.data.forEach((city) =>
      citiesData.value.push({ value: city.name, label: city.name })
    );
  });
});

watch(
  () => props.isModalVisible,
  () => {
    isModalVisible.value = props.isModalVisible;
  }
);

function onModalCancel() {
  isModalVisible.value = false;
  console.log(isModalVisible.value);
}

function onSubmit() {
  userService
    .addUserAddress(accessToken, address.value)
    .then((result) => window.location.reload());
}
</script>
<style lang="scss">
@import "../../assets/addressAdd.sass";
</style>
