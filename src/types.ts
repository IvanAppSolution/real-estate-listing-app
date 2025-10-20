export interface User {
  id: string
  email: string
  username?: string
  role?: string
  [key: string]: unknown
}

export interface AuthResponse {
  success: boolean
  message: string
  token?: string
  user?: User
}

export interface List {
    id: string;
    code: string;
    name: string;
    description: string;
    userId: string; // Optional userId for the list owner
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
    id: string;
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
    userId: string; // Added userId to ListForm
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
    id: list.id,
    code: list.code,
    name: list.name,
    description: list.description,
    userId: list.userId || "",
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
    address_street: list?.address?.street,
    address_city: list?.address?.city,
    address_state: list?.address?.state,
    address_country: list?.address?.country || "",
    address_zip: list?.address?.zip,
    address_mapUrl: list?.address?.mapUrl || "",
    contact_name: list?.contact?.name || "",
    contact_email: list?.contact?.email || "",
    contact_phone: list?.contact?.phone || "",
    contact_others: list?.contact?.others || "",
    images: list.images || [],
    rating: list.rating || 0,
    address: getListAddress(list.address),
    contact: getListContact(list.contact)
  };
}

export function getListAddress(values: List['address']) {
  return {
    street: (values && values.street) ? values.street : "",
    city: (values && values.city) ? values.city : "",
    state: (values && values.state) ? values.state : "",
    country: (values && values.country) ? values.country : "",
    zip: (values && values.zip) ? values.zip : "",
    mapUrl: (values && values.mapUrl) ? values.mapUrl : "",
  };
}

export function getListContact(values: List['contact']) {
  return {
    name: (values && values.name) ? values.name : "",
    email: (values && values.email) ? values.email : "",
    phone: (values && values.phone) ? values.phone : "",
    others: (values && values.others) ? values.others : "",
  };
}

export function getFormAddress(values: ListForm) {
  return {
    street: (values && values.address_city) ? values.address_city : "",
    city: (values && values.address_city) ? values.address_city : "",
    state: (values && values.address_state) ? values.address_state : "",
    country: (values && values.address_country) ? values.address_country : "",
    zip: (values && values.address_zip) ? values.address_zip : "",
    mapUrl: (values && values.address_mapUrl) ? values.address_mapUrl : "",
  };
}

export function getFormContact(values: ListForm) {
  return {
    name: (values && values.contact_name) ? values.name : "",
    email: (values && values.contact_email) ? values.contact_email : "",
    phone: (values && values.contact_phone) ? values.contact_phone : "",
    others: (values && values.contact_others) ? values.contact_others : "",
  };
}