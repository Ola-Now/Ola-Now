function getDestinationCordinates() { 
    // Get div to display cordinates
    var div = document.getElementById('display');
    // Get all meta tags, check property and store lat/long into JS vars
    var metas = document.getElementsByTagName('meta'); 
    for (i=0; i<metas.length; i++) {    
        if (metas[i].getAttribute("property") == "zomatocom:location:latitude") { 
                    var lat = metas[i].getAttribute("content");
                    // alert(lat);
                    var content = document.createTextNode("Latitude: "+lat);
                    div.appendChild(content);
            }
            else if (metas[i].getAttribute("property") == "zomatocom:location:longitude") { 
                    var long = metas[i].getAttribute("content");
                    // alert(long);
                    
                    // All this work just for a br tag :( because createTextNode does not allow <br/>
                    div.appendChild(document.createElement("br"));
                    var content = document.createTextNode("Longitude: "+long);
                    div.appendChild(content);
            }
    }
} 



// for (i=0; i<metas.length; i++) { 
//    if (metas[i].getAttribute("property") == "video") { 
//       return metas[i].getAttribute("content"); 
//    } 
// } 
//  return "";

//$.ajax({
// url: "http://stackoverflow.com/questions/26274544/convert-command-curl-to-javascript",
// type: 'GET',
// success: function (data) {
//  alert(JSON.stringify(data));
//},
//  error: function(){
//   alert("Cannot get data");
// }
//});

//function getLoc() { 
//   var metas = document.getElementsByTagName('meta'); 
//   alert(metas)
//   alert("Lol")
//
//   // for (i=0; i<metas.length; i++) { 
//   //    if (metas[i].getAttribute("property") == "video") { 
//   //       return metas[i].getAttribute("content"); 
//   //    } 
//   // } 
//
//   //  return "";
//} 
