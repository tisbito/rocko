<?php
    include('conexion.php');
    $query = mysqli_query($mysqli, "SELECT id, nombre from cliente")
?>