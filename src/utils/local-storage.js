const ACCESS_TOKEN = "ACCESS_TOKEN";
const ACCESS_TOKEN_ADMIN = "ACCESS_TOKEN_ADMIN";

const STORE_ID = "STORE_ID";
const NUMBER_VOUCHER = "NUMBER_VOUCHER";

// localStorage.setItem('user', token)
// localStorage.setItem('user', token)
// localStorage.setItem(ACCESS_TOKEN, token)

//setAccessToken()

export const setAccessToken = (token) =>
  localStorage.setItem(ACCESS_TOKEN, token);
// localStorage.setItem('user', token)

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

// getAccessToken()

export const removeAccessToken = () => localStorage.removeItem(ACCESS_TOKEN);

export const setAccessTokenAdmin = (token) =>
  localStorage.setItem(ACCESS_TOKEN_ADMIN, token);

export const getAccessTokenAdmin = () =>
  localStorage.getItem(ACCESS_TOKEN_ADMIN);

export const removeAccessTokenAdmin = () =>
  localStorage.removeItem(ACCESS_TOKEN_ADMIN);

//storeId
export const setAccessStoreId = (storeId) =>
  localStorage.setItem(STORE_ID, storeId);

export const getAccessStoreId = () => localStorage.getItem(STORE_ID);

//voucherId
export const setAccessVoucherId = (numberVoucher) =>
  localStorage.setItem(NUMBER_VOUCHER, numberVoucher);

export const getAccessVoucherId = () => localStorage.getItem(NUMBER_VOUCHER);
