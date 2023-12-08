<?php
require_once('../libraries/conexion.php');

class ProductModel
{
    private $conexion;

    public function __construct()
    {
        $this->conexion = new Conexion();
        $this->conexion = $this->conexion->obtenerConexion();
    }

    public function getProducts()
    {
        $arrProducts = array();
        $stmt = $this->conexion->prepare("CALL get_products()");
        $stmt->execute();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $arrProducts[] = $row;
        }

        return $arrProducts;
    }

    public function getProduct($idProduct)
    {
        $arrProduct = array();
        $stmt = $this->conexion->prepare("CALL get_product(:idProduct)");
        $stmt->bindParam(':idProduct', $idProduct, PDO::PARAM_INT);
        $stmt->execute();

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $arrProduct[] = $row;
        }

        return $arrProduct;
    }

    public function addProduct($nombre, $descripcion, $precio, $idFabricante, $imagen)
    {
        $stmt = $this->conexion->prepare("CALL add_product(:nombre, :descripcion, :precio, :idFabricante, :imagen)");
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_INT);
        $stmt->bindParam(':idFabricante', $idFabricante, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt;
    }

    public function updateProduct($id, $nombre, $descripcion, $precio, $idFabricante, $imagen)
    {
        $stmt = $this->conexion->prepare("CALL update_product(:id, :nombre, :descripcion, :precio, :idFabricante, :imagen)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $stmt->bindParam(':descripcion', $descripcion, PDO::PARAM_STR);
        $stmt->bindParam(':precio', $precio, PDO::PARAM_INT);
        $stmt->bindParam(':idFabricante', $idFabricante, PDO::PARAM_INT);
        $stmt->bindParam(':imagen', $imagen, PDO::PARAM_STR);

        $stmt->execute();

        return $stmt;
    }

    public function deleteProduct($id)
    {
        $stmt = $this->conexion->prepare("CALL delete_product(:id)");
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        $stmt->execute();

        return $stmt;
    }
}
