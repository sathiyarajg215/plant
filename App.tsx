import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Footer } from './components/Footer';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';
import { OrderHistory } from './components/OrderHistory';
import { OurStory } from './components/OurStory';
import { ContactUs } from './components/ContactUs';
import { Faq } from './components/Faq';
import { ShippingReturns } from './components/ShippingReturns';

import { CartProvider, useCart } from './context/CartContext';
import { Product, User, Order } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import { createOrder } from './services/orderService';
import { sendOrderConfirmationEmails } from './services/emailService';

// --- Mock Authentication ---
const MOCK_USERS: User[] = [
    { id: 1, name: 'Demo User', email: 'user@example.com', password: 'password123' },
];

// This wrapper component is necessary so it can access the cart context provided by CartProvider in App
const AppComponent: React.FC = () => {
    type Page = 'home' | 'product' | 'checkout' | 'confirmation' | 'login' | 'signup' | 'forgot_password' | 'order_history' | 'our_story' | 'contact_us' | 'faq' | 'shipping_returns';
    
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isCartOpen, setCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [adminEmail, setAdminEmail] = useState(() => {
        return localStorage.getItem('adminNotificationEmail') || 'your-email@example.com';
    });

    const { cartItems, clearCart, totalPrice } = useCart();

    useEffect(() => {
        localStorage.setItem('adminNotificationEmail', adminEmail);
    }, [adminEmail]);

    // Scroll to top on page change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [currentPage, selectedProduct]);

    const handleProductSelect = (product: Product) => {
        setSelectedProduct(product);
        setCurrentPage('product');
    };

    const navigateTo = (page: Page) => {
        setCurrentPage(page);
    }

    const resetToHome = () => {
        setSelectedProduct(null);
        setActiveCategory('All');
        setSearchTerm('');
        setCurrentPage('home');
    }

    const handleLogin = async (email: string, password: string): Promise<boolean> => {
        const user = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (user) {
            setIsAuthenticated(true);
            setCurrentUser(user);
            resetToHome();
            return true;
        }
        return false;
    };

    const handleSocialLogin = (provider: 'Google' | 'Facebook') => {
        console.log(`Simulating login with ${provider}...`);
        // In a real app, this would trigger the OAuth flow.
        // For this demo, we'll create a mock social user and log them in.
        const socialUser: User = {
            id: Date.now(),
            name: `${provider} User`,
            email: `socialuser@${provider.toLowerCase()}.com`
        };
        setIsAuthenticated(true);
        setCurrentUser(socialUser);
        resetToHome();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setCurrentUser(null);
        resetToHome();
    };
    
    const handleSignUp = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string; }> => {
        if (MOCK_USERS.some(u => u.email === email)) {
            return { success: false, message: 'An account with this email already exists.' };
        }
        const newUser: User = { id: MOCK_USERS.length + 1, name, email, password };
        MOCK_USERS.push(newUser);
        setIsAuthenticated(true);
        setCurrentUser(newUser);
        resetToHome();
        return { success: true, message: 'Account created successfully!' };
    };

    const handleForgotPassword = async (email: string) => {
        // In a real app, this would trigger a password reset email.
        console.log(`Password reset requested for: ${email}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleOrderPlaced = async () => {
        if (!currentUser) {
            console.error("Cannot place order without a logged in user.");
            // Optionally, redirect to login
            return;
        }

        const newOrderData: Omit<Order, 'id'> = {
            userId: currentUser.id,
            date: new Date().toISOString(),
            total: totalPrice,
            items: cartItems.map(item => ({
                productId: item.id,
                productName: item.name,
                quantity: item.quantity,
                price: item.price
            }))
        };
        
        try {
            const createdOrder = await createOrder(newOrderData);
            // Simulate sending order confirmation emails
            sendOrderConfirmationEmails(createdOrder, currentUser, adminEmail);
            clearCart();
            setCurrentPage('confirmation');
        } catch (error) {
            console.error("Failed to create order:", error);
            // Show a more detailed error message to the user
            const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred. Please try again.";
            alert(`There was an error placing your order.\n\nDetails: ${errorMessage}`);
        }
    };
    
    const filteredProducts = PRODUCTS.filter(product => {
        const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const renderContent = () => {
        switch (currentPage) {
            case 'product':
                return selectedProduct && <ProductDetail product={selectedProduct} onBack={resetToHome} isAuthenticated={isAuthenticated} currentUser={currentUser} />;
            case 'checkout':
                return <Checkout onOrderPlaced={handleOrderPlaced} onCancel={() => setCurrentPage('home')} />;
            case 'confirmation':
                return <OrderConfirmation onContinueShopping={resetToHome} />;
            case 'order_history':
                return currentUser && <OrderHistory userId={currentUser.id} onBack={resetToHome} />;
            case 'our_story':
                return <OurStory onBack={resetToHome} />;
            case 'contact_us':
                return <ContactUs onBack={resetToHome} adminEmail={adminEmail} />;
            case 'faq':
                return <Faq onBack={resetToHome} />;
            case 'shipping_returns':
                return <ShippingReturns onBack={resetToHome} />;
            case 'home':
            default:
                return (
                    <ProductGrid
                        products={filteredProducts}
                        onProductSelect={handleProductSelect}
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                    />
                );
        }
    };

    if (!isAuthenticated) {
        switch (currentPage) {
            case 'login':
                return <Login onLogin={handleLogin} onSocialLogin={handleSocialLogin} onNavigateToSignUp={() => navigateTo('signup')} onNavigateToForgotPassword={() => navigateTo('forgot_password')} />;
            case 'signup':
                return <SignUp onSignUp={handleSignUp} onSocialSignUp={handleSocialLogin} onNavigateToLogin={() => navigateTo('login')} />;
            case 'forgot_password':
                 return <ForgotPassword onForgotPasswordRequest={handleForgotPassword} onNavigateToLogin={() => navigateTo('login')} />;
            default:
                 return <Login onLogin={handleLogin} onSocialLogin={handleSocialLogin} onNavigateToSignUp={() => navigateTo('signup')} onNavigateToForgotPassword={() => navigateTo('forgot_password')} />;
        }
    }


    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header
                onCartClick={() => setCartOpen(true)}
                onSearchChange={setSearchTerm}
                searchTerm={searchTerm}
                onLogoClick={resetToHome}
                user={currentUser}
                onLogout={handleLogout}
                onNavigateToOrderHistory={() => navigateTo('order_history')}
            />
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                {renderContent()}
            </main>
            <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} onCheckout={() => { setCartOpen(false); isAuthenticated ? navigateTo('checkout') : navigateTo('login'); }}/>
            <Footer 
                onNavigateToOurStory={() => navigateTo('our_story')}
                onNavigateToContactUs={() => navigateTo('contact_us')}
                onNavigateToFaq={() => navigateTo('faq')}
                onNavigateToShipping={() => navigateTo('shipping_returns')}
                adminEmail={adminEmail}
                onAdminEmailChange={setAdminEmail}
            />
        </div>
    );
};


const App: React.FC = () => {
  return (
    <CartProvider>
      <AppComponent />
    </CartProvider>
  );
}

export default App;