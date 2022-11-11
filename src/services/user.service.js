import axios from "axios";

class UserService {
  URL = "https://tmdt-be-ygps.vercel.app";
  userApi = {
    categories: "/categories",
    product: "/product",
    userLogin: "/auth/login",
    userForgotPassword: "/auth/forgot-password",
    userRegister: "/auth/register",
    userProfile: "/profile",
    userCart: "/cart",
    userPaymentMethod: "/users/me/payment-methods",
    userAddresses: "/users/me/addresses",
  };

  getProducts(title = null) {
    return axios.get(
      this.URL +
        this.userApi.product +
        `?page=1&limit=10${title ? `&title=${title}` : ""}`
    );
  }

  getProductDetails(productId) {
    return axios.get(this.URL + this.userApi.product + "/" + productId);
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

  getCart(token) {
    return axios.get(this.URL + this.userApi.userCart, {
      headers: { Authorization: "Bearer " + token },
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

export default new UserService();
