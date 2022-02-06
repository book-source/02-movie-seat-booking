const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie index and price
// 

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMoviedIndex", movieIndex);
  localStorage.setItem("selectedMoviedPrice", moviePrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // [...selectedSeats] converts NodeList to Array
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  // console.log(seatsIndex);

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;

  ticketPrice = +movieSelect.value;

  console.log(ticketPrice)
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  // console.log(selectedSeats);


  if (selectedSeats !== null && selectedSeats.length > 0) {

    seats.forEach((seat, index) => {
      // console.log(seat, index);
      if (selectedSeats.indexOf(index) !==null && selectedSeats.indexOf(index)  > -1) {
        seat.classList.add('selected');
      }
    })
  }

  const selectedMoviedIndex = localStorage.getItem('selectedMoviedIndex');

  if (selectedMoviedIndex !== null) {
    movieSelect.selectedIndex = selectedMoviedIndex;
  }


}



// Movie select event

movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

// Seat click event
container.addEventListener("click", function(event) {

  if (event.target.classList.contains('seat') && 
    !event.target.classList.contains('occupied')) {
    event.target.classList.toggle('selected');
  }

  updateSelectedCount();

})

// initial update
updateSelectedCount();



