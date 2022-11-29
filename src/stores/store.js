import { reactive } from "vue";

export const userStore = reactive({
  userProfile: null,
  setUserProfile(userData) {
    this.userProfile = userData;
  },
});
