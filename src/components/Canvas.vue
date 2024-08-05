<script setup>
import { onMounted, ref } from 'vue'
import * as Tone from "tone"
import { useCoordinatesStore } from '../stores/coordinates'
const store = useCoordinatesStore()

const synth = new Tone.Synth().toDestination();
let video, canvas, ctx;
let hand;
let detector;
let started = false;
let prevX = 0
let prevY = 0
let points = []
let index = 0




onMounted(() => {
    video = document.getElementById("video");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // canvas settings
    // ctx.strokeStyle = 'white'
    ctx.scale(-1, 1);
    ctx.translate(-canvas.width, 0);
    ctx.lineCap = "round";
    ctx.lineWidth = 5
    ctx.lineJoin = 'round'
    ctx.shadowBlur = 7;

    function drawCameraIntoCanvas() {
        ctx.drawImage(video, 0, 0, window.innerWidth, window.innerHeight);
        paint()
        window.requestAnimationFrame(drawCameraIntoCanvas);
      }
      // Loop over the drawCameraIntoCanvas function
      drawCameraIntoCanvas();


})

// helpers =====================

const notes = [
  "C4", "E4", "G4", "C5", // Cheerful start
  "E4", "D4", "C4", // Descending notes
  "G4", "A4", "G4", // Up and down motion
  "C5", "B4", "A4", // Climbing up and back
  "F4", "E4", "D4", "C4" // Resolution back down
];

const noteDurations = [
  "4n", "4n", "4n", "4n", // Cheerful start (4 quarter notes)
  "4n", "4n", "4n", // Descending notes (3 quarter notes)
  "4n", "4n", "4n", // Up and down motion (3 quarter notes)
  "4n", "4n", "4n", // Climbing back (3 quarter notes)
  "4n", "4n", "4n", "2n" // Resolution down (last note is a half note)
];






function paint(){
  if(store.brushX !== prevX || store.brushY !== prevY){
    synth.triggerAttackRelease(notes[index], noteDurations[index]);
    if(index < notes.length){
      index++
    } else {
      index = 0
    }
  }
  let dist = distanceBetween({x: prevX, y: prevY}, {x: store.brushX, y: store.brushY});
  let angle = angleBetween({x: prevX, y: prevY},  {x: store.brushX, y: store.brushY});
  if(started){
     // Calculate number of circles to draw
     let numCircles = Math.min(Math.floor(dist / 20), 5); // 5 circles max, adjust as needed
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
  for (var i = 0; i < points.length; i++) {
   ctx.fillStyle = points[i].color; // Use the stored color
    ctx.beginPath();
    ctx.globalAlpha = points[i].opacity;
    ctx.arc(
      points[i].x, points[i].y, points[i].radius, 
      false, Math.PI * 2, false);
    ctx.fill();
    // synth.triggerAttackRelease("C4", "8n");
  }
  prevX = store.brushX
  prevY = store.brushY
  ctx.stroke()
}
// Helper function to get a random color
function getRandomColor() {
  const colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'blue', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)]; // Select a random color from the array
}


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})



function distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}
function angleBetween(point1, point2) {
    return Math.atan2( point2.x - point1.x, point2.y - point1.y );
}


// function drawPixels(x, y) {
//   for (var i = -10; i < 10; i+= 4) {
//     for (var j = -10; j < 10; j+= 4) {
//       if (Math.random() > 0.5) {
//         ctx.fillStyle = ['red', 'orange', 'yellow', 'green', 
//                          'light-blue', 'blue', 'purple'][Math.round(Math.random() * 6)];
//         ctx.fillRect(x+i, y+j, 4, 4);
//       }
//     }
//   }
// }




</script>

<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<style scoped>

</style>
