import useAuthStore from "@/stores/authStore";

const ACCESS_TOKEN = "ACCESS_TOKEN";
const ACCESS_TOKEN_ADMIN = "ACCESS_TOKEN_ADMIN";

const STORE_ID = "STORE_ID";
const NUMBER_VOUCHER = "NUMBER_VOUCHER";

// localStorage.setItem('user', token)
// localStorage.setItem('user', token)
// localStorage.setItem(ACCESS_TOKEN, token)

//setAccessToken()

export const getAccessToken = () => {
  const token = useAuthStore((state) => state.token);
  console.log(token);
  return token;
};

// getAccessToken()

export const removeAccessToken = () => {
  const removeToken = useAuthStore((state) => state.removeToken);
  removeToken();
};

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

export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
}

export function getLocalStorage(key, initialValue) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}
