import axios from "axios";

class UserService {
  URL = "https://phongvu-api.herokuapp.com/api/v1";
  userApi = {
    categories: "/categories",
    products: "/products",
    userLogin: "/auth/login",
    userForgotPassword: "/auth/forgot-password",
    userRegister: "/auth/register",
    userProfile: "/users/me/profile",
    userPaymentMethod: "/users/me/payment-methods",
    userAddresses: "/users/me/addresses",
  };

  getProducts() {
    return axios.get(
      this.URL +
        this.userApi.products +
        "?page=1&limit=10&search=&sort[createdAt]=asc"
    );
  }

  getProductDetails(productId) {
    return axios.get(this.URL + this.userApi.products + "/" + productId);
  }

  getOwnProfile(token) {
    return axios.get(this.URL + this.userApi.userProfile, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  updateOwnProfile(token, params) {
    return axios.put(this.URL + this.userApi.userProfile, params, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  auth(params) {
    return axios.post(this.URL + this.userApi.userLogin, params);
  }

  forgotPassword(params) {
    return axios.post(this.URL + this.userApi.userForgotPassword, params);
  }

  register(params) {
    return axios.post(this.URL + this.userApi.userRegister, params, {
      headers: { "Content-Type": "application/x-www-form-this.URLencoded" },
    });
  }

  getPaymentMethod(token) {
    return axios.get(this.URL + this.userApi.userPaymentMethod, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  createPaymentMethod(token) {
    return axios.post(
      this.URL + this.userApi.userPaymentMethod,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }

  getAddress(token) {
    return axios.get(this.URL + this.userApi.userAddresses, {
      headers: { Authorization: "Bearer " + token },
    });
  }
}

export default new UserService;
