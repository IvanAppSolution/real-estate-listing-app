<script setup lang="ts">
 

interface Feature {
  id: string;
  name: string;
  description: string;
  numBedroom: number;
  numbBathroom: number;
  area: string;
  price: number;
}

defineProps({
  feature: {
    type: Object as () => Feature,
    required: true
  }
})
 
 
</script>

<template>
  <ul class="list-none p-0 m-0 flex justify-evenly items-center">
    <li>
      <unicon
            name="bed"
            width="24"
            height="24"
            class="icon">
        </unicon><span>{{ feature.numBedroom }}</span>
    </li>
    <li>
       <unicon
            name="bath"
            width="24"
            height="24"
            class="icon">
        </unicon> {{ feature.numbBathroom }}
    </li>
    <li>
       <unicon
            name="ruler"
            width="24"
            height="24"
            class="icon">
        </unicon> {{ feature.area }}
    </li>
  </ul>
</template>

<style scoped>
.unicon {
  vertical-align: middle;
  margin-right: 0.5rem;
}
</style>

