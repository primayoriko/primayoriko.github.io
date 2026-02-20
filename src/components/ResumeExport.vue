<script setup lang="ts">
import { ref } from 'vue'
import { useResumeExport } from '@/composables/useResumeExport'

const { exportDocx, exportPdf } = useResumeExport()
const open = ref(false)
const loading = ref(false)

async function handleExport(format: 'pdf' | 'docx') {
  loading.value = true
  try {
    if (format === 'pdf') exportPdf()
    else await exportDocx()
  } finally {
    loading.value = false
    open.value = false
  }
}
</script>

<template>
  <div class="relative inline-block">
    <button
      class="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-semibold rounded-xl transition-colors text-sm"
      @click="open = !open"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Export Resume
      <svg
        class="w-3 h-3 transition-transform"
        :class="open ? 'rotate-180' : ''"
        fill="none" stroke="currentColor" viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-44 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
      >
        <button
          class="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors"
          :disabled="loading"
          @click="handleExport('pdf')"
        >
          <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zm-2.5 9.5c0 .28-.22.5-.5.5h-1v1.5H8V12h2c.28 0 .5.22.5.5v1zm3 0c0 .28-.22.5-.5.5h-1v1.5h-1V12h2c.28 0 .5.22.5.5v1zm2.5-1h2v1h-1.5v.5H18v1h-2v-2c0-.28.22-.5.5-.5z"/>
          </svg>
          PDF (Print)
        </button>
        <button
          class="flex items-center gap-3 w-full px-4 py-3 text-sm text-white hover:bg-white/10 transition-colors border-t border-white/5"
          :disabled="loading"
          @click="handleExport('docx')"
        >
          <svg class="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm-1 2l5 5h-5V4zM9.5 13l1.5 5 1.5-5h1L12 19h-1L9 13h.5z"/>
          </svg>
          DOCX
        </button>
      </div>
    </transition>

    <div
      v-if="open"
      class="fixed inset-0 z-40"
      @click="open = false"
    />
  </div>
</template>
