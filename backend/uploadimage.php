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


$link   	= mysqli_connect("mysql01.frgarcia.hospedagemdesites.ws", "frgarcia", "maestro31", "frgarcia");
$userid 	= $_POST['userid'];
$datacode 	= date('Ymdhis');
$rows   	= array();
$codigo 	= date('Ymdhis').$userid;
$diretorio	= "usersimage/";
$delImage	= $_POST['delImage'];


if ($delImage) {
	
	$file = $diretorio.$delImage;

	$_UP['pasta'] = $diretorio;
	unlink($file);
	$query = "UPDATE `vpcharter_users` SET `image` = '', `imageUrl` = '' WHERE `vpcharter_users`.`id` = ".$userid.";";
	$result = mysqli_query($link, $query);
	if(!$result){
		die(mysqli_error($link));
	}
	echo "0";


} else {


	// Pasta onde o arquivo vai ser salvo
	$_UP['pasta'] = $diretorio;

	// Tamanho máximo do arquivo (em Bytes)
	$_UP['tamanho'] = 1024 * 1024 * 2; // 2Mb

	// Array com as extensões permitidas
	$_UP['extensoes'] = array('jpg', 'png', 'gif');

	// Renomeia o arquivo? (Se true, o arquivo será salvo como .jpg e um nome único)
	$_UP['renomeia'] = false;

	// Array com os tipos de erros de upload do PHP
	$_UP['erros'][0] = 'Não houve erro';
	$_UP['erros'][1] = 'O arquivo no upload é maior do que o limite do PHP';
	$_UP['erros'][2] = 'O arquivo ultrapassa o limite de tamanho especifiado no HTML';
	$_UP['erros'][3] = 'O upload do arquivo foi feito parcialmente';
	$_UP['erros'][4] = 'Não foi feito o upload do arquivo';

	// Verifica se houve algum erro com o upload. Se sim, exibe a mensagem do erro
	if ($_FILES['arquivo']['error'] != 0) {
		die("Não foi possível fazer o upload, erro:<br />" . $_UP['erros'][$_FILES['arquivo']['error']]);
		exit; // Para a execução do script
	}

	// Caso script chegue a esse ponto, não houve erro com o upload e o PHP pode continuar
	// Faz a verificação da extensão do arquivo
	$extensao = strtolower(end(explode('.', $_FILES['arquivo']['name'])));
	if (array_search($extensao, $_UP['extensoes']) === false) {
		echo "Por favor, envie arquivos com as seguintes extensões: jpg, png ou gif";
	}
		// Faz a verificação do tamanho do arquivo
		else if ($_UP['tamanho'] < $_FILES['arquivo']['size']) {
		echo "O arquivo enviado é muito grande, envie arquivos de até 2Mb.";
	}

		// O arquivo passou em todas as verificações, hora de tentar movê-lo para a pasta
	else {
		// Primeiro verifica se deve trocar o nome do arquivo
		if ($_UP['renomeia'] == true) {
		// Cria um nome baseado no UNIX TIMESTAMP atual e com extensão .jpg
		$nome_final = time().'.jpg';
		} else {
		// Mantém o nome original do arquivo
		$nome_final = $_FILES['arquivo']['name'];
		}


		$dd = date("dmYHis");
		$nome_final = $userid.'_'.$dd.'.jpg';


		// Depois verifica se � poss�vel mover o arquivo para a pasta escolhida
		if (move_uploaded_file($_FILES['arquivo']['tmp_name'], $_UP['pasta'] . $nome_final)) {
			// Upload efetuado com sucesso, exibe uma mensagem e um link para o arquivo
			

			$query= "SELECT * FROM `vpcharter_users` WHERE `id` = ".$userid.";";
			$result = mysqli_query($link, $query);

			while ($line = mysqli_fetch_array($result)){
				$rows[] = $line;
			}

			$oldImage = $rows[0]['image'];

			if($oldImage) {
				$file = $diretorio.$oldImage;

				$_UP['pasta'] = $diretorio;
				if (unlink($file)) {
					$query = "UPDATE `vpcharter_users` SET `image` = '', `imageUrl` = '' WHERE `vpcharter_users`.`id` = ".$userid.";";
					$result = mysqli_query($link, $query);
					if(!$result){
						die(mysqli_error($link));
					}
				}
			}
			


			$query = "UPDATE `vpcharter_users` SET `image` = '".$nome_final."', `imageUrl` = '' WHERE `vpcharter_users`.`id` = ".$userid.";";
			$result = mysqli_query($link, $query);
			if(!$result){
				die(mysqli_error($link));
			}

			echo "0";

		} else {
		// N�o foi poss�vel fazer o upload, provavelmente a pasta est� incorreta
		echo "Não foi possível enviar o arquivo, tente novamente";
		}
	}

}

?>

