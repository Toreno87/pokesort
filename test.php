<?php
 header('Content-Type: application/json');
 
 $arr = array ('text'=>'Привет,' . $_GET['name']);
 
    echo  json_encode($arr);
 
?>
