export interface Job {
  id: string; 
  title: string;
  description: string;
  type: string;
  salary: string;
  location: string;
  image: string;
  company: {
    name: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
  };
} 

export interface List {
    id: string;
    code: string;
    name: string;
    description: string;
    image: string;
    category: string;
    numBedroom: number;
    numBathroom: number;
    garage: number;
    area: string;
    yearBuilt: number;
    price: number;
    paymentFrequency: string;
    propertyType: string;
    propertyStatus: string;
    inventoryStatus: string;
    rating: number;
    mapUrl: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
    },
    contact: {
      name: string;
      email: string;
      phone: string;
    },
  }

export interface Feature {
  id: string;
  name: string;
  description: string;
  numBedroom: number;
  numBathroom: number;
  area: string;
  price: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  },
}