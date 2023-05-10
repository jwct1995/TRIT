// ==UserScript==
// @name         TRIT
// @namespace    http://tampermonkey.net/
// @version      17.2
// @description  make life easy
// @author       JWCT
// @match        http://34.87.111.75/*
// @match        http://fixlogy.com/*
// @match        http://35.197.158.218/*

// @updateURL    https://raw.githubusercontent.com/jwct1995/TRIT/master/TampermonkeyScript.js
// @downloadURL  https://raw.githubusercontent.com/jwct1995/TRIT/master/TampermonkeyScript.js

// @icon         http://34.87.111.75/pcrt/v9/repair/images/logo.png
// @require      https://code.jquery.com/jquery-3.5.1.min.js

//https://greasyfork.org/en/scripts/431134-trit

//https://getcssscan.com/css-buttons-examples
// @grant       none

// @run-at document-end

// ==/UserScript==
var testmode=0;

var txtBranch="";
//var woid="";
var username ="";
var weburl;
var webFurl;
var customerName=customerWO=customerDeviceModel=claimTicketURL="";


window.onload = function exampleFunction()
{
    defaultData();



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
    $("body").on("click", "[name='btnCopyExcelFormat']", function()
    {
        var btnType=$(this).attr("btntype");
        GenerateBtnCopyToExcelFormat(btnType);
    });
    $("body").on("click", "#btnGenerateReceiveNote", function()
    {
        GenerateReceiveNote();
    });
    $("body").on("click", "#btnGenerateSupplierPartNo", function()
    {
        GenerateSupplierPartNo();
    });


    $("body").on("click", "#btntowa", function()
    {
        var wanumber=$("#txtwanumber").val();
        wanumber=PhoneNumberFilter(wanumber);

        var new_window; new_window =window.open("https://api.whatsapp.com/send?phone="+wanumber);
    });
    $("body").on("click", "[name='btnwaadd']", function()
    {
        var branchaddress=$(this).val();
        var wanumber=$("#txtwanumber").val();
        wanumber=PhoneNumberFilter(wanumber);
        var new_window; new_window =window.open(sendAddressToWA(wanumber,branchaddress));
    });

    $("body").on("input click", "#autoinvsearchbox", function()
    {
        PlugOverFlowScrollingToInventoryList();
    });
    $("body").on("click", "#addcnote", function()
    {
        if(username=="J")
        {
            GenerateNoteTextGeneratorClick("public");
        }
        
    });
    
    
    
    
});


function defaultData()
{
    username=$(".primary_linkgo_rightnew").text();
    username=username.split("\n ");
    username=username[1].trim();
    if(testmode==1)
        username="J"; //use to test only

    var sBranch = $(".primary_linkgonew").text();

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

    generateCSS();
    GenerateWhatsappButton();
    PlugColorToSpecialOrder();

    GenerateReceiveNoteBtn();
    if(username=="Ljy" || username=="Lyn" ||  username=="J")
        GenerateSupplierPartNoBtn();


    GenerateCopyBtn("Techminal");
    GenerateCopyBtn("FS");
    GenerateCopyBtn("TNN");
    GenerateCopyBtn("local");
    GenerateCopyBtn("oversea");
    GenerateCopyBtn("all");
    GenerateCopyBtn("FullAll");
    if(username=="Ljy" || username=="Lyn" ||  username=="J")
        GenerateCopyBtn("FAV2");

    GenerateInputWhatsappSlot();

    GetURL();
   

}

function PhoneNumberFilter(phonenumber)
{
    var rtn=phonenumber.replace(/\D/g,''); //filter out non digit character
    rtn=rtn.trim();
    if(rtn.length==8)
        rtn="65"+rtn;
    if(rtn[0]=="+")
        rtn=rtn.substring(1, 9999);
    return rtn;

}
function GetURL()
{
    weburl=window.location.pathname;
    webFurl = window.location.href;
}
function GetCustomerData()
{
    var customerTitle=$("#mainworkorder").find(".colortitletopround").children("span:nth-child(1)").text();
    customerTitle=customerTitle.split(" • ");
    customerName=customerTitle[0];
    customerDeviceModel=customerTitle[1];

    if($(".whitemiddle").length!=0)
    {
        claimTicketURL=$(".whitemiddle").find(".nvbar").children(".nvdropdown:nth-child(3)").find("div").children("a:nth-child(1)").attr("href");
        var woele = claimTicketURL.split("woid=");
        customerWO = woele[1];
    }

}

