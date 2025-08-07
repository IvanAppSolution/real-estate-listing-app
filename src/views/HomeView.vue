<script setup lang="ts">
import HighlightsWidget from '@/components/home/HighlightsWidget.vue'
import HeroWidget from '@/components/home/HeroWidget.vue'
import HighlightsWidget2 from '@/components/home/HighlightsWidget2.vue'
import PublicFooter from '@/layout/PublicFooter.vue'
import FeaturesWidget from '@/components/home/FeaturesWidget.vue'
</script>

<template>
  <div class="dark:bg-surface-900">
    <div id="home" class="landing-wrapper overflow-hidden">
      <TopbarWidget />
      <HeroWidget />
      <FeaturesWidget />
      <HighlightsWidget />
      <HighlightsWidget2 />
      <PublicFooter />
    </div>
  </div>
</template>

<style scoped></style>
