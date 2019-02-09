<?php

	$url = "https://web.njit.edu/~tc324/CS490/middle.php";
	$post = file_get_contents('php://input');
	echo($post);
	//echo("Good");

  $Encodedata = json_encode($post);

  //PHP curl post
	$ch = curl_init($url);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 60);
  curl_setopt($ch, CURLOPT_POSTFIELDS, $Encodedata);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

  $result=curl_exec($ch);

  //Decode received string
  //$json = str_replace("}{", ",", $result);
  /*$json = json_decode($json, true);
  var_dump($json);
  echo "<br>";
  //Build Response
  $response = "<br>";
  if($json["login"] == "true"){
    $response = $response."Login sucess <br><br>";
  }
  else{
    $response = $response."Login fail <br><br>";
  }
  if($json["loginnjit"] == "true"){
    $response = $response."NJIT login sucess <br>";
  }
  else{
    $response = $response."NJIT login fail <br>";
  }*/


  //echo $response;
  echo $result;
?>
