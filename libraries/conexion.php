<?php
require_once '../config/config.php';

class Conexion
{
    protected $conexion_db;

    public function __construct()
    {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
            $this->conexion_db = new PDO($dsn, DB_USER, DB_PASSWORD);
            $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion_db->setAttribute(PDO::ATTR_TIMEOUT, 30); // Tiempo de espera si no hay respuesta del servidor
            $this->conexion_db->exec("SET CHARACTER SET " . DB_CHARSET);
        } catch (PDOException $e) {
            // Registra la excepción en un archivo de registro
            error_log("Error de conexión: " . $e->getMessage(), 0);
            // Muestra un mensaje genérico al usuario
            echo "Ocurrió un error en la conexión.";
            exit();
        }
    }

    public function obtenerConexion()
    {
        return $this->conexion_db;
    }
}
?>