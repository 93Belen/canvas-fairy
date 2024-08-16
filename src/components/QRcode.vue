<script setup>
import { watch, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import QRCode from 'qrcode';


const qrCodeUrl = ref('http://192.168.86.48:3000/download/recordedvideo1723839510844.mp4');


        QRCode.toDataURL(qrCodeUrl.value, { 
            width: 300,
            color: {
                dark: '#FFD700', // Dark color for the QR code
                light: '#80afb3' // Light color for the background
                }

            }, (err, url) => {
        if (err) console.error(err);
        qrCodeUrl.value = url;
        });



// watch(() => store.videoUrl, (newUrl) => {
//     if(newUrl){
//         console.log(newUrl)
//         const encodedUrl = encodeURI(newUrl);
//         QRCode.toDataURL(encodedUrl, { width: 200 }, (err, url) => {
//         if (err) console.error(err);
//         qrCodeUrl.value = url;
//         });

//     }
// })


</script>

<template>
    <div id="qrcode">
    <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" />
  </div>
</template>


<style scoped>
#qrcode img{
    border-radius: 50px;
}
</style>