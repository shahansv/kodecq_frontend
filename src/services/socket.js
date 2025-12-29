import { io } from "socket.io-client";
import { baseURL } from "./baseURL";

const socket = io(baseURL);

export default socket;
