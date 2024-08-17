<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useRecordingStore()

let video, canvas;
let recording = ref(false)
let mediaRecorder;
let videoChucks = []
let timeOut = ref(6)
let tooLongOpenTimer;

onMounted(() => {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas")

  video.width = window.innerWidth
  video.height = window.innerHeight


    //  Cam
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ 
      video: {
        width: window.innerWidth,
        height: window.innerHeight
    }
    }).then(function(stream) {
      video.srcObject = stream;
      video.play();

    let mimeType = 'video/webm'; // Fallback MIME type
      if (MediaRecorder.isTypeSupported('video/webm; codecs=vp8,opus')) {
        mimeType = 'video/webm; codecs=vp8,opus';
      } else if (MediaRecorder.isTypeSupported('video/mp4; codecs=avc1.42E01E,mp4a.40.2')) {
        mimeType = 'video/mp4; codecs=avc1.42E01E,mp4a.40.2';
      } else {
        console.error('No supported MIME type found.');
        return;
      }


      //  Record video
      let options = {
        // mimeType: 'video/mp4; codecs="avc1.4d002a, mp4a.40.2"'
        // mimeType: 'video/mp4; codecs="avc1.424028, mp4a.40.2"'
        //  mimeType: 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',
        mimeType: mimeType
      }
      console.log(mimeType)
      const videoStream = canvas.captureStream(30)
      mediaRecorder = new MediaRecorder(videoStream, options)
      mediaRecorder.ondataavailable = (event) => {
        if(event.data.size > 0){
          videoChucks.push(event.data)
        }
      }
      // Add video blob to Pinia
      mediaRecorder.onstop = () => {
        const blob = new Blob(videoChucks, options)
        store.setVideoBlob({blob, mimeType})
        videoChucks = []
      }
      
    })
  }

 

})

window.addEventListener('resize', () => {
    video.width = window.innerWidth
    video.height = window.innerHeight
})

let interval;
let timeOutStart;
let timeOutStop;

const cancel = () => {
  router.push('/')
}

// Start and Stop Recording
const record = () => {
  //  Stop the recording
  if(recording.value){
      clearInterval(interval)
      clearTimeout(timeOutStart)
      clearTimeout(timeOutStop)
      store.clearVideoBlob()
      mediaRecorder.stop()
      recording.value = false
      if(timeOut.value  === 6){
        router.push('/download')
      }
      timeOut.value = 6
  }
  //  Start the recording
  else {
    //  Time out counting down
    recording.value = true
    interval = setInterval(() => {
        timeOut.value--
    }, 1000)
    // After 5 secs start recording
    timeOutStart = setTimeout(() => {
      clearInterval(interval)
      timeOut.value = 6
      store.clearVideoBlob()
      mediaRecorder.start()
    }, 6000)
  }
  //  After 1 minute max, stop recording
  timeOutStop = setTimeout(() => {
    clearInterval(interval)
    clearTimeout(timeOutStart)
    clearTimeout(timeOutStop)
    timeOut.value = 6
    store.clearVideoBlob()
    mediaRecorder.stop()
    recording.value = false
      router.push('/download')
  }, 60000)
}




</script>

<template>
<div id="timeout-div" v-if="timeOut < 6">
  <p>{{ timeOut }}</p>
  <svg id="timeout-svg" xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24">
		<circle cx="12" cy="12" r="0" fill="#FFD700">
			<animate id="svgSpinnersPulseMultiple0" fill="freeze" attributeName="r" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="0.7s" keySplines=".52,.6,.25,.99" values="0;11" />
			<animate fill="freeze" attributeName="opacity" begin="0;svgSpinnersPulseMultiple2.end" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0" />
		</circle>
		<circle cx="12" cy="12" r="0" fill="#FFD700">
			<animate id="svgSpinnersPulseMultiple1" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="0.7s" keySplines=".52,.6,.25,.99" values="0;11" />
			<animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.2s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0" />
		</circle>
		<circle cx="12" cy="12" r="0" fill="#FFD700">
			<animate id="svgSpinnersPulseMultiple2" fill="freeze" attributeName="r" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="0.7s" keySplines=".52,.6,.25,.99" values="0;11" />
			<animate fill="freeze" attributeName="opacity" begin="svgSpinnersPulseMultiple0.begin+0.4s" calcMode="spline" dur="1.2s" keySplines=".52,.6,.25,.99" values="1;0" />
		</circle>
	</svg>
</div>
  <video src="" id="video"></video>
  <div id="button-div">
    <button :class="recording ? 'recording' : 'not-recording'" @click="record">
    {{ recording ? '' : 'Record' }}
    </button>
    <button v-if="!recording" id="button-cancel" @click="cancel">Cancel</button>
  </div>
</template>

<style scoped>
video {
  display: none;
}

button {
  height: 30px;
  border-radius: 50px;
  border: none;
  color: black;
  transition: width 0.3s ease;
}
#button-div {
  position: absolute;
  bottom: 50px;
  left: 50px;
  display: flex;
  gap: 20px;
}
#button-cancel {
  width: 100px;
  background: #FFD700;
}

button.recording {
  background: #d6625c;
  width: 30px;
  animation: parpadea 1s ease-in-out infinite;
}

button.not-recording {
  background: #5cd666;
  width: 100px;
}

#timeout-div {
  border: black solid 1;
  position: absolute;
  height: 100px;
  text-align: center;
  left: 45vw;
  top: 20px;
}

#timeout-div p{
  font-size: 50px;
  color: white;
  /* left: 50vw; */
  z-index: 99;
  margin: 0;
  position: relative;
  top: 20px;
}

 #timeout-div svg {
  position: relative;
  /* left: 46vw;
  top: 27px; */
  z-index: 70;
  top: -60px;
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
