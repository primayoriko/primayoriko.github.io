export type ExperienceType = 'full-time' | 'part-time' | 'internship' | 'voluntary'

export interface Experience {
  title: string
  company: string
  companyUrl?: string
  period: string
  location?: string
  description?: string | string[]
  isCurrent?: boolean
  type: ExperienceType
  durationMonths: number
}

export interface Education {
  degree: string
  institution: string
  period: string
  location?: string
}

export interface Award {
  title: string
  issuer: string
  year: string
  description: string
  level: 'international' | 'national' | 'regional' | 'campus'
}

export interface Project {
  name: string
  period: string
  description: string
  url?: string
}

export interface Publication {
  title: string
  date: string
  description: string
  url?: string
}

export interface Certification {
  name: string
  issuer: string
  issued: string
  expires?: string
  url?: string
}

export interface ProfileData {
  name: string
  title: string
  location: string
  about: string
  githubUrl: string
  linkedinUrl: string
  experiences: Experience[]
  education: Education[]
  skills: string[]
  awards: Award[]
  projects: Project[]
  publications: Publication[]
  certifications: Certification[]
  languages: { language: string; proficiency: string }[]
}
