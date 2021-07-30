<html>
<head>
  </head>
  <style>
    #parentDiv
    {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    #iframe /*hide border+scroll*/
    {
      border: 0;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding-right: 17px;
      box-sizing: content-box;
    }
  </style>
  <body>
    <div id="parentDiv">
        <?php
        //if this file store in same server with is servicerequests then can use this method  and delete // before include
        //include "http://34.87.111.75/pcrt/v9/servicerequests/";



        //and delete iframe
        //else just ignore it 
        ?>
      <iframe id="iframe"src="http://34.87.111.75/pcrt/v9/servicerequests/"></iframe>
    </div>
  </body>
</html>
