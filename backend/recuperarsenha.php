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


$link   = mysqli_connect('vp-cluster-database.cluster-ctckmuig6gwh.us-east-1.rds.amazonaws.com', 'admin-app', ';rv%PCPS5)r$T06q', 'book2b-prod');
$email 	= $_POST['email'];
echo 'email:'.$email;
$rows   = array();

$query = "SELECT * FROM `vpcharter_users` WHERE `email`  = '".$email."';";
$result = mysqli_query($link, $query);

while ($line = mysqli_fetch_array($result)){
	$rows[] = $line;
}

if (!$rows[0]) {
	print json_encode("Não encontrado.");
	
} else {

	$nomeremetente     = 'book2b';
	$emailsender       = 'contato@book2b.com.br';
    $emailremetente    = 'contato@book2b.com.br';
	//$emaildestinatario = 'fabiorgarcia@gmail.com';
    $emaildestinatario = $email;
	$comcopia          = '';
	$comcopiaoculta    = '';
	$assunto           = 'Recuperação de Senha';
	$nomeUsuario	   = $rows[0]['firstName'];
	$idUsuario	   = $rows[0]['id'];
    $mensagemHTML      = '

    <p>Olá, '.$nomeUsuario.'.</p>
    <p>Recebemos uma solicitação para redefinir sua senha.  Por favor, clique no link abaixo.</p>
    <p><a href="https://app.book2b.com.br/novasenha/?i='.$idUsuario.'" style="font-size: 1.2rem;" target="_blank" > Alterar senha</a></p>
    
    <hr>
    <p style="font-size: 0.8rem; color: #838282;">VIAGENS PROMO TURISMO S.S. LTDA CNPJ: 05.008.876/0001-06<br>Rua Ministro Jesuíno Cardoso, 633 - Sala 41, Vila Nova Conceição, São Paulo - SP, Brasil<br>
    Essa mensagem foi enviada para <a style="color:#1b74e4;text-decoration:none" href="mailto:'.$emaildestinatario.'" target="_blank">'.$emaildestinatario.'</a>. 
    <br>Para ajudar a manter sua conta segura, não encaminhe este.</p>
    ';


    if(PHP_OS == "Linux") $quebra_linha = "\n"; //Se for Linux
    elseif(PHP_OS == "WINNT") $quebra_linha = "\r\n"; // Se for Windows
    else die("Este script nao esta preparado para funcionar com o sistema operacional de seu servidor");


    $headers = "MIME-Version: 1.1".$quebra_linha;
    $headers .= "Content-type: text/html; charset=iso-8859-1".$quebra_linha;
    // Perceba que a linha acima cont�m "text/html", sem essa linha, a mensagem n�o chegar� formatada.
    $headers .= "From: Viagens Promo <".$emailsender.">".$quebra_linha;
    $headers .= "Return-Path: " . $emailsender . $quebra_linha;
    // Esses dois "if's" abaixo s�o porque o Postfix obriga que se um cabe�alho for especificado, dever� haver um valor.
    // Se n�o houver um valor, o item n�o dever� ser especificado.
    if(strlen($comcopia) > 0) $headers .= "Cc: ".$comcopia.$quebra_linha;
    if(strlen($comcopiaoculta) > 0) $headers .= "Bcc: ".$comcopiaoculta.$quebra_linha;
    $headers .= "Reply-To: ".$emailremetente.$quebra_linha;

    if(!mail($emaildestinatario, $assunto, $mensagemHTML, $headers ,"-r".$emailsender)){ // Se for Postfix
        $headers .= "Return-Path: " . $emailsender . $quebra_linha; // Se "não for Postfix"
        mail($emaildestinatario, $assunto, $mensagemHTML, $headers );
    } 

}

?>

