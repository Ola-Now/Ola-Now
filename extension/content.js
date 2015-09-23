var latitude = null;
var longitude = null;


var demo = document.getElementById("demo");
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


function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
    chrome.runtime.sendMessage({
    'latitude' : latitude,
    'longitude' : longitude,
    'myLat': 12.11,
    'myLong': 99.11
})
    );
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    var myLat = position.coords.latitude;
    var myLong = position.coords.longitude;
    alert("User location:\n"+myLat+"\n"+myLong);
}
getUserLocation();
