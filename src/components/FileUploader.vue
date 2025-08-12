<script setup lang="ts">
import { FileUpload, Toast } from "primevue";
import { useToast } from "primevue/usetoast";
import type { FileUploadUploadEvent, FileUploadBeforeSendEvent } from "primevue/fileupload";
import { reactive } from "vue";
import { useAuth } from '@/composables/useAuth';

const { token } = useAuth();
const state = reactive({
  files: [] as string[],
});

const emit = defineEmits<{
  (event: 'uploadedFiles', files: string[]): void;
}>();

const toast = useToast();
const onAdvancedUpload = (event: FileUploadUploadEvent) => {
  if (event.xhr.status !== 200) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'File Upload', life: 3000 });
    return;
  }  
  const { data } = JSON.parse(event.xhr.response);  
  state.files.push(...data);
  emit('uploadedFiles', state.files);
};

const onBeforeSend = (event: FileUploadBeforeSendEvent) => {
  event.xhr.setRequestHeader('Authorization', `Bearer ${token.value}`);
};

</script>

<template>
    <div class="w-full">
        <Toast />
        <FileUpload name="images" url="/api/list/media/upload" @upload="onAdvancedUpload($event)" @before-send="onBeforeSend" :multiple="true" accept="image/*" :maxFileSize="1000000" :auto="true">
          <template #header="{ chooseCallback, clearCallback, files }">
            <div class="flex justify-between items-center">
              <Button label="Choose" icon="pi pi-fw pi-plus" @click="chooseCallback" />
              <div class="hidden"> <Button label="Clear" icon="pi pi-fw pi-times" @click="clearCallback"  :disabled="!files.length" /> </div>
            </div>
          </template>
          <template #empty>
              <span>Drag and drop files to here to upload.</span>
          </template>
        </FileUpload>
    </div>
</template>


