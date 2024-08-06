import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
    state: () => ({ 
        notes: [
            "C4", "E4", "G4", "C5", // Cheerful start
            "E4", "D4", "C4", // Descending notes
            "G4", "A4", "G4", // Up and down motion
            "C5", "B4", "A4", // Climbing up and back
            "F4", "E4", "D4", "C4" // Resolution back down
          ],
          index: 0
 
    }),
    actions: {
      changeIndex() {
        if(this.index < this.notes.length){
            this.index++
        }
        else {
            this.index = 0
        }
      }
    },
  })