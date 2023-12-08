async function getFabricantes(){
    try{
        let resp = await fetch('http://localhost/ecommerce-informatica/controllers/Fabricante.php?op=getFabricantes');
        json = await resp.json();
        if (json.status){
            let data = json.data;
            data.forEach(item => {
                let newOption = document.createElement("option");
                newOption.value = item.id;
                newOption.innerHTML = item.nombre;
                document.querySelector("#idFabricante").appendChild(newOption);
            });
        }
    }catch(error){
        console.error(error);
    }
}

if (document.querySelector("#form_product") || document.querySelector("#form_edit-product")){
    getFabricantes();

    const campos_inputs = document.querySelectorAll("form input");
    const campos_select = document.querySelectorAll("form select");

    const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        descripcion: /^[a-zA-ZÀ-ÿ\s.,]{1,255}$/, // Letras y espacios, pueden llevar acentos.
        precio: /^\d{1,5}([,]\d{1,2})?$/, // 1 a 5 numeros, puede llevar punto decimal.
        idFabricante: /^[1-9]\d*$/, // 1 a 9 numeros.
        imagen: /^https:\/\/res\.cloudinary\.com\// // URL de Cloudinary.
    }

    const campos = {
        nombre: false,
        descripcion: false,
        precio: false,
        idFabricante: false,
        imagen: false
    }

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

    const validarCampo = (expresion, input, campo) => {
        if (expresion.test(input.value)) {
            document.querySelector(`#grupo__${campo} .formulario_input-error`).classList.remove('formulario_input-error-activo');
            campos[campo] = true;
        } else {
            document.querySelector(`#grupo__${campo} .formulario_input-error`).classList.add('formulario_input-error-activo');
            campos[campo] = false;
        }
    }

    campos_inputs.forEach((input) => {
        input.addEventListener('keyup', validarFormulario);
        input.addEventListener('blur', validarFormulario);
    });

    campos_select.forEach((select) => {
        select.addEventListener('change', validarFormulario);
        select.addEventListener('blur', validarFormulario);
    });

    if (document.querySelector("#form_edit-product")){
        let id = obtenerValorParametroP();

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
                            document.querySelector("#nombre").value = item.nombre;
                            document.querySelector("#descripcion").value = item.descripcion;
                            document.querySelector("#precio").value = item.precio;
                            document.querySelector("#idFabricante").value = item.idFabricante;
                            document.querySelector("#imagen").value = item.imagen;
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

        const edit_form = document.querySelector("#form_edit-product");

        edit_form.onsubmit= function (e){
            e.preventDefault();
    
            if (campos.nombre && campos.descripcion && campos.precio && campos.idFabricante && campos.imagen) {
                fn_editarProducto();
            } else {
                swal("Error","Por favor, rellene correctamente el formulario","error");
            }
        }
    }else{
        const register_form = document.querySelector("#form_product");

        register_form.onsubmit= function (e){
            e.preventDefault();
    
            if (campos.nombre && campos.descripcion && campos.precio && campos.idFabricante && campos.imagen) {
                fn_guardarProducto();
            } else {
                swal("Error","Por favor, rellene correctamente el formulario","error");
            }
        }
    }

    async function fn_guardarProducto(){
        const register_form = document.querySelector("#form_product")
        try {
            const data = new FormData(register_form);
            let resp = await fetch('http://localhost/ecommerce-informatica/controllers/Product.php?op=addProduct',{
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: data
            });
            json = await resp.json();
            if (json.status){
                swal("Registrar",json.msg,"success");
                register_form.reset();
            }else{
                swal("Error",json.msg,"error");

            }
        } catch (error) {
            console.error(error);
        }
    }

    async function fn_editarProducto(){
        const edit_form = document.querySelector("#form_edit-product");
        try {
            let id = obtenerValorParametroP();
            const data = new FormData(edit_form);
            const resp = await fetch(`http://localhost/ecommerce-informatica/controllers/Product.php?op=updateProduct&id=${encodeURIComponent(id)}`,{
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                body: data
            });
            json = await resp.json();
            if (json.status){
                swal("Editar",json.msg,"success");
                edit_form.reset();
                window.location = "http://localhost/ecommerce-informatica/index.php";
            }else{
                swal("Error",json.msg,"error");

            }
        } catch (error) {
            console.error(error);
        }
    }
}