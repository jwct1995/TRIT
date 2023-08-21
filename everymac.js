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

    var modelYear=ele.children("tr:nth-child(1)").children("td:nth-child(2)").text();
    modelYear=modelYear.split(", ")[1];

    if(preA!=modelA || preE!=modelEMC)
    {
        preA=modelA;
        preE=modelEMC;
        //console.log("count "+ccc+" : "+modelA+"..."+modelEMC+"..."+modelName);
        console.log(modelName +" "+ modelYear +" "+ modelA +" EMC"+modelEMC);
    }
    
    ccc++;
});





MacBook Air M2 15" 2023 A2941 EMC8301
MacBook Pro M2 14" 2023 A2779 
MacBook Pro M2 16" 2023 A2780 
Mac mini M2 2023 A2686 EMC8003
Mac mini M2 2023 A2816 EMC8180
Mac Pro M2 2023 A2786 EMC8163
Mac Pro M2 2023 A2787 EMC8164
Mac Studio M2 2023 A2901 EMC8292


MacBook Air M2 13" 2022 A2681 EMC4074
MacBook Pro M2 13" 2022 A2338 EMC8162
Mac Studio M1 2022 A2615 EMC3988


iMac M1 24" 2021 A2439 EMC3664
iMac M1 24" 2021 A2438 EMC3663
MacBook Pro M1 14" 2021 A2442 EMC3650
MacBook Pro M1 16" 2021 A2485 EMC3651

iMac 27" (5K, 2020) 2020 A2115 EMC3442
MacBook Air 13" 2020 A2179 EMC3302
MacBook Air M1 13" 2020 A2337 EMC3598
MacBook Pro 13" 2020 2 Thunderbolt 3 2020 A2289 EMC3456
MacBook Pro 13" 2020 4 Thunderbolt 3 2020 A2251 EMC3348
MacBook Pro M1 13" 2020 A2338 EMC3578
Mac mini Developer Transition Kit (DTK) 2020 A2330 EMC3568
Mac mini M1 2020 A2348 EMC3569


iMac 21.5" 4K 2019 A2116 EMC3195
iMac 27" 5K 2019 A2115 EMC3194
MacBook Air 13" (True Tone) 2019 A1932 EMC3184
MacBook Pro 13" Touchbar 2019 A1989 EMC3358
MacBook Pro 15" Touchbar 2019 A1990 EMC3359
MacBook Pro 13" Touchbar 2 Thunderbolt 3 2019 A2159 EMC3301
MacBook Pro 16" 2019 2019 A2141 EMC3347
Mac Pro "Eight Core" 2019 A1991 EMC3203
Mac Pro "Eight Core" 2019 A2304 EMC3413


MacBook Air 13" 2018 A1932 EMC3184
MacBook Pro 13" Touchbar 2018 A1989 EMC3214
MacBook Pro 15" Touchbar 2018 A1990 EMC3215
Mac mini 2018 A1993 EMC3213


iMac 21.5" 2017 A1418 EMC3068
iMac 21.5" 4K 2017 A1418 EMC3069
iMac 27" 5K 2017 A1419 EMC3070
iMac Pro 27" 5K 2017 A1862 EMC3144
MacBook 12" 2017 A1534 EMC3099
MacBook Air 13" 2017 A1466 EMC3178
MacBook Pro 13" 2017 A1708 EMC3164
MacBook Pro 13" Touchbar 2017 A1706 EMC3163
MacBook Pro 15" Touchbar 2017 A1707 EMC3162


MacBook 12" 2016 A1534 EMC2991
MacBook Pro 13" 2016 A1708 EMC2978
MacBook Pro 13" Touchbar 2016* A1706 EMC3071
MacBook Pro 15" Touchbar 2016* A1707 EMC3072

iMac 27" 5K 2015 A1419 EMC2806
iMac 21.5" 2015 A1418 EMC2889
iMac 21.5" 4K 2015 A1418 EMC2833
iMac 27" 5K 2015 A1419 EMC2834
MacBook 12" 2015 A1534 EMC2746
MacBook Air 11" 2015 A1465 EMC2924
MacBook Air 13" 2015 A1466 EMC2925
MacBook Pro 13" 2015 A1502 EMC2835
MacBook Pro 15" 2015 A1398 EMC2909
MacBook Pro 15" 2015 A1398 EMC2910



iMac 21.5" 2014 A1418 EMC2805
iMac 27" 5K 2014 A1419 EMC2806
MacBook Air 11" 2014 A1465 EMC2631
MacBook Air 13" 2014 A1466 EMC2632
MacBook Pro 13" 2014 A1502 EMC2875
MacBook Pro 15" 2014 A1398 EMC2876
MacBook Pro 15" 2014 A1398 EMC2881
Mac mini 2014 A1347 EMC2840


iMac 21.5" 2013 A1418 EMC2545
iMac 21.5" 2013 A1418 EMC2638
iMac 21.5" 2013 A1418 EMC2742
iMac 27" 2013 A1419 EMC2639
MacBook Air 11" 2013 A1465 EMC2631
MacBook Air 13" 2013 A1466 EMC2632
MacBook Pro 13" 2013 A1425 EMC2672
MacBook Pro 15" 2013 A1398 EMC2673
MacBook Pro 13" 2013 A1502 EMC2678
MacBook Pro 15" 2013 A1398 EMC2674
MacBook Pro 15" 2013 A1398 EMC2745
Mac Pro 2013 A1481 EMC2630


iMac 21.5" 2012 A1418 EMC2544
iMac 27" 2012 A1419 EMC2546
MacBook Air 13" 2012 A1369 EMC2469
MacBook Air 11" 2012 A1465 EMC2558
MacBook Air 13" 2012 A1466 EMC2559
MacBook Pro 13" 2012 A1278 EMC2554
MacBook Pro 15" 2012 A1286 EMC2556
MacBook Pro 15" 2012 A1398 EMC2512
MacBook Pro 13" 2012 A1425 EMC2557
Mac mini 2012 A1347 EMC2570
Mac Pro 2012 A1289 EMC2629


iMac 21.5" 2011 A1311 EMC2428
iMac 27" 2011 A1312 EMC2429
iMac 21.5" 2011 A1311 EMC2496
MacBook Air 11" 2011 A1370 EMC2471
MacBook Air 13" 2011 A1369 EMC2469
MacBook Pro 13" 2011 A1278 EMC2419
MacBook Pro 15" 2011 A1286 EMC2353-1
MacBook Pro 17" 2011 A1297 EMC2352-1
MacBook Pro 13" 2011 A1278 EMC2555
MacBook Pro 15" 2011 A1286 EMC2563
MacBook Pro 17" 2011 A1297 EMC2564
Mac mini 2011 A1347 EMC2442


iMac 20" 2010 A1224 EMC2316
iMac 21.5" 2010 A1311 EMC2389
iMac 27" 2010 A1312 EMC2390
MacBook 13" 2010 A1342 EMC2395*
MacBook Air 11" 2010 A1370 EMC2393
MacBook Air 13" 2010 A1369 EMC2392
MacBook Pro 13" 2010 A1278 EMC2351
MacBook Pro 15" 2010 A1286 EMC2353
MacBook Pro 17" 2010 A1297 EMC2352
Mac mini 2010 A1347 EMC2364
Mac Pro 2010 A1289 EMC2314-2
Mac Pro 2010 A1289 EMC2314-2

