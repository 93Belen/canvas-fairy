<script setup>
// import { io } from 'socket.io-client'
import { watch } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import { socket }from '../socket'

// const serverUrl = import.meta.env.VITE_APP_SOCKET_IO_SERVER_URL;
// const socket = io(serverUrl) 
// socket.on('connect', () => {
//     console.log('Connected to the Socket.IO server:', socket.id); // Socket ID is logged
// });

socket.on('videoUrl', (url) => {
console.log(url)
})


watch(() => store.videoBlob, (newBlob) => {
    if(newBlob){
        const reader = new FileReader();
        reader.readAsArrayBuffer(newBlob); // Read the Blob as an ArrayBuffer
        reader.onloadend = () => {
        const arrayBuffer = reader.result; // Get the ArrayBuffer
        socket.emit('sendVideoBlob', arrayBuffer); // Send the ArrayBuffer to the server
        }
    }
})


</script>

<template>
    
</template>


<style scoped>

</style>