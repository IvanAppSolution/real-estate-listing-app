<script setup lang="ts" name="ListListings">
import { onMounted, reactive } from 'vue';
import api from '@/axios';
// import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { RouterLink } from 'vue-router';
import { Button, IconField, InputIcon, InputText } from 'primevue';
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

 onMounted( async () => {
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
  <section class="px-4 py-5"> 
    <div class="container-xl lg:container m-auto">
      <div class="mt-4">
        <IconField>
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" v-model="state.searchQuery" />
          <Button as="router-link" :to="`/listings?search=${state.searchQuery}`" label="Search" class="!ml-2" />
        </IconField>
        <div v-if="state.lists.length" class="text-gray-500 py-6 hidden">Results for :</div>
      </div>
      
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6"><ProgressSpinner /></div>
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
        <Card v-for="(list, i) in state.lists" :key="i" :list="list" />      </div>
      </div>
  </section>
  <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
    <RouterLink
      to="/listings"
      class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Listings</RouterLink>
  </section>
</template>