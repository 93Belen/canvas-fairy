<script setup>
import { watch } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import { socket }from '../socket'

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