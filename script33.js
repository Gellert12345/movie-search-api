//async fuctino annyival tud többet hogy lehet adni neki wait-et és minden benne promise!!

document.getElementById("search").onsubmit = async function(event) {
    event.preventDefault();
    var searchWord = event.target.elements.search.value;
    var year = event.target.elements.year.value;
    if(!searchWord) {
        alert("kereső motor kitöltése kötelző");
        return; // vissza térjen a ciklus eléjre hogy ne fusson hibábara!!
    }
    var url = `https://www.omdbapi.com/?s=${encodeURI(searchWord)}&y=${encodeURI(year)}&apiKey=9606ae0f`;
    var response = await fetch(url); //addig nem megyunk tovabb amig az api nem válaszol
    if(!response.ok) {
        alert("keresés sikertelen lett");
        return;
    }
    //json tartalom kiszedés
    var movieResponse = await response.json();
    //hiba kezelő rendszer:

    if(!movieResponse.Search) {
        alert("Keresés sikertelen");
        return
    }
    renderMovieList(movieResponse.Search);
}
function renderMovieList(movies) {
    var moveListTemplate = ""; //inizializálás
    for(var movie of movies) {
        moveListTemplate = moveListTemplate +  `
        <li>
        <div class="poster-wrap">
            <a>
                <img src="${movie.Poster}" class="movie-poster"/>
            </a>
            </div>
            <p class="single-movie-btn">
                <span class="movie-title" data-imbid="${movie.imdbID}">
                    ${movie.Title}
                </span>
            </p>
            <span class="movie-year">
                ${movie.Year}
            </span>
        </li>
                
        `
    }
    document.getElementById("movies").innerHTML = moveListTemplate
    var movieTitles = document.querySelectorAll(".single-movie-btn")
    for(var movieTitle of movieTitles) {
        movieTitle.onclick = function(event) {
            var url = `https://www.omdbapi.com/?i=${event.target.parentElement.dataset.imdbID}&apiKey=9606ae0f`
            fetch(url) //promise lesz belőle
            .then(function(response){
                return response.json();
            })
            .then(function(singleMovie){ // singleMovie=== result
                document.getElementById("movie-description").innerHTML = ` //log-ba van leirva az api kulcs adatinak az azonsítója pl title,director stb
                <h1>${singleMovie.Title}</h1> 
                <p>${singleMovie.Plot}</p>
                `
            })
        }
    }
}