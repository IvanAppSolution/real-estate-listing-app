<script setup lang="ts" name="EditListView">
import api from '@/axios';
import { onMounted, reactive, ref } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { ConfirmDialog } from 'primevue';
import { useConfirm } from 'primevue/useconfirm';
import { type ListForm, getFormAddress, getFormContact, mapToInitialValues } from '@/types';
import { type FormSubmitEvent } from '@primevue/forms';
import ProgressSpinner from 'primevue/progressspinner';
import FileUploader from '@/components/FileUploader.vue';
import ListFormComponent from '@/components/list/ListFormComponent.vue';
import { useAuth } from '@/composables/useAuth';

const { user, token } = useAuth();
const route = useRoute();
const id = route.params.id;
const toast = useToast();
const confirm = useConfirm();
const state = reactive({
  valid: true,
  isReady: false,
  isLoading: false,
});

const initialValues = reactive({} as ListForm);

onMounted(async () => {
  try {
    const response = await api.get(`/api/list/${id}`);
    Object.assign(initialValues, mapToInitialValues(response.data.data));
    console.log('edit listing-initialValues: ', initialValues);
    state.isReady = true;
  } catch(error) {
    console.log('error', error)
  }
})

const onFormSubmit = async ({ valid, values } : FormSubmitEvent) => {
  try {
    if (valid) {
      const formData = new FormData();
      // console.log('values: ', values);
      // if (initialValues.images.length > 0) {
      //   Object.assign(values.images, initialValues.images);
      // }   
      const address = getFormAddress(values as ListForm);
      const contact = getFormContact(values as ListForm);
      
      const { 
        address_city: _1, 
        address_country: _2, 
        address_mapUrl: _3, 
        address_state: _4, 
        address_street: _5, 
        address_zip: _6, 
        contact_email: _7, 
        contact_name: _8, 
        contact_others: _9, 
        contact_phone: _10,
        userId: _userId,
        ...filteredList  
      } = values;
      
      // Add address and contact object
      const listData = {
        ...filteredList,
        address,
        contact,
        images: initialValues.images
      };
      
      // console.log('listData: ', listData);   
      formData.append('token', JSON.stringify(token.value));
      formData.append('listData', JSON.stringify(listData));

      
      const response = await api.put(`/api/list/` + id, formData);

      if (!response.data.success) {
        toast.add({ summary: "Error while saving", severity: "error", life: 3000 });
        return;
      }
      toast.add({ summary: "Listing saved successfully", severity: "success", life: 3000 });
      
    } else {
      toast.add({ summary: "Please fix the errors in the form", severity: "error", life: 3000 });
    }
  } catch (error) {
    console.log(error)
    toast.add({ summary: "Error while saving", severity: "error", life: 3000 })
  }
}

const onDelete = async () => {
  console.log('Delete listing..')
  confirm.require({
    message: 'Are you sure to delete listing?',
    header: 'Delete Listing',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: async () => {
      try {
        const response = await api.delete(`/api/list/${id}`);
        if (response.data.success) {
          toast.add({ summary: "Listing deleted successfully", severity: "success", life: 3000 });
          router.push('/listings');
        } else {
          toast.add({ summary: "Error while deleting listing", severity: "error", life: 3000 });
        }
      } catch (error) {
        console.log(error);
        toast.add({ summary: "Error while deleting listing", severity: "error", life: 3000 });
      }
    },
    reject: () => {
      // User cancelled, do nothing
    }
  });
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
    <ConfirmDialog />
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
    <div v-if="!state.isReady" class="flex justify-center items-center h-64">
      <ProgressSpinner class="w-64 m-auto" />
    </div>  
    <ListFormComponent
      v-else
      :initialValues="initialValues"
      @submit="onFormSubmit"
      @delete="onDelete"
      class="flex flex-col gap-4"
    />
    </div>
  </div>
</template>

<style scoped>
  .p-galleria-thumbnail-item img {
    width: 80px !important;
    height: 80px !important;
    object-fit: cover;
    overflow: hidden;
  }
</style>