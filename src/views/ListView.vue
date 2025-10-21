<script setup lang="ts">
import { ref, reactive, onMounted  } from 'vue';
import { useRoute } from 'vue-router';
import type { List } from '../types';
import { Galleria, ProgressSpinner, useToast } from 'primevue'; 
import api from '@/axios';
import router from '@/router';
import { useAuth } from '@/composables/useAuth';

const route = useRoute();
const id = route.params.id;
const { user } = useAuth();
const toast = useToast();

const state = reactive({
  list: {} as List,
  isLoading: false,
  isReady: false
})
 
const responsiveOptions = ref([
    {
        breakpoint: '1300px',

        numVisible: 6
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);


onMounted (async () => {
  try {
    const response = await api.get(`/api/list/${id}`);
    Object.assign(state.list, response.data.data);
    state.isReady = true;
  } catch(error) {
    console.log('error', error)
  }
})

</script>

<template>
  <section  class="">
    <div class="container m-auto py-6 px-6 md:mx-12 lg:mx-12 lg:px-6">
      <div v-if="!state.isReady" class="flex justify-center items-center h-64">
        <ProgressSpinner class="w-64 m-auto" />
      </div>
      <div v-else class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <div class="w-full">

        <Galleria class="" :value="state.list.images" :responsiveOptions="responsiveOptions"  thumbnailsPosition="right" containerStyle="width: 100%; max-height: 500px;" verticalThumbnailViewPortHeight="85%"    :showItemNavigators="true"   :circular="true">
            <template #item="slotProps">
                <img :src="slotProps.item" style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <div class="grid gap-4 justify-center">
                    <img :src="slotProps.item" style="width: 100%; display: block;" />
                </div>
            </template>
        </Galleria>
      
        <div class="block-wrap bg-white p-6 rounded-lg shadow-md mt-8 flex  ">          
          <div class="div-left w-2/3 pr-4">
            <div class="info-wrap w-full mb-4">
              <h2 class="text-2xl font-bold mb-2">${{ state.list.price }} / month</h2>
              <p> {{ state.list.address.street }}, {{ state.list.address.city }}, {{ state.list.address.state }} </p>

            </div> 
            <ul class="feature-list list-none p-0 m-0 mb-4 flex justify-start">
              <li class="flex">
                <unicon
                      name="bed"
                      width="26"
                      height="26"
                      class="icon">
                  </unicon>
                  <div>
                    <span class="font-bold"> {{ state.list.numBedroom }}</span><br/>
                     Bedrooms
                  </div> 
              </li>
              <li class="flex">
                <unicon
                      name="bath"
                      width="26"
                      height="26"
                      class="icon">
                  </unicon>
                  <div>
                    <span class="font-bold">{{ state.list.numBedroom }}</span><br/>
                     Bathroom
                  </div>
                  
              </li>
              <li class="flex">
                <unicon
                      name="ruler"
                      width="26"
                      height="26"
                      class="icon">
                  </unicon>
                  <div>
                    <span class="font-bold"> {{ state.list.area }}</span><br/>
                     Area Size
                  </div>
              </li>
            </ul>
            <ul class="feature-list list-none p-0 m-0 flex justify-start ">
              <li class="flex">
                <unicon
                    name="estate"
                    width="26"
                    height="26"
                    class="icon">
                </unicon>
                <div>
                  <span class="font-bold"> Property Type</span><br/>
                  {{ state.list.propertyType }}
                </div>
              </li>
              <li class="flex">
                <unicon
                      name="car-sideview"
                      width="26"
                      height="26"
                      class="icon">
                  </unicon>
                  <div>
                    <span class="font-bold"> {{ state.list.garage }}</span><br/>
                     Garage
                  </div> 
              </li>
              <li class="flex">
                <unicon
                      name="calendar-alt"
                      width="26"
                      height="26"
                      class="icon">
                  </unicon>
                  <div>
                    <span class="font-bold"> {{ state.list.yearBuilt }}</span><br/>
                     Year Built
                  </div> 
              </li>
              
            </ul>
          </div>
          
          <div class="div-right w-1/3 " >
            <div class="map-wrapper">
              <iframe 
                :src="state.list.address.mapUrl" 
                width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          </div>
        </div>

        <div class="block-wrap bg-white p-6 rounded-lg shadow-md mt-4">
          <div class="block-title-wrap">
            <h4>{{ state.list.name }}</h4>	
          </div>
          <div class="description-content">
            <p>{{ state.list.description }}</p>
          </div>
          <h4>Contact</h4>	
          <div class="contact-info">
            <p>Name: {{ state.list?.contact?.name }}</p>
            <p>Email: {{ state.list?.contact?.email }}</p>
            <p>Phone: {{ state.list?.contact?.phone }}</p>
          </div>
          <div class="contact-btns mt-4">
          <Button 
            severity="info"
            class="secondary mr-3"
            disabled
            >Request a tour
          </Button>
          <Button
            severity="secondary"
            class="w-32"
            disabled
            variant="outlined"
          >
            Message
          </Button>
          </div>
        </div>
        
          <!-- Manage -->
        <div v-if="user && (user.id == state.list.userId || user.role === 'admin')" class="block-wrap bg-white p-6 rounded-lg shadow-md mt-6">
          <div class="block-title-wrap" >
            <h4 >Manage Listing</h4>
          </div>
          
          <Button
            as="router-link" 
            :to="`/listings/edit/${id}`"
            class="secondary w-40 mr-2"
            >Edit Listing
          </Button>
          <Button
            @click="router.back()"
            severity="secondary"
            variant="outlined"
            class="w-40">
            Cancel
          </Button>
        </div>
      </div>
    </div>
    
  </section>
</template>

<style scoped>
  .block-wrap {
    padding: 30px;
    background-color: #fff;
  }

  .block-title-wrap {
    margin-bottom: 30px; 
  }

  .unicon {
    vertical-align: middle;
    margin-right: 0.5rem;
    width: 30px;
    height: 30px;
  }

  .feature-list li {
    width: 33.33%;

  }

  .contact-info p {
    margin-bottom: 0.4rem;
  }

  .p-galleria-thumbnail img {
    width: 100px !important;
    height: 100px !important;
    object-fit: cover;
    overflow: hidden;
  }
</style>