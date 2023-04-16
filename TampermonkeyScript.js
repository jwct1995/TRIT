// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      11.1
// @description  make life easy
// @author       JWCT
// @match        http://34.87.111.75/*
// @match        http://fixlogy.com/*
// @match        http://35.197.158.218/*

// @icon         http://34.87.111.75/pcrt/v9/repair/images/logo.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js

//https://greasyfork.org/en/scripts/431134-trit

// @grant       none

// @run-at document-end

// ==/UserScript==

var txtBranch="";
var sBranch ="";

window.onload = function exampleFunction()
{
    GenerateWhatsappButton();
    PlugColorToSpecialOrder();
}

$( document ).ready(function()
{

    $("body").on("mouseover", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "1px"});
    });
    $("body").on("mouseleave", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "2px"});
    });

    $("body").on("click", ".catchstatuschange, .displayblock, .radiusall, .linkbuttonopaque2, .linkbuttonmedium, .catchstatuschange, .catchloadworkorder, .linkbuttongreen, .linkbuttonsmall, .sbutton, .catchclass, .linkbuttonlarge, .linkbuttonblack", function()
    {
        GenerateWhatsappButton();
    });
});

function GenerateWhatsappButton()
{
    txtBranch="";
    sBranch = $(".primary_linkgonew").text();

    if(sBranch.indexOf("TRIT AMK")>=0)
        txtBranch="AMK";
    else if(sBranch.indexOf("TRIT Hougang")>=0)
        txtBranch="Hougang";
    else if(sBranch.indexOf("TRIT Tampines")>=0)
        txtBranch="Tampines";
    else if(sBranch.indexOf("TRIT Yishun")>=0)
        txtBranch="Yishun";
    else if(sBranch.indexOf("TECHMINAL")>=0)
        txtBranch="TECHMINAL";
    var rcount=0;
    var cd = setInterval(function()
    {
        if($("[name='divExtentionCustomerCallNumber']").length == 0 )
        {
            if($(".fa.fa-home.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findHomeIconTD());
            if($(".fa.fa-mobile.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findMobileIconTD());
            if($(".fa.fa-suitcase.fa-lg.fa-fw").length)
                GenerateExtentionForCustomerCallNumber(txtBranch,findSuitcaseIconTD());
                //console.log("check round"+rcount+".1");
        }
       /* else
            console.log("check divExtentionCustomerCallNumber length"+$("[name='divExtentionCustomerCallNumber']").length);*/

        if($("[name='divExtentionCustomerNote']").length == 0 )
        {
            GenerateExtentionForNote(txtBranch,"public");
           // if(txtBranch=="Yishun")
             //   GenerateExtentionForNote(txtBranch,"private");
            //console.log("check round"+rcount+".2");
          //  console.log("check 1 - "+$("[name='divExtentionCustomerNote']").length);
        }
       // console.log("check 2 - "+$("[name='divExtentionCustomerNote']").length);
        rcount++;
        if(rcount>=30)
            clearInterval(cd);
        //console.log("check round"+rcount);
    }, 200);

}


function GenerateExtentionForNote(branch,notetype)
{
    var custNoteArea;
    var divname;
  /*  if(notetype=="private")
    {
        custNoteArea=$("#technotearea");
        divname="divExtentionTechNote";
    }*/
   // else
    //{
        custNoteArea=$("#custnotearea");
        divname="divExtentionCustomerNote";
   // }
    custNoteArea=custNoteArea.find(".pillbox");
    var custNoteAreaTR=custNoteArea.find("tr");
    custNoteAreaTR.children("td:nth-child(2)").each(function(index, val)
    {
        var eleSpan=$(this).children("span");
        eleSpan.remove();
        var txtCustNote=$(this).text();
        $(this).append(eleSpan);
        var div=$("<div></div>");
        div.css("display","flex");
        div.attr({"name":divname});
        $(this).append(div);
        $('[id=btnWhatsAppPhoneNumber]').each(function()
        {
            div.append(generateBtnRedirectToWhatsappWithTxt($(this).attr("ph"),txtCustNote));
        });
        removeDuplicateElement(div,"ph");
    });
}



function encodeStr(txt)
{
    return encodeURIComponent(txt);
}

function generateBtnRedirectToWhatsappWithTxt(phone,txt)
{
    var id="btnWhatsAppSendTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("sWhatsapp "+phone);
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('https://api.whatsapp.com/send?phone=65"+phone+"&text="+encodeStr(txt)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}

function GenerateExtentionForCustomerCallNumber(txtBranch,iconTD)
{
    var elePhoneTD =iconTD.next("td");
    var elePhoneStrong = elePhoneTD.find("strong");
    var txtPhoneNo=elePhoneStrong.text();
    var div=$("<div></div>");
    div.attr({"name":"divExtentionCustomerCallNumber"});
    div.css("display","inline-flex");
    elePhoneTD.append(div);
    div.append(generateBtnRedirectToWhatsapp(txtPhoneNo));
    div.append(generateBtnRedirectToWhatsappWithReadyToCollectTxt(txtBranch,txtPhoneNo));
    div.append(generateBtnRedirectToWhatsappGoogleMapReviewTxt(txtBranch,txtPhoneNo));
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
function generateBtnRedirectToWhatsappGoogleMapReviewTxt(branch,phone)
{
    var id="btnWhatsAppSendGoogleMapReviewTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("GReview");
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('"+rtnTxtGoogleMapReview(branch,phone)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}

function generateBtnRedirectToWhatsappWithReadyToCollectTxt(branch,phone)
{
    var id="btnWhatsAppSendReadyToCollectTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("ReadyToCollect");
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('"+rtnTxtReadyForCollection(branch,phone)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}


function generateBtnRedirectToWhatsapp(phone)
{
    var id="btnWhatsAppPhoneNumber";
    var btn=$("<button><button>");
    btn.attr("ph",phone);
    btn.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window = window.open('https://api.whatsapp.com/send?phone=65"+phone+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}

function findSuitcaseIconTD()
{
    //var ele=$(".fa.fa-suitcase.fa-lg.fa-fw");
    var ele=$("#mainworkorder").find(".whitemiddle").find("table").find("table").find("table").find(".fa.fa-suitcase.fa-lg.fa-fw")
    ele=ele.closest( "td" );
    return ele;
}

function  findMobileIconTD()
{
    //var ele=$(".fa.fa-mobile.fa-lg.fa-fw");
    var ele=$("#mainworkorder").find(".whitemiddle").find("table").find("table").find("table").find(".fa.fa-mobile.fa-lg.fa-fw")
    ele=ele.closest( "td" );
    return ele;
}

function findHomeIconTD()
{
    //var ele=$(".fa.fa-home.fa-lg.fa-fw");
    var ele=$("#mainworkorder").find(".whitemiddle").find("table").find("table").find("table").find(".fa.fa-home.fa-lg.fa-fw")
    ele=ele.closest( "td" );
    return ele;
}

function rtnTxtGoogleMapReview(branch,phone)
{
    var rtn="";
    var uname=$("#mainworkorder").find(".colortitletopround").children("span:nth-child(1)").text();
    uname=uname.split(" • ");

    if(branch=="AMK")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=Hi%20"+uname[0]+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20AMK%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCS51tQqVBkLHEBM%2Freview";
    }
    else if(branch=="Hougang")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=Hi%20"+uname[0]+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Hougang%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCSCMXrB0DnG4EBM%2Freview";
    }
    else if(branch=="Tampines")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=Hi%20"+uname[0]+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Tampines%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCcf28hpDS6QNEBM%2Freview%20";
    }
    else if(branch=="Yishun")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=Hi%20"+uname[0]+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Yishun%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCc2YWe6qsRKMEBM%2Freview%20";
    }
    else if(branch=="TECHMINAL")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=Hi%20"+uname[0]+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20Techminal%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATechminal%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCVaHFth9XKD6EBM%2Freview%20";
    }

    return rtn;
}

function rtnTxtReadyForCollection(branch,phone)
{
    var rtn="";
    if(branch=="AMK")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer%20-%20AMK%5D%0A%0ADear%20Sir%2FMdm%2C%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A10%3A00am%20to%208%3A00pm%20(%20Weekday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.sg%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20AMK%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Hougang")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer%20-%20Hougang%5D%0A%0ADear%20Sir%2FMdm%2C%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A12%3A00pm%20to%208%3A00pm%20%0A(%20Weekday%20Except%20Tuesday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.sg%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20Hougang%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Tampines")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer%20-%20Tampines%5D%0A%0ADear%20Sir%2FMdm%2C%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A10%3A00am%20to%208%3A00pm%20%0A(%20Weekday%20Except%20Tuesday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20Tampines%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Yishun")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTRITcomputer%20-%20Yishun%5D%20%0A%0ADear%20Sir%2FMdm%2C%20%0AYour%20Device%20is%20ready%20for%20collection.%20%20%0A%0APayment%20Mode%3A%20%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%20%0A(NO%20CASH%20PAYMENT)%20%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%20%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%20%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%20%0A%0ABusiness%20hours%20are%20as%20follows%3A%20%0A10%3A00am%20to%208%3A00pm%20(%20Daily%20)%20%20%0A%0AVisit%20our%20website%20for%20more%20details%3A%20%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%20%0A%0AJoin%20us%20at%20Facebook%3A%20%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%20%0A%0ARegards%2C%20%0ATRITcomputer%20-%20Yishun%20%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="TECHMINAL")
    {
        rtn="https://api.whatsapp.com/send?phone=65"+phone+"&text=%5BTechminal%5D%0A%0ADear%20Sir%2FMdm%2C%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0APayNow%2C%20GrabPay%2C%20PayLah%20and%20Bank%20Transfer.%0A%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%E2%80%A8%0A%0ARegards%2C%0AYour%20Techminal%20Team%0A(Sim%20Lim%20Square%20%2301-26)%0A(Beside%20Loading%20Bay)%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }

    return rtn;
}

function PlugColorToSpecialOrder()
{
    var weburl=window.location.pathname;
    if (~weburl.indexOf("/store/stock.php"))
    {
        $(".whitebottom").find("table").find("tr").each(function(index, value)
        {
            //console.log(index +" -->> "+ $(this).children("td:nth-child(8)").children("span:nth-child(1)").text());
            var ostatus=$(this).children("td:nth-child(8)").children("span:nth-child(1)").text();
            var osupplier=$(this).children("td:nth-child(3)").text();



            if(ostatus=="Order Part" && osupplier=="Fssocom")
                $(this).closest("tr").css("background-color", "#73d98e");
            else if(ostatus=="Order Part" && osupplier=="#Overseas")
                $(this).closest("tr").css("background-color", "#61ffc5");
            else if(ostatus=="Order Part")
                $(this).closest("tr").css("background-color", "#a6ff79");
            else if(ostatus=="Shipped")
                $(this).closest("tr").css("background-color", "#8ed0ff");
            else if(ostatus=="Received")
                $(this).closest("tr").css("background-color", "#ffb6b6");
        });
    }
}