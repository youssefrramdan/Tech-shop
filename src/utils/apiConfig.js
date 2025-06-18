const BASE_URL =
  "https://tech-shop-api-e0bd81e562d4.herokuapp.com" || "http://localhost:8000";

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/v1/auth/signup`,
  LOGIN: `${BASE_URL}/api/v1/auth/login`,
  FORGOT_PASSWORD: `${BASE_URL}/api/v1/auth/forgot-password`,
  VERIFY_RESET_CODE: `${BASE_URL}/api/v1/auth/verify-reset-code`,
  RESET_PASSWORD: `${BASE_URL}/api/v1/auth/reset-password`,
  LOGOUT: `${BASE_URL}/api/v1/auth/logout`,
};

// Products Endpoints
export const PRODUCTS_ENDPOINTS = {
  GET_ALL_PRODUCTS: `${BASE_URL}/api/v1/products`,
  GET_PRODUCT_DETAILS: (id) => `${BASE_URL}/api/v1/products/${id}`,
  GET_CATEGORIES: `${BASE_URL}/api/v1/categories`,
  GET_SUBCATEGORIES: `${BASE_URL}/api/v1/subcategories`,
  GET_BRANDS: `${BASE_URL}/api/v1/brand`,
};

// Cart Endpoints
export const CART_ENDPOINTS = {
  GET_CART: `${BASE_URL}/api/v1/cart`,
  ADD_TO_CART: `${BASE_URL}/api/v1/cart`,
  UPDATE_CART_QUANTITY: (id) => `${BASE_URL}/api/v1/cart/${id}`,
  DELETE_FROM_CART: (id) => `${BASE_URL}/api/v1/cart/${id}`,
  CLEAR_CART: `${BASE_URL}/api/v1/cart`,
};

// Wishlist Endpoints
export const WISHLIST_ENDPOINTS = {
  GET_WISHLIST: `${BASE_URL}/api/v1/wishlist`,
  ADD_TO_WISHLIST: `${BASE_URL}/api/v1/wishlist`,
  REMOVE_FROM_WISHLIST: (id) => `${BASE_URL}/api/v1/wishlist/${id}`,
};

// Orders Endpoints
export const ORDERS_ENDPOINTS = {
  CREATE_CASH_ORDER: (cartId) => `${BASE_URL}/api/v1/orders/${cartId}`,
  CREATE_CARD_ORDER: (cartId) =>
    `${BASE_URL}/api/v1/orders/checkout-session/${cartId}`,
  GET_USER_ORDERS: `${BASE_URL}/api/v1/orders/user`,
};

// User Profile Endpoints
export const USER_ENDPOINTS = {
  UPDATE_USER_DATA: `${BASE_URL}/api/v1/users/updateMe`,
  UPDATE_USER_PASSWORD: `${BASE_URL}/api/v1/users/changeMyPassword`,
  GET_USER_PROFILE: `${BASE_URL}/api/v1/users/me`,
};

async function getUserData() {
  console.log("getUserData CALLED");
  // ... باقي الكود
}
