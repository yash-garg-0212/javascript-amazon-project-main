import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";

import { loadProductsFetch } from "../data/products.js";
// import '../data/cart-oop.js';
// import '../data/backend.js';

async function loadPage(){

  await loadProductsFetch();
  renderOrderSummary();
  renderPaymentSummary();
};
loadPage();

// loadProductsFetch().then(()=>{
//   renderOrderSummary();
//   renderPaymentSummary();
// });
