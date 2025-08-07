<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView } from 'vue-router'
import PublicTopbar from './PublicTopbar.vue';
import PublicFooter from './PublicFooter.vue';
</script>

<template>
  <div>
    <PublicTopbar />
    <div class="py-6 mx-6 md:mx-12 lg:mx-12 lg:px-6">
      <RouterView />
    </div>
    <PublicFooter />
  </div>
  <Toast />
</template>
