import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProducts } from "../data/products.js";
// import '../data/cart-oop.js';
// import '../data/backend.js';

loadProducts(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
