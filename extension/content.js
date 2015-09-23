var latitude = null;
var longitude = null;

function setDestinationCordinates() { 
    var metas = document.getElementsByTagName('meta'); 
    for (i=0; i<metas.length; i++) {    
        if (metas[i].getAttribute("property") == "zomatocom:location:latitude") { 
                    latitude = metas[i].getAttribute("content");
            }
            else if (metas[i].getAttribute("property") == "zomatocom:location:longitude") { 
                    longitude = metas[i].getAttribute("content");
            }
    }
} 

setDestinationCordinates();

chrome.runtime.sendMessage({
    'latitude' : latitude,
    'longitude' : longitude
});
