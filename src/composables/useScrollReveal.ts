import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScrollReveal(threshold = 0.15): { target: Ref<HTMLElement | null>; isVisible: Ref<boolean> } {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer?.unobserve(entry.target)
        }
      },
      { threshold },
    )
    if (target.value) observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { target, isVisible }
}