function GenerateWhatsappButton()
{

    /*if($("#mainworkorder#mainworkorder").length)
    {
        console.log("bb : "+rcount);
    }
    else 
        console.log("nono"+rcount);
    */

    
    var rcount=0;
    var cd = setInterval(function()
    {
        //getWOID();
        GetCustomerData();
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
            //console.log("aa : "+rcount);
           // if(txtBranch=="Yishun")
             //   GenerateExtentionForNote(txtBranch,"private");
            //console.log("check round"+rcount+".2");
          //  console.log("check 1 - "+$("[name='divExtentionCustomerNote']").length);
        }
        if($("[name='divExtentionTechNote']").length == 0 )
        {
            GenerateExtentionForNote(txtBranch,"private");
        }
       // console.log("check 2 - "+$("[name='divExtentionCustomerNote']").length);
        rcount++;
        if(rcount>=10)
            clearInterval(cd);
        //console.log("check round"+rcount);
    }, 200);

}


function GenerateExtentionForNote(branch,notetype)
{
    var custNoteArea;
    var divname;
    if(notetype=="private")
    {
        custNoteArea=$("#technotearea");
        divname="divExtentionTechNote";
    }
    else if(notetype=="public")
    {
        custNoteArea=$("#custnotearea");
        divname="divExtentionCustomerNote";
    }
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
        removeDuplicateElement(div,"ph","");
    });
}



function encodeStr(txt)
{
    return encodeURIComponent(txt);
}

