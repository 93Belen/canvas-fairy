import { defineStore } from 'pinia'


export const useRecordingStore = defineStore('recording', {
    state: () => ({ 
        recordedChunks: [],
        recording: false
 
    }),
    actions: {
        addChunk(chunk) {
            this.recordedChunks.push(chunk);
          },
          clearChunks() {
            this.recordedChunks = [];
          },
          record(){
              this.recording = true
          },
          stopRecord(){
              this.recording = false
          }
    },
  })