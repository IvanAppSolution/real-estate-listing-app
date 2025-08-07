<script setup lang="ts" name="ListListings">
import { onMounted, reactive } from 'vue';
// import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { RouterLink } from 'vue-router';
import { Button, IconField, InputIcon, InputText } from 'primevue';
import type { List } from '../types';
import listsData from '../lists.json';
import Card from '@/components/list/Card.vue';
 

 defineProps({
    limit: Number,
    showButton: {
      type: Boolean,
      default: false,
    },
 })

const state = reactive({
  lists: listsData.lists as List[],
  isLoading: false,
 })

//  const state = reactive({
//   jobs: [] as Job[],
//   isLoading: false,
//  })

 function wait(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
 onMounted( async () => {
  try {
    state.isLoading = true;
    await wait(500);
    // const response = await axios.get('http://localhost:5000/jobs');
    // state.jobs = response.data;     

  } catch (error) {
    console.log('Error fetching jobs. ', error)
  } finally {
     state.isLoading = false;
  }
 })
</script>

<template>
  <section class="px-4 py-5"> 
    <div class="container-xl lg:container m-auto">
      <div class="mb-6">
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" />
          <Button label="Search" class="!ml-2" />
        </IconField>
        <div v-if="state.lists.length" class="text-gray-500 py-6 hidden">Results for :</div>
      </div>
      
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6"><PulseLoader /></div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        <Card v-for="(list, i) in state.lists.slice(0, limit || state.lists.length)" :key="i" :list="list" />      </div>
    </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/listings"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Listings</RouterLink>
  </section>
   

 

</template>