function generateBtnRedirectToWhatsappWithTxt(phone,txt)
{
    var rphone=PhoneNumberFilter(phone);

    var id="btnWhatsAppSendTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("sWhatsapp "+rphone);
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('https://api.whatsapp.com/send?phone="+rphone+"&text="+encodeStr(txt)+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
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
    div.append(generateBtnRedirectAssetLabel());


    
    removeDuplicateElement(div,"id","");
}

function removeDuplicateElement(ele,attr,eleid)
{
    var preEleId="";
    var prePhId=""
    var ccount=0;
    if(ele=="noEle")
    {
        $("["+attr+"='"+eleid+"']").each(function() 
        {
            /*if($(this)!=preEleId)
            {
                preEleId=$(this);
                console.log("d1");
            }
            else
            {*/
                //preEleId.remove();
                //preEleId=$(this);
                //console.log("d2");
            //}
            //console.log("dd..."+attr+"....."+eleid+"...."+ccount);
            if(ccount==0)
            {
                preEleId=$(this);
                console.log("d1");
            }
            else
            {
                preEleId.remove();
                preEleId=$(this);
                console.log("d2");
            }
            ccount++;
        });
        //$("[name='divTextTemplateGenerator']").remove();
    }
    else
    {
        ele.children().each(function(index, val)
        {
            if($(this).attr(attr)!=preEleId)
                preEleId=$(this).attr(attr);
            else
                $(this).remove();
        });
    }

    //console.log("deleted");
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

function generateBtnRedirectAssetLabel()
{
    var id="btnAssetLabel";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("ALabel");
    btn.attr({"id":id,"onclick":"var new_window; new_window =window.open('"+$(".whitemiddle").find(".nvbar").children(".nvdropdown:nth-child(3)").find("div").children("a:nth-child(8)").attr("href")+"');"});
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



function generateBtnRedirectToWhatsappWithReadyToCollectTxt(branch,phone)
{
    var id="btnWhatsAppSendReadyToCollectTxt";
    var btn=$("<button><button>");
    btn.css({"width":"auto","height":"30px","margin-left": "10px","border-style": "solid"});
    btn.text("ReadyToCollect");
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window =window.open('"+rtnTxtReadyForCollection(branch,phone)+"'); setTimeout(function(){ new_window.close(); }, 1000); "});
    //if (confirm('Press a button!')) {pathnameurl=window.location.pathname;window.location.pathname=pathnameurl+'pc.php?func=precalled&woid="+woid+"&status=2';}
    return btn;
}

function confirmationSetCalled()
{
    if (confirm("Press a button!")) {alert("aa");} else {alert("bb");}
}

function generateBtnRedirectToWhatsapp(phone)
{
    var rphone=PhoneNumberFilter(phone);

    var id="btnWhatsAppPhoneNumber";
    var btn=$("<button><button>");
    btn.attr("ph",phone);
    btn.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window = window.open('https://api.whatsapp.com/send?phone="+rphone+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
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
    GetCustomerData();
    var rtn="";
   // var uname=$("#mainworkorder").find(".colortitletopround").children("span:nth-child(1)").text();
    //uname=uname.split(" • ");
    var rphone=PhoneNumberFilter(phone);

    if(branch=="AMK")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=Hi%20"+customerName+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20AMK%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCS51tQqVBkLHEBM%2Freview";
    }
    else if(branch=="Hougang")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=Hi%20"+customerName+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Hougang%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCSCMXrB0DnG4EBM%2Freview";
    }
    else if(branch=="Tampines")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=Hi%20"+customerName+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Tampines%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCcf28hpDS6QNEBM%2Freview%20";
    }
    else if(branch=="Yishun")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=Hi%20"+customerName+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20TRITcomputer%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATRIT%20Computer%20-%20Yishun%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCc2YWe6qsRKMEBM%2Freview%20";
    }
    else if(branch=="TECHMINAL")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=Hi%20"+customerName+"%EF%BC%8C%0A%0AThank-You%20for%20your%20trust%20and%20choosing%20Techminal%20for%20your%20recent%20service%20work%0A%20%20%20%20%0AWe%20want%20you%20to%20be%20satisfied%20with%20the%20level%20of%20service%20we%20have%20provided%20you.%0AIf%20you%20have%20any%20further%20issues%20or%20questions%2C%20do%20not%20hesitate%20to%20contact%20us.%0AWe%20want%20you%20to%20be%20100%25%20satisfied%20with%20our%20work.%0A%20%20%20%20%0AWe%20strive%20to%20provide%205%20Star%20service%20with%20every%20service%20work%20we%20deliver.%0A%20%20%20%20%0AIf%20you%20have%20any%20immediate%20issues%20or%20feedback%20though%2C%20be%20sure%20to%20contact%20us%20directly%2C%0Awe%20are%20ready%20and%20eager%20to%20solve%20any%20issue.%0A%20%20%20%20%0AThanks%20Again%20for%20choosing%20us%2C%20and%20please%20remember%20us%20for%20any%20future%20needs.%0A%20%20%20%20%0ASincerely%2C%0ATechminal%0AApple%20Certified%20Mac%20%26%20iOS%20Technician%0A%20%20%20%20%0AIt%20will%20be%20great%20if%20you%20can%20help%20to%20Click%20the%20link%20below%20to%20rate%20and%20leave%20us%20your%20valuable%20review.%20Thank%20you!%0Ahttps%3A%2F%2Fg.page%2Fr%2FCVaHFth9XKD6EBM%2Freview%20";
    }

    return rtn;
}

