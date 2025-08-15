<script setup lang="ts" name="ListListings">
import { onMounted, reactive, computed } from 'vue';
import api from '@/axios';
import { RouterLink } from 'vue-router';
import { Button, IconField, InputIcon, InputText, ProgressSpinner } from 'primevue';
import type { List } from '../types';
import Card from '@/components/list/Card.vue';

defineProps({
  limit: Number,
  showButton: {
    type: Boolean,
    default: false,
  },
})

const state = reactive({
  lists: [] as List[],
  isLoading: false,
  searchQuery: ''
})

// Computed property to filter lists based on search query
const filteredLists = computed(() => {
  if (!state.searchQuery.trim()) {
    return state.lists;
  }
  console.log('Filtering lists with query:', state.searchQuery);
  console.log('state.lists:', state.lists);
  const query = state.searchQuery.toLowerCase().trim();
  
  return state.lists.filter(list => {
    // Search in name
    const nameMatch = list.name?.toLowerCase().includes(query);
    
    // Search in description
    const descriptionMatch = list.description?.toLowerCase().includes(query);
    
    // Search in category
    const categoryMatch = list.category?.toLowerCase().includes(query);
    
    // Search in propertyType
    const propertyTypeMatch = list.propertyType?.toLowerCase().includes(query);
    
    // Search in address fields
    const addressMatch = [
      list.address?.street,
      list.address?.city,
      list.address?.state,
      list.address?.zip
    ].some(field => field?.toLowerCase().includes(query));
    
    // Return true if any field matches
    console.log('nameMatch: ', nameMatch);
    console.log('descriptionMatch: ', descriptionMatch);
    console.log('categoryMatch: ', categoryMatch);
    console.log('propertyTypeMatch: ', propertyTypeMatch);
    console.log('addressMatch: ', addressMatch);
    return nameMatch || descriptionMatch || categoryMatch || propertyTypeMatch || addressMatch;
  });
});

// Clear search
const clearSearch = () => {
  state.searchQuery = '';
}

onMounted(async () => {
  try {
    state.isLoading = true;
    // Fixed: Remove extra /api since it's already in baseURL
    const response = await api.get('/api/list');
    state.lists = response.data.data;
  } catch (error) {
    console.log('Error fetching lists. ', error)
  } finally {
    state.isLoading = false;
  }
})
</script>

<template>
  <section class="px-4 py-5"> 
    <div class="container-xl lg:container m-auto">
      <!-- Search Section -->
      <div class="mt-4">
        <div class="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
          <IconField iconPosition="left" class="">
            <InputIcon class="pi pi-search" />
            <InputText 
              placeholder="Search" 
              v-model="state.searchQuery"
              @keyup.enter="() => {}"
            />
          </IconField>
          
          <!-- Clear search button -->
          <Button 
            v-if="state.searchQuery"
            icon="pi pi-times" 
            severity="secondary" 
            outlined 
            @click="clearSearch"
            v-tooltip="'Clear search'"
            class="shrink-0"
          />
        </div>
        
        <!-- Search results info -->
        <div v-if="state.searchQuery" class="mt-4 text-sm text-gray-600">
          <span v-if="filteredLists.length > 0">
            Found {{ filteredLists.length }} result{{ filteredLists.length !== 1 ? 's' : '' }} 
            for "{{ state.searchQuery }}"
          </span>
          <span v-else>
            No results found for "{{ state.searchQuery }}"
          </span>
        </div>
      </div>
      
      <!-- Loading State -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <ProgressSpinner />
      </div>
      
      <!-- No Results -->
      <div v-else-if="filteredLists.length === 0 && !state.isLoading" class="text-center text-gray-500 py-12">
        <i class="pi pi-search text-4xl mb-4 block"></i>
        <p v-if="state.searchQuery" class="text-lg mb-2">No listings match your search criteria.</p>
        <p v-else class="text-lg mb-2">No listings available.</p>
        <Button 
          v-if="state.searchQuery" 
          label="Clear Search" 
          severity="secondary" 
          outlined 
          @click="clearSearch"
          class="mt-4"
        />
      </div>
      
      <!-- Listings Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card 
          v-for="list in filteredLists" 
          :key="list.id" 
          :list="list" 
        />
      </div>
    </div>
  </section>
  
  <!-- View All Button -->
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/listings"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
    >
      View All Listings
    </RouterLink>
  </section>
</template>