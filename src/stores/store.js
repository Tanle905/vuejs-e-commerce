import { reactive } from "vue";

export const userStore = reactive({
  userProfile: null,
  getUserProfile() {
    return this.userProfile;
  },
  setUserProfile(userData) {
    this.userProfile = userData;
  },
});
