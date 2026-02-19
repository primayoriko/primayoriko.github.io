<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutSection from '@/components/AboutSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import EducationSection from '@/components/EducationSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import AwardsSection from '@/components/AwardsSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen bg-[#0f0f0f] text-dark-200">
    <NavBar />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <AwardsSection />
      <ProjectsSection />
    </main>
    <FooterSection />
  </div>
</template>
