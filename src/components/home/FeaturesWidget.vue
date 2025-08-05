<script setup lang="ts">
import { ref, onMounted } from 'vue'
// import { ProductService } from '@/service/ProductService'

onMounted(() => {
  // ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 9)))
})

const products = ref([
  {
    id: '1000',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: '/images/features/1.jpg',
    category: 'Apartment',
    numBed: 2,
    numbBathroom: 2,
    garage: 1,
    area: '1200 sq ft',
    yearBuilt: 2018,
    price: 135000,
    propertyType: 'Apartment',
    propertyStatus: 'For Sale',
    inventoryStatus: 'INSTOCK',
    rating: 5,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  {
    id: '1002',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: '/images/features/2.jpg',
    category: 'Apartment',
    numBed: 2,
    numbBathroom: 2,
    garage: 1,
    area: '1200 sq ft',
    yearBuilt: 2018,
    price: 135000,
    propertyType: 'Apartment',
    propertyStatus: 'For Rent',
    inventoryStatus: 'INSTOCK',
    rating: 5,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  {
    id: '1003',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: '/images/features/3.jpg',
    category: 'Apartment',
    numBed: 2,
    numbBathroom: 2,
    garage: 1,
    area: '1200 sq ft',
    yearBuilt: 2018,
    price: 135000,
    propertyType: 'Apartment',
    propertyStatus: 'For Rent',
    inventoryStatus: 'INSTOCK',
    rating: 5,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
  {
    id: '1004',
    code: 'f230fh0g3',
    name: 'Bamboo Watch',
    description: 'Product Description',
    image: '/images/features/4.jpg',
    category: 'Apartment',
    numBed: 2,
    numbBathroom: 2,
    garage: 1,
    area: '1200 sq ft',
    yearBuilt: 2018,
    price: 135000,
    propertyType: 'Apartment',
    propertyStatus: 'For Sale',
    inventoryStatus: 'INSTOCK',
    rating: 5,
    address: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
    },
  },
])
const responsiveOptions = ref([
  {
    breakpoint: '575px',
    numVisible: 1,
    numScroll: 1,
  },
])

const getSeverity = (status: string) => {
  switch (status) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return undefined
  }
}
</script>
<template>
  <div id="features" class="py-6 px-2 lg:px-6 mt-20 mx-0 lg:mx-4 relative">
    <Carousel
      :value="products"
      :numVisible="3"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      circular
    >
      <template #item="slotProps">
        <a href="#" class="hover-effect">
        <div class="carousel-item dark:border-surface-700 rounded m-2 p-1 ">
          <div class="item-container">
            
              <div class="img-container mx-auto">
                <img
                  :src="slotProps.data.image"
                  :alt="slotProps.data.name"
                    class="item-img w-full rounded"
                  />                
                </div>
                <Tag
                    :value="slotProps.data.propertyStatus"
                    :severity="getSeverity(slotProps.data.inventoryStatus)"
                    class="item-tag absolute"
                    style="right: 5px; top: 5px"
                  />  
                <div class="item-body w-100 item-price">
                  <div class="font-semibold text-xl">${{ slotProps.data.price }}</div>
                </div>
            
            </div>
            <div class="item-title font-medium font-semibold">{{ slotProps.data.name }}</div>
        </div>
        </a>
      </template>
    </Carousel>
  </div>
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
  height: 300px;
}

.item-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 5px;
}

.item-title {
  font-size: 1.2rem;
  color: #333;
  text-decoration: none;
  padding: 0.5rem;
  flex-grow: 1;
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
  padding: 1rem;
  width: 100%;
  margin-top: -30px;
}


.img-container::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 300px;  
  box-shadow: inset 0 0 200px 0 rgba(0, 0, 0, 0.5);  
  pointer-events: none; 
  transition: box-shadow 0.3s ease;  

}

  .hover-effect:hover .img-container::after {
    box-shadow: none; 
  }


 
</style>
