<script setup>
import { onMounted } from 'vue'
import { useCoordinatesStore } from '../stores/coordinates'
import { useMusicStore } from '../stores/musicStore'
const musicStore = useMusicStore()
const store = useCoordinatesStore()

let video;
let hand = []
let detector;
let brain;
let optionsModel = {
    inputs: 2,
    outputs: 12,
    task: 'classification',
    debug: true
}
const modelInfo = {
  model: "./model/model.json",
  metadata: "./model/model_meta.json",
  weights: "./model/model.weights.bin",
}


let options = {
  architecture: 'MobileNetV1',
  imageScaleFactor: 0.3,
  outputStride: 16,
  flipHorizontal: false,
  minConfidence: 0.5,
  maxPoseDetections: 5,
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: 'multiple',
  inputResolution: 513,
  multiplier: 0.75,
  quantBytes: 2,
};





function gotResults(error, results){
    const num = Number(results[0].label)
    musicStore.changeIndex(num)
}



onMounted(() => {
    video = document.getElementById('video')
    detector = ml5.poseNet(video, options, modelReady)
    detector.on('pose', result => {
    hand = result
    })

  //   // Neuralnetwork
  //   brain = ml5.neuralNetwork(optionsModel);
  //   brain.load(modelInfo, classify)
  //   function classify(){
  //     if(hand !== undefined){
  //       let inputs = [store.x , store.y]
  //       brain.classify(inputs, gotResults)
  //     }
  // }



    function drawCameraIntoCanvas() {
        getCoordinates()
        // if(hand){
        //   classify()
        // }
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      // Loop over the drawCameraIntoCanvas function
      drawCameraIntoCanvas();


})

// helpers =====================

function getCoordinates(){
  if(hand.length > 0){
    let arr = []
    hand.forEach(element => {
      if(element.pose.leftWrist.confidence > 0.7){
        let x = element.pose.leftWrist.x
        let y = element.pose.leftWrist.y
        arr.push({x: x, y: y})
      }
      if(element.pose.rightWrist.confidence > 0.7){
        let x = element.pose.rightWrist.x
        let y = element.pose.rightWrist.y
        arr.push({x: x, y: y})
      }
    });
    store.changeCoordinates([])
    store.changeCoordinates(arr)
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
