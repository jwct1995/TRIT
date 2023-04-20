// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      13.0
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
var claimTicketURL="";
var woid="";
window.onload = function exampleFunction()
{
    GenerateWhatsappButton();
    PlugColorToSpecialOrder();
    GenerateCopyBtn();
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
    $("body").on("click", "#btnCopyExcelFormat", function()
    {
        GenerateBtnCopyToExcelFormat();
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
        getWOID();
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
    div.append(generateBtnRedirectClaimTicket());
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
function generateBtnRedirectClaimTicket()
{
    var id="btnClaimTicket";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("PTicket");
    btn.attr({"id":id,"onclick":"var new_window; new_window =window.open('"+claimTicketURL+"');"});
    return btn;
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