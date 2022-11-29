import axios from "axios";

class UserService {
  URL = "https://tmdt-be-ygps.vercel.app";
  userApi = {
    product: "/product",
    banner: "/banner",
    userLogin: "/auth/login",
    userRegister: "/auth/register",
    userProfile: "/profile",
    userCart: "/cart",
  };

  getProducts(title = null, page = 1, pageSize = 10) {
    return axios.get(
      this.URL +
        this.userApi.product +
        `?page=${page}&pageSize=${pageSize}${title ? `&title=${title}` : ""}`
    );
  }

  getProductDetails(productId) {
    return axios.get(this.URL + this.userApi.product + "/" + productId);
  }

  getBanners() {
    return axios.get(this.URL + this.userApi.banner);
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

  // register(params) {
  //   return axios.post(this.URL + this.userApi.userRegister, params, {
  //     headers: { "Content-Type": "application/x-www-form-this.URLencoded" },
  //   });
  // }

  getCart(token) {
    return axios.get(this.URL + this.userApi.userCart, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  addItemToCart(token, id) {
    return axios.post(
      this.URL + this.userApi.userCart,
      { data: [{ productId: id, quantity: 1 }] },
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  }

  deleteItemInCart(token, id) {
    return axios.delete(this.URL + this.userApi.userCart, {
      headers: { Authorization: "Bearer " + token },
      data: { data: [{ productId: id }] },
    });
  }

  clearCart(token, userId) {
    return axios.delete(this.URL + this.userApi.userCart + "/" + userId, {
      headers: { Authorization: "Bearer " + token },
    });
  }

  checkout(token, checkoutDetails) {
    return axios.put(
      this.URL + this.userApi.userProfile,
      {
        order: checkoutDetails,
      },
      { headers: { Authorization: "Bearer " + token } }
    );
  }
}

export default new UserService();
