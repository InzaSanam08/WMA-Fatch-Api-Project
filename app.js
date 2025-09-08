const products = [
  { id: 1, name: "Front Table CSS", category: "Furniture", price: 150.5, stock: 544, sold: 256, img: "https://picsum.photos/200/150?1" },
  { id: 2, name: "Apple Watch Series 10", category: "Electronic", price: 160.4, stock: 300, sold: 180, img: "https://picsum.photos/200/150?2" },
  { id: 3, name: "Chester Chair", category: "Furniture", price: 120.3, stock: 200, sold: 150, img: "https://picsum.photos/200/150?3" },
  { id: 4, name: "Air Wireless Headphone", category: "Electronic", price: 120.99, stock: 150, sold: 90, img: "https://picsum.photos/200/150?4" },
  { id: 5, name: "Nike Downshifter 12", category: "Shoes", price: 150.5, stock: 500, sold: 300, img: "https://picsum.photos/200/150?5" }
];
const productContainer = document.querySelector("#product-list");

function renderProducts(list) {
  productContainer.innerHTML = ""; // purane clear
  list.forEach(p => {
    const col = document.createElement("div");
    col.className = "col";
    col.innerHTML = `
      <div class="card product-card h-100">
        <img src="${p.img}" class="card-img-top" alt="${p.name}">
        <div class="card-body">
          <p class="product-title">${p.name}</p>
          <p class="product-price">$${p.price}</p>
          <div class="d-flex justify-content-between product-meta">
            <span>Stock: ${p.stock}</span>
            <span>Sold: ${p.sold}</span>
          </div>
        </div>
      </div>`;
    productContainer.appendChild(col);
  });
}
const searchInput = document.querySelector(".form-control");

searchInput.addEventListener("input", e => {
  const keyword = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
  renderProducts(filtered);
});
const tabs = document.querySelectorAll(".nav-pills .nav-link");

tabs.forEach(tab => {
  tab.addEventListener("click", e => {
    e.preventDefault();

    // active class update
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const category = tab.textContent.trim();

    if (category === "All Products") {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === category);
      renderProducts(filtered);
    }
  });
});
