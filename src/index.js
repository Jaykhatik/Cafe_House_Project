import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from "./website/component/cartcontext";
import { WishlistProvider } from './website/component/WhishlistContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WishlistProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </WishlistProvider>
);
