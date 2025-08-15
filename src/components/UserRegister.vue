<script setup lang="ts" name="UserRegister">
import { Form } from '@primevue/forms';
import { InputText, Button, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast';
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth'

const toast = useToast();
const router = useRouter();
const { register } = useAuth();

const initialValues = ref({
  email: '',
  password: '',
  confirmPassword: ''
});


const passwordsMatch = computed(() => {
  if (!initialValues.value.password || !initialValues.value.confirmPassword) {
    return true;
  }
  return initialValues.value.password === initialValues.value.confirmPassword;
});

const handleSubmit = async () => {
  try {
    const response = await register(
      initialValues.value.email,
      initialValues.value.password
    );

    if (response) {
      toast.add({
        severity: 'success',
        summary: 'Registration Successful',
        detail: 'Your account has been created!',
        life: 3000
      });
      
      router.push('/');
    } else {
      throw new Error('Registration failed');
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Registration failed. Please try again.';
    
    toast.add({
      severity: 'error',
      summary: 'Registration Failed',
      detail: errorMessage,
      life: 3000
    });
  }
};
</script>

<template>
    <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6 flex-grow">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:m-0"
          style="min-height: 500px;">
        <Toast />
        <div class="card flex flex-col gap-4 w-1/2 mx-auto">
          <h2 class="text-2xl font-bold mb-6">Register</h2>
          <div class="w-full flex flex-col items-center justify-center gap-3 py-5">
            <Form :initialValues="initialValues" :validateOnBlur="true" @submit="handleSubmit" class="w-full">
              <div class="flex flex-col gap-2 w-full mb-4">
                <label for="email">Email</label>
                <InputText 
                  type="email" 
                  id="email" 
                  name="email"
                  v-model="initialValues.email"
                  required 
                  class="w-full"
                />
              </div>
              <div class="flex flex-col gap-2 w-full mb-4">
                <label for="password">Password</label>
                <InputText 
                  id="password" 
                  name="password"
                  type="password" 
                  v-model="initialValues.password"
                  required 
                  minlength="6"
                  class="w-full"
                />
                <span class="text-sm italic">Password should be six characters long.</span>
              </div>
              <div class="flex flex-col gap-2 w-full mb-4">
                <label for="confirmPassword">Confirm Password</label>
                <InputText 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  v-model="initialValues.confirmPassword"
                  required 
                  class="w-full"
                  :class="{ 'p-invalid': !passwordsMatch }"
                />
                <span 
                  v-if="!passwordsMatch && initialValues.confirmPassword" 
                  class="text-sm text-red-500 mt-1"
                >
                  Passwords do not match
                </span>
              </div>
              <div class="flex w-full">
                <Button 
                  type="submit"
                  label="Register" 
                  icon="pi pi-user" 
                  class="w-full mt-2 mx-auto"
                />
              </div>
            </Form>
          </div>
          <hr class="h-0 border-t m-2">
          <div class="-mt-8 text-center text-xs">
            <span class="bg-white px-2 text-gray-500">OR</span>
          </div>
          <div class="text-center">
            <Button as="a" href="/login" variant="link">Already have an account? Login</Button>
          </div>
        </div>  
      </div>
    </div>
</template>
