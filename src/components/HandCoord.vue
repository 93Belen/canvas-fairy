<script setup>
import { onMounted } from 'vue'
import { useCoordinatesStore } from '../stores/coordinates'
const store = useCoordinatesStore()

let video;
let hand;
let detector;

let options = {
  flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
  maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
  detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
  scoreThreshold: 0.9, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
  iouThreshold: 0.3, 
}




onMounted(() => {
    video = document.getElementById('video')
    detector = ml5.handpose(video, options, modelReady)
    detector.on('hand', result => {
    hand = result[0]
    })


    function drawCameraIntoCanvas() {
        getCoordinates()
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      // Loop over the drawCameraIntoCanvas function
      drawCameraIntoCanvas();


})

// helpers =====================

function getCoordinates(){
  if(hand){
    let x = hand.annotations.indexFinger[3][0]
    let y = hand.annotations.indexFinger[3][1]
    store.changeCoordinates(x, y)
  }
}





function modelReady() {
  console.log("model ready");
}







</script>

<template>

</template>

<style scoped>

</style>
