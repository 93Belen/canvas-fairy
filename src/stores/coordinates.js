import { defineStore } from 'pinia'
import { LazyBrush } from 'lazy-brush'
const lazy = new LazyBrush({
    radius: 150,
    enabled: true,
    initialPoint: { x: 0, y: 0 }
  })

export const useCoordinatesStore = defineStore('coordinates', {
    state: () => ({ 
        coor: [],
    }),
    getters: {
      getBrushPosition: (state) => {
        let arr = []
        state.coor.forEach(hand => {
        lazy.update({ x: hand.x, y: hand.y }, { friction: 0 })
        let brush = lazy.getBrushCoordinates()
        arr.push(brush)
        })
        return arr;
      }
    },
    actions: {
      changeCoordinates(arr) {
        this.coor = arr
      }
    },
  })