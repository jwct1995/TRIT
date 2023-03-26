// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      6.3
// @description  make life easy
// @author       JWCT
// @match        http://34.87.111.75/*
// @match        http://fixlogy.com/*
// @icon         http://34.87.111.75/pcrt/v9/repair/images/logo.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js

//https://greasyfork.org/en/scripts/431134-trit

// @grant       none

// @run-at document-end

// ==/UserScript==

window.onload = function exampleFunction()
{

}

$( document ).ready(function()
{
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


    $("body").on("mouseover", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "1px"});
    });
    $("body").on("mouseleave", "#btnWhatsAppPhoneNumber, #btnWhatsAppSendReadyToCollectTxt", function()
    {
        $(this).css({"border-width": "2px"});
    });

    $("body").on("click", " .catchstatuschange, .catchloadworkorder, .linkbuttongreen, .linkbuttonsmall, .sbutton, .catchclass, .linkbuttonlarge, .linkbuttonblack ", function()
    {

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
            }

            if($("[name='divExtentionCustomerNote']").length == 0 )
            {
                GenerateExtentionForCustomerNote(txtBranch);
            }
            
            rcount++;
            if(rcount>=10)
                clearInterval(cd);
        }, 1000);
    });
});




function GenerateExtentionForCustomerNote(branch)
{

                var custNoteArea=$("#custnotearea").find(".pillbox");
                var custNoteAreaTR=custNoteArea.find("tr");
                custNoteAreaTR.children("td:nth-child(2)").each(function(index, val)
                {
                    var eleSpan=$(this).children("span");
                    eleSpan.remove();
                    var txtCustNote=$(this).text();
                    $(this).append(eleSpan);
                    var div=$("<div></div>");
                    div.css("display","flex");
                    div.attr({"name":"divExtentionCustomerNote"});
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
    var ele=$(".fa.fa-suitcase.fa-lg.fa-fw");
    ele=ele.closest( "td" );
    return ele;
}

function  findMobileIconTD()
{
    var ele=$(".fa.fa-mobile.fa-lg.fa-fw");
    ele=ele.closest( "td" );
    return ele;
}

function findHomeIconTD()
{
    var ele=$(".fa.fa-home.fa-lg.fa-fw");
    ele=ele.closest( "td" );
    return ele;
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






    return rtn;
}
