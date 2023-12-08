// Función asincrónica para obtener productos desde el servidor
async function getProducts() {
    try {
        // Realizar una solicitud HTTP GET para obtener la lista de productos
        const res = await fetch('http://localhost/ecommerce-informatica/controllers/Product.php?op=getProducts');
        
        // Parsear la respuesta como JSON
        json = await res.json();

        // Verificar si la respuesta tiene un estado exitoso
        if (json.status) {
            // Obtener los datos de productos de la respuesta
            let data = json.data;

            // Iterar a través de cada elemento de datos y crear tarjetas de productos dinámicamente
            data.forEach(item => {
                // Crear un nuevo elemento div para representar una tarjeta de producto
                let newCard = document.createElement('div');
                newCard.classList.add('product-card');
                
                // Configurar el contenido HTML de la tarjeta de producto con los datos obtenidos
                newCard.innerHTML = `
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <h2>${item.nombre}</h2>
                    <span class="price">$${item.precio} €</span>
                    <div class="view-more"><a href="views/product/product-details.php?p=${item.id}">Ver más</a></div>
                `;
                
                // Agregar la nueva tarjeta de producto al contenedor de la colección de productos
                document.querySelector('.product-collection').appendChild(newCard);
            });
        }
    } catch (error) {
        // Manejar cualquier error que ocurra durante la obtención y procesamiento de datos
        console.log(error);
    }
}

// Llamar a la función getProducts para cargar y mostrar los productos al cargar la página
getProducts();
