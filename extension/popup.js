// This callback function is called when the content script has been 
// injected and returned its results
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('latitude').value = pageDetails.latitude; 
    document.getElementById('longitude').value = pageDetails.longitude;
    document.getElementById('myLat').value = pageDetails.myLat; 
    document.getElementById('myLong').value = pageDetails.myLong;
    myLat=pageDetails.myLat;
    myLong=pageDetails.myLong;

    // get cookie named logged_in for domain .uber.com
    chrome.cookies.getAll({"name": "logged_in", "domain": ".uber.com"},
        // callback function to be called when getAll() returns
        function(cookie) {
            // if cookie exists and it's value is true
            if ((cookie.length) && (!cookie[0].value.localeCompare("true"))) {    // localeCompare returns 0 when strings are equal
                //alert("logged in");
                var product_result=getProducts();
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

// Global reference to the status display SPAN
var statusDisplay = null;
var latitude;
var longitude;
var myLat;
var myLong;

// POST the data to the server using XMLHttpRequest
function bookCab() {
    // // Cancel the form submit
    // event.preventDefault();

    // // The URL to POST our data to
    // var postUrl = 'http://post-test.local.com';

    // // Set up an asynchronous AJAX POST request
    // var xhr = new XMLHttpRequest();
    // xhr.open('POST', postUrl, true);
    
    // // Prepare the data to be POSTed by URLEncoding each field's contents
    // var title = encodeURIComponent(document.getElementById('title').value);
    // var url = encodeURIComponent(document.getElementById('url').value);
    // var summary = encodeURIComponent(document.getElementById('summary').value);
    // var tags = encodeURIComponent(document.getElementById('tags').value);
    
    // var params = 'title=' + title + 
    //              '&url=' + url + 
    //              '&summary=' + summary +
    //              '&tags=' + tags;
    
    // // Replace any instances of the URLEncoded space char with +
    // params = params.replace(/%20/g, '+');

    // // Set correct header for form data 
    // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // // Handle request state change events
    // xhr.onreadystatechange = function() { 
    //     // If the request completed
    //     if (xhr.readyState == 4) {
    //         statusDisplay.innerHTML = '';
    //         if (xhr.status == 200) {
    //             // If it was a success, close the popup after a short delay
    //             statusDisplay.innerHTML = 'Saved!';
    //             window.setTimeout(window.close, 1000);
    //         } else {
    //             // Show what went wrong
    //             statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
    //         }
    //     }
    // };

    // // Send the request and set status
    // xhr.send(params);
    //statusDisplay.innerHTML = 'Saving...';
}

function getProducts(){
    var postUrl = 'http://localhost:7000/products';
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

                for(i=0;i < parsedResponse.products.length; i++)
                {

                    //<button id='booking' type='button' value='abcdef'>Book this!</button> </div>
                    divContent = "<div class='products_results'><p><b>" + parsedResponse.products[i].display_name + "</b>";
                    divContent += "<br/>Price/km: " + parsedResponse.products[i].price_details.cost_per_distance;
                    divContent += "<br/>Minimum fare: " + parsedResponse.products[i].price_details.minimum + "</p>";
                    divContent += "<button type='button' class='booking' value='" + parsedResponse.products[i].product_id + "'>Book this!</button> </div>"
                    products.innerHTML += divContent;
                    //products.innerHTML += parsedResponse.products[i].product_id for booking;
                }


                var bookbutton = document.getElementsByClassName("booking");
                //alert(bookbutton.length);
                for(i=0; i<bookbutton.length; i++){                    
                    //alert("Adding listener to " + bookbutton[i].value);
                    //alert("Button #" + i + " " + bookbutton[i]);
                    bookbutton[i].addEventListener("click", function() {
                        alert("Booked!" + bookbutton[i].value);
                    });
                }


            } else {
                // Show what went wrong
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(JSON.stringify({"start_latitude":12.957067,"start_longitude":77.699449}));

}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    // Cache a reference to the status display SPAN
    console.log("in popup.js page");
    statusDisplay = document.getElementById('status-display');
    products = document.getElementById('products');
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
