<script setup lang="ts">
import type { Feature } from '@/types';

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
            width="22"
            height="22"
            class="icon">
        </unicon><span>{{ feature.numBedroom }}</span>
    </li>
    <li>
       <unicon
            name="bath"
            width="22"
            height="22"
            class="icon">
        </unicon> {{ feature.numBathroom }}
    </li>
    <li>
       <unicon
            name="ruler"
            width="22"
            height="22"
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

