// Función asincrónica para obtener la lista de fabricantes y llenar un select en el formulario
async function getFabricantes() {
    try {
        let resp = await fetch('http://localhost/ecommerce-informatica/controllers/Fabricante.php?op=getFabricantes');
        json = await resp.json();
        if (json.status) {
            let data = json.data;
            // Iterar sobre la lista de fabricantes y crear opciones para el select
            data.forEach(item => {
                let newOption = document.createElement("option");
                newOption.value = item.id;
                newOption.innerHTML = item.nombre;
                document.querySelector("#idFabricante").appendChild(newOption);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

// Verificar si el formulario de registro o edición está presente en la página
if (document.querySelector("#form_product") || document.querySelector("#form_edit-product")) {
    // Llamar a la función para obtener la lista de fabricantes
    getFabricantes();

    // Obtener todos los campos de entrada y select del formulario
    const campos_inputs = document.querySelectorAll("form input");
    const campos_select = document.querySelectorAll("form select");

    // Expresiones regulares para validar campos específicos del formulario
    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ0-9\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        descripcion: /^[a-zA-ZÀ-ÿ0-9\s.,]{1,255}$/, // Letras y espacios, pueden llevar acentos.
        precio: /^\d{1,5}([,]\d{1,2})?$/, // 1 a 5 numeros, puede llevar punto decimal.
        idFabricante: /^[1-9]\d*$/, // 1 a 9 numeros.
        imagen: /^https:\/\/res\.cloudinary\.com\// // URL de Cloudinary.
    }

    // Estado de validez de cada campo del formulario
    const campos = {
        nombre: false,
        descripcion: false,
        precio: false,
        idFabricante: false,
        imagen: false
    }

    // Función para validar el formulario al escribir o salir del campo
    const validarFormulario = (e) => {
        switch (e.target.name) {
            case "nombre":
                validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
            case "descripcion":
                validarCampo(expresiones.descripcion, e.target, 'descripcion');
                break;
            case "precio":
                validarCampo(expresiones.precio, e.target, 'precio');
                break;
            case "idFabricante":
                validarCampo(expresiones.idFabricante, e.target, 'idFabricante');
                break;
            case "imagen":
                validarCampo(expresiones.imagen, e.target, 'imagen');
                break;
        }
    }

    // Función para validar un campo específico
    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.querySelector(`#grupo__${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
            campos[campo] = true;
        } else {
            document.querySelector(`#grupo__${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
            campos[campo] = false;
        }
    }

    // Asociar eventos de validación a campos de entrada
    campos_inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    // Asociar eventos de validación a campos de select
    campos_select.forEach((select) => {
        select.addEventListener('change', validarFormulario);
        select.addEventListener('blur', validarFormulario);
    });

    // Si el formulario es de edición, obtener el producto correspondiente
    if (document.querySelector("#form_edit-product")) {
        let id = obtenerValorParametroP();

        // Función para obtener y llenar los datos del producto a editar
        async function getProduct() {
            try {
                let id = obtenerValorParametroP();

                if (id !== null && !isNaN(id)) {
                    const res = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=getProduct&id=${encodeURIComponent(id)}`);
                    const json = await res.json();

                    if (json.status) {
                        let data = json.data;
                        data.forEach(item => {
                            document.querySelector("#nombre").value = item.nombre;
                            document.querySelector("#descripcion").value = item.descripcion;
                            document.querySelector("#precio").value = item.precio;
                            document.querySelector("#idFabricante").value = item.idFabricante;
                            document.querySelector("#imagen").value = item.imagen;
                        });
                    } else {
                        // Redirigir a la página principal si no se encuentra el producto
                        window.location.href = "http://localhost/ecommerce-informatica/index.php";
                    }
                } else {
                    // Redirigir a la página principal si el parámetro "id" no es válido
                    window.location.href = "http://localhost/ecommerce-informatica/index.php";
                }
            } catch (error) {
                console.error(error);
            }
        }
        // Llamar a la función para obtener el producto
        getProduct();

        const edit_form = document.querySelector("#form_edit-product");

        // Función para manejar la submisión del formulario de edición
        edit_form.onsubmit = function (e) {
            e.preventDefault();

            // Verificar la validez de los campos antes de enviar la solicitud de edición
            if (campos.nombre && campos.descripcion && campos.precio && campos.idFabricante && campos.imagen) {
                fn_editarProducto();
            } else {
                // Mostrar mensaje de error si algún campo no es válido
                swal("Error", "Por favor, rellene correctamente el formulario", "error");
            }
        }
    } else {
        const register_form = document.querySelector("#form_product");

        // Función para manejar la submisión del formulario de registro
        register_form.onsubmit = function (e) {
            e.preventDefault();

            // Verificar la validez de los campos antes de enviar la solicitud de registro
            if (campos.nombre && campos.descripcion && campos.precio && campos.idFabricante && campos.imagen) {
                fn_guardarProducto();
            } else {
                // Mostrar mensaje de error si algún campo no es válido
                swal("Error", "Por favor, rellene correctamente el formulario", "error");
            }
        }
    }

    // Función asincrónica para guardar un nuevo producto
    async function fn_guardarProducto() {
        const register_form = document.querySelector("#form_product")
        try {
            const data = new FormData(register_form);
            let resp = await fetch('http://localhost/ecommerce-informatica/controllers/Product.php?op=addProduct', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: data
            });
            json = await resp.json();
            if (json.status) {
                // Mostrar mensaje de éxito y reiniciar el formulario
                swal("Registrar", json.msg, "success");
                register_form.reset();
            } else {
                // Mostrar mensaje de error si la operación no fue exitosa
                swal("Error", json.msg, "error");

            }
        } catch (error) {
            console.error(error);
        }
    }

    // Función asincrónica para editar un producto existente
    async function fn_editarProducto() {
        const edit_form = document.querySelector("#form_edit-product");
        try {
            let id = obtenerValorParametroP();
            const data = new FormData(edit_form);
            const resp = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=updateProduct&id=${encodeURIComponent(id)}`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: data
            });
            json = await resp.json();
            if (json.status) {
                // Mostrar mensaje de éxito, reiniciar el formulario y redirigir a la página principal
                swal("Editar", json.msg, "success");
                setTimeout(() => {
                    edit_form.reset();
                    window.location = "http://localhost/ecommerce-informatica/index.php";
                }, 2000);
            } else {
                // Mostrar mensaje de error si la operación no fue exitosa
                swal("Error", json.msg, "error");

            }
        } catch (error) {
            console.error(error);
        }
    }
}