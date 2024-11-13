import authApi from "@/API/auth-api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "../config/axios";
const authStore = (set, get) => ({
 token : null,
  user: null,
  actionRegister: async (input) => {
    // get input from outside
    try {
      const result = await authApi.register(input);
      console.log("Register in Zustand", result.data.message);
    } catch (error) {
      console.log(error);
    }
  },
  actionLogin: async (input) => {
    // get input from outside

    const result = await authApi.login(input);
    
    console.log("Login in Zustand", result.data)

    set({
      token: result.data.token,
      user: result.data.user,
    });

    return result.data;
  },
  actionLogout: () => {
    localStorage.clear();
    set({
      token: null,
      user: null,
    });
  },
  getCurrentUser: async () => {
    try {
      const result = await authApi.getMe();
      set({
        user: result.data.user,
      });
      return result.data.user;
    } catch (error) {
      console.log(error);
    }
  },
  actionLoginGoogle: async (codeResponse) => {
    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${codeResponse.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${codeResponse.access_token}`,
        },
      }
    );
    const result = await authApi.loginGoogle(res.data);
    console.log(result, "Check result");
    set({
      user: result.data.payload,
      token: result.data.token,
    });
    return result;
  },
  actionSendResetPassLink: async (body) => {
    try {
      
    console.log("Sending reset link to email:", body); 
  

    const response = await authApi.forgotPassword(body);
    

    console.log("Response from sending reset link:", response.data);

    return response.data;
    } catch (err) {
      console.log(err)
    }

},
actionResetPassword : async (body) => {
  try {
    const response = await authApi.resetPassword(body)
    console.log(response.data)
    return response.data
  } catch (err) {
    console.log(err)
  }
}
  ,
  removeToken: () => {
    set({ token: null });
  },
  actionUpdateUser: async (input) => {
    try {
      const response = await authApi.updateUser(input);
      set({ user: response.data.user });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
});

const userPersist = {
  name: "accessToken",
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ token: state.token }),
};

const useAuthStore = create(persist(authStore, userPersist));

export default useAuthStore;
