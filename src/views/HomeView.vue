<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToVideo = () =>{
router.push('/video')
}
</script>

<template>
  <div id="home-div">
    <h1>Bubble Bath</h1>
    <div id="video-button">
        <p @click="goToVideo" >Start</p>
    </div>
  </div>
</template>

<style scoped>
#home-div{
  padding: 100px;
  color: white;
}

#video-button {
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
#video-button p {
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
