<script setup lang="ts">
import axios from 'axios';
import { computed, reactive, ref } from 'vue';
import router from '@/router';
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { Form } from '@primevue/forms';
import type { FormSubmitEvent } from '@primevue/forms';
import { Button, Galleria, Message } from 'primevue';
import type { FormResolverOptions } from '@primevue/forms';
import type { List } from '@/types';
import FileUploader from '@/components/FileUploader.vue';

const toast = useToast();

const initialValues = reactive({
    _id: "",
    code: "a",
    name: "a",
    description: "a",
    images: [] as string[],
    numBedroom: 1,
    numBathroom: 1,
    garage: 1,
    area: "a",
    yearBuilt: 2000,
    price: 1000,    
    category: "a",
    propertyType: "a",
    propertyStatus: "a",
    inventoryStatus: "a",
    rating: 0,
    address: {
      street: "a",
      city: "a",
      state: "a",
      country: "a",
      zip: "",
      mapUrl: "",
    },
    contact: {
      name: "a",
      email: "a",
      phone: "a",
      others: "a"
    },
   
  } as List );

const onFormSubmit = async ({ valid, values } : FormSubmitEvent) => {
  try {
    if (valid) {
      console.log('values: ', values);
      const formData = new FormData();
      Object.assign(values.images, initialValues.images);
      console.log('initialValues.images: ', initialValues.images)
      console.log('values.images: ', values.images)
      formData.append('listData', JSON.stringify(values));
      const response = await axios.post(`/api/list/add`, formData);

      console.log('response: ', response)
      if (response.status == 200) {
        toast.add({ summary: "Listing saved successfully", severity: "success" });
        router.push(`/listings/${response.data.id}`)        
      } else {
        toast.add({ summary: "Error while saving", severity: "error" });
        throw new Error('Failed to save listing');
      }
    } else {
      toast.add({ summary: "Please fix the errors in the form", severity: "error" });
    }
  } catch (error) {
    console.log(error)
    toast.add({ summary: "Error while saving", severity: "error" })
  }
}

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
</script>


<template>
  <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6">
    <div
      class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:m-0"
    >
    <Toast />
    <h2 class="text-3xl text-center font-semibold mb-6">Add Listing</h2>
      <Galleria class="" :value="initialValues.images" :responsiveOptions="responsiveOptions"  thumbnailsPosition="right" containerStyle="width: 100%; max-height: 500px;" verticalThumbnailViewPortHeight="85%"    :showItemNavigators="true"   :circular="true">
          <template #item="slotProps">
              <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; display: block" />
          </template>
          <template #thumbnail="slotProps">
              <div class="grid gap-4 justify-center">
                  <img :src="slotProps.item" :alt="slotProps.item" style="width: 100%; display: block;" />
              </div>
          </template>
      </Galleria>
      <div class="w-full flex justify-between items-center mb-6 mt-4">
        <FileUploader @uploadedFiles="(files) => initialValues.images.push(...files)" />
      </div>
      <Form  :initialValues="initialValues" :validateOnValueUpdate="false" :validateOnBlur="true"  @submit="onFormSubmit" class="flex flex-col gap-4 ">
       
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
            required
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
              type="text"
              id="price"
              name="price"
              class="border rounded w-full py-2 px-3 mb-2"
              required
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
              placeholder="e.g. 1200 sq ft"
              required
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
              required
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
              required
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
              for="company_description"
              class="block text-gray-700 font-bold mb-2"
              >Street</label>
            <InputText
              type="text"
              id="street_address"
              name="address.street"
              class="border rounded w-full py-2 px-3"
              required/>
          </div>

          <div class="w-1/2 mb-4">
            <label
              for="city"
              class="block text-gray-700 font-bold mb-2"
              >City</label>
            <InputText
              type="text"
              id="city"
              name="address.city"
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
              name="address.state"
              class="border rounded w-full py-2 px-3"
              required
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
              name="address.zip"
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
              name="mapUrl"
              class="border rounded w-full py-2 px-3"
              />
          </div>

          <div class="w-1/2 mb-4">  
              <iframe 
                :src="initialValues.address.mapUrl" 
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
              name="contact.name"
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
              name="contact.email"
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
              name="contact.phone"
              class="border rounded w-full py-2 px-3"
              required
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
              name="contact.others"
              class="border rounded w-full py-2 px-3"
            />
          </div>
          <inputText
            type="hidden"
            id="id"
            name="images"            
          />
        </div>

        <div>
          <Button
            class="w-64 mr-4"
            type="submit">
            Save
          </Button>
          <Button
            @click="router.back()"
            class="w-64 p-button-secondary">
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
  .p-inputtext:focus, .p-select:focus, .p-textarea:focus {
    border-color: black !important;
  }

  .p-galleria-thumbnail img {
    width: 100px !important;
    height: 100px !important;
    object-fit: cover;
    overflow: hidden;
  }
</style>