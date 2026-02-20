<script setup lang="ts">
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'

const showAll = ref(false)
const initialCount = 12

const displayedCourses = computed(() =>
  showAll.value ? profile.courses : profile.courses.slice(0, initialCount)
)
</script>

<template>
  <section id="courses" class="py-20 sm:py-28 bg-[#000524]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Relevant Courses
      </h2>

      <div class="flex flex-wrap justify-center gap-3">
        <div
          v-for="(course, i) in displayedCourses"
          :key="i"
          class="group bg-white/5 rounded-xl px-4 py-2.5 border border-white/10 hover:border-accent-500/30 transition-colors"
        >
          <span class="text-sm font-medium text-white">{{ course.name }}</span>
          <span class="ml-2 text-xs text-dark-500 group-hover:text-accent-500 transition-colors">{{ course.code }}</span>
        </div>
      </div>

      <div v-if="profile.courses.length > initialCount" class="mt-8 text-center">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `Show All ${profile.courses.length} Courses` }}
          <svg
            class="w-4 h-4 transition-transform"
            :class="showAll ? 'rotate-180' : ''"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>
