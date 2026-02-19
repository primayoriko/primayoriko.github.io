<script setup lang="ts">
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'

const showAll = ref(false)
const initialCount = 4

const displayedAwards = computed(() =>
  showAll.value ? profile.awards : profile.awards.slice(0, initialCount)
)

const levelColors: Record<string, string> = {
  international: 'bg-purple-500/15 text-purple-400',
  regional: 'bg-blue-500/15 text-blue-400',
  national: 'bg-amber-500/15 text-amber-400',
  campus: 'bg-green-500/15 text-green-400',
}
</script>

<template>
  <section id="awards" class="py-20 sm:py-28 bg-[#000524]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Awards & Competitions
      </h2>

      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="(award, i) in displayedAwards"
          :key="i"
          class="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-500/30 transition-colors"
        >
          <div class="flex items-start justify-between gap-3 mb-3">
            <span
              class="inline-block px-2.5 py-1 text-xs font-semibold rounded-full capitalize"
              :class="levelColors[award.level]"
            >
              {{ award.level }}
            </span>
            <span class="text-sm text-dark-400 shrink-0">{{ award.year }}</span>
          </div>
          <h3 class="text-base font-semibold text-white leading-snug">
            {{ award.title }}
          </h3>
          <p class="mt-1 text-sm text-accent-500 font-medium">
            {{ award.issuer }}
          </p>
          <p class="mt-2 text-sm text-dark-300 leading-relaxed">
            {{ award.description }}
          </p>
        </div>
      </div>

      <div v-if="profile.awards.length > initialCount" class="mt-8 text-center">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `Show All ${profile.awards.length} Awards` }}
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
