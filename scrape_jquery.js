// Use jQuery for DOM manipulation

function getDestinationCordinates() { 
    
    // Get div to display cordinates
    var div = document.getElementById('display');

    // Get all meta tags, check property and store lat/long into JS vars
    //var metas = document.getElementsByTagName('meta'); 

    var lat = $("meta[property='zomatocom:location:latitude']").attr("content");
    var long = $("meta[property='zomatocom:location:longitude']").attr("content");
    $("#display").append("Latitude: "+lat); 
    $("#display").append("<br/>Longitude: "+long);
} 
