import { create } from 'zustand'

export const useStore = create((set) => ({
  isTransitionActive: false,
  setIsTransitionActive: (val) => set({ isTransitionActive: val }),
  isFirstLoad: true,
  setIsFirstLoad: (val) => set({ isFirstLoad: val }),
  cursorInstance: null,
  setCursorInstance: (obj) => set({cursorInstance: obj}),
  pageToGoTo: null,
  setPageToGoTo: (val) => set({ pageToGoTo: val})
}))
