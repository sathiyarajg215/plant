// services/emailService.ts

// --- BACKEND INTEGRATION ---
// This service now communicates with your backend server to send emails securely.

const API_BASE_URL = 'http://localhost:3001/api';

/**
 * Sends a contact message via the backend server.
 * @param name The name of the person sending the message.
 * @param email The email of the person sending the message.
 * @param message The content of the message.
 * @returns A promise that resolves to true if the message was sent successfully.
 */
export const sendContactMessage = async (name: string, email: string, message: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!response.ok) {
            console.error(`Failed to send message: ${response.statusText}`);
            return false;
        }
        
        return true;
    } catch (error) {
        console.error("Error sending contact message:", error);
        return false;
    }
};
