
import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetail } from './components/ProductDetail';
import { Footer } from './components/Footer';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { OrderConfirmation } from './components/OrderConfirmation';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { ForgotPassword } from './components/ForgotPassword';
import { OrderHistory } from './components/OrderHistory';
import { CartProvider, useCart } from './context/CartContext';
import { Product, User, Order } from './types';
import { PRODUCTS, CATEGORIES } from './constants';
import { createOrder } from './services/orderService';


type View = 'listing' | 'detail' | 'checkout' | 'confirmation' | 'orderHistory';
type AuthView = 'login' | 'signup' | 'forgotPassword';

const MOCK_USER: User = { id: 1, email: 'user@example.com', password: 'password123', name: 'Demo User' };

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('listing');
  const [authView, setAuthView] = useState<AuthView>('login');
  const [users, setUsers] = useState<User[]>([MOCK_USER]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setCartOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const { cartItems, totalPrice, clearCart } = useCart();

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                setIsAuthenticated(true);
                setCurrentUser(user);
                setView('listing');
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000);
    });
  };

  const handleSignUp = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
     return new Promise(resolve => {
        setTimeout(() => {
            if (users.some(u => u.email === email)) {
                resolve({ success: false, message: 'An account with this email already exists.' });
                return;
            }
            const newUser: User = {
                id: users.length + 1,
                name,
                email,
                password
            };
            setUsers(prev => [...prev, newUser]);
            setIsAuthenticated(true);
            setCurrentUser(newUser);
            setView('listing');

            console.log(`Simulating sending welcome email to ${email}...`);
            alert(`Welcome, ${name}! A confirmation has been "sent" to ${email}.`);


            resolve({ success: true, message: 'Account created successfully!' });
        }, 1000);
    });
  };
  
  const handleForgotPasswordRequest = async (email: string): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`Password reset requested for: ${email}`);
            resolve();
        }, 1000);
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    clearCart();
    setView('listing');
    setAuthView('login');
    setSelectedProduct(null);
  };


  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToListing = () => {
    setSelectedProduct(null);
    setView('listing');
  };

  const handleNavigateToCheckout = () => {
      setCartOpen(false);
      setView('checkout');
      window.scrollTo(0, 0);
  }

  const handleNavigateToOrderHistory = () => {
    setView('orderHistory');
    window.scrollTo(0, 0);
  }

  // --- BACKEND INTEGRATION: CREATE (POST) ---
  const handleOrderSuccess = async () => {
      if (!currentUser) return;

      const newOrderData = {
        date: new Date().toISOString(),
        total: totalPrice,
        userId: currentUser.id,
        items: cartItems.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price
        }))
      };

      try {
        await createOrder(newOrderData);
        clearCart();
        setView('confirmation');
        window.scrollTo(0, 0);
      } catch (error) {
        console.error("Failed to create order:", error);
        alert("There was an issue placing your order. Please try again.");
      }
  }

  const handleReturnHome = () => {
      setSelectedProduct(null);
      setView('listing');
  }

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, activeCategory]);
  
  const renderContent = () => {
      switch (view) {
          case 'listing':
              return <ProductGrid 
                        products={filteredProducts} 
                        onProductSelect={handleProductSelect} 
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                      />;
          case 'detail':
              return selectedProduct ? <ProductDetail 
                                          product={selectedProduct} 
                                          onBack={handleBackToListing} 
                                          isAuthenticated={isAuthenticated}
                                          currentUser={currentUser}
                                        /> : null;
          case 'checkout':
              return <Checkout onOrderPlaced={handleOrderSuccess} onCancel={handleBackToListing} />;
          case 'confirmation':
              return <OrderConfirmation onContinueShopping={handleReturnHome} />;
          case 'orderHistory':
              return currentUser ? <OrderHistory userId={currentUser.id} onBack={handleBackToListing} /> : null;
          default:
            return <ProductGrid 
                        products={filteredProducts} 
                        onProductSelect={handleProductSelect} 
                        categories={CATEGORIES}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                      />;
      }
  }

  if (!isAuthenticated) {
    switch (authView) {
        case 'login':
            return <Login 
                        onLogin={handleLogin} 
                        onNavigateToSignUp={() => setAuthView('signup')} 
                        onNavigateToForgotPassword={() => setAuthView('forgotPassword')}
                    />;
        case 'signup':
            return <SignUp 
                        onSignUp={handleSignUp} 
                        onNavigateToLogin={() => setAuthView('login')} 
                    />;
        case 'forgotPassword':
            return <ForgotPassword
                        onForgotPasswordRequest={handleForgotPasswordRequest}
                        onNavigateToLogin={() => setAuthView('login')}
                    />;
        default:
            return <Login 
                        onLogin={handleLogin} 
                        onNavigateToSignUp={() => setAuthView('signup')}
                        // FIX: Corrected typo from `setAuthVw` to `setAuthView`.
                        onNavigateToForgotPassword={() => setAuthView('forgotPassword')}
                    />;
    }
  }


  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-800 flex flex-col">
      <Header 
        user={currentUser}
        onLogout={handleLogout}
        onCartClick={() => setCartOpen(true)}
        onSearchChange={setSearchTerm}
        searchTerm={searchTerm}
        onLogoClick={handleReturnHome}
        onNavigateToOrderHistory={handleNavigateToOrderHistory}
      />
      <main className="container mx-auto px-4 py-8 flex-grow">
        {renderContent()}
      </main>
      <Footer />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setCartOpen(false)}
        onCheckout={handleNavigateToCheckout}
       />
    </div>
  );
}


function App() {
    return (
        <CartProvider>
            <AppContent />
        </CartProvider>
    )
}

export default App;
