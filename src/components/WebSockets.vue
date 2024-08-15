<script setup>
import { io } from 'socket.io-client'
import { watch } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()

const serverUrl = import.meta.env.VITE_APP_SOCKET_IO_SERVER_URL;
const socket = io(serverUrl) 
socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id); // Socket ID is logged
});


watch(() => store.videoBlob, (n) => {
  socket.emit('sendVideoBlob', 'holi')
})


</script>

<template>
    
</template>


<style scoped>

</style>