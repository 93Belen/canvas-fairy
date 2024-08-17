import { io } from 'socket.io-client'

const serverUrl = import.meta.env.VITE_APP_SOCKET_IO_SERVER_URL;
export const socket = io(serverUrl, {
     transports: ['websocket'],
    pingInterval: 10000,  // 10 seconds, adjust as needed
    pingTimeout: 5000      // 5 seconds, adjust as needed
}) 
socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id); // Socket ID is logged
});