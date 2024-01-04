<?php

    $nomeremetente     = 'Viagens Promo';
	$emailsender       = 'contato@frgarcia.com.br';
    $emailremetente    = 'contato@frgarcia.com.br';
	$emaildestinatario = 'fabiorgarcia@gmail.com';
	$comcopia          = '';
	$comcopiaoculta    = '';
	$assunto           = 'Recuperação de Senha';
    $mensagemHTML      = '

    <p>Olá, Fabio.</p>
    <p>Recebemos uma solicitação para redefinir sua senha.  Por favor, clique no link abaixo.</p>
    <p><a href="http://52.15.49.249/novasenha/?i=999" style="font-size: 1.2rem;" target="_blank" > Alterar senha</a></p>
    
    <hr>
    <p style="font-size: 0.8rem; color: #838282;">VIAGENS PROMO TURISMO S.S. LTDA CNPJ: 05.008.876/0001-06<br>Rua Ministro Jesuíno Cardoso, 633 - Sala 41, Vila Nova Conceição, São Paulo - SP, Brasil<br>
    Essa mensagem foi enviada para <a style="color:#1b74e4;text-decoration:none" href="mailto:fabiorgarcia@gmail.com" target="_blank">fabiorgarcia@gmail.com</a>. 
    <br>Para ajudar a manter sua conta segura, não encaminhe este email.</p>
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
    echo "E-mail enviado";
?>