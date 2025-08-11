<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView } from 'vue-router'
import PublicTopbar from './PublicTopbar.vue';
import PublicFooter from './PublicFooter.vue';
</script>

<template>
  <div>
    <PublicTopbar />
    <RouterView />
    <PublicFooter />
  </div>
  <Toast />
</template>
