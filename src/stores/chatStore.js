import { create } from "zustand";

const chatStore = (set, get) => ({
  chatId: null,
  setChatId: (chatId) => {
    set({ chatId });
  },
  adminActiveChat: null,
  setAdminActiveChat: (adminActiveChat) => {
    set({ adminActiveChat });
  },
});

const useChatStore = create(chatStore);

export default useChatStore;
