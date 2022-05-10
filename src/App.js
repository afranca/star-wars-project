import React, {useState, useEffect, useCallback} from 'react';
import AddMovie from './components/AddMovie';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () =>{
    setIsLoading(true);
    setError(null);

    try{
      const response = await fetch('https://star-wars-react-http-default-rtdb.europe-west1.firebasedatabase.app/movies.json');
      if(!response.ok){
        throw new Error('Something went wrong: '+response.status);
      }
      const data = await response.json();
      
      const transformedMovies = data.results.map( movieData =>{
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date
        }
      });
      setMovies(transformedMovies);
    } catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }

  let content = <p>Found no movies</p>

  if (movies.length > 0){
    content = <p><MoviesList movies={movies}/></p>;
  }
  if (error){
    content = <p>{error}</p>;
  }  
  if (isLoading){
    content = <p>Loading ...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>      
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
