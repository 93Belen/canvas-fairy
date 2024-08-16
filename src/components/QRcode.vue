<script setup>
import { watch, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import QRCode from 'qrcode';


const qrCodeUrl = ref(null);


watch(() => store.videoUrl, (newUrl) => {
    if(newUrl){
        console.log(newUrl)
        const encodedUrl = encodeURI(newUrl);
        QRCode.toDataURL(encodedUrl, { 
            width: 300,
            color: {
                dark: '#FFD700', // Dark color for the QR code
                light: '#80afb3' // Light color for the background
                }

            }, (err, url) => {
        if (err) console.error(err);
        qrCodeUrl.value = url;
        });

    }
})


</script>

<template>
    <div v-if="!qrCodeUrl" id="svg-div">
        <svg xmlns="http://www.w3.org/2000/svg" width="200px" height="200px" viewBox="0 0 24 24">
            <path fill="#FFD700" d="M2,12A10.94,10.94,0,0,1,5,4.65c-.21-.19-.42-.36-.62-.55h0A11,11,0,0,0,12,23c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z">
                <animateTransform attributeName="transform" dur="0.84s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
            </path>
        </svg>
    </div>
    <div id="qrcode">
    <img v-if="qrCodeUrl" :src="qrCodeUrl" alt="QR Code" />
  </div>
</template>


<style scoped>
#qrcode img{
    border-radius: 50px;
}
#svg-div{
    padding: 50px;
}
</style>