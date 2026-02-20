<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { profile } from '@/data/profile'

interface GitHubRepo {
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  updated_at: string
}

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  avatar_url: string
}

const username = profile.githubUrl.replace('https://github.com/', '')
const repos = ref<GitHubRepo[]>([])
const userInfo = ref<GitHubUser | null>(null)
const loading = ref(true)
const error = ref(false)

const langColors: Record<string, string> = {
  Go: '#00ADD8',
  Java: '#b07219',
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  'C#': '#178600',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Jupyter: '#DA5B0B',
  Vue: '#41b883',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days < 1) return 'today'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
}

onMounted(async () => {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=owner`),
    ])
    if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')
    userInfo.value = await userRes.json()
    repos.value = await reposRes.json()
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <section id="github" class="py-20 sm:py-28 bg-[#0f0f0f]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
        GitHub Activity
      </h2>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-2 border-accent-500 border-t-transparent rounded-full animate-spin" />
        <p class="mt-3 text-dark-400 text-sm">Loading GitHub data...</p>
      </div>

      <div v-else-if="error" class="text-center py-12">
        <p class="text-dark-400">Could not load GitHub data. Visit the profile directly:</p>
        <a :href="profile.githubUrl" target="_blank" rel="noopener noreferrer" class="text-accent-500 hover:text-accent-400 mt-2 inline-block">
          {{ profile.githubUrl }}
        </a>
      </div>

      <template v-else>
        <!-- GitHub contribution graph image -->
        <div class="mb-10 bg-white/5 rounded-2xl p-5 border border-white/10 overflow-x-auto">
          <img
            :src="`https://ghchart.rshah.org/f97316/${username}`"
            :alt="`${username}'s GitHub contribution graph`"
            class="w-full h-auto min-w-[700px]"
          />
        </div>

        <!-- Stats row -->
        <div v-if="userInfo" class="grid grid-cols-3 gap-4 mb-10">
          <div class="text-center bg-white/5 rounded-2xl p-4 border border-white/10">
            <div class="text-2xl font-bold text-accent-500">{{ userInfo.public_repos }}</div>
            <div class="text-xs text-dark-400 mt-1">Public Repos</div>
          </div>
          <div class="text-center bg-white/5 rounded-2xl p-4 border border-white/10">
            <div class="text-2xl font-bold text-accent-500">{{ userInfo.followers }}</div>
            <div class="text-xs text-dark-400 mt-1">Followers</div>
          </div>
          <div class="text-center bg-white/5 rounded-2xl p-4 border border-white/10">
            <div class="text-2xl font-bold text-accent-500">{{ userInfo.following }}</div>
            <div class="text-xs text-dark-400 mt-1">Following</div>
          </div>
        </div>

        <!-- Recent repos -->
        <h3 class="text-lg font-semibold text-white mb-4">Recently Updated Repositories</h3>
        <div class="grid sm:grid-cols-2 gap-4">
          <a
            v-for="repo in repos"
            :key="repo.name"
            :href="repo.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="group bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-accent-500/30 transition-all"
          >
            <div class="flex items-start justify-between gap-2">
              <h4 class="text-sm font-semibold text-white group-hover:text-accent-500 transition-colors truncate">
                {{ repo.name }}
              </h4>
              <span class="text-xs text-dark-500 shrink-0">{{ timeAgo(repo.updated_at) }}</span>
            </div>
            <p v-if="repo.description" class="mt-2 text-xs text-dark-400 leading-relaxed line-clamp-2">
              {{ repo.description }}
            </p>
            <div class="mt-3 flex items-center gap-4 text-xs text-dark-500">
              <span v-if="repo.language" class="flex items-center gap-1.5">
                <span
                  class="w-2.5 h-2.5 rounded-full"
                  :style="{ backgroundColor: langColors[repo.language] || '#8b949e' }"
                />
                {{ repo.language }}
              </span>
              <span v-if="repo.stargazers_count" class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                {{ repo.stargazers_count }}
              </span>
              <span v-if="repo.forks_count" class="flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"/></svg>
                {{ repo.forks_count }}
              </span>
            </div>
          </a>
        </div>

        <div class="mt-8 text-center">
          <a
            :href="profile.githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-xl hover:bg-accent-500/20 transition-colors"
          >
            View Full GitHub Profile
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </template>
    </div>
  </section>
</template>
