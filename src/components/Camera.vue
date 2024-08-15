<script setup>
import { onMounted, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()

let video;
let recording = ref(false)
let mediaRecorder;

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
          store.addChunk(event.data)
        }
      }



    })
  }


})

window.addEventListener('resize', () => {
    video.width = window.innerWidth
    video.height = window.innerHeight
})


const record = () => {
  if(store.recording){
    store.stopRecord()
  }
  else {
    store.record()
  }
}




</script>

<template>
    <video src="" id="video"></video>
    <button :style="store.recording ? 'background: red' : 'background: green' " @click="record">{{ store.recording ? 'Stop' : 'Record'}}</button>
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
