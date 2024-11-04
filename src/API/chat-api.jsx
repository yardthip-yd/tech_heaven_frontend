import axios from "../config/axios";

const chatApi = {};

chatApi.getChat = async () => await axios.get("/chat/getchat");
chatApi.getAllChat = async () => await axios.get("/chat/getallchat");
chatApi.getChatById = async (id) => await axios.get(`/chat/getchat/${id}`);

export default chatApi;
