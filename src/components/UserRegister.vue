<script setup lang="ts" name="UserLogin">
import { Form } from '@primevue/forms';
import { InputGroup, InputGroupAddon, InputText, Button } from 'primevue'
import { ref } from 'vue'

const text1 = ref('')
</script>

<template>
    <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6 flex-grow">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:m-0"
          style="min-height: 500px;">
      <div class="card flex flex-col gap-4 w-1/2 mx-auto">
        <h2 class="text-2xl font-bold mb-6">Register</h2>
        <div class="w-full flex flex-col items-center justify-center gap-3 py-5">
          <Form >
            <div class="flex flex-col gap-2 w-full">
                <label for="username">Username</label>
                <InputText id="username" type="text" />
            </div>
            <div class="flex flex-col gap-2 w-full">
                <label for="email">Email</label>
                <InputText type="email" id="email"   />
            </div>
            <div class="flex flex-col gap-2  w-full">
                <label for="password">Password</label>
                <InputText id="password" type="password" />
            </div>
            <div class="flex flex-col gap-2  w-full">
                <label for="re-password">Repeat Password</label>
                <InputText id="re-password" type="password" />
            </div>
            <div class="flex w-full">
                <Button label="Register" icon="pi pi-user" class="w-full mt-2 mx-auto"></Button>
            </div>
          </Form>

      </div>
        <hr class="h-0 border-t m-2">
        <div class="-mt-8 text-center text-xs"><span class="bg-white px-2 text-gray-500">OR</span></div>
        <Button as="a" href="/login" variant="link">Login</Button>

      </div>  
    </div>
  </div>
</template>