function rtnTxtReadyForCollection(branch,phone)
{
    GetCustomerData();
    var rphone=PhoneNumberFilter(phone);
    

    var rtn="";
    if(branch=="AMK")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=%5BTRITcomputer%20-%20AMK%5D%0A%0ADear%20"+customerName+"%2C%0AWork Order ID "+customerWO+"%0APhone Number "+rphone+" %0A%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A10%3A00am%20to%208%3A00pm%20(%20Weekday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.sg%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20AMK%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Hougang")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=%5BTRITcomputer%20-%20Hougang%5D%0A%0ADear%20"+customerName+"%2C%0AWork Order ID "+customerWO+"%0APhone Number "+rphone+" %0A%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A12%3A00pm%20to%208%3A00pm%20%0A(%20Weekday%20Except%20Tuesday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.sg%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20Hougang%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Tampines")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=%5BTRITcomputer%20-%20Tampines%5D%0A%0ADear%20"+customerName+"%2C%0AWork Order ID "+customerWO+"%0APhone Number "+rphone+" %0A%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%0A(NO%20CASH%20PAYMENT)%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%0A%0ABusiness%20hours%20are%20as%20follows%3A%0A10%3A00am%20to%208%3A00pm%20%0A(%20Weekday%20Except%20Tuesday%20)%0A12%3A00pm%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%E2%80%A8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%0A%0AJoin%20us%20at%20Facebook%3A%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%0A%0ARegards%2C%0ATRITcomputer%20-%20Tampines%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="Yishun")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=%5BTRITcomputer%20-%20Yishun%5D%20%0A%0ADear%20"+customerName+"%2C%0AWork Order ID "+customerWO+"%0APhone Number "+rphone+" %0A%0AYour%20Device%20is%20ready%20for%20collection.%20%20%0A%0APayment%20Mode%3A%20%0A*PayNow%2C%20PayLah%2C%20Bank%20Transfer%20and%20NETS%20only.*%20%0A(NO%20CASH%20PAYMENT)%20%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%20%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%20%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%20%0A%0ABusiness%20hours%20are%20as%20follows%3A%20%0A10%3A00am%20to%208%3A00pm%20(%20Daily%20)%20%20%0A%0AVisit%20our%20website%20for%20more%20details%3A%20%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%20%0A%0AJoin%20us%20at%20Facebook%3A%20%0Ahttps%3A%2F%2Fwww.facebook.com%2Ftritcomputer%2F%20%0A%0ARegards%2C%20%0ATRITcomputer%20-%20Yishun%20%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }
    else if(branch=="TECHMINAL")
    {
        rtn="https://api.whatsapp.com/send?phone="+rphone+"&text=%5BTechminal%5D%0A%0ADear%20Sir%2FMdm%2C%0AYour%20Device%20is%20ready%20for%20collection.%20%0A%0APayment%20Mode%3A%0APayNow%2C%20GrabPay%2C%20PayLah%20and%20Bank%20Transfer.%0A%0A%0AKindly%20bring%20along%20your%20Claim%20Ticket%20OR%0Ashow%20us%20your%20E-Claim%20Ticket%20for%20verification.%0A(Check%20your%20Mailbox%20or%20Junk%20Mail)%E2%80%A8%0A%0ARegards%2C%0AYour%20Techminal%20Team%0A(Sim%20Lim%20Square%20%2301-26)%0A(Beside%20Loading%20Bay)%0A%0AThank%20you%20%26%20Have%20a%20nice%20day!";
    }

    return rtn;
}

