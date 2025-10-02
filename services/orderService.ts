import { Order } from '../types';

// --- BACKEND INTEGRATION POINT ---
// This file is the designated place for all your backend API calls.
// This is now pointing to the backend server you will run locally.

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Fetches the order history for a specific user from the backend server.
 * @param userId The ID of the user whose orders are to be fetched.
 * @returns A promise that resolves to an array of Order objects.
 */
export const fetchOrderHistory = async (userId: number): Promise<Order[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/user/${userId}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch order history: ${response.statusText}`);
    }

    const data: Order[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching order history:", error);
    // In a real app, you might want to show a user-friendly error message.
    return []; // Return an empty array on error to prevent crashes.
  }
};

/**
 * Creates a new order by sending the order data to the backend server.
 * @param orderData The data for the new order.
 * @returns A promise that resolves to the newly created Order object.
 */
export const createOrder = async (orderData: Omit<Order, 'id'>): Promise<Order> => {
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create order: ${response.statusText}`);
        }

        const newOrder: Order = await response.json();
        return newOrder;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; // Re-throw the error to be handled by the calling component.
    }
};
