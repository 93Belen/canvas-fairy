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
            "G4"   
          ],
          index: 0
 
    }),
    actions: {
      changeIndex(num) {
        this.index = num
      }
    },
  })