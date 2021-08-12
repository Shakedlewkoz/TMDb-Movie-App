import React, {Component, useEffect, useState} from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';
import './App.js';

var myApi = 'aae712b84d3b57a35cbaf2e4ae652d4c';

function MovieDetails({ match }) {
    useEffect(() => {
        fetchMovie();
        console.log(match);
    },[]);
    const [movie, setMovie] = useState({});
    const fetchMovie = async () => {
        const fetchMovie = await fetch("https://api.themoviedb.org/3/movie/"+match.params.id.toString()+"?api_key="+myApi+"&language=en-US");
        const movie = await fetchMovie.json();
        setMovie(movie);
        console.log(movie);
    };
    return (
            <div className="moreDetails">
                <img src={'https://image.tmdb.org/t/p/w500'+movie.backdrop_path} alt="loading"></img>
                <h3 className="sectitle">{movie.title}</h3>
                <h3 className="overview">{movie.overview}</h3>
                <h3 className="otherDetails">vote average: {movie.vote_average}</h3>
                <h3 className="otherDetails">release date: {movie.release_date}</h3>
                <Route path={"/"} />
                <div className="return">
                    <Link to="/"> <p>close</p></Link>
                </div>
            </div>
    )
}


export default MovieDetails;