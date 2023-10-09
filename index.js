// Fetch a list of films from a local server running on http://localhost:3000/films
fetch('http://localhost:3000/films')
  .then(res => res.json()) // Convert the response to JSON
  .then(data => {
    console.log(data); // Log the data to the console
    const movies = document.getElementById("movie-list"); // Get the element with id "movie-list"

    // Iterate over the list of films and create a list item for each film
    data.forEach((film) => {
      const movieList = document.createElement("li"); // Create a new list item element
      movieList.textContent = film.title; // Set the text content of the list item to the film title

      // Add a click event listener to the list item to fetch movie details when clicked
      movieList.addEventListener("click", () => {
        fetchMovieDetails(film.id); // Call the fetchMovieDetails function with the film id
      });

      movies.appendChild(movieList); // Append the list item to the "movie-list" element
    });
  });

// Function to fetch and display movie details for a given movie ID
function fetchMovieDetails(movieId) {
  // Fetch movie details for the specified movie ID from the server
  fetch(`http://localhost:3000/films/${movieId}`)
    .then(res => res.json()) // Convert the response to JSON
    .then(movie => {
      // Destructure movie properties
      const { title, poster, runtime, capacity, showtime, tickets_sold, description } = movie;

      // Calculate available tickets by subtracting tickets_sold from capacity
      const availabeTickets = capacity - tickets_sold;

      // Create a HTML string for displaying movie details
      const movieDetails = `
        <div class="myDiv">
          <h1 id="header1">${title}</h1>
          <img id="poster1" src="${poster}" alt="${title}">
          <p id="runtime1">Runtime: ${runtime}</p>
          <p id="showtime1">Showtime: ${showtime}</p>
          <p id="available1">Available Tickets: ${availabeTickets}</p>
          <p id="description1">Description: ${description}</p>
          <button id="ticketButton">Buy Tickets</button>
        </div>
      `;

      // Get the "movieDetails" element and set its HTML content to the movieDetails string
      const movieContainer = document.getElementById("movieDetails");
      movieContainer.innerHTML = movieDetails;
    });
}
