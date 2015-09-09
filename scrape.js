function getLoc() { 
    // Get all meta tags, check property and store lat/long into JS vars
    var metas = document.getElementsByTagName('meta'); 
    for (i=0; i<metas.length; i++) {    
        if (metas[i].getAttribute("property") == "zomatocom:location:latitude") { 
                    alert(metas[i].getAttribute("content"));
            }
            else if (metas[i].getAttribute("property") == "zomatocom:location:longitude") { 
                    alert(metas[i].getAttribute("content"));
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
