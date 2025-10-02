export interface Review {
  id: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  details: {
    size: string;
    light: string;
    water: string;
  };
  reviews?: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  total: number;
  items: OrderItem[];
  userId: number;
}