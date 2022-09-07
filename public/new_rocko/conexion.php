<?php
//para configurar la conexión a la bd
require ($_SERVER['DOCUMENT_ROOT']. '/xajax/xajax.inc.php');
$xajax = new xajax();
// usar  'utf-8'  o 'ISO-8859-1'
$xajax->setCharEncoding('ISO-8859-1');
//Decodifica los caracteres extraños
 $xajax->decodeUTF8InputOn();	
 //Registramos la función para indicar que se utilizará con xajax.  
  // la funcion lo podemos cambiar
  $xajax->registerFunction("procesar_estilos");
  $xajax->processRequests();


//Creamos las Funciones para conectarse a la Base de datos Mysql
define('SERVER_MYSQL', '10.1.109.15');
define('DATABASE',   'db_reportes');
define('BD_USUARIO', 'db_reportes');
define('BD_CLAVE',   '6uHsCIhZlaxc');


$conexion = connectDB(SERVER_MYSQL,BD_USUARIO,BD_CLAVE,DATABASE);
function connectDB($servidor = SERVER_MYSQL, $usuario = BD_USUARIO, $contrasena = BD_CLAVE, $nombreBD = DATABASE)
    {
        //Creando la conexión, nuevo objeto mysqli
        $link = new mysqli($servidor,$usuario,$contrasena,$nombreBD);
        //mysqli_set_charset('utf8',$link);
    }
    if (!mysqli_set_charset($link, "utf8")) {
        //printf("Error cargando el conjunto de caracteres utf8: %s\n", mysqli_error($link));
        //exit();
    } else {
        //printf("Conjunto de caracteres actual: %s\n", mysqli_character_set_name($link));
    }
    //Si sucede algún error la función muere e imprimir el error
	if($link->connect_error){
		die("Error en la conexion : ".$link->connect_errno."-".$link->connect_error);
	}else{
        //Si nada sucede retornamos la conexión		
	   mysqli_select_db( $link, $nombreBD) ;
		return $link;
    }
		
	


    function procesar_estilos($form_entrada)
	{
		$mostrarsec = new xajaxResponse('ISO-8859-1');
		$opsec   = "<ul class='stylos'>";
		$sqlsec  = " SELECT * FROM _estiloseccionweb WHERE idcodmodulo='".$form_entrada['idcodmodulo']."' and cestadoestiloseccion='1' order by idcodestiloseccion";		
		$sqlmsec = db_query($sqlsec);
		$na = 1;
		while ($rows = db_fetch_array($sqlmsec)) 
		{	
			if ($na==1) { $check = " checked";} else { $check = "";}
			$opsec .= '<li><img src="/webadmin/estilos/images/'.$rows["cimgestiloseccion"].'"><div style="clear:both;"><input type="radio"  name="selectestilo" value="'.$rows["idcodestiloseccion"].'" '.$check.'>'.$rows["cnombreestiloseccion"].'</div></li>';
			$na++;
		}
		$opsec .= "</ul>";
		$mostrarsec->addAssign("estilos","innerHTML","$opsec");
		return $mostrarsec;
	}
?>
<?php$xajax->printJavascript("/xajax/");?>