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

    <section class="product-section">
        <h3>Nuestros Productos</h3>
        <div class="product-collection">
            
        </div>
    </section>

    <?php require 'views/includes/footer.php'; ?>
    <script src="assets/js/function-getproducts.js"></script>
</body>
</html>