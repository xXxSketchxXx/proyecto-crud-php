async function getProduct() {
    try {
        // Obtener el valor del parámetro "p" de manera segura
        let id = obtenerValorParametroP();

        // Verificar si se obtuvo un valor válido para "id"
        if (id !== null && !isNaN(id)) {
            const res = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=getProduct&id=${encodeURIComponent(id)}`);
            const json = await res.json();

            if (json.status) {
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
                    document.querySelector('.product-details-section').appendChild(newCard);
                });
            } else {
                window.location.href = "http://localhost/ecommerce-informatica/index.php";
            }
        } else {
            window.location.href = "http://localhost/ecommerce-informatica/index.php";
        }
    } catch (error) {
        console.error(error);
    }
}

getProduct();

function deleteAlert(id){
    swal({
        title: "¿Estás seguro de eliminar este producto?",
        text: "Una vez eliminado no lo podrás recuperar.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                deleteProduct(id);
            }
        });
}

async function deleteProduct(id) {
    try {
        let resp = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=deleteProduct&id=${encodeURIComponent(id)}`);
        let json = await resp.json();

        if (json.status){
            swal("Eliminado",json.msg,"success");
            setTimeout(() => {
                window.location = "http://localhost/ecommerce-informatica/index.php";
            }, 2000);
        }else{
            swal("Error",json.msg,"error");
        }
    } catch (error) {
        console.error(error);
    }
}