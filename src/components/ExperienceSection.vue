<script setup lang="ts">
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'
import type { ExperienceType } from '@/types/profile'

const activeFilter = ref<ExperienceType | 'all'>('all')
const showAll = ref(false)
const initialCount = 5

const filters: { key: ExperienceType | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'full-time', label: 'Full-time' },
  { key: 'internship', label: 'Internship' },
  { key: 'part-time', label: 'Part-time' },
  { key: 'voluntary', label: 'Voluntary' },
]

const filtered = computed(() => {
  if (activeFilter.value === 'all') return profile.experiences
  return profile.experiences.filter((e) => e.type === activeFilter.value)
})

const displayed = computed(() =>
  showAll.value ? filtered.value : filtered.value.slice(0, initialCount)
)

const typeBadge: Record<ExperienceType, string> = {
  'full-time': 'bg-green-500/15 text-green-400',
  'part-time': 'bg-blue-500/15 text-blue-400',
  internship: 'bg-purple-500/15 text-purple-400',
  voluntary: 'bg-amber-500/15 text-amber-400',
}

function setFilter(key: ExperienceType | 'all') {
  activeFilter.value = key
  showAll.value = false
}
</script>

<template>
  <section id="experience" class="py-20 sm:py-28 bg-[#0f0f0f]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">
        Experience
      </h2>

      <!-- Filter tabs -->
      <div class="flex flex-wrap justify-center gap-2 mb-10">
        <button
          v-for="f in filters"
          :key="f.key"
          class="px-4 py-1.5 text-sm font-medium rounded-full transition-colors"
          :class="activeFilter === f.key
            ? 'bg-accent-500 text-white'
            : 'bg-white/5 text-dark-300 hover:bg-white/10 border border-white/10'"
          @click="setFilter(f.key)"
        >
          {{ f.label }}
          <span class="ml-1 text-xs opacity-70">
            ({{ f.key === 'all' ? profile.experiences.length : profile.experiences.filter(e => e.type === f.key).length }})
          </span>
        </button>
      </div>

      <div class="relative">
        <div class="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-white/10" />

        <div class="space-y-8">
          <div
            v-for="(exp, i) in displayed"
            :key="`${activeFilter}-${i}`"
            class="relative pl-12 sm:pl-16"
          >
            <div
              class="absolute left-2.5 sm:left-4.5 top-1.5 w-3 h-3 rounded-full border-2"
              :class="exp.isCurrent
                ? 'bg-accent-500 border-accent-500 shadow-lg shadow-accent-500/30'
                : 'bg-[#0f0f0f] border-dark-600'"
            />

            <div class="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-500/30 transition-colors">
              <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div class="flex items-center gap-2 flex-wrap">
                    <h3 class="text-lg font-semibold text-white">
                      {{ exp.title }}
                    </h3>
                    <span
                      class="px-2 py-0.5 text-[10px] font-semibold rounded-full uppercase tracking-wider"
                      :class="typeBadge[exp.type]"
                    >
                      {{ exp.type }}
                    </span>
                  </div>
                  <p class="text-accent-500 font-medium">
                    <a
                      v-if="exp.companyUrl"
                      :href="exp.companyUrl"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="hover:text-accent-400"
                    >
                      {{ exp.company }}
                    </a>
                    <span v-else>{{ exp.company }}</span>
                  </p>
                </div>
                <div class="text-sm text-dark-400 sm:text-right shrink-0">
                  <div class="flex items-center gap-1.5">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {{ exp.period }}
                  </div>
                  <div v-if="exp.location" class="flex items-center gap-1.5 mt-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {{ exp.location }}
                  </div>
                </div>
              </div>
              <p v-if="exp.description" class="mt-3 text-dark-300 text-sm leading-relaxed">
                {{ exp.description }}
              </p>
              <span
                v-if="exp.isCurrent"
                class="inline-flex items-center gap-1.5 mt-3 px-3 py-1 bg-accent-500/10 text-accent-400 text-xs font-medium rounded-full"
              >
                <span class="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
                Current Position
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filtered.length > initialCount" class="mt-8 text-center">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `Show All ${filtered.length} Positions` }}
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
