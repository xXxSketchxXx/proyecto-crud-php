<?php
// Importa la clase ProductModel que contiene las funciones relacionadas con los productos
require_once('../models/ProductModel.php');

// Inicializa variables y define una respuesta por defecto
$option = isset($_REQUEST['op']) ? $_REQUEST['op'] : '';
$objProduct = new ProductModel();
$arrResponse = array('status' => false, 'msg' => 'Error en la solicitud');

// Evalúa la opción proporcionada y realiza acciones correspondientes
switch ($option) {
    case 'getProducts':
        // Obtiene todos los productos y actualiza la respuesta si hay productos disponibles
        $arrProducts = $objProduct->getProducts();
        if (!empty($arrProducts)) {
            $arrResponse['status'] = true;
            $arrResponse['data'] = $arrProducts;
        }
        break;

    case 'getProduct':
        // Obtiene un producto específico según el ID proporcionado y actualiza la respuesta si el producto existe
        $idProduct = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
        if ($idProduct === false || $idProduct === null) {
            $arrResponse['msg'] = 'ID de producto no válido';
        } else {
            $arrProduct = $objProduct->getProduct($idProduct);
            if (!empty($arrProduct)) {
                $arrResponse['status'] = true;
                $arrResponse['data'] = $arrProduct;
            }
        }
        break;

    case 'addProduct':
        // Agrega un nuevo producto con los datos proporcionados y actualiza la respuesta en consecuencia
        $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
        $descripcion = isset($_POST['descripcion']) ? trim($_POST['descripcion']) : '';
        $precio = isset($_POST['precio']) ? floatval($_POST['precio']) : 0.0;
        $idFabricante = isset($_POST['idFabricante']) ? filter_input(INPUT_POST, 'idFabricante', FILTER_VALIDATE_INT) : 0;
        $imagen = isset($_POST['imagen']) ? trim($_POST['imagen']) : '';

        if (empty($nombre) || empty($descripcion) || $precio <= 0 || $idFabricante <= 0 || empty($imagen)) {
            $arrResponse['msg'] = 'Todos los campos son obligatorios y deben tener valores válidos.';
        } else {
            $arrProduct = $objProduct->addProduct($nombre, $descripcion, $precio, $idFabricante, $imagen);

            if ($arrProduct) {
                $arrResponse['status'] = true;
                $arrResponse['msg'] = 'Producto creado correctamente';
            } else {
                $arrResponse['msg'] = 'Error al crear el producto';
            }
        }
        break;

    case 'updateProduct':
        // Actualiza un producto existente con los datos proporcionados y actualiza la respuesta en consecuencia
        $id = isset($_REQUEST['id']) ? filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) : 0;
        $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
        $descripcion = isset($_POST['descripcion']) ? trim($_POST['descripcion']) : '';
        $precio = isset($_POST['precio']) ? floatval($_POST['precio']) : 0.0;
        $idFabricante = isset($_POST['idFabricante']) ? filter_input(INPUT_POST, 'idFabricante', FILTER_VALIDATE_INT) : 0;
        $imagen = isset($_POST['imagen']) ? trim($_POST['imagen']) : '';

        if ($id <= 0 || empty($nombre) || empty($descripcion) || $precio <= 0 || $idFabricante <= 0 || empty($imagen)) {
            $arrResponse['msg'] = 'Todos los campos son obligatorios y deben tener valores válidos.';
        } else {
            $arrProduct = $objProduct->updateProduct($id, $nombre, $descripcion, $precio, $idFabricante, $imagen);

            if ($arrProduct) {
                $arrResponse['status'] = true;
                $arrResponse['msg'] = 'Producto actualizado correctamente';
            } else {
                $arrResponse['msg'] = 'Error al actualizar el producto';
            }
        }
        break;

    case 'deleteProduct':
        // Elimina un producto según el ID proporcionado y actualiza la respuesta en consecuencia
        $id = isset($_REQUEST['id']) ? filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT) : 0;

        if ($id <= 0) {
            $arrResponse['msg'] = 'Todos los campos son obligatorios';
        } else {
            $arrProduct = $objProduct->deleteProduct($id);

            if ($arrProduct) {
                $arrResponse['status'] = true;
                $arrResponse['msg'] = 'Producto eliminado correctamente';
            } else {
                $arrResponse['msg'] = 'Error al eliminar el producto';
            }
        }
        break;

    default:
        // Opción no válida
        $arrResponse['msg'] = 'Opción no válida';
}

// Devuelve la respuesta en formato JSON y finaliza la ejecución del script
echo json_encode($arrResponse, JSON_UNESCAPED_UNICODE);
exit();
?>