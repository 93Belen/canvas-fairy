<script setup>
import QRcode from '../components/QRcode.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div id="download-div">
    <div id="home-button">
      <p @click="goHome">Home</p>
    </div>
      <h2>Download your video by scanning the QR Code!</h2>
      <QRcode/>
  </div>
</template>

<style scoped>
#download-div{
  padding: 100px;
  color: white;
}

#home-button {
  position: absolute;
  right: -50px;
  top: 40vh;
  background: #80afb3;
  height: 100px;
  width: 100px;
  display: flex;
  justify-content: left;
  align-items: center;
  border-radius: 100% 0% 0% 100%;
  animation: parpadea 3s ease-in-out infinite;
}
#home-button p {
  transform: rotate(-90deg);
  font-size: 17px;
  padding-top: 12px;
  color: white;
}

@keyframes parpadea {
  0% {
    background-color: hsla(185, 25%, 60%, 0.75); /* Start with full opacity */
  }
  50% {
    background-color: hsla(185, 25%, 60%, 0.4); /* Transparent */
  }
  100% {
    background-color: hsla(185, 25%, 60%, 0.75); /* End with full opacity */
  }
}


</style>
