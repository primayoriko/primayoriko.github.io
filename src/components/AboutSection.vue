<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { profile } from '@/data/profile'
import { useScrollReveal } from '@/composables/useScrollReveal'

const { target: statsRef, isVisible: statsVisible } = useScrollReveal(0.3)

const yearsOfExperience = computed(() => {
  const ftMonths = profile.experiences
    .filter((e) => e.type === 'full-time')
    .reduce((sum, e) => sum + e.durationMonths, 0)
  const ptMonths = profile.experiences
    .filter((e) => e.type === 'part-time')
    .reduce((sum, e) => sum + e.durationMonths, 0)
  return Math.round((ftMonths + ptMonths * 0.5) / 12)
})

const companiesCount = computed(() => {
  const unique = new Set(
    profile.experiences
      .filter((e) => e.type === 'full-time' || e.type === 'internship')
      .map((e) => e.company),
  )
  return unique.size
})

const stats = computed(() => [
  { label: 'Years Experience', target: yearsOfExperience.value, suffix: '+' },
  { label: 'Companies', target: companiesCount.value, suffix: '' },
  { label: 'Awards', target: profile.awards.length, suffix: '' },
  { label: 'Projects', target: profile.projects.length, suffix: '' },
  { label: 'Certifications', target: profile.certifications.length, suffix: '' },
])

const counters = ref(stats.value.map(() => 0))

function animateCounters() {
  stats.value.forEach((stat, i) => {
    const duration = 1500
    const step = stat.target / (duration / 16)
    let current = 0
    const interval = setInterval(() => {
      current += step
      if (current >= stat.target) {
        counters.value[i] = stat.target
        clearInterval(interval)
      } else {
        counters.value[i] = Math.floor(current)
      }
    }, 16)
  })
}

watch(statsVisible, (v) => {
  if (v) animateCounters()
})
</script>

<template>
  <section id="about" class="py-20 sm:py-28 bg-[#000524]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        About Me
      </h2>

      <div class="grid md:grid-cols-3 gap-8">
        <div class="md:col-span-2 space-y-4">
          <p class="text-dark-300 leading-relaxed text-lg">
            {{ profile.about }}
          </p>
          <p class="text-dark-300 leading-relaxed">
            With over {{ yearsOfExperience }} years of experience across companies like
            <strong class="text-white">TikTok</strong>,
            <strong class="text-white">GoTo Group</strong>, and
            <strong class="text-white">Traveloka</strong>, I specialize in building scalable backend systems
            and optimizing infrastructure for performance and reliability.
          </p>
        </div>

        <div class="space-y-4">
          <div class="bg-white/5 rounded-2xl p-5 border border-white/10">
            <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
              Languages
            </h3>
            <ul class="space-y-2">
              <li
                v-for="l in profile.languages"
                :key="l.language"
                class="flex items-center justify-between text-sm"
              >
                <span class="font-medium text-white">{{ l.language }}</span>
                <span class="text-dark-400">{{ l.proficiency.split(' ')[0] }}</span>
              </li>
            </ul>
          </div>

          <div class="bg-white/5 rounded-2xl p-5 border border-white/10">
            <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-3">
              Location
            </h3>
            <div class="flex items-center gap-2 text-white">
              <svg class="w-4 h-4 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {{ profile.location }}
            </div>
          </div>
        </div>
      </div>

      <!-- Animated Stats -->
      <div ref="statsRef" class="mt-12 grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div
          v-for="(stat, i) in stats"
          :key="stat.label"
          class="text-center bg-white/5 rounded-2xl p-5 border border-white/10"
        >
          <div class="text-3xl sm:text-4xl font-bold text-accent-500">
            {{ counters[i] }}{{ stat.suffix }}
          </div>
          <div class="mt-1 text-sm text-dark-400">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
