// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  make life easy
// @author       JWCT
// @match        http://34.87.111.75/*
// @icon         http://34.87.111.75/pcrt/v9/repair/images/logo.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js

//https://greasyfork.org/en/scripts/431134-trit

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
    var sBranch = $(".primary_linkgonew").text();

    if(sBranch.indexOf("TRIT AMK")>=0)
        txtBranch="AMK";
    else if(sBranch.indexOf("TRIT Hougang")>=0)
        txtBranch="Hougang";
    else if(sBranch.indexOf("TRIT Tampines")>=0)
        txtBranch="Tampines";
    else if(sBranch.indexOf("TRIT Yishun")>=0)
        txtBranch="Yishun";



    $('body').on('mouseover', '#btnWA', function()
    {
        $(this).css({"border-width": "1px"});

    });
    $('body').on('click', '.catchloadworkorder', function()
    {
        //alert("aa");

        setTimeout(function()
        {


//fa fa-home fa-lg fa-fw
//fa fa-mobile fa-lg fa-fw
//fa fa-suitcase fa-lg fa-fw

            //amk & ys will increase size

            if($(".fa.fa-home.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findHomeIconTD());
            if($(".fa.fa-mobile.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findMobileIconTD());
            if($(".fa.fa-suitcase.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findSuitcaseIconTD());




//            var elePhoneTD =findHomeIcon(txtBranch).next("td");


//elePhoneTD.attr({"id":"TDphone"});
//$(elePhoneTD).css({"display": "flex"});

//            var elePhoneStrong = elePhoneTD.find("strong");//.css("background-color","#2dab04");
//            var txtPhoneNo=elePhoneStrong.text();
            //alert(txtPhoneNo);




//            var divWA=$("<div></div>");
//            divWA.css("display","inline-flex");
//            $(elePhoneTD).append(divWA);


//
//            var btnWA=$("<button><button>");
//            btnWA.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});

            //btnWA.val("btn");
//            btnWA.attr({"id":idWhatsAppBtn,"onclick":"window.open('https://api.whatsapp.com/send?phone=+65"+txtPhoneNo+"')"});
            //onclick="window.open('http://www.website.com/page')"
            //onclick="location.href= "window.open('https://api.whatsapp.com/send?phone=+6593494906')""
            // onclick="location.href = 'www.yoursite.com';"


//            $(divWA).append(btnWA);
//            $(divWA).append(generateBtnRedirectToWhatsapp(txtPhoneNo));
//
            //$(elePhoneStrong).after(btnWA);
//            $("body").find("#"+idWhatsAppBtn).slice(0).remove();

            //var txtCode="":

            //if(txtBranch.indexOf("")>=0)

//            var btnRtCollect=$("<button><button>");
//            btnRtCollect.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
//            btnRtCollect.text("ReadyToCollect");
//            btnRtCollect.attr({"id":txtWhatsAppBtnRtC,"onclick":"window.open('"+rtnTxtReadyForCollection(txtBranch,txtPhoneNo)+"')"});

//            $(divWA).append(btnRtCollect);

//            $(divWA).append(generateBtnRedirectToWhatsappWithReadyToCollectTxt(txtBranch,txtPhoneNo));
            //$(elePhoneStrong).after(btnRtCollect);
//            $("body").find("#"+txtWhatsAppBtnRtC).slice(0).remove();
//            removeDuplicateElement(divWA);
//            var preEleId="";
//            $(divWA).children().each(function(index, val)
//            {
//                if($(this).attr("id")!=preEleId)
//                    preEleId=$(this).attr("id");
//                else
//                    $(this).remove();
                //$(this).text(c+"..."+index);
//            });



            //alert("a");
        }, 1000);
    });
});


function GenerateExtentionForCustomerCallNumber(txtBranch,iconTD)
{
    var elePhoneTD =iconTD.next("td");
//iconTD.css("background-color","green");
//elePhoneTD.css("background-color","pink");
    var elePhoneStrong = elePhoneTD.find("strong");
//elePhoneStrong.css("background-color","red");
    var txtPhoneNo=elePhoneStrong.text();

    var divWA=$("<div></div>");
    divWA.css("display","inline-flex");
    $(elePhoneTD).append(divWA);


    $(divWA).append(generateBtnRedirectToWhatsapp(txtPhoneNo));

    $(divWA).append(generateBtnRedirectToWhatsappWithReadyToCollectTxt(txtBranch,txtPhoneNo));

    removeDuplicateElement(divWA);

}

function removeDuplicateElement(divWA)
{
    var preEleId="";
    $(divWA).children().each(function(index, val)
    {
        if($(this).attr("id")!=preEleId)
            preEleId=$(this).attr("id");
        else
            $(this).remove();
    });

}
function generateBtnRedirectToWhatsappWithReadyToCollectTxt(branch,phone)
{
    var id="btnWhatsAppSendReadyToCollectTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("ReadyToCollect");
    btn.attr({"id":id,"onclick":"window.open('"+rtnTxtReadyForCollection(branch,phone)+"')"});

    return btn;
}

function generateBtnRedirectToWhatsapp(phone)
{
    var id="btnWhatsAppPhoneNumber";
    var btn=$("<button><button>");
    btn.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});
    btn.attr({"id":id,"onclick":"window.open('https://api.whatsapp.com/send?phone=+65"+phone+"')"});

    return btn;
}

//findUserPhoneNumberTD(branch)

//.fa.fa-home.fa-lg.fa-fw
//.fa.fa-mobile.fa-lg.fa-fw
//.fa.fa-suitcase.fa-lg.fa-fw

/*if($(".fa.fa-suitcase.fa-lg.fa-fw").length)
alert("a");
else
alert("b");
*/
function findSuitcaseIconTD()
{
    var ele=$(".fa.fa-suitcase.fa-lg.fa-fw");
    while (ele.prop("tagName").toLowerCase()!="td")
    {
        ele=ele.parent();
    }
    return ele;
}

function findMobileIconTD()
{
    var ele=$(".fa.fa-mobile.fa-lg.fa-fw");
    while (ele.prop("tagName").toLowerCase()!="td")
    {
        ele=ele.parent();
//alert(ele.prop("tagName"));
//ele.css("background-color","green");
    }
    return ele;
}

function findHomeIconTD()
{
    var ele=$(".fa.fa-home.fa-lg.fa-fw");
    while (ele.prop("tagName").toLowerCase()!="td")
    {
        ele=ele.parent();
    }
    return ele;
}

/*
function findHomeIcon(branch)
{
    var rtn="";

    if(branch=="AMK")
    {
        rtn = $(".fa.fa-mobile.fa-lg.fa-fw").parent();//.next("td");
        //alert($(".fa.fa-mobile.fa-lg.fa-fw").parent().prop("tagName").toLowerCase());
    }
    else if(branch=="Hougang")
    {
        // $(".nvbar").css("background-color","pink");
        rtn = $(".fa.fa-home.fa-lg.fa-fw").parent();//.next("td");//.css("background-color","#2dab04");
    }
    else if(branch=="Tampines")
    {
        rtn = $(".fa.fa-mobile.fa-lg.fa-fw").parent().parent();//.next("td");
    }
    else if(branch=="Yishun")
    {
        rtn = $(".fa.fa-mobile.fa-lg.fa-fw").parent();//.next("td");
    }
    return rtn;
}
*/
function rtnTxtReadyForCollection(branch,phone)
{
    var rtn="";
    if(branch=="AMK")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer+-+AMK%5D%0A%0ADear+Sir%2FMdm%2C%0AYour+Device+is+ready+for+collection.+%0A%0APayment+Mode%3A%0APayNow%2C+PayLah%2C+Bank+Transfer+and+NETS+only.%0A%28*NO+CASH+PAYMENT*%29%0A%0AKindly+bring+along+your+Claim+Ticket+OR%0Ashow+us+your+E-Claim+Ticket+for+verification.%0A%28Check+your+Mailbox+or+Junk+Mail%29%0A%0ABusiness+hours+are+as+follows%3A%0A10%3A00am+to+8%3A00pm+%28+Weekday+%29%0A12%3A00nn+to+5%3A00pm+%28+Weekend+%29%0A*Closed+on+Public+Holiday%E2%80%A8%0AVisit+our+website+for+more+details%3A%0Ahttps%3A%2F%2Fwww.trit.sg%2F%0A%0AJoin+us+at+Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer+AMK%0A%0AThank+you+%26+Have+a+nice+day%21";
    }
    else if(branch=="Hougang")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer+-+Hougang%5D%0A%0ADear+Sir%2FMdm%2C%0AYour+Device+is+ready+for+collection.+%0A%0APayment+Mode%3A%0APayNow%2C+PayLah%2C+Bank+Transfer+and+NETS+only.%0A%28**NO+CASH+PAYMENT**%29%0A%0AKindly+bring+along+your+Claim+Ticket+OR%0Ashow+us+your+E-Claim+Ticket+for+verification.%0A%28Check+your+Mailbox+or+Junk+Mail%29%0A%0ABusiness+hours+are+as+follows%3A%0A12%3A00nn+to+8%3A00pm+%28+Weekday+Except+Tuesday+%29%0A12%3A00nn+to+5%3A00pm+%28+Weekend+%29%0A*Closed+on+Every+Tuesday+and+Public+Holiday%E2%80%A8%0AVisit+our+website+for+more+details%3A%0Ahttps%3A%2F%2Fwww.trit.sg%2F%0A%0AJoin+us+at+Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer+Hougang%0A%0AThank+you+%26+Have+a+nice+day%21";
    }
    else if(branch=="Tampines")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer+-+Tampines%5D%0A%0ADear+Sir%2FMdm%2C%0AYour+Device+is+ready+for+collection.+%0A%0APayment+Mode%3A%0APayNow%2C+PayLah%2C+Bank+Transfer+and+NETS+only.%0A%28*NO+CASH+PAYMENT*%29%0A%0AKindly+bring+along+your+Claim+Ticket+OR%0Ashow+us+your+E-Claim+Ticket+for+verification.%0A%28Check+your+Mailbox+or+Junk+Mail%29%0A%0ABusiness+hours+are+as+follows%3A%0A10%3A00am+to+8%3A00pm+%28+Weekday+Except+Tuesday+%29%0A12%3A00nn+to+5%3A00pm+%28+Weekend+%29%0A*Closed+on+Every+Tuesday+and+Public+Holiday%E2%80%A8%0AVisit+our+website+for+more+details%3A%0Ahttps%3A%2F%2Fwww.trit.sg%2F%0A%0AJoin+us+at+Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer+Tampines%0A%0AThank+you+%26+Have+a+nice+day%21";
    }
    else if(branch=="Yishun")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer+-+Yishun%5D%0A%0ADear+Sir%2FMdm%2C%0AYour+Device+is+ready+for+collection.+%0A%0APayment+Mode%3A%0APayNow%2C+PayLah%2C+Bank+Transfer+and+NETS+only.%0A%28*NO+CASH+PAYMENT*%29%0A%0AKindly+bring+along+your+Claim+Ticket+OR%0Ashow+us+your+E-Claim+Ticket+for+verification.%0A%28Check+your+Mailbox+or+Junk+Mail%29%0A%0ABusiness+hours+are+as+follows%3A%0A10%3A00am+to+8%3A00pm+%28+Weekday+Except+Tuesday+%29%0A12%3A00nn+to+5%3A00pm+%28+Weekend+%29%0A*Closed+on+Every+Tuesday+and+Public+Holiday%E2%80%A8%0AVisit+our+website+for+more+details%3A%0Ahttps%3A%2F%2Fwww.trit.sg%2F%0A%0AJoin+us+at+Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer+Yishun%0A%0AThank+you+%26+Have+a+nice+day%21";
    }

    return rtn;

}


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
