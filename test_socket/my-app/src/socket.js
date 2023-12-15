import { io } from "socket.io-client";

const URL = "http://localhost:8000";
const socket = io(URL, {
    autoConnect: false, 
    query: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVHLhuqduIFR14bqlbiBOZ2jEqWEiLCJ1aWQiOiI2NTc5ZDI0NGQ3NWVkM2E2YmMwNGUwZDMiLCJpYXQiOjE3MDI1NDU4OTAsImV4cCI6MTcwMjU0OTQ5MH0.3EdshZ-pMNtCXWSAakQkp4fkEiBPZl4dQog0_i0S_2Q"
    }
});

socket.connect();
export default socket;