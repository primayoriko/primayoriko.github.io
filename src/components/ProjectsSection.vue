<script setup lang="ts">
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'

const showAll = ref(false)
const initialCount = 4

const displayedProjects = computed(() =>
  showAll.value ? profile.projects : profile.projects.slice(0, initialCount)
)
</script>

<template>
  <section id="projects" class="py-20 sm:py-28 bg-[#0f0f0f]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Projects
      </h2>

      <div class="grid sm:grid-cols-2 gap-6">
        <a
          v-for="(project, i) in displayedProjects"
          :key="i"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-500/30 transition-all"
        >
          <div class="flex items-start justify-between gap-3">
            <h3 class="text-base font-semibold text-white group-hover:text-accent-500 transition-colors">
              {{ project.name }}
            </h3>
            <svg class="w-4 h-4 text-dark-500 group-hover:text-accent-500 shrink-0 mt-1 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <p class="mt-1 text-xs text-dark-500">{{ project.period }}</p>
          <p class="mt-3 text-sm text-dark-300 leading-relaxed">
            {{ project.description }}
          </p>
        </a>
      </div>

      <div v-if="profile.projects.length > initialCount" class="mt-8 text-center">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `Show All ${profile.projects.length} Projects` }}
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
