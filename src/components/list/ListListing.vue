<script setup lang="ts" name="ListListing">
import { ref, computed } from 'vue';
import type {  List } from '../../types';

const props = defineProps({
  list: Object as () => List
})

console.log('props: ', props.list)
const toggleFullDescription = () => {
  showFullDescription.value = !showFullDescription.value;
}

const showFullDescription = ref(false)
const truncatedDescription = computed(() => {
  let description = props.list?.description ?? '';

  if (!showFullDescription.value)  {
    description = description.substring(0, 90) + '...';    
  }
  return description;
})
</script>

<template>
  <div class="rounded-xl shadow-md relative">
    <div class="carousel-item dark:border-surface-700 rounded m-2 p-1 ">
      <div class="item-container">
        <div class="img-container mx-auto">
          <img
            :src="list?.image"
            :alt="list?.name"
            class="item-img w-full rounded"
              />                
            </div>
            <Tag
                :value="list?.propertyStatus"
                :severity="list?.inventoryStatus"
                class="item-tag absolute"
                style="right: 5px; top: 5px"
              />  
            <div class="item-body w-100 item-price">
              <div class="font-semibold text-xl">${{ list?.price }}</div>
            </div>
        
        </div>
        <div class="item-title font-medium font-semibold" v-if="list"><SlideFeature :feature="list" /></div>
    </div>
  </div>

</template>