function PlugColorToSpecialOrder()
{
    //var weburl=window.location.pathname;
    GetURL();
    if (~weburl.indexOf("/store/stock.php"))
    {
        $(".whitebottom").find("table").find("tr").each(function(index, value)
        {
            //console.log(index +" -->> "+ $(this).children("td:nth-child(8)").children("span:nth-child(1)").text());
            var opSupplier=$(this).children("td:nth-child(3)").text();
            var opStatus=$(this).children("td:nth-child(8)").children("span:nth-child(1)").text();
            var bgColorCode="";

            if(opStatus=="Order Part" && opSupplier=="Fssocom")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                    bgColorCode="#edaa7e";
                else
                    bgColorCode="#70e18e";
            }
            else if(opStatus=="Order Part" && opSupplier=="# TECHMINAL PTE. LTD.")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                    bgColorCode="ffffff";
                else
                    bgColorCode="#75e93a";
            }
            else if(opStatus=="Order Part" && opSupplier=="#Overseas")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                    bgColorCode="#8ed0ff";
                else
                    bgColorCode="#4defb3";
            }
            else if(opStatus=="Order Part" && opSupplier=="TNN")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                    bgColorCode="#eded6d";
                else
                    bgColorCode="#97e370";
            }
            else if(opStatus=="Order Part")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                {
                    bgColorCode="#ffffff";
                }
                else
                    bgColorCode="#a6ff79";
            }
            else if(opStatus=="Shipped")
            {
                if(username=="Ljy" || username=="Lyn" ||  username=="J")
                    bgColorCode="#8ed0ff";
                else
                    bgColorCode="#8ed0ff";
            }
            else if(opStatus=="Received")
            {
                if(username=="Ljy" || username=="Lyn" || username=="J")
                    bgColorCode="#ffb6b6";
                else
                    bgColorCode="#ffb6b6";
            }

            $(this).closest("tr").css("background-color", bgColorCode);
        });
    }
}
/*
function getWOID()
{
    if($(".whitemiddle").length!=0)
    {
        claimTicketURL=$(".whitemiddle").find(".nvbar").children(".nvdropdown:nth-child(3)").find("div").children("a:nth-child(1)").attr("href");
        //console.log("v2 "+claimTicketURL);
        var wo = claimTicketURL.split("woid=");
        //console.log("v3 "+wo);
        woid = wo[1];
        //console.log("url ..."+woid);

    }
    
}
*/
function GenerateCopyBtn(btnType)
{
    GetURL();
    //var weburl=window.location.pathname;
    //var webFurl = window.location.href;
    var func=webFurl.split("php?func=");
    //func[1];
    //specialorders
   // specialordersall
    if (~weburl.indexOf("/store/stock.php")&& (func[1]=="specialorders"||func[1]=="specialordersall"))
    {
        $(".whitebottom").find("table").before("<button name='btnCopyExcelFormat' btntype='"+btnType+"' class='button-28'>Copy ("+btnType+")</button>");
    }

}
function GenerateReceiveNoteBtn()
{
    GetURL();
    //var weburl=window.location.pathname;
    //var webFurl = window.location.href;
    var func=webFurl.split("php?func=");
    
    if (~weburl.indexOf("/store/stock.php")&& (func[1].indexOf("editspo")==0 || func[1].indexOf("addspo")==0))
    {
        var ele = $("[name='sponotes']").closest( "td" );
        ele.append("<btn id='btnGenerateReceiveNote' class='button-29'>Received**ByXxX yyyy/mm/dd</btn>");
    }

}

function GenerateSupplierPartNoBtn()
{
    GetURL();
    //var weburl=window.location.pathname;
    //var webFurl = window.location.href;
    var func=webFurl.split("php?func=");
    
    if (~weburl.indexOf("/store/stock.php")&& (func[1].indexOf("editspo")==0 || func[1].indexOf("addspo")==0))
    {
        var ele = $("[name='spopartnumber']").closest( "td" );
        ele.append("<btn id='btnGenerateSupplierPartNo' class='button-29'>Order**ByXxX yyyy/mm/dd</btn>");
    }

}

function GenerateReceiveNote()
{
    GetURL();
    //var weburl=window.location.pathname;
    //var webFurl = window.location.href;
    var func=webFurl.split("php?func=");
    
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();
    var ymd = d.getFullYear() + '/' +((''+month).length<2 ? '0' : '') + month + '/' +((''+day).length<2 ? '0' : '') + day;

    //var specialOrderEditTable = $("[name=spopartname]").parent().parent().parent().parent();
    var eleTxt = $("[name='spoquantity']").val();
    $("[name='sponotes']").val("Received "+eleTxt+" by "+username+" on "+ymd);

    if (func[1].indexOf("addspo")==0)
        $("[name='spostatus']").val("8");
    else
        $("[name='spostatus']").val("2");
}

function GenerateSupplierPartNo()
{
    var d = new Date();

    var month = d.getMonth()+1;
    var day = d.getDate();
    var ymd = d.getFullYear() + '/' +((''+month).length<2 ? '0' : '') + month + '/' +((''+day).length<2 ? '0' : '') + day;

    var eleTxt = $("[name='spoquantity']").val();
    $("[name='spopartnumber']").val("Order "+eleTxt+" by "+username+" on "+ymd);

    $("[name='spostatus']").val("9");
}

