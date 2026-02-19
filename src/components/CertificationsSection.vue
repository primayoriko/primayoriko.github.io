<script setup lang="ts">
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'

const showAll = ref(false)
const initialCount = 4

const displayedCerts = computed(() =>
  showAll.value ? profile.certifications : profile.certifications.slice(0, initialCount)
)
</script>

<template>
  <section id="certifications" class="py-20 sm:py-28 bg-[#0f0f0f]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Licenses & Certifications
      </h2>

      <div class="grid sm:grid-cols-2 gap-5">
        <div
          v-for="(cert, i) in displayedCerts"
          :key="i"
          class="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-accent-500/30 transition-colors"
        >
          <div class="flex items-start gap-3">
            <div class="shrink-0 w-9 h-9 bg-accent-500/15 rounded-lg flex items-center justify-center mt-0.5">
              <svg class="w-4.5 h-4.5 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="text-sm font-semibold text-white leading-snug">
                {{ cert.name }}
              </h3>
              <p class="text-xs text-accent-500 font-medium mt-0.5">{{ cert.issuer }}</p>
              <p class="text-xs text-dark-400 mt-1">
                Issued {{ cert.issued }}
                <span v-if="cert.expires"> &middot; Expires {{ cert.expires }}</span>
              </p>
              <a
                v-if="cert.url"
                :href="cert.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 mt-2 text-xs text-accent-500 hover:text-accent-400 transition-colors"
              >
                View Credential
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="profile.certifications.length > initialCount" class="mt-8 text-center">
        <button
          class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          @click="showAll = !showAll"
        >
          {{ showAll ? 'Show Less' : `Show All ${profile.certifications.length} Certifications` }}
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
