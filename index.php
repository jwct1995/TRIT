<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Title</title>
</head>
<body>
<style>
.divUrlColor:nth-child(even)
{
	background-color:#b3b3b340;
}
.divUrlColor:nth-child(odd)
{
	background-color:#92b9ff;
}

@media (pointer:none), (pointer:coarse) 
{
	
}
</style>

<script>
<?php
//echo getcwd();
//printf("<br>");
$dir    = "/home/vhosts/jwct95.freevar.com/code/TRIT";

printf("var directory='http://jwct95.freevar.com/code/TRIT';");
$files = scandir($dir);
printf("var dirList=[];");

for( $c=2;$c<sizeof($files);$c++)
{
	printf("dirList[".($c-2)."]='".$files[$c]."';");
}

//print_r($files);
//printf("<br>aa");
?>
</script>
<center><div id="divLinkBlock" style="width: 400px;"></div></center>
<!--
<div id="divTBody">
	<div id="divTest1" class="divT">Hello 1</div>
	<div id="divTest2" class="divT">Hello 2</div>
	<div name="divTest3" class="divT">Hello 3</div>
</div>
-->
<script type="text/javascript">
$(function()
{
	//$("#divTest2").html(dirList);
	//$("[name=divTest3]").html('hello asd');
	var divLinkBlock=$("#divLinkBlock");
	$.each(dirList, function(index, value) 
	{
		if(value!="index.php")
		{
			var createDiv=$("<div></div>");
			createDiv.html(value);
			createDiv.attr({"id":"divUrl","name":value,"align":"left"});
			createDiv.addClass("divUrlColor");
			divLinkBlock.append(createDiv);
	  		//alert(index + ': ' + value);
  		} 
	});

	/*$(".divUrlColor").each(function()
	{
		var num = $(this).index();
		if(num%2==0)
			$(this).css({"background-color":"#b3b3b340"});
		else
			$(this).css({"background-color":"#92b9ff"});
	});*/

	/*$('textarea').each(function() 
	{
        $(this).height($(this).prop('scrollHeight'));
    });*/
});

$(document).ready(function() 
{
	$("#divLinkBlock").on( "click",".divUrlColor",function() 
	{
		//alert("http://jwct95.freevar.com/code/"+$(this).attr("name"));
		location.href = "http://jwct95.freevar.com/code/TRIT/"+$(this).attr("name");
	});
	/*
	$("#divTest1").click(function() 
	{
		alert("Hello 1");
	});
	$("#divTest2").on( "click", function() 
	{
		alert("Hello 2");
	});
	$("#divTBody").on( "click","[name='divTest3']",function() 
	{
		alert("Hello 3");
	});
	*/
	/* 
	""
	*/
});

/*
$('td[name ="tcol1"]')   // matches exactly 'tcol1'
$('td[name^="tcol"]' )   // matches those that begin with 'tcol'
$('td[name$="tcol"]' )   // matches those that end with 'tcol'
$('td[name*="tcol"]' )   // matches those that contain 'tcol'

https://www.w3schools.com/jquery/jquery_selectors.asp
*/
</script>
</body>
</html>
