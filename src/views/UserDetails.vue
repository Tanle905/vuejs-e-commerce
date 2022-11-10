<template>
  <section v-if="userStore.userProfile" class="profile">
    <span class="profile-title">Thông tin tài khoản</span>
    <Form class="profile__form" :on-submit="(data) => submitProfile(data)">
      <div>
        <label>Username:</label>
        <Field
          class="input"
          required
          type="text"
          name="username"
          v-model="profile.username"
        />
      </div>
      <div>
        <label>Email:</label>
        <Field
          class="input"
          required
          type="text"
          name="email"
          v-model="profile.email"
        />
      </div>
      <div>
        <label>SDT:</label>
        <Field
          class="input"
          name="phoneNumber"
          type="text"
          v-model="profile.phoneNumber"
        />
      </div>
      <div class="form__button">
        <button type="submit">Cập nhật</button>
      </div>
    </Form>
  </section>
  <div v-else>Loading...</div>
</template>

<script setup>
import { Form, Field } from "vee-validate";
import UserService from "@/services/user.service";
import { userStore } from "../stores/store";
import { onMounted, ref, watch } from "vue";

const profile = ref({});

watch(
  () => userStore.userProfile,
  () => {
    if (userStore.userProfile) {
      profile.value = userStore.userProfile;
    }
  }
);

onMounted(() => {
  if (userStore.userProfile) {
    profile.value = userStore.userProfile;
  }
});

async function submitProfile(payload) {
  const data = isLoginMode
    ? await UserService.auth(payload)
    : await UserService.register(payload);
  if (data) {
    localStorage.setItem("accessToken", data.data.accessToken);
    userStore.setUserProfile(data.data);
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/userDetails.sass";
</style>
