<?php
    require_once('../../config/config.php');
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Añadir</title>
    <link rel="stylesheet" href="../../assets/css/includes.css">
    <link rel="stylesheet" href="../../assets/css/create-form.css">
</head>

<body>
    <?php require '../includes/header.php'; ?>

    <form id="form_product">
        <h3>Añadir producto</h3>

        <div id="grupo__nombre">
            <label for="nombre" class="formulario_label">Nombre:</label>
            <input type="text" name="nombre" id="nombre" placeholder="Ej: Ordenador">
            <p class="formulario_input-error">Debe ingresar el nombre del producto.</p>
        </div>

        <div id="grupo__descripcion">
            <label for="descripcion" class="formulario_label">Descripción:</label>
            <input type="text" name="descripcion" id="descripcion" placeholder="Ej: Lorem Ipsum...">
            <p class="formulario_input-error">Debe ingresar la descripción del producto.</p>
        </div>

        <div id="grupo__precio">
            <label for="precio" class="formulario_label">Precio:</label>
            <input type="text" name="precio" id="precio" placeholder="Ej: 46,70">
            <p class="formulario_input-error">El precio del producto sólo deben ser números.</p>
        </div>

        <div id="grupo__idFabricante">
            <label for="idFabricante" class="formulario_label">Fabricante:</label>
            <select name="idFabricante" id="idFabricante">
                <option value="-1">Seleccione</option>
            </select>
            <p class="formulario_input-error">Seleccione un fabricante.</p>
        </div>

        <div id="grupo__imagen">
            <label for="imagen" class="formulario_label">Imagen del producto:</label>
            <input type="text" name="imagen" id="imagen" placeholder="https://res.cloudinary.com/">
            <p class="formulario_input-error">La imagen del producto es obligatoria, introduzca una válida.</p>
        </div>
        <div id="cont_submit">
            <input id="register" type="submit" value="Añadir">
        </div>
    </form>

    <?php require '../includes/footer.php'; ?>
    <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
    <script src="../../assets/js/function-forms.js"></script>
</body>

</html>