<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { Button, IconField, InputIcon, InputText } from 'primevue'

const slideImg = [
  { url: '/images/landing/chicago.jpg', label: 'Chicago' },
  { url: '/images/landing/new-york.jpg', label: 'New York' },
  { url: '/images/landing/miami-beach.jpg', label: 'Miami Beach' },
]

const currentIndex = ref(0)
const selectedSlide = ref(slideImg[0])
const intervalId = ref<number | null>(null)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slideImg.length
  selectedSlide.value = slideImg[currentIndex.value]
}

onMounted(() => {
  // Start the infinite scrolling animation
  intervalId.value = setInterval(nextSlide, 4000) // Change every 3 seconds
})

onUnmounted(() => {
  // Clean up the interval when component is unmounted
  if (intervalId.value) {
    clearInterval(intervalId.value)
  }
})
</script>

<template>
  <div id="hero" class="flex flex-col">
    <main class="slide-image-container overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          :key="selectedSlide.label"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1, scale: 1.1 }"
          :exit="{ opacity: 0 }"
          :transition="{
            duration: 1,
            ease: 'linear',
            scale: { duration: 3, delay: 0.2 },
          }"
          class="slide-image"
        >
          <img :src="selectedSlide.url" :alt="selectedSlide.label" />
        </motion.div>
      </AnimatePresence>

      <div class="slide-background-overlay"></div>
    </main>

    <div class="slide-container slide-column-gap-default ">
      <div class="w-full search-box">
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search location" />
          <Button label="Search" class="!ml-2" />
        </IconField>
      </div>
      <div class="w-full text-center mt-6 slide-label text-surface-0">
        <p class="text-4xl font-bold">Find a place to stay</p> 
      </div>
    </div>

    <!-- <div class="slide-shape slide-shape-bottom" aria-hidden="true" data-negative="false">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
        <path class="slide-shape-fill" d="M0,6V0h1000v100L0,6z"></path>
      </svg>
    </div> -->
  </div>
</template>

<style scoped>
#hero {
  margin-top: -105px;
}

.slide-image-container {
  width: 100%;
  min-height: 430px;
  margin: 0 auto;
  position: absolute;
  display: flex;
  align-items: center;
  overflow: hidden;
}



.slide-image {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.slide-image img {
  width: 100%;
  height: 580px;
  object-fit: fill;
}

.slide-background-overlay {
  background-color: transparent;
  background-image: linear-gradient(180deg, rgba(0, 66, 116, 0.35) 0%, #004274 100%);
  opacity: 1;
  transition:
    background 0.3s,
    border-radius 0.3s,
    opacity 0.3s;
}

.slide-background-overlay {
  inset: 0;
  position: absolute;
  /* border: 2px solid blue; */
}

.slide-container {
  min-height: 530px;
  max-width: 1140px;
  /* border: 1px solid green; */
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* width: 600px; */
}

.slide-container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.slide-shape {
  direction: ltr;
  left: 0;
  line-height: 0;
  overflow: hidden;
  position: absolute;
  width: 100%;
  transform: rotate(180deg);
}

.slide-shape-bottom {
  bottom: 70px;
}

.slide-shape-bottom svg {
  height: 90px;
  transform: translateX(-50%) rotateY(180deg);
}

.slide-shape svg {
  display: block;
  left: 50%;
  position: relative;
  /* // transform: translateX(-50%); */
  width: calc(100% + 1.3px);
}

.slide-shape .slide-shape-fill {
  fill: #f1f5f9;
  transform: rotateY(0deg);
  transform-origin: center;
}

.slide-background-overlay {
  inset: 0;
  position: absolute;
}

/* Responsive design */
/* @media (max-width: 768px) {
  .slide-image {
    width: 300px;
    height: 225px;
  }
  
  .slide-label {
    font-size: 24px;
  }
  
  .progress-container {
    width: 150px;
  }
} */
</style>
