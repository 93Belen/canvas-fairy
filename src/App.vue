<script setup>
import { onMounted, ref } from 'vue'
import { LazyBrush } from 'lazy-brush'

let video, canvas, ctx;
let hand;
let detector;
let started = false;
let coordinates = ref({
  x: 0,
  y: 0
})
let options = {
  flipHorizontal: false, // boolean value for if the video should be flipped, defaults to false
  maxContinuousChecks: Infinity, // How many frames to go without running the bounding box detector. Defaults to infinity, but try a lower value if the detector is consistently producing bad predictions.
  detectionConfidence: 0.8, // Threshold for discarding a prediction. Defaults to 0.8.
  scoreThreshold: 0.9, // A threshold for removing multiple (likely duplicate) detections based on a "non-maximum suppression" algorithm. Defaults to 0.75
  iouThreshold: 0.3, 
}
const lazy = new LazyBrush({
  radius: 10,
  enabled: true,
  initialPoint: { x: 0, y: 0 }
})




onMounted(() => {
  video = document.getElementById("video");
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  video.width = window.innerWidth
  video.height = window.innerHeight


  // canvas settings
    // ctx.strokeStyle = 'white'
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.lineCap = "round";
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.shadowBlur = 7;

    //  Cam
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {
        width: window.innerWidth,
        height: window.innerHeight
    }
    }).then(function(stream) {
      video.srcObject = stream;
      video.play();
      detector = ml5.handpose(video, options, modelReady)
      detector.on('hand', result => {
        hand = result[0]
      })
    })
    function drawCameraIntoCanvas() {
        ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        getCoordinates()
        paint()
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      // Loop over the drawCameraIntoCanvas function
      drawCameraIntoCanvas();
  }


})

// helpers =====================
let points = []

function getCoordinates(){
  if(hand){
      let x = hand.annotations.indexFinger[3][0]
      let y = hand.annotations.indexFinger[3][1]
      lazy.update({ x: x, y: y }, { friction: 0 })
      coordinates.value = lazy.getBrushCoordinates()
  }
}

let prevX = 0
let prevY = 0


function paint(){
  ctx.globalAlhpa = 1
  ctx.save()
  let dist = distanceBetween({x: prevX, y: prevY}, {x: coordinates.value.x, y: coordinates.value.y});
  let angle = angleBetween({x: prevX, y: prevY},  {x: coordinates.value.x, y: coordinates.value.y});
  if(started){
     // Calculate number of circles to draw
     let numCircles = Math.min(Math.floor(dist / 20), 10); // 10 circles max, adjust as needed
    for (let i = 0; i <= numCircles; i++) {
      // Calculate the intermediate point
      let x = prevX + (Math.sin(angle) * (i * (dist / numCircles)));
      let y = prevY + (Math.cos(angle) * (i * (dist / numCircles)));

      // Push circle details to the points array
      points.push({
        x: x,
        y: y,
        radius: Math.random() * 20,
        opacity: Math.random(),
        color: getRandomColor()
      });
    }
  }
  else {
    ctx.beginPath()
    started = true
  }
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var i = 0; i < points.length; i++) {
   ctx.fillStyle = points[i].color; // Use the stored color
    ctx.beginPath();
    ctx.globalAlpha = points[i].opacity;
    ctx.arc(
      points[i].x, points[i].y, points[i].radius, 
      false, Math.PI * 2, false);
    ctx.fill();
  }
  prevX = coordinates.value.x
  prevY = coordinates.value.y
  ctx.stroke()
}
// Helper function to get a random color
function getRandomColor() {
  const colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)]; // Select a random color from the array
}


function modelReady() {
  console.log("model ready");
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    video.width = window.innerWidth
    video.height = window.innerHeight
})



function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}


function drawPixels(x, y) {
  for (var i = -10; i < 10; i+= 4) {
    for (var j = -10; j < 10; j+= 4) {
      if (Math.random() > 0.5) {
        ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 
                         'light-blue', 'blue', 'purple'][Math.round(Math.random() * 6)];
        ctx.fillRect(x+i, y+j, 4, 4);
      }
    }
  }
}




</script>

<template>
  <div>
    <canvas id="canvas"></canvas>
    <video src="" id="video"></video>
  </div>
</template>

<style scoped>

</style>
