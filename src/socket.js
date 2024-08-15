import { io } from 'socket.io-client'

const serverUrl = import.meta.env.VITE_APP_SOCKET_IO_SERVER_URL;
export const socket = io(serverUrl) 
socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id); // Socket ID is logged
});