import { ref, onMounted } from 'vue'
import { profile as fallbackProfile } from '@/data/profile'
import type { ProfileData, ExperienceType, Experience } from '@/types/profile'

const CACHE_KEY = 'linkedin-profile-cache'
const CACHE_TTL = 24 * 60 * 60 * 1000

interface LinkedInExperience {
  title: string
  company: string
  period: string
  location?: string
  description?: string
  duration?: string
}

interface LinkedInData {
  fetchedAt: string
  name?: string
  title?: string
  location?: string
  about?: string
  experiences?: LinkedInExperience[]
  education?: { degree: string; institution: string; period: string; location?: string }[]
  skills?: string[]
  certifications?: { name: string; issuer: string; issued: string; expires?: string; url?: string }[]
  publications?: { title: string; date: string; description: string; url?: string }[]
  courses?: { name: string; code: string }[]
  awards?: { title: string; issuer: string; year: string; description: string }[]
  projects?: { name: string; period: string; description: string; url?: string }[]
  languages?: { language: string; proficiency: string }[]
}

interface SectionStatus {
  name: boolean
  title: boolean
  location: boolean
  about: boolean
  experiences: boolean
  education: boolean
  skills: boolean
  certifications: boolean
  publications: boolean
  courses: boolean
  awards: boolean
  projects: boolean
  languages: boolean
}

// --- Experience type inference ---

function parseMonthYear(s: string): { month: number; year: number } | null {
  const months: Record<string, number> = {
    jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6,
    jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12,
  }
  const match = s.trim().match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})$/i)
  if (match) return { month: months[match[1].toLowerCase()], year: parseInt(match[2]) }
  const yearOnly = s.trim().match(/^(\d{4})$/)
  if (yearOnly) return { month: 1, year: parseInt(yearOnly[1]) }
  return null
}

function parsePeriod(period: string): { start: number; end: number } | null {
  const parts = period.split(/\s*[–-]\s*/)
  if (parts.length < 2) {
    const single = parseMonthYear(parts[0])
    if (single) {
      const m = single.year * 12 + single.month
      return { start: m, end: m }
    }
    return null
  }
  const start = parseMonthYear(parts[0])
  let end: { month: number; year: number } | null
  if (parts[1].trim().toLowerCase() === 'present') {
    const now = new Date()
    end = { month: now.getMonth() + 1, year: now.getFullYear() }
  } else {
    end = parseMonthYear(parts[1])
  }
  if (!start || !end) return null
  return { start: start.year * 12 + start.month, end: end.year * 12 + end.month }
}

function computeDurationMonths(period: string): number {
  const p = parsePeriod(period)
  if (!p) return 1
  return Math.max(1, p.end - p.start)
}

function periodsOverlap(a: { start: number; end: number }, b: { start: number; end: number }): boolean {
  // End of one role and start of another in same month = NOT collision
  return a.start < b.end && b.start < a.end
}

function inferExperienceType(
  exp: LinkedInExperience,
  allExps: LinkedInExperience[],
  typeMap: Map<string, { type: ExperienceType; durationMonths: number }>,
): { type: ExperienceType; durationMonths: number } {
  const key = `${exp.title}|||${exp.company}`
  const mapped = typeMap.get(key)
  if (mapped) return mapped

  // Also try matching by company+period for fuzzy match
  for (const [k, v] of typeMap) {
    const [mTitle, mCompany] = k.split('|||')
    if (exp.company.includes(mCompany) || mCompany.includes(exp.company)) {
      if (exp.title.includes(mTitle) || mTitle.includes(exp.title)) {
        return v
      }
    }
  }

  const duration = computeDurationMonths(exp.period)
  const thisPeriod = parsePeriod(exp.period)

  if (!thisPeriod) return { type: 'full-time', durationMonths: duration }

  // Check if any full-time role in the map overlaps
  const fullTimeRoles: { start: number; end: number; active: boolean; duration: number }[] = []
  for (const other of allExps) {
    if (other === exp) continue
    const otherKey = `${other.title}|||${other.company}`
    const otherMapped = typeMap.get(otherKey)
    if (!otherMapped) continue
    if (otherMapped.type !== 'full-time') continue
    const otherPeriod = parsePeriod(other.period)
    if (otherPeriod && periodsOverlap(thisPeriod, otherPeriod)) {
      const isCurrent = other.period.toLowerCase().includes('present')
      fullTimeRoles.push({ ...otherPeriod, active: isCurrent, duration: otherMapped.durationMonths })
    }
  }

  // Also check already-inferred untagged exps that got assigned full-time
  // (we process in order, so earlier ones may be full-time)

  if (fullTimeRoles.length > 0) {
    // Collision with full-time => voluntary
    return { type: 'voluntary', durationMonths: duration }
  }

  // Check collision with other untagged roles
  const collidingUntagged: LinkedInExperience[] = []
  for (const other of allExps) {
    if (other === exp) continue
    const otherKey = `${other.title}|||${other.company}`
    if (typeMap.has(otherKey)) continue // already known
    const otherPeriod = parsePeriod(other.period)
    if (otherPeriod && periodsOverlap(thisPeriod, otherPeriod)) {
      collidingUntagged.push(other)
    }
  }

  if (collidingUntagged.length === 0) {
    return { type: 'full-time', durationMonths: duration }
  }

  // Two untagged roles collide:
  // - If one is active (current) and other is not, active = full-time
  // - If both active, longest = full-time
  // - If neither active, longest = full-time
  const isCurrent = exp.period.toLowerCase().includes('present')

  for (const other of collidingUntagged) {
    const otherCurrent = other.period.toLowerCase().includes('present')
    if (isCurrent && !otherCurrent) return { type: 'full-time', durationMonths: duration }
    if (!isCurrent && otherCurrent) return { type: 'voluntary', durationMonths: duration }
    // Both same active status: longer one wins
    const otherDuration = computeDurationMonths(other.period)
    if (duration >= otherDuration) return { type: 'full-time', durationMonths: duration }
    return { type: 'voluntary', durationMonths: duration }
  }

  return { type: 'full-time', durationMonths: duration }
}

