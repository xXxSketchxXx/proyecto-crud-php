<?php
    require_once ('../libraries/conexion.php');

    class FabricanteModel {
        private $conexion;
        
        // Constructor de la clase
        function __construct() {
            // Se instancia y obtiene la conexión al crear un objeto de la clase
            $this->conexion = new Conexion();
            $this->conexion = $this->conexion->obtenerConexion();
        }

        // Método para obtener todos los fabricantes
        function getFabricantes(){
            // Se crea un array para almacenar los fabricantes
            $arrFabricantes = array();

            // Se prepara y ejecuta la llamada al procedimiento almacenado 'get_fabricantes'
            $stmt = $this->conexion->prepare("CALL get_fabricantes()");
            $stmt->execute();

            // Se recorren las filas del resultado y se agregan al array
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $arrFabricantes[] = $row;
            }

            // Se devuelve el array con los fabricantes
            return $arrFabricantes;
        }
    }
?>