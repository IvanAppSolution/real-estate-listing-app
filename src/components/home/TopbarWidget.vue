<script setup lang="ts">
import { Button } from 'primevue'

function smoothScroll(id: string) {
  document.body.click()
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
}
</script>

<template>
  <div
    class="py-6 px-6 mx-6 md:mx-12 lg:mx-20 lg:px-20 flex items-center justify-between relative lg:static z-20"
  >
    <!-- <div class="flex items-center justify-between z-20"> -->
    <a class="flex items-center z-20" href="#">
      <img src="/images/logo.png" alt="Logo" class="" />
      <span class="text-surface-0 font-medium text-2xl leading-normal">Urban Stay</span>
    </a>
    <Button
      class="lg:!hidden"
      text
      severity="secondary"
      rounded
      v-styleclass="{
        selector: '@next',
        enterFromClass: 'hidden',
        enterActiveClass: 'animate-scalein',
        leaveToClass: 'hidden',
        leaveActiveClass: 'animate-fadeout',
        hideOnOutsideClick: true,
      }"
    >
      <i class="pi pi-bars !text-2xl"></i>
    </Button>
    <!-- </div> -->
    <div
      class="items-center dark:bg-surface-900 grow justify-between md:hidden lg:flex absolute lg:static w-1/2 left-0 top-full px-12 lg:px-0 z-20 rounded-border"
    >
      <ul
        class="ml-20 list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8"
      >
        <li>
          <a @click="smoothScroll('hero')" class="px-0 py-4 text-surface-0 font-medium text-xl">
            <span>Home</span>
          </a>
        </li>
        <li>
          <a @click="smoothScroll('features')" class="px-0 py-4 text-surface-0 font-medium text-xl">
            <span>Features</span>
          </a>
        </li>
        <li>
          <a
            @click="smoothScroll('highlights')"
            class="px-0 py-4 text-surface-0 font-medium text-xl"
          >
            <span>Highlights</span>
          </a>
        </li>
      </ul>
      <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
        <Button label="Login" text as="router-link" to="/login" rounded></Button>
        <Button label="Register" to="/login" rounded></Button>
      </div>
    </div>
  </div>
</template>
