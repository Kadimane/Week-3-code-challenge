
//loads all the DOM manipulation carried out by javascript
document.addEventListener("DOMContentLoaded", () => {
    getMovies();
    document.querySelector("#subtitle").textContent = "BUY MOVIES"

    //the next line singles out the element with the #buy-ticket id and adds an event listener to a click which when listened to calls on the buyTicket function
    document.querySelector("#buy-ticket").addEventListener("click", buyTicket);
});


function getMovies() {
    //a GET request to the server to get the movie information is called
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(movies => {
        movies.forEach(movie => {renderMovies(movie)})
        document.querySelector("#id1").dispatchEvent(new Event("click"));
    })
}

//the following functions displays a list of all movies on the page while adding a click event listeners to each one of them
function renderMovies(movie) {
    //an li element is created on the DOM and stored in the li variable 
    const li = document.createElement("li");

    //movie titles from the information from the server are loaded into the element to make a list
    li.textContent = `${movie.title}`;

    //the next line equats the id of each li element to a combination of id+the movies id in the server i.e id1,id2
    li.id = "id" + movie.id;

    // the ul element with the #films id is singled out and referenced with the ul variable in javascript
    const ul = document.querySelector("#films");

    //the list of movies is added as a child of the ul element in the previous line
    ul.appendChild(li);

    //event listeners are then added to every li element created
    li.addEventListener("click", () => {movieClick(movie)})
}

//the following functions dictates what happens when a user clicks on a movie
function movieClick(movie) {
    //the img element with the id of poster is referenced with the poster variable
    const poster = document.querySelector("img#poster")

    //javascript links the source of the poster images to the server's storage  
    poster.src = movie.poster;

    //the alternative incase the images is absent is linked to the servers title
    poster.alt = movie.title;

    //the div with the #showing id is referenced with the info variable
    const info = document.querySelector("#showing");

    //the following sets of lines links each of the parent div's element with their respective data source in the server
    info.querySelector("#title").textContent = "Title: " + movie.title;
    info.querySelector("#runtime").textContent = "Runtime: " + movie.runtime+" minutes";
    info.querySelector("#film-info").textContent = "Movie description: " + movie.description;
    info.querySelector("#showtime").textContent = "Showtime: " + movie.showtime;
    info.querySelector("#ticket-num").textContent = movie.capacity - movie.tickets_sold ;
    
}

//this function runs the buy ticket functionality of the site. dictates what happens when the 'Buy ticket' button is clicked
function buyTicket() {
    //references the buy ticket button to the ticket variable
    const ticket = document.querySelector("#ticket-num");

    //convert the content of the ticket variable into an array singling out the first object of the array since it is a number and references this to the tickets variable
    const tickets = ticket.textContent.split(" ")[0];

    //the following if statement checks whether the tickets available is greater than zero and if so it deducts one ticket from the selected movie and prints out the number of the remaining tickets
    if (tickets > 0) {
        ticket.textContent = tickets - 1 + " remaining tickets";
    }

    //if there are no more tickets left it shows a pop up alert saying "no more tickets "
    else if (tickets == 0) {
        alert("No more tickets!");
    }
}



