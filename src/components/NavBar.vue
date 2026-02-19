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
]

const isScrolled = ref(false)
const mobileOpen = ref(false)

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  mobileOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-semibold text-xs uppercase tracking-[2.5px]"
    :class="isScrolled ? 'bg-[#333]' : 'bg-transparent'"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-12 md:justify-center">
        <div class="hidden md:flex items-center gap-0">
          <button
            v-for="s in sections"
            :key="s.id"
            class="px-3.5 py-2 text-white hover:text-accent-500 transition-colors"
            @click="scrollTo(s.id)"
          >
            {{ s.label }}
          </button>
        </div>

        <button
          class="md:hidden p-2 text-white hover:text-accent-500 transition-colors"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileOpen"
        class="md:hidden bg-[#333]/95 backdrop-blur-lg border-t border-white/10"
      >
        <div class="px-4 py-3 space-y-1">
          <button
            v-for="s in sections"
            :key="s.id"
            class="block w-full text-left px-3 py-2 text-sm text-white hover:text-accent-500 transition-colors"
            @click="scrollTo(s.id)"
          >
            {{ s.label }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>
