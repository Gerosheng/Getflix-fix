import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './carousel.css'

interface Movie {
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

  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <div key={movie.poster_path}>
        <p>{movie.title}</p>
        <img
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      </div>
    ))
  }

  const sliderSettings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    arrows: true,
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Latest Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(latestMovies)}</Slider>

          <h2>Popular Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(popularMovies)}</Slider>

          <h2>Upcoming Movies</h2>
          <Slider {...sliderSettings}>{renderMovies(upcomingMovies)}</Slider>
        </>
      )}
    </div>
  )
}

export default Movies
