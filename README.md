# Ola Now

This is a Chrome extension (and companion API proxy server) to book a cab quickly, when you are searching for something and come across a page with location cordinates embedded - think Foursquare or Zomato. 

This was developed at Ola's hackathon event, to promote their API which they are opening up for public use. A sandboxed version of the API was provided at the hackathon and is currently used in the code. When the production API is available, the code will be updated to use it.

All code is provided under an MIT License. This is a rough prototype built within time constraints, so if you have any suggestions for improvement, please open an issue and/or fix it and send a pull request!

### Workflow
* User clicks the extension button in Chrome to start the process of booking a cab.
* The extension prompts the user to login and grant privileges if using it for the first time. This authentication is done with oAuth2, and the extension and proxy server does not store username/password. Afterwards, it remembers the user’s account.
* The extension books a ride from your current location to the destination found on the page, and shows available cabs, fare estimates and other information in a nice, clean window. User can click the button next to any option to book it.
* Once booked, the driver’s information is shown, along with buttons to track and cancel the cab.
* You can close and reopen the window, and the extension will remember any active booking you have and display its information.
* Of course, this extension can book a cab from your current location without any cordinates too. In a hurry? The Ola website currently does not have a “Ride Now” functionality, so this can be used to get a cab immediately too.

#### Ok dude, but where's the Chrome extension?
This is a proof of concept, and does not actually work right now because of two reasons: the sandboxed API, and not having deployed the API proxy server anywhere. You can still enable developer mode in Chrome and load the unpacked extension.

Once we switch the extension to official Ola API, the API proxy server will be deployed somewhere (perhaps Heroku) and the extension will be built and uploaded to Chrome Web Store so that you can actually use it :)