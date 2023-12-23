const productDataUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

document.addEventListener('DOMContentLoaded', () => {
    fetchData(productDataUrl, 'men');
});

async function fetchData(url, category) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayProducts(data,category);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayProducts(products,category) {
    // console.log(products.categories)
    const productContainer = document.getElementById('menProducts');
    productContainer.innerHTML = '';
    const  categoryData =products.categories.find(c=> c.category_name.toLowerCase() === category)
    console.log( categoryData.category_products)
    categoryData.category_products.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('img');
    // image.className="card-image"
    image.src = product.image;
    card.appendChild(image);

    const content = document.createElement('div');
    content.className = 'card-content';

    const badge = document.createElement('div');
    badge.className = 'badge';
    badge.textContent = product.badge;
    content.appendChild(badge);

    const title = document.createElement('h3');
    title.textContent = product.title;
    content.appendChild(title);

    const vendor = document.createElement('p');
    vendor.textContent = 'Vendor : ' + product.vendor;
    content.appendChild(vendor);

    const price = document.createElement('p');
    // const span = document.createElement('span')
    price.textContent = 'Rs : ' + product.price;
    // price.appendChild(span)
    content.appendChild(price);

    const comparePrice = document.createElement('div');
    const para = document.createElement('p');
    para.className="discount-price"
    const span = document.createElement('span')
    comparePrice.className="compare-price"
    comparePrice.textContent = 'Compare at Price : ' 
    span.textContent= product.compare_at_price 
    const discountPercentage = calculateDiscountPercentage(product.price, product.compare_at_price);
    para.textContent =  ` ${discountPercentage}% off`
    comparePrice.appendChild(span)
    comparePrice.appendChild(para)
    content.appendChild(comparePrice);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart-btn';
    addToCartBtn.textContent = 'Add to Cart';
    content.appendChild(addToCartBtn);

    card.appendChild(content);

    return card;
}

function calculateDiscountPercentage(price, comparePrice) {
    const discount = ((comparePrice - price) / comparePrice) * 100;
    return Math.round(discount);
}

function showProducts(category) {
    fetchData(productDataUrl, category);
}