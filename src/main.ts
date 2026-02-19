import { createApp } from 'vue'
import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'
import App from './App.vue'
import './assets/main.css'

const app = createApp(App)

app.use(Particles, {
  init: async (engine: any) => {
    await loadSlim(engine)
  },
})

app.mount('#app')
