const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

// Authentication Endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: `${BASE_URL}/api/auth/signup`,
  LOGIN: `${BASE_URL}/api/auth/login`,
  FORGOT_PASSWORD: `${BASE_URL}/api/auth/forgot-password`,
  VERIFY_RESET_CODE: `${BASE_URL}/api/auth/verify-reset-code`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/reset-password`,
  VERIFY_EMAIL: `${BASE_URL}/api/auth/verify`,
  RESEND_VERIFICATION: `${BASE_URL}/api/auth/resend-email`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,
};

// Products Endpoints
export const PRODUCTS_ENDPOINTS = {
  GET_ALL_PRODUCTS: `${BASE_URL}/api/products`,
  GET_PRODUCT_DETAILS: (id) => `${BASE_URL}/api/products/${id}`,
  GET_CATEGORIES: `${BASE_URL}/api/categories`,
  GET_BRANDS: `${BASE_URL}/api/v1/brands`,
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
  UPDATE_USER_DATA: `${BASE_URL}/api/users/updateMe`,
  UPDATE_USER_PASSWORD: `${BASE_URL}/api/users/changeMyPassword`,
  GET_USER_PROFILE: `${BASE_URL}/api/users/me`,
};

async function getUserData() {
  console.log("getUserData CALLED");
  // ... باقي الكود
}
