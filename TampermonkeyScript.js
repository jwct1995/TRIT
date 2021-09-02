// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      5.0
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
    var txtBranch="";
    var sBranch = $(".primary_linkgonew").text();

    if(sBranch.indexOf("TRIT AMK")>=0)
        txtBranch="AMK";
    else if(sBranch.indexOf("TRIT Hougang")>=0)
        txtBranch="Hougang";
    else if(sBranch.indexOf("TRIT Tampines")>=0)
        txtBranch="Tampines";
    else if(sBranch.indexOf("TRIT Yishun")>=0)
        txtBranch="Yishun";

/*
    $('body').on("mouseover mouseleave", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function ()
    {
        $(this).toggle(function ()
        {
            $(this).css({"border-width": "1px"});
        }, function ()
        {
            $(this).css({"border-width": "2px"});
        });
    });
*/

    $("body").on("mouseover", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "1px"});

    });
    $("body").on("mouseleave", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "2px"});

    });

//#btnWhatsAppSendReadyToCollectTxt

/*
$('body').on("click", ".catchstatuschange, .catchloadworkorder", function ()
{
     alert("v2");
});
*/
//#mainworkorder
/*$("body").on("click", ".whitemiddle", function()
{
    //alert("v2");
    if($("[name='divExtentionCustomerCallNumber']").length )
    {
        $("[name='divExtentionCustomerCallNumber']").css("background-color","pink");
    }
    else
    {
        $("[name='divExtentionCustomerCallNumber']").css("background-color","orange");
    }
});*/
//#custnotearea
//.startbox
/*$("body").on("click", ".linkbuttongreen, .linkbuttonsmall, .sbutton", function()
{
    alert("v2");
    if($("[name='divExtentionCustomerNote']").length )
    {
        $("[name='divExtentionCustomerNote']").css("background-color","red");
    }
    else
    {
        $("[name='divExtentionCustomerNote']").css("background-color","green");
    }
});*/

/*$("body").on("click", ".catchstatuschange", function()
{
    alert("v1");
});*/
///linkbuttongreen radiusall linkbuttonsmall
    $("body").on("click", " .catchstatuschange, .catchloadworkorder, .linkbuttongreen, .linkbuttonsmall, .sbutton, .catchclass, .linkbuttonlarge, .linkbuttonblack ", function()
    {

        //catchloadworkorder load WO
        //.catchstatuschange chg status
        //.linkbuttongreen .linkbuttonsmall .sbutton add new customer note
        //.catchclass .linkbuttonlarge .linkbuttonblack
        //alert("aa");
/////////////////////
        var rcount=0;
        var cd = setInterval(function()
        {


//        setTimeout(function()
//        {


//fa fa-home fa-lg fa-fw
//fa fa-mobile fa-lg fa-fw
//fa fa-suitcase fa-lg fa-fw

            //amk & ys will increase size

            if($("[name='divExtentionCustomerCallNumber']").length == 0 )
                //$("[name='divExtentionCustomerCallNumber']").remove();
            //else
            {
                if($(".fa.fa-home.fa-lg.fa-fw").length)
                    GenerateExtentionForCustomerCallNumber(txtBranch,findHomeIconTD());
                if($(".fa.fa-mobile.fa-lg.fa-fw").length)
                    GenerateExtentionForCustomerCallNumber(txtBranch,findMobileIconTD());
                if($(".fa.fa-suitcase.fa-lg.fa-fw").length)
                    GenerateExtentionForCustomerCallNumber(txtBranch,findSuitcaseIconTD());

                clearInterval(cd);
            }

            if($("[name='divExtentionCustomerNote']").length == 0 )
            {
                GenerateExtentionForCustomerNote(txtBranch);
                clearInterval(cd);
            }
/*
//#custnotearea
//#technotearea
    //.pillbox
        //tr   position: relative;
            //td [2] get text and set div
                //div right: 0;top: 0;
            var custNoteArea=$("#custnotearea").find(".pillbox");
//custNoteArea.css("background-color","red");
            var custNoteAreaTR=custNoteArea.find("tr");
//custNoteAreaTR.css("background-color","pink");
            custNoteAreaTR.children("td:nth-child(2)").each(function(index, val)
            {
//$(this).css("background-color","green");
//alert($(this).text());
                //alert();

                var eleSpan=$(this).children("span");//.text()
                eleSpan.remove();
                var txtCustNote=$(this).text();
                //alert($(this).text());
                $(this).append(eleSpan);
                //attr("class")
                //var span=$("<span></span>");
                //span.addClass("");
                var div=$("<div></div>");
                div.css("display","flex");
                //div.text("asdasd");
                $(this).append(div);

                $('[id=btnWhatsAppPhoneNumber]').each(function()
                {
                    div.append(generateBtnRedirectToWhatsappWithTxt(txtBranch,$(this).attr("ph"),txtCustNote));
                });


                removeDuplicateElement(div,"ph");




            });
*/




//            var custNoteTextArea=custNoteArea.find("td:nth-child(2)");//.css("background-color","pink");
//            var txtCustNoteTextArea=custNoteTextArea.text();
//            alert(txtCustNoteTextArea);





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
//        }, 1000);
        rcount++;
        if(rcount>=10)
            clearInterval(cd);
        }, 500);



////////////////////////////////////////
    });
});




