<?php
    require_once ('../libraries/conexion.php');

    class FabricanteModel {
        private $conexion;
        function __construct() {
            $this->conexion = new Conexion();
            $this->conexion = $this->conexion->obtenerConexion();
        }

        function getFabricantes(){
            $arrFabricantes = array();
            $rs = $this->conexion->query("CALL get_fabricantes()");

            while ($row = $rs->fetch(PDO::FETCH_ASSOC)) {
                $arrFabricantes[] = $row;
            }

            return $arrFabricantes;
        }
    }

?>