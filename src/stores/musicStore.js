import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
    state: () => ({ 
        notes: [
            "C4", "D4", "E4", "C4", // Intro
            "C4", "D4", "E4", "C4", // Intro continued
            "E4", "G4", "A4", "G4", // First phrase
            "F4", "E4", "D4", "C4", // Descending
            "C4", "D4", "E4", "C4", // Repeat phrase
            "E4", "G4", "A4", "G4", // First phrase
            "F4", "E4", "D4", "C4", // Descending
            "C5", "B4", "C5", // Transition
            "A4", "B4", "C5", // Climbing
            "C5", "B4", "A4", "G4", // Descending back
            "F4", "E4", "D4", "C4", // Resolution back down
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