import axios from "../config/axios";

const chatApi = {};

chatApi.getChat = async () => await axios.get("/chat/getchat");
chatApi.getAllChat = async () => await axios.get("/chat/getallchat");
chatApi.getChatById = async (id) => await axios.get(`/chat/getchat/${id}`);
chatApi.getChatNotify = async () => await axios.get("/chat/getnotification");
chatApi.adminGetChatNotify = async () =>
  await axios.get("/chat/admingetnotification");

export default chatApi;
