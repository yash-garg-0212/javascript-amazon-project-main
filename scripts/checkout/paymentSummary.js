import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import { getmatchingProduct } from "../../data/products.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){
  let productPrice=0;
  let shippingPrice=0;
  cart.forEach((cartItem)=>{
    const product = getmatchingProduct(cartItem.productId);
    productPrice+= product.price * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;
  });

  const TotalBeforeTax = productPrice+shippingPrice;

  const TotalTax = (TotalBeforeTax*0.1);
  const totalAfterTax = TotalTax+TotalBeforeTax;
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">&#8377 ${productPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">&#8377 ${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">&#8377 ${TotalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">&#8377 ${TotalTax.toFixed(0)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">&#8377 ${totalAfterTax}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;

          document.querySelector('.js-payment-summary').innerHTML= paymentSummaryHTML;

          document.querySelector('.js-place-order').addEventListener('click', async ()=>{

            try {
              const response = await fetch('https://supersimplebackend.dev/orders',{
              method: 'POST',
              headers: {
                'Content-Type':'application/json'
              },
              body: JSON.stringify({
                cart: cart
              })
            });

            const order = await response.json();
            addOrder(order);
            } catch (error) {
              console.log('Unexpected error. Try again later');
            }
           window.location.href = 'orders.html';
          })
}