import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
    state: () => ({ 
        notes: [
            "D4",
            "E4",
            "G4",
            "A4",
            "B4",
            "C5", // One octave higher
            "B4",
            "A4",
            "G4",
            "E4",
            "D4",
            "C4"  // Middle C    
          ],
          index: 0
 
    }),
    actions: {
      changeIndex(num) {
        this.index = num
      }
    },
  })