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
    var moveListTemplate = ""; //inizializálás
    for(var movie of movieResponse.Search) {
        moveListTemplate = moveListTemplate +  `
        <li>
        <div class="poster-wrap">
            <a>
                <img src="${movie.Poster}" class="movie-poster"/>
            </a>
            </div>
            <p data-imbid="${movie.imdbID}" class="single-movie-btn">
                <span class="movie-title">
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
}