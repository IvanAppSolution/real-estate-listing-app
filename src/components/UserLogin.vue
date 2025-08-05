<script setup lang="ts" name="UserLogin">
import { InputGroup, InputGroupAddon, InputText, Button } from 'primevue'
import { ref } from 'vue'

const text1 = ref('')
</script>

<template>
  <div class="flex flex-column row-gap-3">
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
    <div>
      <Button>Login</Button>
    </div>
  </div>
</template>
