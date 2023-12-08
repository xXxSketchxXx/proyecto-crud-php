<?php
// Se incluye el archivo de configuración que contiene las constantes de la base de datos
require_once ('../config/config.php');

class Conexion
{
    // Propiedad que almacena la conexión a la base de datos
    protected $conexion_db;

    // Constructor de la clase
    public function __construct()
    {
        try {
            // Construye el DSN (Data Source Name) para la conexión PDO
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
            
            // Inicia una nueva instancia de PDO para establecer la conexión
            $this->conexion_db = new PDO($dsn, DB_USER, DB_PASSWORD);

            // Establece atributos de PDO para manejar errores y tiempos de espera
            $this->conexion_db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conexion_db->setAttribute(PDO::ATTR_TIMEOUT, 30); // Tiempo de espera si no hay respuesta del servidor
            
            // Establece el conjunto de caracteres para la conexión
            $this->conexion_db->exec("SET CHARACTER SET " . DB_CHARSET);
        } catch (PDOException $e) {
            // Captura excepciones PDO (errores de conexión)
            
            // Registra la excepción en un archivo de registro
            error_log("Error de conexión: " . $e->getMessage(), 0);
            
            // Muestra un mensaje genérico al usuario en caso de error de conexión
            echo "Ocurrió un error en la conexión.";
            
            // Finaliza la ejecución del script
            exit();
        }
    }

    // Método para obtener la conexión a la base de datos
    public function obtenerConexion()
    {
        return $this->conexion_db;
    }
}
?>
