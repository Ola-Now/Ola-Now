// Use jQuery for DOM manipulation

function getDestinationCordinates() { 
    
    // Get div to display cordinates
    var div = document.getElementById('display');

    // Get all meta tags, check property and store lat/long into JS vars
    var metas = document.getElementsByTagName('meta'); 
     
    for (i=0; i<metas.length; i++) {    
        if (metas[i].getAttribute("property") == "zomatocom:location:latitude") { 
                    var lat = metas[i].getAttribute("content");
                    $("#display").append("Latitude: "+lat);
            }
            else if (metas[i].getAttribute("property") == "zomatocom:location:longitude") { 
                    var long = metas[i].getAttribute("content");
                    $("#display").append("<br/>Longitude: "+long);
            }
    }
} 
