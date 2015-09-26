// Global reference to the status display SPAN
var statusDisplay = null;

function testAlert(){

    alert("Booked cab! :)");
}

// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('latitude').value = pageDetails.latitude; 
    document.getElementById('longitude').value = pageDetails.longitude;
    document.getElementById('myLat').value = pageDetails.myLat; 
    document.getElementById('myLong').value = pageDetails.myLong;
    myLat=pageDetails.myLat;
    myLong=pageDetails.myLong;
    destLat=pageDetails.latitude;
    destLong=pageDetails.longitude;

    // get cookie named logged_in for domain .uber.com
    chrome.cookies.getAll({"name": "logged_in", "domain": ".uber.com"},
        // callback function to be called when getAll() returns
        function(cookie) {
            // if cookie exists and it's value is true
            if ((cookie.length) && (!cookie[0].value.localeCompare("true"))) {    // localeCompare returns 0 when strings are equal
                //alert("logged in");
                var product_result=getProducts(pageDetails.myLat,pageDetails.myLong);
                //alert(product_result);
                //statusDisplay.innerHTML=product_result;
            }
            else{
                alert("logged out");
                chrome.tabs.create({'url': 'https://ola-app.herokuapp.com/', }, function(window) {});
            }
        } 
    );
} 

function cancelCab() {
    var crn = document.getElementById("cancel").value;    
    var postUrl = 'http://localhost/cancel?crn=' + crn;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', postUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                //alert(JSON.parse(xhr.responseText).products[0].capacity);
                //window.setTimeout(window.close, 1000);

                parsedResponse = JSON.parse(xhr.responseText);
                container.innerHTML = "";
                var divContent = parsedResponse.text;
                container.innerHTML = divContent;

            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };
    
    // Send the request and set status
    xhr.send();

}


// POST the data to the server using XMLHttpRequest
function bookCab() {
    var postUrl = 'http://localhost/book?category=sedan&myLat=' + myLat + '&myLong=' + myLong ;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', postUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                //alert(JSON.parse(xhr.responseText).products[0].capacity);
                //window.setTimeout(window.close, 1000);

                parsedResponse = JSON.parse(xhr.responseText);
                container.innerHTML = "";
                var divContent = "";

                var crn = parsedResponse.crn;

                divContent = "<div class='products_results" + i + "'><p>" + "Driver name: " +parsedResponse.driver_name;
                divContent += "<br/>Driver number: " + parsedResponse.driver_number;
                divContent += "<br/>Cab number: " + parsedResponse.cab_number;
                divContent += "<br/>ETA: " + parsedResponse.eta + " mins";
                //divContent += "<br/><button type='button' id='track' value='" + crn + "'>Track ride</button>"
                divContent += "<button type='button' id='cancel' value='" + crn + "'>Cancel ride</button>"
                divContent += "</div>";

                container.innerHTML += divContent;
            
                //var trackButton = document.getElementById("track");
                var cancelButton = document.getElementById("cancel");
                
                //trackButton.addEventListener("click", trackCab, false);
                cancelButton.addEventListener("click", cancelCab, false);                

            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };
    
    // Send the request and set status
    xhr.send();

}

function getProducts(lat,long){
    var postUrl = 'http://localhost/products?category=sedan';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, false);
    xhr.setRequestHeader('Content-type', 'application/json');

    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If it was a success, close the popup after a short delay
                //alert(JSON.parse(xhr.responseText).products[0].capacity);
                //window.setTimeout(window.close, 1000);
                parsedResponse = JSON.parse(xhr.responseText);
                products.innerHTML = "<h4>Cabs available</h4>";
                var divContent = "";

                for(i=0;i < parsedResponse.categories.length; i++)
                {

                    //<button id='booking' type='button' value='abcdef'>Book this!</button> </div>

                    divContent = "<div class='products_results" + i + "'><p>" + parsedResponse.categories[i].id;
                    divContent += "<br/>ETA: " + parsedResponse.categories[i].eta;
                    divContent += "<br/>Price/km: " + parsedResponse.categories[i].cost_per_distance;
                    divContent += "<br/>Base fare: " + parsedResponse.categories[i].base_fare;
                    divContent += "<br/>Distance: " + parsedResponse.ride_estimate[i].distance;
                    divContent += "<br/>Travel time: " + parsedResponse.ride_estimate[i].travel_time_in_minutes;
                    divContent += "<br/>Fare estimate: " + parsedResponse.ride_estimate[i].amount_min + " - " + parsedResponse.ride_estimate[i].amount_max;
                    divContent += "<br/><button type='button' id='booking1' class='booking' value='" + parsedResponse.categories[i].id + "'>Book this!</button> </div>"

                    // divContent = "<div class='products_results" + i + "'><p><b>" + parsedResponse.categories[i].display_name + "</b>";
                    // divContent += "<br/>Price/km: " + parsedResponse.categories[i].price_details.cost_per_distance;
                    // divContent += "<br/>Minimum fare: " + parsedResponse.products[i].price_details.minimum + "</p>";
                    // divContent += "<button type='button' class='booking' value='" + parsedResponse.products[i].product_id + "'>Book this!</button> </div>"
                    products.innerHTML += divContent;
                    //products.innerHTML += parsedResponse.products[i].product_id for booking;
                }


                var bookbutton = document.getElementsByClassName("booking");
                
                //alert(bookbutton.length); 
                // for(i=0; i<bookbutton.length; i++){                    
                //     //alert("Adding listener to " + bookbutton[i].value);
                //     //alert("Button #" + i + " " + bookbutton[i]);
                //     bookbutton[i].addEventListener("click", function() {
                //         alert("Booked!" + bookbutton[i].value);
                //     },false);
                // }

                bookbutton[0].addEventListener("click", bookCab, false);
                bookbutton[1].addEventListener("click", bookCab, false);
                bookbutton[2].addEventListener("click", bookCab, false);
                bookbutton[3].addEventListener("click", bookCab, false);

            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };
    
    // Send the request and set status
    xhr.send(JSON.stringify({"start_latitude":myLat,"start_longitude":myLong,"end_latitude":destLat,"end_longitude":destLong}));

}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    console.log("in popup.js page");
    statusDisplay = document.getElementById('status-display');
    products = document.getElementById('products');
    container = document.getElementById('container');
    // Handle the bookmark form submit event with our addBookmark function
    document.getElementById('bookCab').addEventListener('submit', bookCab);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // our onPageDetailsReceived function as the callback. This injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });

});
