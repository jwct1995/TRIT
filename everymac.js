$("div#contentcenter > tbody").children("tr:nth-child(2)").children("td:nth-child(2)").find("div.startbox").children("table.standard").eq(0).before("<button name='btnCopyReceiptAndPrices'  class='button-28'>Copy Rec&Total</button>");



span #contentcenter_specs_externalnav_2 a text

//div #contentcenter_specs_internalnav_wrapper 

#contentwrapper #contentcenter



div #contentcenter_specs_internalnav_2
     
table tbody 
tr 2 td 4 a 1 Axxxx 
tr 2 td 4 a 2 EMCxxxx


tr 6 td a text Name

MacBook Pro "Core i5" 2.3 13" Touch/2018
MacBook Pro "Core i5" 2.3 13" Touch/2018 Specs



$("#contentwrapper > #contentcenter").children("div#contentcenter_specs_internalnav_2:nth-child(2)").html()

$("#contentwrapper > #contentcenter").find("div#contentcenter_specs_internalnav_2").html()








https://everymac.com/systems/by_year/index-macs-mac-clones-by-year.html





var ccc=0;
var preA="";
var preE="";
$("div#contentcenter_specs_internalnav_2").each(function( index ) 
{      
    //console.log("count "+ccc+" : "+$(this).html());

    var ele=$(this).children("center").children("table").children("tbody");
    var modelA=ele.children("tr:nth-child(2)").children("td:nth-child(4)").children("a:nth-child(1)").text();
    var modelEMC=ele.children("tr:nth-child(2)").children("td:nth-child(4)").children("a:nth-child(2)").text();
    var modelName=ele.children("tr:nth-child(6)").children("td").children("a").text();

    modelName=modelName.replace("Complete ","");
    modelName=modelName.replace(" Specs","");
    modelName=modelName.replace(" Vega Specs","");

    if(preA!=modelA && preE!=modelEMC)
    {
        preA=modelA;
        preE=modelEMC;
        console.log("count "+ccc+" : "+modelA+"..."+modelEMC+"..."+modelName);
    }
    
    ccc++;
});


