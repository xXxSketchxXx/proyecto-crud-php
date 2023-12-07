<?php
    require_once ('config/config.php');
?>

<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ordenadores Marilu</title>
    <link rel="stylesheet" href="assets/css/includes.css">
    <link rel="stylesheet" href="assets/css/index.css">
</head>

<body>
    <?php require 'views/includes/header.php'; ?>

    <section class="hero">
        <h3>Bienvenido a nuestra tienda de productos informáticos</h3>
        <h3>Los mejores productos al mejor precio</h3>
    </section>

    <section class="product-section">
        <h3>Nuestros Productos</h3>
        <div class="product-collection">
            <div class="product-card">
                <img src="img.pngas" alt="Product 1">
                <h2>Laptop SuperFast</h2>
                <span class="price">$999</span>
                <div class="view-more">Ver más</div>
            </div>
            <!-- Agrega más productos si es necesario -->
            <div class="product-card">
                <img src="img.pnasdg" alt="Product 1">
                <h2>Laptop SuperFast</h2>
                <span class="price">$999</span>
                <div class="view-more">Ver más</div>
            </div>
        </div>
    </section>

    <?php require 'views/includes/footer.php'; ?>
</body>
</html>