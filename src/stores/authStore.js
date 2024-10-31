import axios from "axios";
import { create } from "zustand";
import { loginGoogle } from "@/api/auth-api";
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            actionRegister: async (input) => {
                // get input from outside

                const result = await axios.post(
                    "http://localhost:8000/register",
                    input
                );
                // console.log("Register in Zustand", result.data.message)
            },
            actionLogin: async (input) => {
                // get input from outside

                const result = await axios.post(
                    "http://localhost:8000/login",
                    input
                );
                // console.log("Login in Zustand", result.data)

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
            actionLoginGoogle : async (codeResponse) => {
                const res = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${codeResponse.access_token}`,
                  {
                    headers: {
                      Authorization: `Bearer ${codeResponse.access_token}`,
                    },
                  }
                )
                const result = await loginGoogle(res.data)
                console.log(result, "Check result")
                set({
                  user: result.data.payload,
                  token: result.data.token,
                });
                return result
              }
        }),
        // data will store in local storage
        {
            name: "state",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useAuthStore;