function copyToClipboard(copyTxt)
{
    var temp=$("<textarea></textarea>");
    $("body").append(temp);
    temp.text(copyTxt).select();
    document.execCommand("copy");
    temp.remove();
}

function GenerateBtnCopyToExcelFormat(btnType)
{
    GetURL();
    //var weburl=window.location.pathname;
    var rtn="";
    
    $(".whitebottom").find("table").find("tr").each(function(index, value)
    {
        //console.log(index +" -->> "+ $(this).children("td:nth-child(8)").children("span:nth-child(1)").text());
        //$(".whitebottom").find("table").find("tr").children("td:nth-child(8)").children("span:nth-child(3)").css("background-color","red");
        
        var opName=$(this).children("td:nth-child(1)").text();
        var opQuantity=$(this).children("td:nth-child(2)").text();
        opQuantity=opQuantity.split("$");
        opQuantity=opQuantity[0];
        var opSupplier=$(this).children("td:nth-child(3)").text();
        var opSupplierPN=$(this).children("td:nth-child(4)").text();
        var opURL=$(this).children("td:nth-child(5)").text();
        var opTrackingNo=$(this).children("td:nth-child(6)").text();
        var opDate=$(this).children("td:nth-child(7)").find("span").text();
        var opStatus=$(this).children("td:nth-child(8)").children("span:nth-child(1)").text();
        var opRemark=$(this).children("td:nth-child(8)").children("span:nth-child(3)").text();
        var opWO=$(this).children("td:nth-child(9)").find("a").text();
        //var op=$(this).children("td:nth-child(3)").text();
       // alert(opRemark);
        if(opName!="")
        {
            if(btnType=="FAV2")
            {
                rtn+=opName+" \t"+opQuantity+" \t"+opSupplier+" \t"+opSupplierPN+" \t"+opURL+" \t"+opTrackingNo+" \t"+opStatus+" \t"+opWO+" \t"+opRemark+" \n";
            }
            else if(btnType!="FullAll" && opStatus!="Received")
            {
                if(btnType=="FS" && opSupplier=="Fssocom") //local
                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
                else if(btnType=="Techminal" && opSupplier=="# TECHMINAL PTE. LTD.") //local
                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
                if(btnType=="TNN" && opSupplier=="TNN") //local
                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
                else if(btnType=="local" && (opSupplier!="#Overseas" && opStatus!="Shipped") ) //local
                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
                else if(btnType=="oversea" && (opSupplier=="#Overseas" || opStatus=="Shipped")) //overseaOverseas

                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
                else if(btnType=="all")// all
                    rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
            }
            else if(btnType=="FullAll") //full all
                rtn+=opDate+" \t"+opName+" \t"+opQuantity+" \t"+opWO+" \t"+opRemark+" \n";
        }
    });
    copyToClipboard(rtn);
}

function generateCSS()
{
    var css=$("<style></style>");
    $("body").prepend(css);
    css.html(".button-28 {appearance: none;background-color: transparent;border: 2px solid #1A1A1A;border-radius: 15px;box-sizing: border-box;color: #3B3B3B;cursor: pointer;display: inline-block;font-family: Roobert,-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size: 16px;font-weight: 600;line-height: normal;margin: 0px 20px 10px 0;min-width: 0;outline: none;padding: 3px 10px;text-align: center;text-decoration: none;transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);user-select: none;-webkit-user-select: none;touch-action: manipulation;will-change: transform;}.button-28:disabled {pointer-events: none;}.button-28:hover {color: #fff;background-color: #1A1A1A;box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;transform: translateY(-2px);}.button-28:active {box-shadow: none;transform: translateY(0);}.button-29 {align-items: center;appearance: none;background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);border: 0;border-radius: 6px;box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;box-sizing: border-box;color: #fff;cursor: pointer;display: inline-flex;font-family: 'JetBrains Mono',monospace;height: 30px;justify-content: center;line-height: 1;list-style: none;overflow: hidden;padding-left: 16px;padding-right: 16px;position: relative;text-align: left;text-decoration: none;transition: box-shadow .15s,transform .15s;user-select: none;-webkit-user-select: none;touch-action: manipulation;white-space: nowrap;will-change: box-shadow,transform;font-size: 18px;margin-left: 5px;}.button-29:focus {box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;}.button-29:hover {box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;transform: translateY(-2px);}.button-29:active {box-shadow: #3c4fe0 0 3px 7px inset;transform: translateY(2px);}");
}

