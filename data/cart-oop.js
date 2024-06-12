function Cart(localStoragekey){
const cart={
  cartItems: [],

  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem  (localStoragekey)) || [];
    if(!this.cartItems.length){
        this.cartItems=[{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1',
      },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2',
      }];
      this.saveToStorage();
    }
  },
  saveToStorage(){
    localStorage.setItem(localStoragekey,JSON.stringify(this.cartItems));
  },
  addToCart(productId){
  
    let matchingItem;
    this.cartItems.forEach((cartItem) =>{
      if(productId === cartItem.productId){
        matchingItem=cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity+=1;
    } else{
      this.cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    })
    }
    this.saveToStorage();
  },
  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage();
  },
  updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach((cartItem)=>{
      if(productId===cartItem.productId){
        matchingItem= cartItem;
      }
    });
  
    matchingItem.deliveryOptionId= deliveryOptionId;
  
    this.saveToStorage();
  }
};

  return cart;
};
const cart = Cart('cart-oop');
cart.addToCart('54e0eccd-8f36-462b-b68a-8182611d9add');
const bussinessCart = Cart('cart-bussiness');

cart.loadFromStorage();
bussinessCart.loadFromStorage();
console.log(cart);
console.log(bussinessCart);
