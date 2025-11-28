export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
}

export interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export interface Order {
  id: number;
  total: number;
  status: string;
  stripe_payment_intent_id: string;
  shipping_address: string;
  created_at: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

