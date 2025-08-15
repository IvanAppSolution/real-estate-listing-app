<script setup lang="ts">
import { FileUpload, Toast } from "primevue";
import type { FileUploadBeforeSendEvent, FileUploadUploaderEvent, FileUploadSelectEvent } from "primevue/fileupload";
import { reactive, ref } from "vue";
import { useAuth } from '@/composables/useAuth';
import api from "@/axios";

const { token } = useAuth();
const totalSize = ref(0);
const totalSizePercent = ref(0);
const state = reactive({
  files: [] as string[],
});

const emit = defineEmits<{
  (event: 'uploadedFiles', files: string[]): void;
}>();

const onBeforeSend = (event: FileUploadBeforeSendEvent) => {
  event.xhr.setRequestHeader('Authorization', `Bearer ${token.value}`);
};

const customUploader = (event: FileUploadUploaderEvent) => {
    const files = Array.isArray(event.files) ? event.files : event.files ? [event.files] : [];
    const formData = new FormData();
    files.forEach((file: File) => {
        formData.append('images', file);
    });

        api.post('/api/list/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                // Optional: Update progress bar
                totalSize.value = progressEvent.total ?? 0;
                totalSizePercent.value = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));                
            }
        })
        .then(response => {
            console.log('Upload successful:', response.data);
            const { data } = response.data;
            state.files.push(...data);
            totalSize.value = 0;
            totalSizePercent.value = 0;
            emit('uploadedFiles', state.files);
        })
        .catch(error => {
            console.error('Upload failed:', error);
        });
    }

const onSelectedFiles = (event: FileUploadSelectEvent) => {
  totalSize.value = event.files.reduce((acc: number, file: File) => acc + file.size, 0);
};  
</script>

<template>
    <div class="w-full">
        <Toast />
        <FileUpload name="images" @before-send="onBeforeSend" customUpload @uploader="customUploader" @select="onSelectedFiles" :multiple="true" accept="image/*" :maxFileSize="1000000" :auto="true">
          <template #header="{ chooseCallback, clearCallback, files }">
            <div class="flex justify-between items-center">
              <Button label="Choose" icon="pi pi-fw pi-plus" @click="chooseCallback" />
              <div class="hidden"> <Button label="Clear" icon="pi pi-fw pi-times" @click="clearCallback"  :disabled="!files.length" /> </div>
            </div>
            <ProgressBar v-if="totalSize > 0" :value="totalSizePercent" :showValue="false" class="md:w-20rem h-1 w-full md:ml-auto">
                <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
            </ProgressBar>
          </template>
          <template #empty>
              <span>Drag and drop images to here to upload.</span>
          </template>
        </FileUpload>
    </div>
</template>

<style scope>
.p-badge{
  visibility: hidden;
}
</style>

