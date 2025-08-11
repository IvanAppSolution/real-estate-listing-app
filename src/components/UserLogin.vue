<script setup lang="ts" name="UserLogin">
import { InputGroup, InputGroupAddon, InputText, Button } from 'primevue'
import { ref } from 'vue'

const text1 = ref('')
</script>

<template>
    <div class="container m-auto py-8 px-8 md:mx-12 lg:mx-12 lg:px-6 flex-grow">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0 lg:m-0"
          style="min-height: 500px;">
      <div class="card flex flex-col gap-4 w-1/2 mx-auto">
        <h2 class="text-2xl font-bold mb-6">Login</h2>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText v-model="text1" placeholder="Username" />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <InputText placeholder="Password" type="password" />
        </InputGroup>
        <div class="flex">
          <Button label="Login" icon="pi pi-user" class="w-full mx-auto"></Button>   
        </div> 
        <hr class="h-0 border-t m-2">
        <div class="-mt-8 text-center text-xs"><span class="bg-white px-2 text-gray-500">OR</span></div>
        <Button as="a" href="/register" variant="link">Register</Button>

      </div>  
    </div>
  </div>
</template>
