import authApi from "@/API/auth-api";
import { create } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const authStore = (set, get) => ({
  token: null,
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
    } catch (error) {
      console.log(error);
    }
  },
});

const userPersist = {
  name: "state",
  storage: createJSONStorage(() => localStorage),
};

const useAuthStore = create(persist(authStore, userPersist));

// const useAuthStore = create(
//   persist(
//     (set) => ({
//       token: null,
//       user: null,
//       actionRegister: async (input) => {
//         // get input from outside
//         try {
//           const result = await axios.post(
//             "http://localhost:8000/auth/register",
//             input
//           );
//           console.log("Register in Zustand", result.data.message);
//         } catch (error) {
//           console.log(error);
//         }
//       },
//       actionLogin: async (input) => {
//         // get input from outside

//         const result = await axios.post(
//           "http://localhost:8000/auth/login",
//           input
//         );
//         // console.log("Login in Zustand", result.data)

//         set({
//           token: result.data.token,
//           user: result.data.user,
//         });

//         return result.data;
//       },
//       actionLogout: () => {
//         localStorage.clear();
//         set({
//           token: null,
//           user: null,
//         });
//       },
//     }),
//     // data will store in local storage
//     {
//       name: "state",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

export default useAuthStore;
