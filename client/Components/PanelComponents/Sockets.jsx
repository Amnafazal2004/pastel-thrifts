
import { io } from 'socket.io-client'

let socket = null;
let connectionCount = 0;
let isConnecting = false; // Prevent concurrent connections

const getSocket = () => {
  if (!socket || socket.disconnected) {
    if (isConnecting) {
      console.log('Socket connection already in progress, waiting...');
      return socket; // Return existing socket even if connecting
    }
    
    isConnecting = true;
    connectionCount++;
    console.log(`Creating socket connection #${connectionCount}`);
    console.trace('Socket creation stack trace');
    
    socket = io("http://localhost:3000", {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      forceNew: false
    });

    // Reset connecting flag when connection is established or fails
    socket.on('connect', () => {
      isConnecting = false;
      console.log('Socket connected:', socket.id);
    });

    socket.on('connect_error', () => {
      isConnecting = false;
      console.log('Socket connection failed');
    });
  }
  return socket;
}

export const userIdSocket = (userId) => {
  const currentSocket = getSocket();
  if (currentSocket && userId) {
    currentSocket.emit("userId-login", userId);
  }
}
  
export const tradechatRoom = (chatRoom, userId, recieverId, productId) => {
    getSocket().emit("trade-chatroom", chatRoom, userId, recieverId, productId)
}

export const messageSocket = (message,chatRoom) =>{
  getSocket().emit("message",message,chatRoom)
}

//return doesnot work in sockets instead callbacks work
export const recievemessage = (callbacks) => {

    // Remove any existing listeners for this event
  getSocket().off("recieve");

   getSocket().on("recieve", (msg) => {
      console.log(msg)
      callbacks(msg)
    })
}

