<script setup lang="ts">
const categories: Record<string, string[]> = {
  Languages: ['Go', 'Java', 'Python', 'JavaScript', 'TypeScript', 'C#', 'Kotlin', 'Dart'],
  'Frameworks & Tools': ['Spring Boot', 'Django', 'Flask', 'Node.js', 'React', 'Vue', 'Flutter'],
  Infrastructure: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'DevOps'],
  Domains: ['Microservices', 'Distributed Systems', 'REST API', 'Web Development', 'Machine Learning', 'TensorFlow', 'Problem Solving', 'PostgreSQL'],
}
</script>

<template>
  <section id="skills" class="py-20 sm:py-28 bg-[#0f0f0f]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        Skills
      </h2>

      <div class="grid sm:grid-cols-2 gap-6">
        <div
          v-for="(skills, category) in categories"
          :key="category"
          class="bg-white/5 rounded-2xl p-6 border border-white/10"
        >
          <h3 class="text-sm font-semibold text-dark-400 uppercase tracking-wider mb-4">
            {{ category }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in skills"
              :key="skill"
              class="px-3 py-1.5 text-sm font-medium bg-white/5 text-dark-200 rounded-lg hover:bg-accent-500/15 hover:text-accent-400 transition-colors cursor-default border border-white/5"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
