<script setup>
import { onMounted, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()

let video, canvas;
let recording = ref(false)
let mediaRecorder;
let videoChucks = []
let timeOut = ref(5)

onMounted(() => {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas")

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
      const videoStream = canvas.captureStream(30)
      mediaRecorder = new MediaRecorder(videoStream)
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
      store.clearVideoBlob()
      mediaRecorder.stop()
      recording.value = false
  }
  else {
    recording.value = true
    let interval = setInterval(() => {
        timeOut.value--
    }, 1000)
    setTimeout(() => {
      clearInterval(interval)
      timeOut.value = 5
      store.clearVideoBlob()
      mediaRecorder.start()
    }, 5000)
  }
  setTimeout(() => {
    clearInterval(interval)
    timeOut.value = 5
    store.clearVideoBlob()
    mediaRecorder.stop()
    recording.value = false
  }, 60000)
}




</script>

<template>
  <p v-if="timeOut !== 5">{{ timeOut }}</p>
  <video src="" id="video"></video>
  <button :class="recording ? 'recording' : 'not-recording'" @click="record">
    {{ recording ? '' : 'Record' }}
  </button>
</template>

<style scoped>
video {
  display: none;
}

button {
  position: absolute;
  bottom: 50px;
  left: 50px;
  height: 30px;
  border-radius: 50px;
  border: none;
  color: white;
  transition: width 0.3s ease;
}

button.recording {
  background: red;
  width: 30px;
  animation: parpadea 1s ease-in-out infinite;
}

button.not-recording {
  background: green;
  width: 100px;
}

p {
  position: absolute;
  font-size: 50px;
  color: black;
  left: 50vw;
}

@keyframes parpadea {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
