<script setup lang="ts">
import { Button } from 'primevue'
import { RouterLink } from 'vue-router'

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

const clickMenuButton = () => {
  const menu = document.querySelector('.menu-content')
  if (menu) {
    menu.classList.toggle('hidden')
  }
  const button = document.querySelector('.top-bar-container button')
  if (button) {
    button.classList.toggle('hidden')
  }

}
// const clickMenu = () => {
//   const menu = document.querySelector('.top-bar-container')
//   if (menu) {
//     menu.classList.toggle('hidden')
//   }  
// }




</script>

<template>
  <div class="top-bar-wrapper w-full">
    <div
      class="top-bar-container py-6 mx-6 md:mx-12 lg:mx-12 lg:px-6 flex items-center justify-between relative lg:static z-20"
    > 
      <RouterLink to="/" class="flex items-center z-20" >
        <img src="/images/logo3.png" alt="Logo" class="" />
        <span class="text-surface-0 font-medium text-2xl leading-normal">Urban Stay</span>
      </RouterLink>
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
      
      <div 
        class="menu-content items-center dark:bg-surface-900 grow justify-between  hidden lg:flex absolute lg:static w-3/4 left-0 top-full px-12 lg:px-0 z-20 rounded-border"
      >
        <ul
          class="ml-20 list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8"
        >
          <li>
            <RouterLink
              to="/"
              class="px-0 py-4 text-surface-0 font-medium text-xl"
            >
              <span>Home</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/listings"
              class="px-0 py-4 text-surface-0 font-medium text-xl"
            >
              <span>Listings</span>
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/listings"
              class="px-0 py-4 text-surface-0 font-medium text-xl"
            >
              <span>Features</span>
            </RouterLink>
          </li>
         
        </ul>
        <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
          <Button label="Login" text as="router-link" to="/login" style="color:white;" rounded></Button>
          <Button label="Register" to="/login" rounded></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

  .menu-content {
    background-color: #004274;
  }
  .top-bar-wrapper {
    background-color: #004274;
  }

  .top-bar-container {
    background-color: #004274;
  }


</style>