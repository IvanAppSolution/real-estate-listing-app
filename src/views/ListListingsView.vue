<script setup lang="ts" name="ListListings">
import { onMounted, reactive, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/axios';
import { Button, IconField, InputIcon, InputText, ProgressSpinner } from 'primevue';
import type { List } from '../types';
import Card from '@/components/list/Card.vue';

const route = useRoute();
const router = useRouter();

const state = reactive({
  lists: [] as List[],
  isLoading: false,
  searchQuery: ''
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const getSearchFromUrl = (): string => {
  const searchParam = route.query.search;
  if (typeof searchParam === 'string') {
    return searchParam;
  }
  return '';
}

const updateUrlWithSearch = (query: string) => {
  const currentQuery = { ...route.query };
  
  if (query.trim()) {
    currentQuery.search = query;
  } else {
    delete currentQuery.search;
  }
  
  void router.replace({ 
    path: route.path, 
    query: currentQuery 
  });
}

const filteredLists = computed(() => {
  if (!state.searchQuery.trim()) {
    return state.lists;
  }

  const query = state.searchQuery.toLowerCase().trim();
  
  return state.lists.filter(list => {
    const nameMatch = list.name?.toLowerCase().includes(query);
    const descriptionMatch = list.description?.toLowerCase().includes(query);
    const categoryMatch = list.category?.toLowerCase().includes(query);
    const propertyTypeMatch = list.propertyType?.toLowerCase().includes(query);
    
    const addressMatch = [
      list.address?.street,
      list.address?.city,
      list.address?.state,
      list.address?.zip
    ].some(field => field?.toLowerCase().includes(query));
    
    return nameMatch || descriptionMatch || categoryMatch || propertyTypeMatch || addressMatch;
  });
});


const clearSearch = () => {
  state.searchQuery = '';
  updateUrlWithSearch('');
}

const debouncedUpdateUrl = (query: string) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
  
  debounceTimer = setTimeout(() => {
    updateUrlWithSearch(query);
  }, 300);
}

watch(
  () => state.searchQuery,
  (newQuery) => {
    debouncedUpdateUrl(newQuery);
  }
);

watch(
  () => route.query.search,
  (newSearch) => {
    const searchValue = typeof newSearch === 'string' ? newSearch : '';
    if (searchValue !== state.searchQuery) {
      state.searchQuery = searchValue;
    }
  }
);

onMounted(async () => {

  state.searchQuery = getSearchFromUrl();
  
  try {
    state.isLoading = true;
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
  <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6">
    <div class="px-6 mb-4 md:m-0 lg:m-0">
      <!-- Search Section -->
      <div class="">
        <div class="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
          <div class="flex">
            <IconField iconPosition="left" class="">
              <InputIcon class="pi pi-search" />
              <InputText 
                placeholder="Search..." 
                v-model="state.searchQuery"
                class="w-full"
                @keyup.enter="() => {}"
              />
            </IconField>
            
            <Button 
              v-if="state.searchQuery"
              icon="pi pi-times" 
              severity="secondary" 
              outlined 
              @click="clearSearch"
              v-tooltip="'Clear search'"
              class="shrink-0 ml-2"
            />
          </div>
          
          <Button 
            label="Add Listing" 
            as="router-link" 
            to="/listings/add" 
            class="ml-4" 
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
      
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <ProgressSpinner />
      </div>
      
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
      
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 justify-center">
        <Card 
          v-for="list in filteredLists" 
          :key="list.id" 
          :list="list" 
        />
      </div>
    </div>
  </div>
</template>