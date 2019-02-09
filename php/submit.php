<?php

	$url = "https://web.njit.edu/~tc324/CS490/login.php";	
	$usr = $_POST['UCID'];
	$pwd = $_POST['PWD'];
	$pwd = hash("md5", $pwd);	
	$fields = array(
		'usr' => $usr,
		'pw' => $pwd
	);
 
  $Encodedata = json_encode($fields);
   
  //PHP curl post
	$ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $Encodedata);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json')); 
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  
  $result=curl_exec($ch);
  curl_close($ch);
  //Decode received string
  $json = str_replace("}{", ",", $result);

  echo $json;
?>
