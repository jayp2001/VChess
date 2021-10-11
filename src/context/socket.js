import socketio from "socket.io-client";

import { createContext } from "react";

const SOCKET_URL = "https://chess-server-react.herokuapp.com/";
// const SOCKET_URL = "http://localhost:8000";
// const SOCKET_URL = "https://chess-server-react.herokuapp.com/";

export const socket = socketio.connect(SOCKET_URL);
export const SocketContext = createContext();
