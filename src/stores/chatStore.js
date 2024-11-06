import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const chatStore = (set, get) => ({
  // chatId: null,
  // setChatId: (chatId) => {
  //   set({ chatId });
  // },
  // adminActiveChat: null,
  // setAdminActiveChat: (adminActiveChat) => {
  //   set({ adminActiveChat });
  // },
  // chatNotify: [],
  // setChatNotify: (chatNotify) => {
  //   set({ chatNotify });
  // },
  // newChatNotify: null,
  // setNewChatNotify: (newChatNotify) => {
  //   set({ newChatNotify });
  // },
});
const userPersist = {
  name: "chat",
  storage: createJSONStorage(() => localStorage),
};

const useChatStore = create(chatStore);
// const useChatStore = create(persist(chatStore, userPersist));

export default useChatStore;
