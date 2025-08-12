<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { List } from '../../types';
import CardFeature from './CardFeature.vue';

const props = defineProps({
  list: Object as () => List
}) 
console.log('List:', props.list);
</script>

<template>
  <RouterLink :to="`/listings/${list?.id}`" class="hover-effect">
    <div class="carousel-item dark:border-surface-700 m-2">
      <div class="item-container">
        <div class="img-container mx-auto">
          <img
            :src="list?.images[0] || 'https://via.placeholder.com/300'"
            :alt="list?.name"
            class="item-img w-full"
              />                
            </div>
            <Tag
                :value="list?.propertyStatus"
                :severity="list?.inventoryStatus"
                class="item-tag absolute"
                style="right: 5px; top: 5px"
              />  
            <div class="w-100 item-price">
              <div class="font-semibold text-xl">${{ list?.price }}</div>
            </div>
        
        </div>
        <div class="item-title font-medium font-semibold" v-if="list"><CardFeature :feature="list" /></div>
    </div>
  </RouterLink>  
</template>        
 
<style scoped>

.carousel-item {
  position: relative;
  overflow: hidden;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  max-width: 260px;
}

.item-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.item-title {
  font-size: 1rem;
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  flex-grow: 1;
  margin-top: 0.5rem;
  min-height: 72px;
}

.item-tag {
  text-transform: capitalize;
  background-color: rgba(0, 0, 0, 0.2);
  color: white;
}

.item-price {
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  color: #ffffff;
  justify-content: space-between;
  align-items: center;
  padding: 0.7rem;
  width: 100%;
  margin-top: -30px;
}


.img-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  max-height: 200px;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.2));
  pointer-events: none; 
  transition: background 0.5s ease;

}

  .hover-effect:hover .img-container::after {
    background: none;
  }


 
</style>
