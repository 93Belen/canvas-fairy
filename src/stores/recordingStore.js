// store/videoStore.js
import { defineStore } from 'pinia';

export const useRecordingStore = defineStore('recording', {
  state: () => ({
    videoBlob: null, // Store the Blob here
  }),
  actions: {
    setVideoBlob(blob) {
      this.videoBlob = blob;
    },
    clearVideoBlob() {
      this.videoBlob = null; // Clear the Blob
    },
  },
});
