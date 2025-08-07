<script setup lang="ts">
import { Toast } from 'primevue'
import { RouterView } from 'vue-router'
import AdminTopbar from './AdminTopbar.vue'
import AdminFooter from './AdminFooter.vue'
</script>

<template>
  <div class="layout-container">
    <AdminTopbar />
    <div class="layout-grid">
      <RouterView />
    </div>
    <AdminFooter />
  </div>
  <Toast />
</template>
