import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return { token: localStorage.getItem('token') ?? null }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  // actions: {
  //   increment() {
  //     this.count++
  //   },
  // },
})
