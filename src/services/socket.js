import { io } from "socket.io-client";
import { baseURL } from "./baseURL";

const socket = io(baseURL, {
  autoConnect: false,
});

export default socket;
