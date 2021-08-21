// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      version
// @description  make life easy
// @author       JWCT
// @match        http://34.87.111.75/*
// @icon         http://34.87.111.75/pcrt/v9/repair/images/logo.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js



// @grant       none

// @run-at document-end

// ==/UserScript==

window.onload = function exampleFunction()
{
    ///console.log('The Script will load now.v1');
   ///$("#sidemenu").css("background-color","red");

}

$( document ).ready(function()
{
  ///$(".mainworkorder").css("background-color","blue");

  $('body').on('mouseover', '#btnWA', function()
  {
    $(this).css({"border-width": "1px"});

  });
  $('body').on('click', '.catchloadworkorder', function()
  {
    //alert("aa");

    setTimeout(function()
    {
     // $(".nvbar").css("background-color","pink");
      var elePhoneTD = $(".fa.fa-home.fa-lg.fa-fw").parent().next("td");//.css("background-color","#2dab04");
      elePhoneTD.attr({"id":"TDphone"});
      $(elePhoneTD).css({"display": "flex"});

      var elePhoneStrong = elePhoneTD.find("strong");//.css("background-color","#2dab04");
      var txtPhoneNo=elePhoneStrong.text();
      //alert(txtPhoneNo);
      var btnWA=$("<button><button>");
      btnWA.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});


      //btnWA.val("btn");
      btnWA.attr({"id":"btnWA","onclick":"window.open('https://api.whatsapp.com/send?phone=+65"+txtPhoneNo+"')"});
      //onclick="window.open('http://www.website.com/page')"
      //onclick="location.href= "window.open('https://api.whatsapp.com/send?phone=+6593494906')""
      // onclick="location.href = 'www.yoursite.com';"


      $(elePhoneTD).append(btnWA);
      //$(elePhoneStrong).after(btnWA);
      $("body").find("#btnWA").slice(0).remove();

      var btnRtCollect=$("<button><button>");
      btnRtCollect.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
      btnRtCollect.text("HG Collect");
      btnRtCollect.attr({"id":"btnRtCollect","onclick":"window.open('https://api.whatsapp.com/send?phone=65"+txtPhoneNo+"&text=%5BTRITcomputer+-+Hougang%5D%0A%0ADear+Sir%2FMdm%2C%0AYour+Device+is+ready+for+collection.+%0A%0APayment+Mode%3A%0APayNow%2C+PayLah%2C+Bank+Transfer+and+NETS+only.%0A%28**NO+CASH+PAYMENT**%29%0A%0AKindly+bring+along+your+Claim+Ticket+OR%0Ashow+us+your+E-Claim+Ticket+for+verification.%0A%28Check+your+Mailbox+or+Junk+Mail%29%0A%0ABusiness+hours+are+as+follows%3A%0A12%3A00nn+to+8%3A00pm+%28+Weekday+Except+Tuesday+%29%0A12%3A00nn+to+5%3A00pm+%28+Weekend+%29%0A*Closed+on+Every+Tuesday+and+Public+Holiday%E2%80%A8%0AVisit+our+website+for+more+details%3A%0Ahttps%3A%2F%2Fwww.trit.sg%2F%0A%0AJoin+us+at+Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer+Hougang%0A%0AThank+you+%26+Have+a+nice+day%21')"});

      $(elePhoneTD).append(btnRtCollect);
      //$(elePhoneStrong).after(btnRtCollect);
      $("body").find("#btnRtCollect").slice(0).remove();



      //alert("a");
    }, 1000);
  });
});





/* $( ".mainworkorder" ).change(function ()
{
$(".whitemiddle").css("background-color","pink");
}).change();
*/
/* $('.interface').on('change', '.mainworkorder', function()
{
$(".whitemiddle").css("background-color","pink");
});*/
//$("mainworkorder").load(function)


//document.getElementsByClassName("whitemiddle").onclick = function() {console.log("yes");};

/*
$( document ).ready(function()
{
    console.log( "ready!" );
    $(".whitemiddle").css("background-color","blue");

    $(".whitemiddle").on( "click", function()
    {
        console.log("yes");
    });

});
*/
//(function() {
//  'use strict';
//});




//alert("a");
//$("#sidemenu").css("background-color","red");
//$(".colortitletopround").css("background-color","red");
//$(".nvbar").css("background-color","red");
// $( ".displayblock" ).click(function() {
//alert( "v1" );



//var ele = document.getElementsByTagName("strong")[0];
//ele.value = "aaa";

//$(".whitemiddle").css("background-color","red");
//var ele=document.getElementsByClassName("whitemiddle");
//ele.style.backgroundColor="blue";
//ele.css("background-color", "yellow");

// Your code here...
