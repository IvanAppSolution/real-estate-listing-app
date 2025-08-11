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
    _id: string;
    code: string;
    name: string;
    description: string;
    images: string[];
    numBedroom: number;
    numBathroom: number;
    garage: number;
    area: string;
    yearBuilt: number;
    price: number;
    category: string;
    propertyType: string;
    propertyStatus: string;
    inventoryStatus: string;
    rating: number;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      mapUrl: string;
    },
    contact: {
      name: string;
      email: string;
      phone: string;
      others: string;      
    },
  }

  export interface ListForm {
    _id: string;
    code: string;
    name: string;
    description: string;
    images: string[];
    numBedroom: number;
    numBathroom: number;
    garage: number;
    area: string;
    yearBuilt: number;
    price: number;
    category: string;
    propertyType: string;
    propertyStatus: string;
    inventoryStatus: string;
    rating: number;
    address_street: string;
    address_city: string;
    address_state: string;
    address_zip: string;
    address_country: string;
    address_mapUrl: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    contact_others: string;
    address: object;
    contact: object;
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
    country: string;
    zip: string;
    mapUrl: string;
  },
}

export function mapToInitialValues(list: List) {
  return {
    _id: list._id,
    code: list.code,
    name: list.name,
    description: list.description,
    numBedroom: list.numBedroom,
    numBathroom: list.numBathroom,
    garage: list.garage,
    area: list.area,
    yearBuilt: list.yearBuilt,
    price: list.price,    
    category: list.category,
    propertyType: list.propertyType,
    propertyStatus: list.propertyStatus,
    inventoryStatus: list.inventoryStatus,
    address_street: list.address.street,
    address_city: list.address.city,
    address_state: list.address.state,
    address_country: list.address.country || "",
    address_zip: list.address.zip,
    address_mapUrl: list.address.mapUrl || "",
    contact_name: list.contact.name || "",
    contact_email: list.contact.email || "",
    contact_phone: list.contact.phone || "",
    contact_others: list.contact.others || "",
    images: list.images || [],
    rating: list.rating || 0,
    address: {},
    contact: {}
  };
}

export function getFormAddress(values: ListForm) {
  return {
    street: values.address_street || "",
    city: values.address_city || "",
    state: values.address_state || "",
    country: values.address_country || "",
    zip: values.address_zip || "",
    mapUrl: values.address_mapUrl || "",
  };
}

export function getFormContact(values: ListForm) {
  return {
    name: values.contact_name || "",
    email: values.contact_email || "",
    phone: values.contact_phone || "",
    others: values.contact_others || "",
  };
}