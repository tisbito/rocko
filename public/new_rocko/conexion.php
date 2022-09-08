<?php
    $mysqli = mysqli_connect("10.1.109.15","db_reportes","6uHsCIhZlaxc","db_reportes");
    if($mysqli) #para ver si hace conexión
        echo'si';
    else
        echo 'no'; 
?>