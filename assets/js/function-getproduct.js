// Función asincrónica para obtener y mostrar los detalles de un producto
async function getProduct() {
    try {
        // Obtener el valor del parámetro "p" de manera segura
        let id = obtenerValorParametroP();

        // Verificar si se obtuvo un valor válido para "id"
        if (id !== null && !isNaN(id)) {
            // Realizar una solicitud a la API para obtener los detalles del producto por su ID
            const res = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=getProduct&id=${encodeURIComponent(id)}`);
            const json = await res.json();

            // Verificar si la respuesta de la API es exitosa
            if (json.status) {
                // Iterar sobre los datos del producto y crear una tarjeta de detalles
                let data = json.data;
                data.forEach(item => {
                    let newCard = document.createElement('div');
                    newCard.classList.add('product-details');
                    newCard.innerHTML = `
                        <div class="product-image">
                            <img src="${item.imagen}" alt="${item.nombre}">
                        </div>
                        <div class="product-info">
                            <h2>${item.nombre}</h2>
                            <p>${item.descripcion}</p>
                            <span class="price">${item.precio} €</span>
                            <div class="product-buttons">
                                <a href="edit-form.php?p=${item.id}" class="edit-button">Editar</a>
                                <div class="delete-button" onclick="deleteAlert(${item.id})">Eliminar</div>
                            </div>
                        </div>
                    `;
                    // Agregar la tarjeta de detalles al elemento con la clase 'product-details-section'
                    document.querySelector('.product-details-section').appendChild(newCard);
                });
            } else {
                // Redirigir a la página principal si la respuesta de la API no es exitosa
                window.location.href = "http://localhost/ecommerce-informatica/index.php";
            }
        } else {
            // Redirigir a la página principal si el ID no es válido
            window.location.href = "http://localhost/ecommerce-informatica/index.php";
        }
    } catch (error) {
        // Manejar errores de manera adecuada e imprimir en la consola
        console.error(error);
    }
}

// Llamar a la función getProduct para obtener y mostrar los detalles del producto
getProduct();

// Función para mostrar una alerta de confirmación antes de eliminar un producto
function deleteAlert(id){
    swal({
        title: "¿Estás seguro de eliminar este producto?",
        text: "Una vez eliminado no lo podrás recuperar.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            // Si el usuario confirma la eliminación, llamar a la función deleteProduct
            if (willDelete) {
                deleteProduct(id);
            }
        });
}

// Función asincrónica para eliminar un producto por su ID
async function deleteProduct(id) {
    try {
        // Realizar una solicitud a la API para eliminar el producto por su ID
        let resp = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=deleteProduct&id=${encodeURIComponent(id)}`);
        let json = await resp.json();

        // Verificar si la eliminación fue exitosa y mostrar un mensaje adecuado
        if (json.status){
            swal("Eliminado",json.msg,"success");
            // Redirigir a la página principal después de un breve retraso
            setTimeout(() => {
                window.location = "http://localhost/ecommerce-informatica/index.php";
            }, 2000);
        }else{
            // Mostrar un mensaje de error si la eliminación no fue exitosa
            swal("Error",json.msg,"error");
        }
    } catch (error) {
        // Manejar errores de manera adecuada e imprimir en la consola
        console.error(error);
    }
}