<script setup lang="ts">
import HighlightsWidget from '@/components/home/HighlightsWidget.vue'
import HeroWidget from '@/components/home/HeroWidget.vue'
import PublicFooter from '@/layout/PublicFooter.vue'
import FeaturesWidget from '@/components/home/FeaturesWidget.vue'
import HighlightExtraWidget from '@/components/home/HighlightExtraWidget.vue'
</script>

<template>
  <div class="dark:bg-surface-900">
    <div id="home" class="landing-wrapper overflow-hidden">
      <TopbarWidget />
      <HeroWidget />
      <FeaturesWidget />
      <HighlightsWidget />
      <HighlightExtraWidget />
      <PublicFooter />
    </div>
  </div>
</template>

<style scoped></style>
