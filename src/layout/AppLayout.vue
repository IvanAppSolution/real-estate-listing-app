<script setup lang="ts">
import { Toast } from 'primevue'
import AppFooter from './AppFooter.vue'
import AppTopbar from './AppTopbar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="layout-container">
    <AppTopbar />
    <div class="layout-grid">
      <RouterView />
    </div>
    <AppFooter />
  </div>
  <Toast />
</template>
