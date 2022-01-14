import io from "socket.io-client";

const loc = window.location;
const url = "http://localhost:3001" + loc.pathname;
const socket = io.connect(url, { transports: ['websocket'] })

export default socket;