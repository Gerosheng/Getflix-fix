import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Movies.css' // Add your own CSS file for styling

interface Movie {
  id: number
  title: string
  overview: string
  releaseDate: string
  genres: string
  tmdbRating: number
  trailerKey: string | null
  poster_path: string
}

const Movies: React.FC = () => {
  const [latestMovies, setLatestMovies] = useState<Movie[]>([])
  const [popularMovies, setPopularMovies] = useState<Movie[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await axios.get(
          'http://localhost:5050/movies/latest',
        )
        setLatestMovies(latestResponse.data)

        const popularResponse = await axios.get(
          'http://localhost:5050/movies/popular',
        )
        setPopularMovies(popularResponse.data)

        const upcomingResponse = await axios.get(
          'http://localhost:5050/movies/upcoming',
        )
        setUpcomingMovies(upcomingResponse.data)
      } catch (error) {
        console.error('Error fetching movies:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleMovieClick = (id: number) => {
    const isMovie = true
    const detailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`
    window.location.href = detailPageRoute
  }

  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <div
        key={movie.poster_path}
        className="movie-card"
        onClick={() => handleMovieClick(movie.id)}
      >
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        </Link>
      </div>
    ))
  }

  return (
    <div className="movies-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="category-container">
            <h2 className="category-title">Upcoming Movies</h2>
            <div className="movies-container-horizontal">
              {renderMovies(upcomingMovies)}
            </div>
          </div>

          <div className="category-container">
            <h2 className="category-title">Latest Movies</h2>
            <div className="movies-container-horizontal">
              {renderMovies(latestMovies)}
            </div>
          </div>

          <div className="category-container">
            <h2 className="category-title">Popular Movies</h2>
            <div className="movies-container-horizontal">
              {renderMovies(popularMovies)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Movies
