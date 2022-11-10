<template>
  <section class="auth">
    <span class="auth-title">{{ isLoginMode ? "Đăng Nhập" : "Đăng ký" }}</span>
    <Form class="auth__form" :on-submit="(data) => submitAuth(data)">
      <div>
        <label>Username:</label>
        <Field class="form__input" name="username" v-model="auth.username" />
      </div>
      <div v-if="!isLoginMode">
        <label>Email:</label>
        <Field
          class="form__input"
          name="email"
          v-model="auth.email"
          type="email"
        />
      </div>
      <div>
        <label>Mật khẩu:</label>
        <Field
          class="form__input"
          name="password"
          type="password"
          v-model="auth.password"
        />
      </div>
      <div class="form__button">
        <button type="submit">
          {{ isLoginMode ? "Đăng nhập" : "Đăng ký" }}
        </button>
      </div>
    </Form>
    <span class="mode-switch"
      >{{ isLoginMode ? "Không có tài khoản ? " : "Đã có tài khoản ? "
      }}<a class="hover--underline" v-on:click="onSwitchMode()">{{
        isLoginMode ? "Đăng ký" : "Đăng nhập"
      }}</a></span
    >
  </section>
</template>
<script setup>
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import UserService from "@/services/user.service";
import { userStore } from "../stores/store";
import router from "../router";

const auth = ref({});
const isLoginMode = ref(true);

function onSwitchMode() {
  isLoginMode.value = !isLoginMode.value;
}

async function submitAuth(payload) {
  const data = isLoginMode
    ? await UserService.auth(payload)
    : await UserService.register(payload);
  if (data) {
    localStorage.setItem("accessToken", data.data.accessToken);
    userStore.setUserProfile(data.data);
    window.location.href = "/";
  }
}
</script>
<style lang="scss" scoped>
@import "../assets/auth.sass";
</style>
