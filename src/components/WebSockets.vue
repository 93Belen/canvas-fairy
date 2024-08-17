<script setup>
import { watch } from 'vue'
import { useRecordingStore } from '../stores/recordingStore'
const store = useRecordingStore()
import { socket }from '../socket'

socket.on('videoUrl', (url) => {
store.updateVideoUrl(url)
})



// watch(() => store.videoBlob, (newBlob) => {
//     if(newBlob){
//         console.log('Blob size:', newBlob.size); // Log the size of the Blob
//         const reader = new FileReader();
//         reader.readAsArrayBuffer(newBlob); // Read the Blob as an ArrayBuffer
//         reader.onloadend = () => {
//         const arrayBuffer = reader.result; // Get the ArrayBuffer
//         console.log(arrayBuffer)
//         socket.emit('sendVideoBlob', arrayBuffer); // Send the ArrayBuffer to the server
//         }
//     }
// })

// Make sure to configure the WebSocket to handle binary data
socket.binaryType = 'arraybuffer'; // This is crucial for binary data

// watch(() => store.videoBlob, (newBlob) => {
//   if (newBlob) {
//     console.log('Blob size:', newBlob.size); // Log the size of the Blob
//     const reader = new FileReader();
    
//     reader.onloadend = () => {
//       const arrayBuffer = reader.result;
//       if (arrayBuffer instanceof ArrayBuffer) {
//         console.log('ArrayBuffer size:', arrayBuffer.byteLength); // Log the size of the ArrayBuffer
//         socket.emit('sendVideoBlob', arrayBuffer);
//       } else {
//         console.error('Error: Result is not an ArrayBuffer');
//       }
//     };

//     reader.onerror = (error) => {
//       console.error('FileReader error:', error);
//     };

//     reader.readAsArrayBuffer(newBlob); // Read the Blob as an ArrayBuffer
//   }
// });

watch(() => store.videoBlob, (newState) => {
  if (newState) {
    const newBlob = newState.blob
    const mimeType = newState.mimeType
    console.log('Blob size:', newBlob.size); // Log the size of the Blob

    const reader = new FileReader();

    // Handle successful reading of the Blob
    reader.onloadend = () => {
      const arrayBuffer = reader.result;
      if (arrayBuffer instanceof ArrayBuffer) {
        console.log('ArrayBuffer size:', arrayBuffer.byteLength); // Log the size of the ArrayBuffer
        // Send the ArrayBuffer through WebSocket
        socket.emit('sendVideoBlob', {arrayBuffer, mimeType});
      } else {
        console.error('Error: Result is not an ArrayBuffer');
      }
    };

    // Handle errors during file reading
    reader.onerror = (error) => {
      console.error('FileReader error:', error);
    };

    // Read the Blob as an ArrayBuffer
    reader.readAsArrayBuffer(newBlob);
  }
});




</script>

<template>
    
</template>


<style scoped>

</style>