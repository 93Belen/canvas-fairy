import { defineStore } from 'pinia'


export const useMusicStore = defineStore('music', {
    state: () => ({ 
        notes: [
            'C4', 'D4', 'E4', 'F4',
            'G4', 'A4', 'B4', 'C5',
            'E5', 'G5', 'A5', 'D5'
          ],
          index: 0
 
    }),
    actions: {
      changeIndex(num) {
        this.index = num
      }
    },
  })