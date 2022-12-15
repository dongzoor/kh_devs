import axios from "axios";


const ChatApi = {
  chatRoomOpen: async function (name) {
    const chatObject = {
      "name": name
    }
    return await axios.post("/chat", chatObject);
  },

};
export default ChatApi;