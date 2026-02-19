<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import ScrollProgress from '@/components/ScrollProgress.vue'
import RevealOnScroll from '@/components/RevealOnScroll.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import AwardsSection from '@/components/AwardsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import PublicationsSection from '@/components/PublicationsSection.vue'
import CertificationsSection from '@/components/CertificationsSection.vue'
import FooterSection from '@/components/FooterSection.vue'
import BackToTop from '@/components/BackToTop.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0f0f0f] text-dark-200">
    <ScrollProgress />
    <NavBar />
    <BackToTop />
    <main>
      <HeroSection />
      <RevealOnScroll>
        <AboutSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <ExperienceSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <EducationSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <SkillsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <AwardsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <ProjectsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <PublicationsSection />
      </RevealOnScroll>
      <RevealOnScroll>
        <CertificationsSection />
      </RevealOnScroll>
    </main>
    <FooterSection />
  </div>
</template>
