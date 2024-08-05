import { defineStore } from 'pinia'
import { LazyBrush } from 'lazy-brush'
const lazy = new LazyBrush({
    radius: 100,
    enabled: true,
    initialPoint: { x: 0, y: 0 }
  })

export const useCoordinatesStore = defineStore('coordinates', {
    state: () => ({ 
        x: 0, 
        y: 0,
        brushX: 0,
        brushY: 0 
    }),
    actions: {
      changeCoordinates(x, y) {
        this.x = x
        this.y = y
        lazy.update({ x: x, y: y }, { friction: 0 })
        let brush = lazy.getBrushCoordinates()
        this.brushX = brush.x
        this.brushY = brush.y
      },
      changeBrushCoordinates(x, y){
          this.brushX = x
          this.brushY = y
      }
    },
  })