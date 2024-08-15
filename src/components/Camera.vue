<script setup>
import { onMounted, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()

let video;
let recording = ref(false)
let mediaRecorder;
let videoChucks = []

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


      //  Record video
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (event) => {
        if(event.data.size > 0){
          videoChucks.push(event.data)
        }
      }
      // Add video blob to Pinia
      mediaRecorder.onstop = () => {
        const blob = new Blob(videoChucks, { type: 'video/webm' })
        store.setVideoBlob(blob)
        videoChucks = []
      }
      
    })
  }


})

window.addEventListener('resize', () => {
    video.width = window.innerWidth
    video.height = window.innerHeight
})

// Start and Stop Recording
const record = () => {
  if(recording.value){
    mediaRecorder.stop()
    recording.value = false
  }
  else {
    store.clearVideoBlob()
    mediaRecorder.start()
    recording.value = true
  }
}




</script>

<template>
    <video src="" id="video"></video>
    <button :style="recording ? 'background: red' : 'background: green' " @click="record">{{ recording ? 'Stop' : 'Record'}}</button>
</template>

<style scoped>
video {
    display: none;
}
button {
  position: absolute;
  bottom: 150px;
  left: 150px;
  width: 100px;
  height: 30px;
  border-radius: 50px;
  border: none;
  color: white;
}
</style>
