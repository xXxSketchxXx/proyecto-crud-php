<?php
// Se requiere el archivo de conexión
require_once('../libraries/conexion.php');

// Definición de la clase ProductModel
class ProductModel
{
    private $conexion;

    // Constructor de la clase
    public function __construct()
    {
        // Se instancia y obtiene la conexión al crear un objeto de la clase
        $this->conexion = new Conexion();
        $this->conexion = $this->conexion->obtenerConexion();
    }

    // Método para obtener todos los productos
    public function getProducts()
    {
        // Se crea un array para almacenar los productos
        $arrProducts = array();
        
        // Se prepara y ejecuta la llamada al procedimiento almacenado 'get_products'
        $stmt = $this->conexion->prepare("CALL get_products()");
        $stmt->execute();

        // Se recorren las filas del resultado y se agregan al array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $arrProducts[] = $row;
        }

        // Se devuelve el array con los productos
        return $arrProducts;
    }

    // Método para obtener un producto por su ID
    public function getProduct($idProduct)
    {
        // Se crea un array para almacenar la información del producto
        $arrProduct = array();

        // Se prepara y ejecuta la llamada al procedimiento almacenado 'get_product' con parámetro
        $stmt = $this->conexion->prepare("CALL get_product(:idProduct)");
        $stmt->bindParam(':idProduct', $idProduct, PDO::PARAM_INT);
        $stmt->execute();

        // Se recorren las filas del resultado y se agregan al array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $arrProduct[] = $row;
        }

        // Se devuelve el array con la información del producto
        return $arrProduct;
    }

    // Método para agregar un nuevo producto
    public function addProduct($nombre, $descripcion, $precio, $idFabricante, $imagen)
    {
        // Se prepara y ejecuta la llamada al procedimiento almacenado 'add_product' con parámetros
        $stmt = $this->conexion->prepare("CALL add_product(:nombre, :descripcion, :precio, :idFabricante, :imagen)");
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_INT);
        $stmt->bindParam(':idFabricante', $idFabricante, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

        // Se ejecuta la consulta y se devuelve el objeto statement
        $stmt->execute();

        return $stmt;
    }

    // Método para actualizar la información de un producto
    public function updateProduct($id, $nombre, $descripcion, $precio, $idFabricante, $imagen)
    {
        // Se prepara y ejecuta la llamada al procedimiento almacenado 'update_product' con parámetros
        $stmt = $this->conexion->prepare("CALL update_product(:id, :nombre, :descripcion, :precio, :idFabricante, :imagen)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_INT);
        $stmt->bindParam(':idFabricante', $idFabricante, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

        // Se ejecuta la consulta y se devuelve el objeto statement
        $stmt->execute();

        return $stmt;
    }

    // Método para eliminar un producto por su ID
    public function deleteProduct($id)
    {
        // Se prepara y ejecuta la llamada al procedimiento almacenado 'delete_product' con parámetro
        $stmt = $this->conexion->prepare("CALL delete_product(:id)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        // Se ejecuta la consulta y se devuelve el objeto statement
        $stmt->execute();

        return $stmt;
    }
}