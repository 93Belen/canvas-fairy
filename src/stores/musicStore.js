import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
    state: () => ({ 
        notes: [
            "A4",
            "A4",
            "B4",
            "C4",
            "D4",
            "F4",
            "G4",
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