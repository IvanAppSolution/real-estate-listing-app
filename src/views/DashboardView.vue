<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import api from '@/axios';
import { Button} from 'primevue';
import type { List } from '../types';
import Card from '@/components/list/Card.vue';
const state = reactive({
  lists: [] as List[],
  isLoading: false,
})

onMounted(async () => {
  try {
    state.isLoading = true;
    const response = await api.get('/api/list/myListings');
    state.lists = response.data.data;
    
  } catch (error) {
    console.log('Error fetching lists. ', error)
  } finally {
    state.isLoading = false;
  }
})
</script>

<template>
  <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6">
    <div
      class="px-6 py-8 mb-4  m-4 md:m-0 lg:m-0"
      style="min-height: 500px;"
    >
      <div class="flex justify-between">
        <h1 class="text-3xl font-bold mb-6">My Listing</h1>
        <p>
          <Button 
            label="Add Listing" 
            as="router-link" 
            to="/listings/add" 
            class="ml-4" 
          />
        </p>
      </div>
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        Loading...
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        <Card v-for="(list, i) in state.lists" :key="i" :list="list" />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>