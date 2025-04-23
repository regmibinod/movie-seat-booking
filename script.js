const lg = console.log;
//Get reference to necessary DOM elemetns
const selectOption = document.querySelector("#selection-option");
const seatContiner = document.querySelectorAll("#seats");
const movieNameDisplayEl = document.querySelector(".movie-name");
const noOfTicketsDisplayEl = document.querySelector(".no-tickets");
const moviePricetDisplayEl = document.querySelector(".total-amount");
const allSeats = document.querySelectorAll(".seat");

// Calculates and updates movie summary of price, no of seats, total price etc
function calculateMoviePrice() {
  const moviePrice = +selectOption.value;
  const selectedSeatsEl = document.querySelectorAll(".selected");

  const noOfSeatsSelected = selectedSeatsEl.length;
  noOfTicketsDisplayEl.textContent = noOfSeatsSelected;
  const totalMoviePrice = noOfSeatsSelected * moviePrice;
  moviePricetDisplayEl.innerHTML = `$${totalMoviePrice.toFixed(2)}`;
  movieNameDisplayEl.textContent =
    selectOption[selectOption.selectedIndex].textContent;
}

// Attaches click events listiners to avaiable (empty and not reserved) seats
function selectMovie() {
  const allSeats = document.querySelectorAll(".seat:not(.reserved)");
  allSeats.forEach((seat) => {
    if (
      seat.classList.contains("empty") &&
      !seat.classList.contains("reserved")
    ) {
      seat.addEventListener("click", (e) => {
        e.target.classList.toggle("selected");
        saveTolocalStorage();
        calculateMoviePrice();
      });
    }
  });

  
}

// Initialize seat selection functionality
selectMovie();

// Recalculate movie summary when the selected movie is changed
selectOption.addEventListener("change", (e) => {
  const selectedMovieIndex = selectOption.selectedIndex;
  localStorage.setItem("selectedMovieIndex", selectedMovieIndex);
  calculateMoviePrice();
});

function saveTolocalStorage() {
  const selectedSeatsArray = [...document.querySelectorAll(".seat.selected")];
  const seatIndexs = selectedSeatsArray.map((seat) => {
    return [...allSeats].indexOf(seat);
  });

  localStorage.setItem("selectedSeatIndexs", JSON.stringify(seatIndexs));
}

// Restores previously selected seats and movie selection from local storage
function populateUI() {
    // Retrieve selected seat indices from localStorage and parse them into an array
  const selectedSeatsIndexArray = JSON.parse(
    localStorage.getItem("selectedSeatIndexs")
  );
// If there are any saved seats, loop through them and add the 'selected' class to restore UI state
  if (selectedSeatsIndexArray !== null && selectedSeatsIndexArray.length > 0) {
    selectedSeatsIndexArray.forEach((index) => {
      if (allSeats[index]) {
        allSeats[index].classList.add("selected");
      }
    });
  }
    // Get the previously selected movie index from localStorage
  const getSelectedMovieIndex = localStorage.getItem("selectedMovieIndex");


   // If a saved movie index exists, apply it to the select dropdown

if(getSelectedMovieIndex !== null){
  selectOption.selectedIndex = +getSelectedMovieIndex;
}
  // Recalculate and update the UI with the correct ticket count and price
  calculateMoviePrice();
}
// Call the function to apply the saved selections on page load
populateUI();
