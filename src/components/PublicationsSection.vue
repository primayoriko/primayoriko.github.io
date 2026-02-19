<script setup lang="ts">
import { profile } from '@/data/profile'
</script>

<template>
  <section id="publications" class="py-20 sm:py-28 bg-[#000524]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Publications
      </h2>

      <div class="space-y-6 max-w-3xl mx-auto">
        <div
          v-for="(pub, i) in profile.publications"
          :key="i"
          class="bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-accent-500/30 transition-colors"
        >
          <div class="flex items-start gap-4">
            <div class="shrink-0 w-10 h-10 bg-accent-500/15 rounded-lg flex items-center justify-center mt-0.5">
              <svg class="w-5 h-5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-3">
                <h3 class="text-base font-semibold text-white leading-snug">
                  {{ pub.title }}
                </h3>
                <span class="text-sm text-dark-400 shrink-0">{{ pub.date }}</span>
              </div>
              <p class="mt-2 text-sm text-dark-300 leading-relaxed">
                {{ pub.description }}
              </p>
              <a
                v-if="pub.url"
                :href="pub.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 mt-3 text-sm text-accent-500 hover:text-accent-400 transition-colors"
              >
                View Publication
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
