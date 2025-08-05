<script setup lang="ts">
import FeaturesWidget from '@/components/home/FeaturesWidget.vue'
import HighlightsWidget from '@/components/home/HighlightsWidget.vue'
import FooterWidget from '@/components/home/FooterWidget.vue'
import HeroWidget from '@/components/home/HeroWidget.vue'
import TopbarWidget from '@/components/home/TopbarWidget.vue'
</script>

<template>
  <div class="dark:bg-surface-900">
    <div id="home" class="landing-wrapper overflow-hidden">
      <TopbarWidget />
      <HeroWidget />
      <FeaturesWidget />
      <HighlightsWidget />
      <FooterWidget />
    </div>
  </div>
</template>

<style scoped></style>
