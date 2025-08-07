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
  <div class="address">{{ feature.address.street }}, {{ feature.address.city }}  </div>
</template>

<style scoped>
.unicon {
  vertical-align: middle;
  margin-right: 0.5rem;
}

.address {
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
  padding-left: 15px;
}
</style>

