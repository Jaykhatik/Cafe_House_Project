import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from "./website/component/cartcontext";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>

);
