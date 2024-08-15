<script setup>
import { io } from 'socket.io-client'
const socket = io('ws://192.168.86.48:3000') 
socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id); // Socket ID is logged
  });

</script>

<template>
    
</template>


<style scoped>

</style>