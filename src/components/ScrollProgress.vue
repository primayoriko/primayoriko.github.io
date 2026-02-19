<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'awards', label: 'Awards' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'certifications', label: 'Certifications' },
]

const progress = ref(0)
const activeSection = ref('hero')

function update() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0

  let current = 'hero'
  for (const s of sections) {
    const el = document.getElementById(s.id)
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top <= window.innerHeight * 0.4) {
        current = s.id
      }
    }
  }
  activeSection.value = current
}

onMounted(() => {
  window.addEventListener('scroll', update, { passive: true })
  update()
})

onUnmounted(() => {
  window.removeEventListener('scroll', update)
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const activeSectionLabel = ref('')
</script>

<template>
  <!-- Top progress bar -->
  <div class="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-transparent">
    <div
      class="h-full bg-gradient-to-r from-accent-600 via-accent-500 to-accent-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(249,115,22,0.5)]"
      :style="{ width: `${progress}%` }"
    />
  </div>

  <!-- Side dot navigation + active section label -->
  <div class="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
    <div
      v-for="s in sections"
      :key="s.id"
      class="group flex items-center gap-3 cursor-pointer"
      @click="scrollTo(s.id)"
    >
      <span
        class="text-xs font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0"
        :class="activeSection === s.id ? 'text-accent-500 !opacity-100 !translate-x-0' : 'text-dark-400'"
      >
        {{ s.label }}
      </span>
      <span
        class="block rounded-full transition-all duration-200"
        :class="activeSection === s.id
          ? 'w-3 h-3 bg-accent-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]'
          : 'w-2 h-2 bg-dark-500 group-hover:bg-dark-300'"
      />
    </div>
  </div>
</template>
