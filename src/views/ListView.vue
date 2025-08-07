<script setup lang="ts">
import { ref, reactive  } from 'vue';
import { useRoute } from 'vue-router';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import type { List } from '../types';
import { Galleria } from 'primevue'; 
import listsData from '../lists.json';
import pic1 from '@/assets/images/1/1.jpg';
import pic2 from '@/assets/images/1/2.jpg';
import pic3 from '@/assets/images/1/3.jpg';
import pic4 from '@/assets/images/1/4.jpg';
import pic5 from '@/assets/images/1/5.jpg';
 

defineProps({

})

const route = useRoute();
const listId = route.params.id;

const state = reactive({
  list: listsData.lists[0] as List,
  isLoading: false,

})

const images = ref([
  {
    itemImageSrc: pic1,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title A'
},
{
    itemImageSrc: pic2,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
    alt: 'Description for Image 2',
    title: 'Title B'
},
{
    itemImageSrc: pic3,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
    alt: 'Description for Image 2',
    title: 'Title 2'
},
{
    itemImageSrc: pic4,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
    alt: 'Description for Image 3',
    title: 'Title 3'
},
{
    itemImageSrc: pic5,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},
{
    itemImageSrc: pic1,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg',
    alt: 'Description for Image 2',
    title: 'Title 2'
},
{
    itemImageSrc: pic3,
    thumbnailImageSrc: 'https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg',
    alt: 'Description for Image 3',
    title: 'Title 3'
}
]);
 
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

// function wait(ms: number) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

//  onMounted( async () => {
//   try {
//     state.isLoading = true;
//     await wait(1000);
//     const response = await axios.get(`http://localhost:5000/jobs/${jobId}`);
//     console.log('response: ', response.data)
//     state.job = response.data;     

//   } catch (error) {
//     console.log('Error fetching jobs. ', error)
//   } finally {
//      state.isLoading = false;
//   }
//  })


</script>

<template>
  <section  v-if="!state.isLoading" class="">
    <div class="container m-auto py-6 px-6 md:mx-12 lg:mx-12 lg:px-6">
      <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <div class="w-full">

        <Galleria class="" :value="images" :responsiveOptions="responsiveOptions"  thumbnailsPosition="right" containerStyle="width: 100%; max-height: 500px;" verticalThumbnailViewPortHeight="85%"    :showItemNavigators="true"   :circular="true">
            <template #item="slotProps">
                <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
            </template>
            <template #thumbnail="slotProps">
                <div class="grid gap-4 justify-center">
                    <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;" />
                </div>
            </template>
        </Galleria>
      
        <div class="block-wrap bg-white p-6 rounded-lg shadow-md mt-8 flex  ">          
          <div class="div-left w-2/3 pr-4">
            <div class="info-wrap w-full mb-4">
              <h2 class="text-2xl font-bold mb-2">${{ state.list.price }} / month</h2>
              <p> {{ state.list.address.street }}, {{ state.list.address.city }} </p>
  
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
                :src="state.list.mapUrl" 
                width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          </div>
        </div>

        <div class="block-wrap bg-white p-6 rounded-lg shadow-md mt-4">
          <div class="block-title-wrap">
            <h4>Description</h4>	
          </div>
          <div class="description-content">
            <p>{{ state.list.description }}</p>
          </div>
          <h4>Contact</h4>	
          <div class="contact-info">
            <p>Name: {{ state.list.contact.name }}</p>
            <p>Email: {{ state.list.contact.email }}</p>
            <p>Phone: {{ state.list.contact.phone }}</p>
          </div>
          <div class="contact-btns mt-4">
          <Button
            as="a"
            severity="info"
            href="#"
            class="secondary mr-3"
            >Request a tour
          </Button>
          <Button
            severity="secondary"
            class="w-32"
          >
            Message
          </Button>
          </div>
        </div>
        
          <!-- Manage -->
        <div class="block-wrap bg-white p-6 rounded-lg shadow-md mt-6">
          <div class="block-title-wrap" >
            <h4 >Manage Listing</h4>
          </div>
          
          <Button
            as="a"
            severity="secondary"
            :href="`/listings/edit/${listId}`"
            class="secondary mr-2"
            >Edit Listing
          </Button>
          <Button
            severity="danger"
          >
            Delete Listing
          </Button>
        </div>
      </div>
    </div>
    
  </section>
  <div v-else class="text-center mt-16">
    <PulseLoader />
  </div>
</template>

<style scoped>
  .block-wrap {
    padding: 30px;
    background-color: #fff;
  }

  .block-title-wrap {
    border-bottom: 1px solid #dce0e0;
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
</style>