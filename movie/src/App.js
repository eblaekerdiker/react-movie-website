import React, { useState } from "react";
import {useEffect} from "react";
import MovieCard from "./MovieCard";

import './App.css';
import SearchIcon  from './search.svg'

// f3bcd3e4 

const API_URL = 'http://www.omdbapi.com?apikey=f3bcd3e4';

const movie1 = {
    "Poster": "https://m.media-amazon.com/images/M/MV5BN2FkMTRkNTUtYTI0NC00ZjI4LWI5MzUtMDFmOGY0NmU2OGY1XkEyXkFqcGc@._V1_SX300.jpg",
    "Title": "Shrek",
    "Type": "movie",
    "Year": "2001",
    "imdbID": "tt0126029"
}

const App = () => {
    const [movies, setMovies] = useState();
    const [searchTerm, setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        
        setMovies(data.Search);
    }
 
    useEffect(() => {
        searchMovies('Shrek');
    }, []);

    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input 
                placeholder="Search for movies"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard key={movie.imdbID} movie={movie}/>
                        ))}
                    </div>
                    ) : (
                        <div className="empty"> 
                            <h2>No movies found</h2>
                        </div>
                    )}
        </div>
    );
}

export default App;