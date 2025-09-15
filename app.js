let products = [];
const productListContainer = document.querySelector('.container.py-4');
const searchInput = document.querySelector('input[type="search"]');
const searchBtn = document.querySelector('.btn.btn-dark');
const navLinks = document.querySelectorAll('.nav-pills .nav-link');

async function fetchProducts() {
  
  // const res = await fetch('https://dummyjson.com/products');
  const res = await fetch('https://fakestoreapi.com/products');
  products = await res.json();
  renderProducts(products);
}

// Render product cards
function renderProducts(list) {
  productListContainer.innerHTML = `
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4" id="product-list">
      ${list.map(product => `
        <div class="col">
          <div class="card product-card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <p class="product-title">${product.title}</p>
              <p class="product-price">$${product.price}</p>
              <div class="d-flex justify-content-between product-meta">
                <span>Category: ${product.category}</span>
                <span>Rating: ${product.rating?.rate || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Search functionality
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = products.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  renderProducts(filtered);
});

// Category filter functionality
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const category = link.textContent.trim();
    if (category === 'All Products') {
      renderProducts(products);
    } else if (category === 'Most Purchased') {
      // Sort by rating count (simulate "most purchased")
      const sorted = [...products].sort((a, b) => (b.rating?.count || 0) - (a.rating?.count || 0));
      renderProducts(sorted.slice(0, 8));
    } else {
      // Map nav text to API category
      const categoryMap = {
        'Electronic': 'electronics',
        'Clothes': 'men\'s clothing',
        'Shoes': 'men\'s clothing',
        'Furniture': 'jewelery',
        'Sports': 'men\'s clothing',
        'Grocery': 'women\'s clothing'
      };
      const apiCategory = categoryMap[category] || category.toLowerCase();
      const filtered = products.filter(product =>
        product.category.toLowerCase().includes(apiCategory)
      );
      renderProducts(filtered);
    }
  });
});

// Initial fetch
fetchProducts();
