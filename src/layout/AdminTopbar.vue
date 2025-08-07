<script setup lang="ts">
import { Button } from 'primevue'
import { useLayout } from '../composables/useLayout.js'
import AppConfig from '@/components/AppConfig.vue';

const { isDarkMode, toggleDarkMode } = useLayout()
</script>

<template>
  <div class="topbar py-6 mx-6 md:mx-12 lg:mx-12 lg:px-6">
    <div class="topbar-container">
      <div class="topbar-brand">
        <img src="/images/logo_1.png" alt="Logo" class="w-16" /> 
        <span class="topbar-brand-text">
          <h4>Urban Stay</h4>
          <span class="topbar-title">Admin Page</span>
        </span>
      </div>
      <div class="topbar-actions">
        <Button type="button" class="topbar-theme-button" @click="toggleDarkMode" text rounded>
          <i :class="['pi ', 'pi ', { 'pi-moon': isDarkMode, 'pi-sun': !isDarkMode }]" />
        </Button>
        <div class="relative">
          <Button
            v-styleclass="{
              selector: '@next',
              enterFromClass: 'hidden',
              enterActiveClass: 'animate-scalein',
              leaveToClass: 'hidden',
              leaveActiveClass: 'animate-fadeout',
              hideOnOutsideClick: true,
            }"
            icon="pi pi-cog"
            text
            rounded
            aria-label="Settings"
          />
          <AppConfig />
        </div>
      </div>
    </div>
  </div>
</template>