function GenerateInputWhatsappSlot()
{
    if($("#topnavbarfixed").length!=0)
    {
        $("#topnavbarfixed > table >tbody > tr ").children("td:nth-child(2)").append("<table style='display: inline;'><tr><td><input id='txtwanumber' type='text' value='+65'><input id='btntowa'type='button' value='go'></td></tr><tr><td>Address : <input name='btnwaadd' type='button' value='AMK'><input name='btnwaadd' type='button' value='HG'><input name='btnwaadd' type='button' value='TMP'><input name='btnwaadd' type='button'value='YS'><input name='btnwaadd' type='button'value='TCM'></td></tr></table>")
    }
}


function sendAddressToWA(ph,branchaddress)
{
    var rtn="";
    if(branchaddress=="AMK")
        rtn="https://api.whatsapp.com/send?phone="+ph+"&text=%5BTRITcomputer%20-%20AMK%5D%0A%0ADear%20Sir%2FMdm%2C%0A%0ABusiness%20Hours%0A10%3A00am%20to%208%3A00pm%20(%20Weekday%20)%0A12%3A00nn%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Public%20Holiday%0A%0AWhatsapp%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D6585555522%0A%0ALocation%0A631%20Ang%20Mo%20Kio%20Ave%204%2C%20%2301-922%2C%20Singapore%20560631%0A%0AGoogle%20Map%20%0Ahttps%3A%2F%2Fgoo.gl%2Fmaps%2Fuejdp7CYVDfqxpZg9%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%20";
    else if(branchaddress=="HG")
        rtn="https://api.whatsapp.com/send?phone="+ph+"&text=%5BTRITcomputer%20-%20Hougang%5D%0A%0ADear%20Sir%2FMdm%2C%0A%0ABusiness%20Hours%0A12%3A00nn%20to%208%3A00pm%20(%20Weekday%20Except%20Tuesday%20)%0A12%3A00nn%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%0A%0AWhatsapp%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D6585555500%0A%0ALocation%0A1187%20Upper%20Serangoon%20Rd%2C%20%2302-09%20The%20Midtown%2C%20Singapore%20533971%0A%0AGoogle%20Map%0Ahttps%3A%2F%2Fgoo.gl%2Fmaps%2Fec76LJbA23UcLixn8%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F%20";
    else if(branchaddress=="TMP")
        rtn="https://api.whatsapp.com/send?phone="+ph+"&text=%5BTRITcomputer%20-%20Tampines%5D%0A%0ADear%20Sir%2FMdm%2C%0A%0ABusiness%20Hours%0A10%3A00am%20to%208%3A00pm%20(%20Weekday%20Except%20Tuesday%20)%0A12%3A00nn%20to%205%3A00pm%20(%20Weekend%20)%0A*Closed%20on%20Every%20Tuesday%20and%20Public%20Holiday%0A%0AWhatsapp%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D6588000707%0A%0ALocation%0ATelepark%2C%205%20Tampines%20Central%206%2C%20%2301-07%2C%20Singapore%20529482%0A%0AGoogle%20Map%0Ahttps%3A%2F%2Fg.page%2FTRITcomputer%3Fshare%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F";
    else if(branchaddress=="YS")
        rtn="https://api.whatsapp.com/send?phone="+ph+"&text=%5BTRITcomputer%20-%20Yishun%5D%0A%0ADear%20Sir%2FMdm%2C%0A%0ABusiness%20Hours%0A10%3A00nn%20to%208%3A00pm%20(%20Everyday%20)%0AWork%20on%20Public%20Holiday%20too%0A%0AWhatsapp%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D6588000606%0A%0ALocation%0A926%20Yishun%20Central%201%2C%20%2301-191%2C%20Singapore%20760926%0A%0AGoogle%20Map%0Ahttps%3A%2F%2Fgoo.gl%2Fmaps%2FPQcD9yF7P8bQr7o8A%0A%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.tritcomputer.com%2F";
    else if(branchaddress=="TCM")
        rtn="https://api.whatsapp.com/send?phone="+ph+"&text=%5BTechminal%5D%0A%0ADear%20Sir%2FMdm%2C%0A%20%20%20%20%0ABusiness%20Hours%0A11%3A00am%20to%208%3A00pm%20%0A%0AWhatsapp%0Ahttps%3A%2F%2Fapi.whatsapp.com%2Fsend%3Fphone%3D6588728988%0A%20%20%20%20%0ALocation%0A1%20Rochor%20Canal%20Rd%2C%20%2301-26%20Beside%20Loading%20Bay%2C%20Sim%20Lim%20Square%2C%20Singapore%20188504%0A%20%20%20%20%0AGoogle%20Map%20%0Ahttps%3A%2F%2Fgoo.gl%2Fmaps%2F5ibuHxkAjhHBDufG6%0A%20%20%20%20%0AVisit%20our%20website%20for%20more%20details%3A%0Ahttps%3A%2F%2Fwww.techminalsg.com%2F";



    return rtn;
}



