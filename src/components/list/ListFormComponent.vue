<script setup lang="ts">
import { defineProps } from 'vue';
import { type ListForm } from '@/types';
import router from '@/router';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import { Button } from 'primevue';
import { Form, type FormSubmitEvent } from '@primevue/forms';

defineProps<{
  initialValues: ListForm;
}>();

const emit = defineEmits<{
  (event: 'submit', { valid, values } : FormSubmitEvent): void;
  (event: 'delete'): void;
}>();


</script>

<template> 
  <Form :initialValues="initialValues" :validateOnBlur="true"  @submit="emit('submit', $event)" class="flex flex-col gap-4 ">
      <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2"
            >Name</label>
          <InputText
            id="name"
            name="name"            
            class="border rounded w-full py-2 px-3" 
          />
        </div>

        <div class="mb-4">
          <label
            for="description"
            class="block text-gray-700 font-bold mb-2"
            >Description</label>
          <Textarea
            id="description"
            name="description"
            class="border rounded w-full py-2 px-3"
            rows="4"
          ></Textarea>
        </div>

        <div class="flex gap-4 mb-4">
          <div class="w-1/2">
            <label class="block text-gray-700 font-bold mb-2"
              >Category</label>
            <Select
              id="category"
              name="category"
              class="border rounded w-full py-2 px-3"
              :options="['Residential', 'Commercial', 'Industrial']"
              required
            >
            </Select>
          </div>

          <div class="w-1/2">
            <label class="block text-gray-700 font-bold mb-2"
              >Property Type</label>
            <Select
              id="propertyType"
              name="propertyType"
              class="border rounded w-full py-2 px-3"
              :options="['Apartment', 'Villa', 'House', 'Condo']"
              required
            >
            </Select>
          </div>
        </div>

        <div class="flex justify-between gap-4">
          <div class="mb-4 w-1/2">
            <label class="block text-gray-700 font-bold mb-2">
              Price
            </label>
            <InputText
              type="number"
              id="price"
              name="price"
              class="border rounded w-full py-2 px-3 mb-2"
            /> 
          </div>
          <div class="mb-4 w-1/2">
            <label class="block text-gray-700 font-bold mb-2">
              Area Size
            </label>
            <InputText
              type="text"
              id="areaSize"
              name="area"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="e.g. 1500 sq ft"

            /> 
          </div>
        </div>

        <div class="flex justify-between">
          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >No. Bedrooms</label>
            <InputText
              type="number"
              id="numBedroom"
              name="numBedroom"
              class="border rounded w-full py-2 px-3 mb-2"
              />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >No. Bathrooms</label
            >
            <InputText
              type="number"
              id="numBathroom"
              name="numBathroom"
              class="border rounded w-full py-2 px-3 mb-2"
              />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >No. Garage</label>
            <InputText
              type="number"
              id="garage"
              name="garage"
              class="border rounded w-full py-2 px-3 mb-2"
              />
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2"
              >Year Built</label>
            <InputText
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              class="border rounded w-full py-2 px-3 mb-2"
              />
          </div>
        </div>  

        <h3 class="text-xl mb-3">Address</h3>
        <div class="flex gap-4">
          <div class="w-1/2 mb-4">
            <label
              for="street_address"
              class="block text-gray-700 font-bold mb-2"
              >Street</label>
            <InputText
              type="text"
              id="address_street"
              name="address_street"
              class="border rounded w-full py-2 px-3"
              />
          </div>

          <div class="w-1/2 mb-4">
            <label
              for="city"
              class="block text-gray-700 font-bold mb-2"
              >City</label>
            <InputText
              type="text"
              id="city"
              name="address_city"
              class="border rounded w-full py-2 px-3"
              required/>
          </div>
        </div>

        <div class="flex gap-4">
          <div class="w-1/2 mb-4">
            <label
              for="state"
              class="block text-gray-700 font-bold mb-2"
              >State</label>
            <InputText
              type="text"
              id="state"
              name="address_state"
              class="border rounded w-full py-2 px-3"
              />
          </div>

          <div class="w-1/2 mb-4">
            <label
              for="zip"
              class="block text-gray-700 font-bold mb-2"
              >Zip Code</label>
            <InputText
              type="text"
              id="zip"
              name="address_zip"
              class="border rounded w-full py-2 px-3"
              
              />
          </div>
          <div class="w-1/2 mb-4 hidden">
            <label
              for="address_country"
              class="block text-gray-700 font-bold mb-2"
              >Country</label>
            <InputText
              type="text"
              id="address_country"
              name="address_country"
              class="border rounded w-full py-2 px-3"
              
              />
          </div>
        </div>
        <div class="flex gap-4">
          <div class="w-1/2 mb-4">
            <label
              for="map_url"
              class="block text-gray-700 font-bold mb-2"
              >Map URL</label>
            <InputText
              type="text"
              id="map_url"
              name="address_mapUrl"
              class="border rounded w-full py-2 px-3"
              
              />
          </div>
          <div v-if="initialValues.address_mapUrl" class="w-1/2 mb-4">
              <iframe 
                :src="initialValues.address_mapUrl"
                width="100%" height="100%" style="border:0;" allowfullscreen="true" loading="lazy" referrerpolicy="no-referrer-when-downgrade">
              </iframe>
          </div>
          
        </div>

        <h3 class="text-xl mb-3">Contact Information</h3>
        <div class="flex gap-4">
          <div class="w-1/2 mb-4">
            <label
              for="contact_name"
              class="block text-gray-700 font-bold mb-2"
              >Contact Name</label
            >          
            <InputText
              type="text"
              id="contact_name"
              name="contact_name"
              class="border rounded w-full py-2 px-3"
              required
            />            
          </div>
          <div class="w-1/2 mb-4">
            <label
              for="contact_email"
              class="block text-gray-700 font-bold mb-2"
              >Email</label>
            <InputText
              type="text"
              id="contact_email"
              name="contact_email"
              class="border rounded w-full py-2 px-3" 
              required             
            />            
          </div>
        </div>

        <div class="flex gap-4">
          <div class="mb-4 w-1/2">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Phone</label>
            <InputText
              type="tel"
              id="contact_phone"
              name="contact_phone"
              class="border rounded w-full py-2 px-3"
            />            
          </div>
          <div class="mb-4 w-1/2">
            <label
              for="contact_phone"
              class="block text-gray-700 font-bold mb-2"
              >Others</label>
            <InputText
              type="tel"
              id="others"
              name="contact_others"
              class="border rounded w-full py-2 px-3"
            />
          </div>
        </div>   
        <br/>
        <div>
          <InputText type="hidden" name="userId" :value="initialValues.userId" />
          <InputText type="hidden" name="images" :value="initialValues.images" />
          
          <Button
            class="w-40 mr-4"
            type="submit">
            Save
          </Button>
           <Button
              type="button"
              severity="danger"
              class="w-40 mr-4"
              @click="emit('delete')"
            >
              Delete Listing
            </Button>
          <Button
            type="button"
            @click="router.back()"
            severity="secondary"
            class="w-40 mr-4"
            variant="outlined">            
            Cancel
          </Button>
        </div>
      </Form>
</template>
