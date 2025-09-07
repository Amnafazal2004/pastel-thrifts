import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors"

const port = 3000;
const app = express();
const server = createServer(app)
let userSockets = {}

const io = new Server(server, {
    cors: {
        origin: "*", //frontend ka url , agar saarey orgins per allow kerna to "*" aesay likheingy
        methods: ["GET", "POST"],
        credentials: true,
    }
})
app.get("/", (req, res) => {
    res.send("hello world")
})
io.on("connection", (socket) => {
    
    console.log("user connected", socket.id);

    socket.on("userId-login", (userId) => {
       // Remove old socket ID for this user if it exists
    for (const [existingUserId, existingSocketId] of Object.entries(userSockets)) {
        if (existingUserId === userId && existingSocketId !== socket.id) {
            delete userSockets[existingUserId];
            console.log(`Removed old socket for user ${userId}`);
            break;
        }
    }
    
    // Add new socket ID
    userSockets[userId] = socket.id;
    console.log(userSockets);
    })

    socket.on("trade-chatroom", (chatroom, userId, recieverId, productId) => {
        const participants = [userId, recieverId];

        participants.forEach(participantsId => {
            console.log("here 3")
            // Find their socket and put them in the room
            if (userSockets[participantsId]) {
                console.log("here")
                const socketId = userSockets[participantsId];
                console.log("here 2", socketId)
                 
                //load all the sockets that exist in all sockets just to check
                  const allSockets = io.sockets.sockets;
            console.log(`Socket exists in io.sockets.sockets:`, allSockets.has(socketId));

                 //get the socketid for the person that logged in right now
                const participantSocket = io.sockets.sockets.get(socketId);


                //if they have a socket then put them in the room
                if (participantSocket) {
                    console.log("here 4")
                participantSocket.join(chatroom);
                console.log(`User ${participantsId} successfully joined room: ${chatroom}`);
            }  
            }
        })
         console.log(`Created chat: ${chatroom}`);

    })
    socket.on("message", (message,chatRoom)=>{
        console.log(message);
        console.log(chatRoom);
        io.to(chatRoom).emit("recieve",{
            text: message.text,
            sender: message.sender
        })
    })
     socket.on("disconnect", () => {
        console.log("disconnected")
         for (const [userId, socketId] of Object.entries(userSockets)) {
        if (socketId === socket.id) {
            delete userSockets[userId];
            console.log(`Removed ${userId} from userSockets`);
            break;
        }
    }
        
    })

})

server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})
