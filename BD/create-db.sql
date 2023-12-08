-- Sentencia para crear el usuario en phpmyadmin
CREATE USER 'sketch'@'localhost' IDENTIFIED VIA mysql_native_password USING '***';GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON *.* TO 'sketch'@'localhost' REQUIRE NONE WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

-- Sentencias para crear la base de datos
DROP DATABASE IF EXISTS ecommerce;
CREATE DATABASE IF NOT EXISTS ecommerce;

USE ecommerce;

CREATE TABLE IF NOT EXISTS fabricante (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS producto (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    precio VARCHAR(20) NOT NULL,
    fabricante_id INT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fabricante_id) REFERENCES fabricante(id)
)  ENGINE=INNODB;

-- Inserciones para la tabla 'fabricante'
INSERT INTO fabricante (nombre) VALUES
    ('Intel'),
    ('AMD'),
    ('NVIDIA'),
    ('ASUS'),
    ('Samsung'),
    ('Logitech'),
    ('Western Digital'),
    ('Corsair'),
    ('Microsoft'),
    ('Dell');

-- Inserciones para la tabla 'producto'
INSERT INTO producto (nombre, descripcion, precio, fabricante_id, imagen) VALUES
    ('Procesador Core i7', 'Potente procesador de 8 núcleos para rendimiento excepcional', '299,99', 1, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991454/Proyecto_ecommerce/jw8k386fd5vmqd4dcvda.webp'),
    ('Tarjeta Gráfica RTX 3080', 'Experiencia de juego inmersiva con trazado de rayos', '699,99', 3, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991455/Proyecto_ecommerce/ythze8lrasjfsgptwf8d.webp'),
    ('Monitor Curvo 27"', 'Pantalla curva para una experiencia visual envolvente', '249,99', 5, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991454/Proyecto_ecommerce/llk33jgotlybmiqtddht.webp'),
    ('Teclado Mecánico RGB', 'Retroiluminación personalizable y teclas mecánicas para una escritura precisa', '129,99', 6, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991455/Proyecto_ecommerce/rvawe0gaivqrhb91x78z.webp'),
    ('Disco Duro SSD 1TB', 'Almacenamiento de alta velocidad para un rendimiento rápido', '149,99', 7, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991455/Proyecto_ecommerce/khyilae9pvyv2m1ghokd.webp'),
    ('Mouse Inalámbrico', 'Conexión sin cables para una libertad de movimiento total', '49,99', 6, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991455/Proyecto_ecommerce/pvz4twysy0qh6r8rvztw.webp'),
    ('Memoria RAM 16GB DDR4', 'Optimiza el rendimiento de tu sistema con esta memoria de alta velocidad', '79,99', 8, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991455/Proyecto_ecommerce/cno9tvzwpqnkrijwnoto.webp'),
    ('Laptop Ultrabook', 'Diseño delgado y potencia para la productividad en movimiento', '999,99', 10, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701971512/Proyecto_ecommerce/yqvhv1i0ipregjkwwofp.webp'),
    ('Impresora Multifuncional', 'Imprime, escanea y copia con facilidad en alta calidad', '149,99', 9, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991454/Proyecto_ecommerce/klmkjdgt4bl4km6mlolg.webp'),
    ('Router Gaming AC3000', 'Optimizado para juegos en línea con velocidad ultra rápida', '199,99', 4, 'https://res.cloudinary.com/dbtubp3ld/image/upload/v1701991454/Proyecto_ecommerce/epj3x3srsbdz09cqr7mn.webp');


-- Procedimientos almacenados
-- Para listar los productos en el INDEX
DROP PROCEDURE IF EXISTS get_products;
DELIMITER $$
CREATE PROCEDURE get_products()
BEGIN
    SELECT p.id, p.nombre, p.precio, p.imagen FROM producto p;
END $$
DELIMITER ;

-- Para listar sólo un producto
DROP PROCEDURE IF EXISTS get_product;
DELIMITER $$
CREATE PROCEDURE get_product(id INT)
BEGIN
    SELECT p.id, p.nombre, p.descripcion, p.precio, p.imagen, f.nombre AS fabricante FROM producto p INNER JOIN fabricante f ON p.fabricante_id = f.id WHERE p.id = id;
END $$
DELIMITER ;

-- Para listar los fabricantes
DROP PROCEDURE IF EXISTS get_fabricantes;
DELIMITER $$
CREATE PROCEDURE get_fabricantes()
BEGIN
    SELECT * FROM fabricante;
END $$
DELIMITER ;

-- Para insertar un producto
DROP PROCEDURE IF EXISTS add_product;
DELIMITER $$
CREATE PROCEDURE add_product(nombre VARCHAR(255), descripcion VARCHAR(255), precio VARCHAR(20), fabricante_id INT, imagen VARCHAR(255))
BEGIN
    INSERT INTO producto (nombre, descripcion, precio, fabricante_id, imagen) VALUES (nombre, descripcion, precio, fabricante_id, imagen);
END $$
DELIMITER ;

-- Para actualizar un producto
DROP PROCEDURE IF EXISTS update_product;
DELIMITER $$
CREATE PROCEDURE update_product(
    in_id INT, 
    in_nombre VARCHAR(255), 
    in_descripcion VARCHAR(255), 
    in_precio VARCHAR(20), 
    in_fabricante_id INT, 
    in_imagen VARCHAR(255)
)
BEGIN
    DECLARE existe_producto INT;
    SET existe_producto = (SELECT COUNT(*) FROM producto WHERE producto.id = in_id);

    IF existe_producto > 0 THEN
        UPDATE producto 
        SET 
            nombre = in_nombre, 
            descripcion = in_descripcion, 
            precio = in_precio, 
            fabricante_id = in_fabricante_id, 
            imagen = in_imagen 
        WHERE id = in_id;
    END IF;
END $$
DELIMITER ;

-- Para eliminar un producto
DROP PROCEDURE IF EXISTS delete_product;
DELIMITER $$
CREATE PROCEDURE delete_product(in_id INT)
BEGIN
    DECLARE existe_producto INT;
    SET existe_producto = (SELECT COUNT(*) FROM producto WHERE producto.id = in_id);

    IF existe_producto > 0 THEN
        DELETE FROM producto WHERE id = in_id;
    END IF;
END $$
DELIMITER ;