function buildTypeMap(fallbackExps: Experience[]): Map<string, { type: ExperienceType; durationMonths: number }> {
  const map = new Map<string, { type: ExperienceType; durationMonths: number }>()
  for (const exp of fallbackExps) {
    map.set(`${exp.title}|||${exp.company}`, { type: exp.type, durationMonths: exp.durationMonths })
  }
  return map
}

function convertLiveExperiences(
  liveExps: LinkedInExperience[],
  fallbackExps: Experience[],
): Experience[] {
  const typeMap = buildTypeMap(fallbackExps)

  return liveExps.map(exp => {
    const { type, durationMonths } = inferExperienceType(exp, liveExps, typeMap)

    // Find matching fallback for extra data (companyUrl, bullet-point descriptions, etc.)
    const fallback = fallbackExps.find(f =>
      (f.title === exp.title && f.company === exp.company) ||
      (f.company.includes(exp.company) || exp.company.includes(f.company)) &&
      (f.title.includes(exp.title) || exp.title.includes(f.title))
    )

    const description = fallback?.description ?? exp.description
    const isCurrent = exp.period.toLowerCase().includes('present')

    return {
      title: exp.title,
      company: exp.company,
      companyUrl: fallback?.companyUrl,
      period: exp.period.replace(/ - /g, ' – '),
      location: exp.location ?? fallback?.location,
      description,
      isCurrent: isCurrent || undefined,
      type,
      durationMonths,
    } satisfies Experience
  })
}

// --- Section merging ---

function mergeProfile(live: LinkedInData, fallback: ProfileData): { data: ProfileData; sections: SectionStatus } {
  const sections: SectionStatus = {
    name: false, title: false, location: false, about: false,
    experiences: false, education: false, skills: false,
    certifications: false, publications: false, courses: false,
    awards: false, projects: false, languages: false,
  }

  const result: ProfileData = { ...fallback }

  if (live.name) { result.name = live.name; sections.name = true }
  if (live.title) { result.title = live.title; sections.title = true }
  if (live.location) { result.location = live.location; sections.location = true }
  if (live.about) { result.about = live.about; sections.about = true }

  if (live.experiences && live.experiences.length > 0) {
    result.experiences = convertLiveExperiences(live.experiences, fallback.experiences)
    sections.experiences = true
  }

  if (live.education && live.education.length > 0) {
    result.education = live.education
    sections.education = true
  }

  if (live.skills && live.skills.length > 0) {
    result.skills = live.skills
    sections.skills = true
  }

  if (live.certifications && live.certifications.length > 0) {
    result.certifications = live.certifications.map(c => ({
      name: c.name,
      issuer: c.issuer,
      issued: c.issued,
      expires: c.expires,
      url: c.url,
    }))
    sections.certifications = true
  }

  if (live.publications && live.publications.length > 0) {
    result.publications = live.publications
    sections.publications = true
  }

  if (live.courses && live.courses.length > 0) {
    result.courses = live.courses
    sections.courses = true
  }

  if (live.awards && live.awards.length > 0) {
    result.awards = live.awards.map(a => ({
      title: a.title,
      issuer: a.issuer,
      year: a.year,
      description: a.description,
      level: fallback.awards.find(fa => fa.title.includes(a.title.slice(0, 20)))?.level ?? 'national',
    }))
    sections.awards = true
  }

  if (live.projects && live.projects.length > 0) {
    result.projects = live.projects
    sections.projects = true
  }

  if (live.languages && live.languages.length > 0) {
    result.languages = live.languages
    sections.languages = true
  }

  return { data: result, sections }
}

// --- Caching ---

function getCached(): LinkedInData | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const cached = JSON.parse(raw) as { timestamp: number; data: LinkedInData }
    if (Date.now() - cached.timestamp > CACHE_TTL) {
      localStorage.removeItem(CACHE_KEY)
      return null
    }
    return cached.data
  } catch {
    return null
  }
}

function setCache(data: LinkedInData) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ timestamp: Date.now(), data }))
  } catch { /* noop */ }
}

// --- Composable ---

export function useLinkedInData() {
  const profileData = ref<ProfileData>({ ...fallbackProfile })
  const liveSections = ref<SectionStatus>({
    name: false, title: false, location: false, about: false,
    experiences: false, education: false, skills: false,
    certifications: false, publications: false, courses: false,
    awards: false, projects: false, languages: false,
  })
  const loading = ref(true)

  function applyLiveData(live: LinkedInData) {
    const { data, sections } = mergeProfile(live, fallbackProfile)
    profileData.value = data
    liveSections.value = sections
  }

  onMounted(async () => {
    // Try cache first
    const cached = getCached()
    if (cached && Object.keys(cached).length > 1) {
      applyLiveData(cached)
      loading.value = false
      return
    }

    // Fetch build-time generated JSON
    try {
      const base = import.meta.env.BASE_URL || '/'
      const res = await fetch(`${base}linkedin-data.json`, { cache: 'no-cache' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      const data: LinkedInData = await res.json()

      if (Object.keys(data).length > 1) {
        setCache(data)
        applyLiveData(data)
      }
    } catch {
      // Silently fall back to static data
    } finally {
      loading.value = false
    }
  })

  return { profileData, liveSections, loading }
}
