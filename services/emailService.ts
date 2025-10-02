// --- MOCK EMAIL SERVICE ---
// In a real application, this service would integrate with a third-party
// email provider like Resend, SendGrid, Mailgun, or AWS SES.
// For this demo, we'll simulate the API call by logging to the console.

import { Order, User } from '../types';

const ADMIN_EMAIL = 'admin@floraandform.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY || 'YOUR_RESEND_API_KEY_HERE';

const sendEmail = async (to: string, subject: string, htmlContent: string) => {
    console.groupCollapsed(`[Email Sent] To: ${to} | Subject: ${subject}`);
    console.log(`--- SIMULATING EMAIL API CALL (e.g., to Resend) ---`);
    console.log(`API Key Used: ${RESEND_API_KEY ? RESEND_API_KEY.substring(0, 15) + '...' : 'Not Provided'}`);
    console.log(`FROM: Flora & Form <noreply@floraandform.com>`);
    console.log(`TO: ${to}`);
    console.log(`SUBJECT: ${subject}`);
    console.log(`--- HTML BODY PREVIEW ---`);
    console.log(htmlContent);
    console.log(`-------------------------`);
    console.groupEnd();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return true; // Assume success for the demo
};


/**
 * Simulates sending a contact message and an auto-reply.
 * @param name The name of the person sending the message.
 * @param email The email of the person sending the message.
 * @param message The content of the message.
 * @returns A promise that resolves to true if the messages were "sent" successfully.
 */
export const sendContactMessage = async (name: string, email: string, message: string): Promise<boolean> => {
    const emailWrapper = (title: string, body: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #047857; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">${title}</h1>
            </div>
            <div style="padding: 20px;">
                ${body}
            </div>
            <div style="background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 12px; color: #64748b;">
                <p>&copy; ${new Date().getFullYear()} Flora & Form. All rights reserved.</p>
            </div>
        </div>
    `;

    // 1. Send the customer's message to the admin
    const adminSubject = `New Contact Message from ${name}`;
    const adminBody = `
        <p>You have received a new message from your website's contact form:</p>
        <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
        </div>
        <h2 style="font-size: 18px; color: #047857; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 20px;">Message</h2>
        <p style="white-space: pre-wrap;">${message}</p>
    `;
    await sendEmail(ADMIN_EMAIL, adminSubject, emailWrapper('New Contact Form Submission', adminBody));

    // 2. Send an auto-reply to the customer
    const customerSubject = "We've received your message!";
    const customerBody = `
        <p>Hi ${name},</p>
        <p>Thank you for contacting Flora & Form. We've received your message and a member of our team will get back to you as soon as possible.</p>
        <p>Best regards,<br>The Flora & Form Team</p>
    `;
    await sendEmail(email, customerSubject, emailWrapper("We've Received Your Message", customerBody));

    return true;
};

/**
 * Simulates sending an order confirmation email to the customer and a notification to the admin.
 * @param order The successfully created order object.
 * @param user The user who placed the order.
 */
export const sendOrderConfirmationEmails = async (order: Order, user: User) => {
    const emailWrapper = (title: string, body: string) => `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #047857; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">${title}</h1>
            </div>
            <div style="padding: 20px;">
                ${body}
            </div>
            <div style="background-color: #f1f5f9; text-align: center; padding: 15px; font-size: 12px; color: #64748b;">
                <p>&copy; ${new Date().getFullYear()} Flora & Form. All rights reserved.</p>
            </div>
        </div>
    `;

    // 1. Send a detailed confirmation to the customer
    const customerSubject = `Your Flora & Form Order Confirmation (#${order.id.slice(-8)})`;
    const customerBody = `
        <p>Hi ${user.name},</p>
        <p>We've received your order and are getting it ready for shipment. Here are the details:</p>
        <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
            <p><strong>Order ID:</strong> #${order.id.slice(-8)}</p>
            <p><strong>Order Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
        </div>
        <h2 style="font-size: 18px; color: #047857; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-top: 20px;">Order Summary</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <thead>
                <tr>
                    <th style="text-align: left; padding: 8px; border-bottom: 1px solid #ddd;">Item</th>
                    <th style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">Quantity</th>
                    <th style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">Price</th>
                </tr>
            </thead>
            <tbody>
                ${order.items.map(item => `
                    <tr>
                        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.productName}</td>
                        <td style="text-align: center; padding: 8px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                        <td style="text-align: right; padding: 8px; border-bottom: 1px solid #ddd;">$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div style="text-align: right; margin-top: 20px;">
            <strong style="font-size: 20px; color: #166534;">Total: $${order.total.toFixed(2)}</strong>
        </div>
        <p style="margin-top: 20px;">We'll notify you again once your order has shipped.</p>
    `;
    await sendEmail(user.email, customerSubject, emailWrapper("Thank You For Your Order!", customerBody));

    // 2. Send a new order notification to the admin
    const adminSubject = `New Order Received! (#${order.id.slice(-8)})`;
    const adminBody = `
        <h1>New Order Alert!</h1>
        <p>A new order has been placed on Flora & Form.</p>
        <div style="padding: 15px; background-color: #f9f9f9; border-radius: 5px;">
             <p><strong>Order ID:</strong> #${order.id.slice(-8)}</p>
             <p><strong>Customer:</strong> ${user.name} (${user.email})</p>
             <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
        </div>
        <p style="margin-top: 20px;">Please log in to the admin panel to view the full order details and begin fulfillment.</p>
    `;
    await sendEmail(ADMIN_EMAIL, adminSubject, emailWrapper("New Order Received", adminBody));
};