function GenerateExtentionForCustomerNote(branch)
{

                var custNoteArea=$("#custnotearea").find(".pillbox");
    //custNoteArea.css("background-color","red");
                var custNoteAreaTR=custNoteArea.find("tr");
    //custNoteAreaTR.css("background-color","pink");
                custNoteAreaTR.children("td:nth-child(2)").each(function(index, val)
                {
    //$(this).css("background-color","green");
    //alert($(this).text());
                    //alert();

                    var eleSpan=$(this).children("span");//.text()
                    eleSpan.remove();
                    var txtCustNote=$(this).text();
                    //alert($(this).text());
                    $(this).append(eleSpan);
                    //attr("class")
                    //var span=$("<span></span>");
                    //span.addClass("");
                    var div=$("<div></div>");
                    div.css("display","flex");
                    div.attr({"name":"divExtentionCustomerNote"});
                    //div.text("asdasd");
                    $(this).append(div);

                    $('[id=btnWhatsAppPhoneNumber]').each(function()
                    {
                        div.append(generateBtnRedirectToWhatsappWithTxt(branch,$(this).attr("ph"),txtCustNote));
                    });
                    removeDuplicateElement(div,"ph");
                });

}



function encodeStr(txt)
{
    return encodeURIComponent(txt);
}




function generateBtnRedirectToWhatsappWithTxt(branch,phone,txt)
{
    var id="btnWhatsAppSendTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("sWhatsapp "+phone);
    //btn.attr({"id":id,"onclick":"window.open('"+rtnTxtReadyForCollection(branch,phone)+"')"});
    //alert(txt);
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('https://api.whatsapp.com/send?phone=+65"+phone+"&text="+encodeStr(txt)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}








function GenerateExtentionForCustomerCallNumber(txtBranch,iconTD)
{
    var elePhoneTD =iconTD.next("td");
    //iconTD.css("background-color","green");
    //elePhoneTD.css("background-color","pink");
    var elePhoneStrong = elePhoneTD.find("strong");
    //elePhoneStrong.css("background-color","red");
    var txtPhoneNo=elePhoneStrong.text();
    var div=$("<div></div>");
    div.attr({"name":"divExtentionCustomerCallNumber"});
    div.css("display","inline-flex");
    elePhoneTD.append(div);
    div.append(generateBtnRedirectToWhatsapp(txtPhoneNo));
    div.append(generateBtnRedirectToWhatsappWithReadyToCollectTxt(txtBranch,txtPhoneNo));
    removeDuplicateElement(div,"id");
}



function removeDuplicateElement(ele,attr)
{
    var preEleId="";
    var prePhId=""
    ele.children().each(function(index, val)
    {
        if($(this).attr(attr)!=preEleId)
            preEleId=$(this).attr(attr);
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
    //btn.attr({"id":id,"onclick":"window.open('"+rtnTxtReadyForCollection(branch,phone)+"')"});
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('"+rtnTxtReadyForCollection(branch,phone)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});

    return btn;
}


function generateBtnRedirectToWhatsapp(phone)
{
    var id="btnWhatsAppPhoneNumber";
    var btn=$("<button><button>");
    btn.attr("ph",phone);
    btn.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});
    //btn.attr({"id":id,"onclick":"window.open('https://api.whatsapp.com/send?phone=+65"+phone+"')"});
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window = window.open('https://api.whatsapp.com/send?phone=+65"+phone+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    //new_window = window.open("https://snippens.com");
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
    /*
        while (ele.prop("tagName").toLowerCase()!="td")
        {
            ele=ele.parent();
        }
    */
    ele=ele.closest( "td" );
    //ele.css("background-color","pink");
    return ele;
}

function  findMobileIconTD()
{
    var ele=$(".fa.fa-mobile.fa-lg.fa-fw");
    /*
        while (ele.prop("tagName").toLowerCase()!="td")
        {
            ele=ele.parent();
        }
    */
    ele=ele.closest( "td" );
    //ele.css("background-color","red");
    //ele.css("background-color","pink");
    return ele;
}

function findHomeIconTD()
{
    var ele=$(".fa.fa-home.fa-lg.fa-fw");
    /*
        while (ele.prop("tagName").toLowerCase()!="td")
        {
            ele=ele.parent();
        }
    */
    ele=ele.closest( "td" );
    //ele.css("background-color","red");
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
