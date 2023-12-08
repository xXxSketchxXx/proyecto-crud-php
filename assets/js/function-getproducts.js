async function getProducts() {
    try {
        const res = await fetch('http://localhost/ecommerce-informatica/controllers/Product.php?op=getProducts');
        json = await res.json();
        if (json.status){
            let data = json.data;
            data.forEach(item => {
                let newCard = document.createElement('div');
                newCard.classList.add('product-card');
                newCard.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h2>${item.nombre}</h2>
                    <span class="price">$${item.precio} €</span>
                    <div class="view-more"><a href="views/product/product-details.php?p=${item.id}">Ver más</a></div>
                `;
                document.querySelector('.product-collection').appendChild(newCard);
            });
        }
    } catch (error) {
        console.log(error);
    }
}
getProducts();