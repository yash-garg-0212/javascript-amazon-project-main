import { cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOption.js';

const today=dayjs();
const deliveryDate = today.add(3,'days');
console.log(deliveryDate.format('dddd, MMM D'));

let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
  const productId = cartItem.productId;

  let matchingproduct; 
  products.forEach((product) =>{
    if(product.id === productId){
      matchingproduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id===deliveryOptionId){
      deliveryOption=option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML +=`<div class="cart-item-container 
  js-cart-item-container-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingproduct.name}
                </div>
                <div class="product-price">
                  &#8377 ${matchingproduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingproduct.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionHTML(matchingproduct, cartItem)}
              </div>
            </div>
          </div>
          </div>`;
});

function deliveryOptionHTML(matchingproduct, cartItem){
  let HTML = '';

  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');

    const datePrice = deliveryOption.price===0
    ?'Free'
    : `&#8377 ${deliveryOption.price}`

      const isChecked = deliveryOption.id ===cartItem.deliveryOptionId;

    HTML +=`<div class="delivery-option">
      <input type="radio" 
      ${isChecked? 'checked' : ''}
      class="delivery-option-input"
      name="delivery-option-${matchingproduct.id}">
      <div>
       <div class="delivery-option-date">
        ${dateString};
        </div>
        <div class="delivery-option-price">
         ${datePrice}
        </div>
      </div>
    </div>`
  });
  return HTML;
}
document.querySelector('.js-order-summary').innerHTML= cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
  link.addEventListener('click', () =>{
    const productId = link.dataset.productId;
    removeFromCart(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.remove();
  });
})