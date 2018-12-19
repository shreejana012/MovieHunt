import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovie] = useState([]);

  const searchMovies = () => {
    const API_URL = `http://www.omdbapi.com/?i=tt3896198&apikey=9973fd8b&s=${searchQuery}`
    axios.get(API_URL)
    .then(function (response) {
      // handle success
      setMovie(response.data.Search)
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    return movies;
  };

  const handleMovieInput = e => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `${searchQuery}`;
  });

  return (
    <div>
      <h3> Search Movies </h3>
      <input
        type="text"
        onChange={handleMovieInput}
        value={searchQuery}
        placeholder="Search something"
      />
      <button onClick={searchMovies}> Search </button>
      {movies.map(function(m, i){
        return <li key={i}>
            {m.Title}<br />
            <img src = {m.Poster} /><br />
            {m.Type}<br />
            {m.Year}<br />
            {m.imdbID}
          </li>
        })
      }
    </div>
  );
};

export default App;