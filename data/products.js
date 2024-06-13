export function getmatchingProduct(productId) {
  return products.find(product => product.id === productId);
}

class Product {
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.priceCents;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getprice() {
    return this.price;
  }

  extraInfoHTML() {
    return ``;
  }
}

class Clothing extends Product {
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `
      <a href="${this.sizeChartLink}" target="_blank">
      Size chart
      </a>`;
  }
}

export let products = [];

export function loadProducts(callback) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('Products loaded:', products);

    callback();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
