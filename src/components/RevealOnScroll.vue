<script setup lang="ts">
import { useScrollReveal } from '@/composables/useScrollReveal'

const props = withDefaults(defineProps<{
  delay?: number
  direction?: 'up' | 'left' | 'right'
}>(), {
  delay: 0,
  direction: 'up',
})

const { target, isVisible } = useScrollReveal(0.1)
</script>

<template>
  <div
    ref="target"
    class="transition-all duration-700 ease-out"
    :style="{ transitionDelay: `${props.delay}ms` }"
    :class="isVisible
      ? 'opacity-100 translate-y-0 translate-x-0'
      : props.direction === 'up'
        ? 'opacity-0 translate-y-10'
        : props.direction === 'left'
          ? 'opacity-0 -translate-x-10'
          : 'opacity-0 translate-x-10'"
  >
    <slot />
  </div>
</template>
