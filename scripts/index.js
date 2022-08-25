// This variable is a function created to request Fullscreen from the browsers web kit, this is to ensure that it will work on all different browsers, If the browser is not capable of utilizing the Fullscreen API the console will print the warning message out
var requestFullscreen = function (ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    consol.log("Fullscreen API is not supported.");
  }
};
// This variable is a function created to exit Fullscreen from the browsers web kit, this is to ensure that it will work on all different browsers, If the browser is not capable of utilizing the Fullscreen API the console will print the warning message out
var exitFullscreen = function () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.MsExitFullscreen) {
    document.msExitFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};
// Ties the button element Id's to variables allowing us to easily call them in our functions
const fsDocButton = document.getElementById ("fsDocButton");
const fsExitDocButton = document.getElementById("fsExitButton");
const submitBtn = document.getElementById("submitButton1");
// uses the requestFullscreen function we created earlier, and have it trigger upon clicking the fsDocButton using an event listener
fsDocButton.addEventListener('click', function(e) {
  e.preventDefault();
  requestFullscreen(document.documentElement);
});
// uses the exitFullscreen function we created earlier and have it trigger upon clicking the fsExitDocButton using an event listener
fsExitDocButton.addEventListener('click', function(e) {
  e.preventDefault();
  exitFullscreen();
});

// creates a variable named req that will run a new XMLHttpRequest
const req = new XMLHttpRequest();
// creates a variable that will hold the url for the APOD API
const url = "https://api.nasa.gov/planetary/apod?api_key=";
// creates a variable that will hold the API key
const apiKey = "5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk";


// opens an API call using the URL and Key defined earlier
req.open("GET", url + apiKey);
req.send();

// sets the API call to start upon load
req.addEventListener("load", function(){
  // checks network status
	if(req.status == 200 && req.readyState == 4){
  	// JSON response parse/elements tied to parse
    var response = JSON.parse(req.responseText);
    document.getElementById("title").textContent = response.title;
    document.getElementById("date").textContent = response.date;
    document.getElementById("pic").src = response.hdurl;
    document.getElementById("explanation").textContent = response.explanation;
  }
});


document.addEventListener('DOMContentLoaded', submitButtonsReady);
function submitButtonsReady(){
  document.getElementById('dateInput').addEventListener('click', function(event){
    const request = new XMLHttpRequest();
    //Initialize roverName variable until checked
    const roverName = "curiosity";
    // Date input from user
    let date = document.getElementById('dateValue').value;
    //AJAX ROVER API request
    request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=' + date + '&api_key=' + apiKey, true);
    request.addEventListener('load',function(){
      if(request.status >= 200 && request.status < 400){
        const response = JSON.parse(request.responseText);
        console.log(response);

        //Display content to user
        document.getElementById('imageStatus').textContent = 'Found';
        document.getElementById('imageID').src = response.photos[0].img_src;
        document.getElementById('roverCaption').textContent = response.photos[0].rover.name;
        document.getElementById('landingDate').textContent = response.photos[0].rover.landing_date;
        document.getElementById('endingDate').textContent = response.photos[0].rover.max_date;
      } else 
      { 
        console.log("Error in network request: " + request.statusText);
      }});
    //Prompts user to check syntax until proper response comes through.
    document.getElementById('imageStatus').textContent = 'Please try a different date or check your syntax!';
    request.send(null);
    event.preventDefault();
  });
}