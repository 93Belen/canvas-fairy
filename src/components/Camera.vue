<script setup>
import { onMounted } from 'vue'

let video;

onMounted(() => {
  video = document.getElementById("video");

  video.width = window.innerWidth
  video.height = window.innerHeight


    //  Cam
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {
        width: window.innerWidth,
        height: window.innerHeight
    }
    }).then(function(stream) {
      video.srcObject = stream;
      video.play();
    })
  }


})

window.addEventListener('resize', () => {
    video.width = window.innerWidth
    video.height = window.innerHeight
})




</script>

<template>
    <video src="" id="video"></video>
</template>

<style scoped>
video {
    display: none;
}
</style>
