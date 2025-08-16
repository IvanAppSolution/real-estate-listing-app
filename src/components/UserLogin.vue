<script setup lang="ts" name="UserLogin">
import { Form, type FormSubmitEvent } from '@primevue/forms';
import { InputGroup, InputGroupAddon, InputText, Button, Toast } from 'primevue'
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const toast = useToast();
const router = useRouter();
const route = useRoute();
const { login } = useAuth();

const initialValues = ref({
  email: '',
  password: ''
});

const handleSubmit = async ({ valid, values }: FormSubmitEvent) => {
  try {
    if (valid) {
      const result = await login(values.email, values.password);
      
      if (result.success) {
        toast.add({ 
          summary: "Login Successful", 
          detail: "Welcome back!", 
          severity: "success",
          life: 3000
        });
        
        // Redirect to intended page or dashboard
        const redirectPath = route.query.redirect as string || '/dashboard';
        router.replace(redirectPath);
      } else {
        toast.add({ 
          summary: "Login Failed", 
          detail: result.message, 
          severity: "error",
          life: 3000
        });
      }
    } else {
      toast.add({ 
        summary: "Validation Error", 
        detail: "Please fill in all required fields", 
        severity: "error",
        life: 3000
      });
    }
  } catch (error: unknown) {
    console.error('Login error:', error);
    toast.add({ 
      summary: "Login Error", 
      detail: "An unexpected error occurred", 
      severity: "error",
      life: 3000
    });
  }
}
</script>

<template>
    <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6 flex-grow">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:m-0"
          style="min-height: 500px;">
        <Toast />
        <div class="card flex flex-col gap-4 w-1/2 mx-auto">
          <h2 class="text-2xl font-bold mb-6">Login</h2>
          
          <Form :initialValues="initialValues" :validateOnBlur="true" @submit="handleSubmit" class="w-full ">
            <div class="mb-4">
              <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-at"></i>
                </InputGroupAddon>
                <InputText 
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email" 
                  required
                  class="w-full"
                />
              </InputGroup>
            </div>
            
            <div class="mb-6">
              <label for="password" class="block text-gray-700 font-bold mb-2">Password</label>
              <InputGroup>
                <InputGroupAddon>
                  <i class="pi pi-lock"></i>
                </InputGroupAddon>
                <InputText 
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password" 
                  required
                  class="w-full"
                />
              </InputGroup>
            </div>
            
            <div class="flex my-4">
              <Button 
                type="submit"
                label="Login" 
                icon="pi pi-user" 
                class="w-full mx-auto"
              />   
            </div>
          </Form>
          
          <hr class="h-0 border-t m-2">
          <div class="-mt-8 text-center text-xs">
            <span class="bg-white px-2 text-gray-500">OR</span>
          </div>
          <div class="text-center">
            <Button as="a" href="/register" variant="link">Don't have an account? Register</Button>
          </div>
          <div className="flex justify-center items-center">
            <div className="text-sm text-neutral-500 mt-4">
              <span className="underline">Test user:</span>
              <br />
              <strong>Email:</strong> u1@gmail.com
              <br />
              <strong>Password:</strong> pass123
              <br />
              <br />
              <span className="underline">Test admin:</span>
              <br />
              <strong>Email:</strong> admin@gmail.com
              <br />
              <strong>Password:</strong> pass123
            </div>
          </div>
        </div>  
      </div>
    </div>
</template>
