//Hamburger Script to open and close the Hamburger Menu in Mobile
function toggleDropdown(event) {
  event.preventDefault();
  const dropdownList = event.target.nextElementSibling;
  dropdownList.classList.toggle("open");
  const arrow = event.target.querySelector(".arrow");
  arrow.style.transform = dropdownList.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
}

const dropdownButtons = document.querySelectorAll(".dropdown-btn"); // Attach the toggleDropdown function to all dropdown buttons
dropdownButtons.forEach(button => {
  button.addEventListener("click", toggleDropdown);
});

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}



//Desktop Search Bar Script to target and move the typed text 30px to left inside search bar
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const typedText = searchInput.value;
  searchInput.setAttribute('style', `padding-left: ${typedText ? '30px' : '0'}`);
});



// Script for Section 2(BMW i4 Trims) to display 3 cars initially and by clicking on right button to move to next three cars 
const scrollableContainer = document.getElementById('scrollable-container');
const leftBtn = document.getElementById('scroll-left-btn');
const rightBtn = document.getElementById('scroll-right-btn');
const cars = document.querySelectorAll('.car');
const carsPerPage = 3;
let currentPage = 0;

function showCars(page) {
  cars.forEach((car, index) => {
    if (index >= page * carsPerPage && index < (page + 1) * carsPerPage) {
      car.style.display = 'block';
    } else {
      car.style.display = 'none';
    }
  });
}

function toggleButtonsVisibility() {
  const maxPage = Math.ceil(cars.length / carsPerPage) - 1;
  if (currentPage === 0) {
    leftBtn.style.visibility = 'hidden';
  } else {
    leftBtn.style.visibility = 'visible';
  }

  if (currentPage === maxPage) {
    rightBtn.style.visibility = 'hidden';
  } else {
    rightBtn.style.visibility = 'visible';
  }
}

function scroll(direction) {
  const containerWidth = scrollableContainer.offsetWidth;
  const maxPage = Math.ceil(cars.length / carsPerPage) - 1;

  if (direction === 'right' && currentPage < maxPage) {
    currentPage++;
    showCars(currentPage);
  } else if (direction === 'left' && currentPage > 0) {
    currentPage--;
    showCars(currentPage);
  }

  const scrollDistance = currentPage * containerWidth;
  scrollableContainer.scrollLeft = scrollDistance;

  toggleButtonsVisibility();
}

// Show the first set of cars on page load
showCars(currentPage);
toggleButtonsVisibility(); // Ensure correct initial visibility

leftBtn.addEventListener('click', () => scroll('left'));
rightBtn.addEventListener('click', () => scroll('right'));





//Script for opening search bar in mobile by clicking on search icon on mobile

const openButton = document.getElementById('openButtonmob'); // Get references to the button and the search bar container
const searchBarContainer = document.querySelector('.search-bar-containermob');

// Add a click event listener to the button
openButton.addEventListener('click', () => {
    // Toggle the height of the search bar container to expand/collapse it
    if (searchBarContainer.style.maxHeight === '0px' || searchBarContainer.style.maxHeight === '') {
        searchBarContainer.style.maxHeight = searchBarContainer.scrollHeight + 'px';
        searchBarContainer.classList.add('expandedmob');
    } else {
        searchBarContainer.style.maxHeight = '0px';
        searchBarContainer.classList.remove('expandedmob');
    }
});




// Function to capture the screenshot and trigger download using the heart symbol save icon
function saveAsJPG() {
  const container = document.getElementById('screenshotContainer');

  // Take the screenshot of the container using html2canvas library
  html2canvas(container).then(canvas => {
    // Convert the canvas to an image URL
    const imgData = canvas.toDataURL('image/jpeg');

    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.download = 'screenshot.jpg';
    link.href = imgData;
    
    // Trigger the download
    link.click();
  });
}
// Add a click event listener to the screenshot button
document.getElementById('screenshotButton').addEventListener('click', saveAsJPG);



// Sample data representing search results 
//(When typed in search bar in Desktop will display below results stored in searchResultsData) using below script
const searchResultsData = [
  "Acceleration", "Brakes", "Convertible", "Diesel", "Electric", "Fuel", 
  "Gasoline", "Hybrid", "Insurance", "Jeep", "Kilometers", "Luxury", "Mileage", "Navigation",
   "Off-road", "Performance", "Quality", "Reliable", "Safety", "Tire", "Used", "Vehicle", "Warranty", 
   "Xenon", "Year", "Zero-emission"
];

const searchInput1 = document.getElementById("searchInput");
const searchResultsContainer = document.getElementById("searchResults");

// Event listener to capture user input and trigger search
searchInput1.addEventListener("input", function() {
  const searchText = this.value.trim().toLowerCase();
  const filteredResults = searchResultsData.filter(result => {
    return result.toLowerCase().includes(searchText);
  });

  // Generate HTML for displaying search results
  const resultsHTML = filteredResults.map(result => `<div>${result}</div>`).join("");

  // Display search results or hide the container if no results found
  if (searchText.length > 0 && filteredResults.length > 0) {
    searchResultsContainer.innerHTML = resultsHTML;
    searchResultsContainer.style.maxHeight = "200px"; // Set the max height to show the results
  } else {
    searchResultsContainer.style.maxHeight = "0"; // Hide the results container
  }
});

// Hide search results when clicking outside the search bar
document.addEventListener("click", function(event) {
  if (!searchResultsContainer.contains(event.target) && event.target !== searchInput1) {
    searchResultsContainer.style.maxHeight = "0"; // Hide the results container
  }
});



//Script for Making phone call in Mobile using phone icon
function makeCall() {
  window.location.href = "tel:12374774";
}


//Microphone Script to listen to our voice
const micButton = document.getElementById('micButton');
const resultContainer = document.getElementById('resultContainer');
const resultText = document.getElementById('resultText');
const closeButton = document.getElementById('closeButton');
let recognition;

// Check if the browser supports speech recognition
if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
        resultText.textContent = 'Listening...';
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error occurred:', event.error);
        resultText.textContent = 'Error occurred during speech recognition. Please try again.';
    };

    recognition.onresult = (event) => {
        const result = event.results[event.results.length - 1][0].transcript;
        resultText.textContent = result;
        closeButton.style.display = 'inline-block';
        resultContainer.classList.add('show');
    };

    micButton.addEventListener('click', () => {
        if (!resultContainer.classList.contains('show')) {
            recognition.start();
            resultText.textContent = 'Listening...';
            closeButton.style.display = 'none';
            resultContainer.classList.add('show');
        } else {
            recognition.stop();
            resultText.textContent = 'Speak Something';
            closeButton.style.display = 'none';
            resultContainer.classList.remove('show');
        }
    });

    closeButton.addEventListener('click', () => {
        recognition.stop();
        resultText.textContent = 'Speak Something';
        closeButton.style.display = 'none';
        resultContainer.classList.remove('show');
    });
} else {
    resultText.textContent = 'Speech recognition is not supported in this browser.';
}
