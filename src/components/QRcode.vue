<script setup>
import { watch, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import { socket } from '../socket'
import QRCode from 'qrcode';

socket.on('videoUrl', (url) => {
store.updateVideoUrl(url)
})

const qrCodeUrl = ref('');

watch(() => store.videoUrl, (newUrl) => {
    if(newUrl){
        console.log(newUrl)
         // Generate QR code and set the URL
        QRCode.toDataURL(newUrl, { width: 200 }, (err, url) => {
        if (err) console.error(err);
        qrCodeUrl.value = url; // Set the generated QR code image URL
        });
    }
})


</script>

<template>
    <div id="qrcode">
    <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" />
  </div>
</template>


<style scoped>
#qrcode {
    position: absolute;
    left: 50vw;
    top: 10vh;
    z-index: 9999999;
}
</style>