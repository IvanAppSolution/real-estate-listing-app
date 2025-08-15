<script setup lang="ts">
import api from '@/axios';
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import type { FormSubmitEvent } from '@primevue/forms';
import { Galleria } from 'primevue';
import { getFormAddress, getFormContact, type ListForm } from '@/types';
import FileUploader from '@/components/FileUploader.vue';
import ListFormComponent from '@/components/list/ListFormComponent.vue';
import { useAuth } from '@/composables/useAuth'

const toast = useToast();
const { user, token } = useAuth();

const initialValues = reactive({
    id: "",
    code: "",
    name: "",
    description: "",
    userId: "",
    images: [] as string[],
    numBedroom: 1,
    numBathroom: 1,
    garage: 1,
    area: "",
    yearBuilt: 2000,
    price: 0,
    category: "",
    propertyType: "",
    propertyStatus: "",
    inventoryStatus: "",
    rating: 0,
    address_street: "",
    address_city: "",
    address_state: "",
    address_zip: "",
    address_country: "",    
    address_mapUrl: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    contact_others: "",
    address: {},
    contact: {}
  });

const onFormSubmit = async ({ valid, values } : FormSubmitEvent) => {
  try {
    if (valid) {
      // console.log('values1: ', values);
      const formData = new FormData();
      if (initialValues.images.length > 0) {
        Object.assign(values.images, initialValues.images);
      }  
      Object.assign(values.address, getFormAddress(values as ListForm));
      Object.assign(values.contact, getFormContact(values as ListForm));
      values.userId = user.value?.id;
      formData.append('token', JSON.stringify(token.value));
      formData.append('listData', JSON.stringify(values));
      const response = await api.post(`/api/list/add`, formData); 

      // console.log('response: ', response)
      if (response.status == 200) {
        toast.add({ summary: "Listing saved successfully", severity: "success" });
        router.push(`/listings/${response.data.id}`)        
      } else {
        toast.add({ summary: "Error while saving", severity: "error", life: 3000 });
        throw new Error('Failed to save listing');
      }
    } else {
      toast.add({ summary: "Please fix the errors in the form", severity: "error", life: 3000 });
    }
  } catch (error) {
    console.log(error)
    toast.add({ summary: "Error while saving", severity: "error", life: 3000 });
  }
}

onMounted(() => {
  // Initialize any necessary data or state here
  initialValues.userId = user.value?.id || ""; // Replace with actual user ID
  console.log('initialValues: ', initialValues);
  console.log('user: ', user.value);
});

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
      <ListFormComponent :initialValues="initialValues" @submit="onFormSubmit" />
    </div>
  </div>
</template>

<style scoped>
  .p-galleria-thumbnail img {
    width: 100px !important;
    height: 100px !important;
    object-fit: cover;
    overflow: hidden;
  }
</style>