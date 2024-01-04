<? 
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/html; charset=utf-8');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT,POST,DELETE,PATCH');
header('Access-Control-Allow-Headers: XMLHttpRequest, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers');

$link = mysqli_connect("mysql01.frgarcia.hospedagemdesites.ws", "frgarcia", "maestro31", "frgarcia");
mysql_query("set names 'utf8'"); 

?>