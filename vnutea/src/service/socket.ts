import { BASE_URL_IO } from "@/context/config";
import { io } from "socket.io-client";

export const socket = io(BASE_URL_IO!, {
    reconnectionDelayMax: 10000,
    withCredentials: true,
    autoConnect: false
});