function PlugOverFlowScrollingToInventoryList()
{
   // var weburl=window.location.pathname;
   // if (~weburl.indexOf("/store/cart.php"))
    //{
    $("div#autoinvsearch").css({"overflow":"scroll","max-height":"300px","width":"98%"});
    //}
}



























function GenerateNoteTextGeneratorClick(notetype)
{
    var cd = setInterval(function()
    {
        console.log("check round");

        //$("#custnoteta")



        var ele=$("#custnoteta");
        var div=$("<div></div>");
        div.attr({"name":"divTextTemplateGenerator"});
        //div.css("display","inline-flex");
        div.html("btn...");
        div.append(GenerateCheckBoxForNote("Quotation"));
        ele.after(div);
        

        
        //div.append(generateBtnRedirectToWhatsapp(txtPhoneNo));
        //div.append(generateBtnRedirectToWhatsappWithReadyToCollectTxt(txtBranch,txtPhoneNo));
        //div.append(generateBtnRedirectToWhatsappGoogleMapReviewTxt(txtBranch,txtPhoneNo));
        //div.append(generateBtnRedirectClaimTicket());
       removeDuplicateElement("noEle","name","divTextTemplateGenerator");
        console.log("aaa");



        clearInterval(cd);
    }, 200);

}

function GenerateCheckBoxForNote(cbName)
{
    var lbl=$("<lable></lable>");
    lbl.css({"background-color":"#cecece","border-radius":"12pt","padding":"2px 10px 2px 5px"});
    var cbox=$("<input></input>");
    cbox.attr({"name":"cboxForNote","type":"checkbox","value":cbName});
    lbl.append(cbox);
    lbl.append(cbName);
    return lbl;
}
/*
function generateNoteTextBtn(phone)
{
    var rphone=phone.replace(/\D/g,''); //filter out non digit character
    rphone=rphone.trim();
    if(rphone.length==8)
        rphone="65"+rphone;
    if(rphone[0]=="+")
        rphone=rphone.substring(1, 9999);

    var id="btnWhatsAppPhoneNumber";
    var btn=$("<button><button>");
    btn.attr("ph",phone);
    btn.css({"width":"30px","height":"30px","margin-left": "10px","background-image": "url('https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s180-rw')","background-size": "contain","border-style": "solid"});
    btn.attr({"id":id,"ph":phone,"onclick":"var new_window; new_window = window.open('https://api.whatsapp.com/send?phone="+rphone+"'); setTimeout(function(){ new_window.close(); }, 1000);"});
    return btn;
}*/


//test




