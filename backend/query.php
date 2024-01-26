<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,POST,DELETE,PATCH');
header('Access-Control-Allow-Headers: XMLHttpRequest, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');
ini_set('memory_limit', '-1');
header("Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure");



$query = $_POST['query'];
//$query = "SELECT * FROM `book2b-prod`.vpcharter_users ";
$rows   = array();


$link   = mysqli_connect('vp-cluster-database.cluster-ctckmuig6gwh.us-east-1.rds.amazonaws.com', 'admin-app', ';rv%PCPS5)r$T06q', 'book2b-prod');
$result = mysqli_query($link, $query);

while ($line = mysqli_fetch_array($result)){
  $rows[] = $line;
}

print json_encode($rows);

?>
