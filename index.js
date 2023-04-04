function fetchMovies(){

    fetch("http://localhost:3000/films")
    .then(res =>res.json())
    .then(data =>{
        data.forEach(movie =>{listMovies(movie)})
        const firstMovie = document.querySelector("#id1")
        


    })

}