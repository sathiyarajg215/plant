
import React, { Fragment } from 'react';
import { useCart } from '../context/CartContext';
import { CloseIcon, TrashIcon } from './Icons';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cartItems, removeFromCart, updateQuantity, itemCount, totalPrice } = useCart();

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'visible' : 'invisible'}`}>
      {/* Overlay */}
      <div 
        onClick={onClose} 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? 'opacity-50' : 'opacity-0'}`}
      ></div>
      
      {/* Panel */}
      <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-serif font-bold text-slate-800">Your Cart</h2>
          <button onClick={onClose} className="p-2 rounded-full text-slate-500 hover:bg-slate-100">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        
        {itemCount > 0 ? (
          <Fragment>
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div className="flex-grow">
                    <h3 className="font-bold text-slate-700">{item.name}</h3>
                    <p className="text-sm text-slate-500">${item.price.toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <input 
                        type="number" 
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                        className="w-16 text-center border rounded-md"
                        min="1"
                      />
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-red-500 p-2">
                     <TrashIcon className="w-5 h-5"/>
                  </button>
                </div>
              ))}
            </div>
        
            <div className="p-6 border-t bg-slate-50">
              <div className="flex justify-between items-center mb-4 font-medium">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-800 text-xl">${totalPrice.toFixed(2)}</span>
              </div>
              <button onClick={onCheckout} className="w-full bg-emerald-600 text-white font-bold py-3 rounded-lg hover:bg-emerald-700 transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </Fragment>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <h3 className="text-xl font-serif text-slate-700">Your cart is empty</h3>
            <p className="text-slate-500 mt-2">Find something beautiful to add!</p>
            <button onClick={onClose} className="mt-6 bg-emerald-100 text-emerald-800 font-bold py-2 px-5 rounded-lg hover:bg-emerald-200 transition-colors">
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
