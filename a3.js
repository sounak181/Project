let movies = [];

document.getElementById("language-select").addEventListener("change", filterMovies);
document.getElementById("genre-select").addEventListener("change", filterMovies);

document.getElementById("add-movie-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addMovie();
    saveToLocalStorage();
});
// Function to display movies
function displayMovies(movies) {
    const movieList = document.getElementById("movie-list");
    movieList.innerHTML = "";
    movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    movies.forEach((movie, index) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        const titleElement = document.createElement("h2");
        titleElement.textContent = movie.title;
        movieCard.appendChild(titleElement);

        const releaseDateElement = document.createElement("p");
        releaseDateElement.textContent = "Release Date: " + movie.releaseDate;
        movieCard.appendChild(releaseDateElement);

        const genreElement = document.createElement("p");
        genreElement.textContent = "Genre: " + movie.genre;
        movieCard.appendChild(genreElement);

        const languageElement = document.createElement("p");
        languageElement.textContent = "Language: " + movie.language;
        movieCard.appendChild(languageElement);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editMovie(index));
        movieCard.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteMovie(index));
        movieCard.appendChild(deleteButton);

        movieList.appendChild(movieCard);
    });
}
function saveToLocalStorage() {
    localStorage.setItem("movies", JSON.stringify(movies));
}

// Function to load movies from Local Storage
function loadFromLocalStorage() {
    const storedMovies = localStorage.getItem("movies");
    if (storedMovies) {
        movies = JSON.parse(storedMovies);
        displayMovies(movies);
    }
}
// Function to filter movies by language and genre
function filterMovies() {
    const languageSelect = document.getElementById("language-select");
    const genreSelect = document.getElementById("genre-select");
    const selectedLanguage = languageSelect.value;
    const selectedGenre = genreSelect.value;

    let filteredMovies = movies;

    if (selectedLanguage !== "All") {
        filteredMovies = filteredMovies.filter(movie => movie.language === selectedLanguage);
    }

    if (selectedGenre !== "All") {
        filteredMovies = filteredMovies.filter(movie => movie.genre === selectedGenre);
    }

    displayMovies(filteredMovies);
}

// Function to add a new movie
function addMovie() {
    const titleInput = document.getElementById("title-input");
    const releaseDateInput = document.getElementById("release-date-input");
    const genreInput = document.getElementById("genre-input");
    const languageInput = document.getElementById("language-input");
    const keyInput = document.getElementById("key-input");
   
    const key = keyInput.value.trim();
    const authorizedKeys = ["s18"]; // Replace "your-authorized-key" with your actual key

    if (!authorizedKeys.includes(key)) {
        alert("Invalid authorization key! You are not authorized to add movies.");
        return;
    }
    const newMovie = {
        title: titleInput.value,
        releaseDate: releaseDateInput.value,
        genre: genreInput.value,
        language: languageInput.value
    };

    movies.push(newMovie);

    populateDropdowns();
    saveToLocalStorage();
    displayMovies(movies);

    // Clear input fields
    titleInput.value = "";
    releaseDateInput.value = "";
    genreInput.value = "";
    languageInput.value = "";
}

// Function to edit a movie
function editMovie(index) {
    const movie = movies[index];

    const updatedTitle = prompt("Enter new movie title:", movie.title);
    const updatedReleaseDate = prompt("Enter new release date (YYYY-MM-DD):", movie.releaseDate);
    const updatedGenre = prompt("Enter new genre:", movie.genre);
    const updatedLanguage = prompt("Enter new language:", movie.language);

    if (updatedTitle && updatedReleaseDate && updatedGenre && updatedLanguage) {
        movies[index] = {
            title: updatedTitle,
            releaseDate: updatedReleaseDate,
            genre: updatedGenre,
            language: updatedLanguage
        };
        saveToLocalStorage();
        displayMovies(movies);
    }
}

// Function to delete a movie
function deleteMovie(index) {
    if (confirm("Are you sure you want to delete this movie?")) {
        movies.splice(index, 1);
        saveToLocalStorage();
        displayMovies(movies);
    }
}


function populateDropdowns() {
    const languageSelect = document.getElementById("language-select");
    const genreSelect = document.getElementById("genre-select");

    // Retrieve movies from Local Storage
    const storedMovies = localStorage.getItem("movies");

    if (storedMovies) {
        const movies = JSON.parse(storedMovies);

        // Extract unique languages
        const languages = [...new Set(movies.map(movie => movie.language))];
        languages.unshift("All");

        // Populate language dropdown
        languageSelect.innerHTML = "";
        languages.forEach(language => {
            const option = document.createElement("option");
            option.value = language;
            option.textContent = language;
            languageSelect.appendChild(option);
        });

        // Extract unique genres
        const genres = [...new Set(movies.map(movie => movie.genre))];
        genres.unshift("All");

        // Populate genre dropdown
        genreSelect.innerHTML = "";
        genres.forEach(genre => {
            const option = document.createElement("option");
            option.value = genre;
            option.textContent = genre;
            genreSelect.appendChild(option);
        });
    }
}

// Sort movies by release date in descending order
movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

// Populate dropdowns and display all movies initially
populateDropdowns();
displayMovies(movies);

// Event listeners for filtering and adding a movie


// Load movies from Local Storage on page load
loadFromLocalStorage();