// store/videoStore.js
import { defineStore } from 'pinia';

export const useRecordingStore = defineStore('recording', {
  state: () => ({
    videoBlob: null, // Store the Blob here
    uploading: false,
    videoUrl: ''
  }),
  actions: {
    setVideoBlob(blob) {
      this.videoBlob = blob;
    },
    clearVideoBlob() {
      this.videoBlob = null; // Clear the Blob
    },
    startUploading(){
        this.uploading = true
    },
    doneUploading(){
        this.uploading = false
    },
    updateVideoUrl(url = ''){
      this.videoUrl = url
    }
  },
});
