<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject, computed } from 'vue'
import { profile } from '@/data/profile'
import type { ProfileData } from '@/types/profile'
import type { Ref } from 'vue'
import ResumeExport from '@/components/ResumeExport.vue'

const linkedinData = inject<{ profileData: Ref<ProfileData> }>('linkedinData')
const liveProfile = computed(() => linkedinData?.profileData.value ?? profile)

const descriptions = [
  'I am a Software Engineer.',
  'I am a Backend Enthusiast.',
  'I build Distributed Systems.',
  'I love Problem Solving.',
]

const displayText = ref('')
const isDeleting = ref(false)
const descIndex = ref(0)
const charIndex = ref(0)
let timer: ReturnType<typeof setTimeout> | null = null

function tick() {
  const current = descriptions[descIndex.value]

  if (!isDeleting.value) {
    displayText.value = current.slice(0, charIndex.value + 1)
    charIndex.value++

    if (charIndex.value === current.length) {
      timer = setTimeout(() => {
        isDeleting.value = true
        tick()
      }, 1500)
      return
    }
    timer = setTimeout(tick, 60)
  } else {
    displayText.value = current.slice(0, charIndex.value - 1)
    charIndex.value--

    if (charIndex.value === 0) {
      isDeleting.value = false
      descIndex.value = (descIndex.value + 1) % descriptions.length
      timer = setTimeout(tick, 300)
      return
    }
    timer = setTimeout(tick, 30)
  }
}

function scrollToAbout() {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
}

const particlesOptions = {
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: 60,
  particles: {
    color: { value: '#ffffff' },
    links: {
      color: '#ffffff',
      distance: 150,
      enable: true,
      opacity: 0.15,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none' as const,
      outModes: { default: 'bounce' as const },
    },
    number: {
      density: { enable: true },
      value: 60,
    },
    opacity: { value: 0.3 },
    shape: { type: 'circle' },
    size: { value: { min: 1, max: 3 } },
  },
  detectRetina: true,
}

onMounted(() => {
  tick()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section id="hero" class="relative h-screen min-h-[500px] w-full flex items-center justify-center overflow-hidden bg-[#0f0f0f]">
    <vue-particles
      id="hero-particles"
      class="absolute inset-0 z-0"
      :options="particlesOptions"
    />

    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto">
      <h1 class="text-5xl sm:text-6xl lg:text-[90px] font-bold text-white leading-tight tracking-tight animate-fade-in-up">
        Hello, I'm <span class="text-accent-500">{{ liveProfile.name.split(' ')[0] }}</span>,
      </h1>

      <h3 class="mt-6 text-lg sm:text-xl text-dark-300 font-light animate-fade-in-up animation-delay-200">
        <span>{{ displayText }}</span>
        <span class="animate-blink text-accent-500">|</span>
      </h3>

      <hr class="mt-6 mb-8 mx-auto w-3/5 border-white/10 animate-fade-in-up animation-delay-300" />

      <div class="flex items-center justify-center gap-6 animate-fade-in-up animation-delay-400">
        <a
          :href="liveProfile.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white hover:text-accent-500 transition-colors"
          aria-label="GitHub"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
        </a>
        <a
          :href="liveProfile.linkedinUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-white hover:text-accent-500 transition-colors"
          aria-label="LinkedIn"
        >
          <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>

      <div class="mt-6 animate-fade-in-up animation-delay-400">
        <ResumeExport />
      </div>

      <div class="mt-16 animate-fade-in-up animation-delay-500">
        <button
          class="text-white/50 hover:text-accent-500 transition-colors"
          @click="scrollToAbout"
          aria-label="Scroll down"
        >
          <svg class="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
