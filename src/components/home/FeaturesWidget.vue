<script setup lang="ts">
import { ref, reactive } from 'vue'
import listsData from '../../lists.json';
import type { List } from '@/types';
import { Carousel } from 'primevue';
import Card from '../list/Card.vue';

const state = reactive({
  lists: listsData.lists,
  isLoading: false,
 })

const responsiveOptions = ref([
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])

</script>
<template>
  <div id="features" class="py-6 px-2 lg:px-6 mt-20 mx-0 lg:mx-4 relative">
    <Carousel
      :value="state.lists"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <Card :list="slotProps.data" />
      </template>
    </Carousel> 
  </div>
</template>

<style scoped>
 

 
</style>
