import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './Series.css' // Add your own CSS file for styling

interface TvShow {
  id: number
  title: string
  overview: string
  releaseYear: string
  genres: string
  tmdbRating: number
  trailerKey: string | null
  poster_path: string
  type: string
}

const TvShows: React.FC = () => {
  const [toprated, setToprated] = useState<TvShow[]>([])
  const [popular, setPopular] = useState<TvShow[]>([])
  const [airingtoday, setAiringToday] = useState<TvShow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topratedResponse = await axios.get(
          'http://localhost:5050/tvshows/toprated',
        )
        setToprated(topratedResponse.data)

        const popularResponse = await axios.get(
          'http://localhost:5050/tvshows/popular',
        )
        setPopular(popularResponse.data)

        const airingtodayResponse = await axios.get(
          'http://localhost:5050/tvshows/airingtoday',
        )
        setAiringToday(airingtodayResponse.data)
      } catch (error) {
        console.error('Error fetching TV shows:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTvShowClick = (id: number) => {
    const isMovie = false
    const TvDetailPageRoute = isMovie ? `/movie/${id}` : `/tvshow/${id}`
    window.location.href = TvDetailPageRoute
  }

  const renderTvShows = (tvshows: TvShow[]) => {
    return tvshows.map((tvshow) => (
      <div
        key={tvshow.poster_path}
        className="serie-card"
        onClick={() => handleTvShowClick(tvshow.id)}
      >
        <Link to={`/tvshow/${tvshow.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${tvshow.poster_path}`}
            alt={`${tvshow.title} Poster`}
          />
        </Link>
      </div>
    ))
  }

  return (
    <div className="series-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="categosery-container">
            <h2 className="categosery-title">Top Rated TV Shows</h2>
            <div className="series-container-horizontal">
              {renderTvShows(toprated)}
            </div>
          </div>

          <hr className="divide" />

          <div className="categosery-container">
            <h2 className="categosery-title"> Popular TV Shows </h2>
            <div className="series-container-horizontal">
              {renderTvShows(popular)}
            </div>
          </div>

          <hr className="divide" />

          <div className="categosery-container">
            <h2 className="categosery-title"> Airing Today </h2>
            <div className="series-container-horizontal">
              {renderTvShows(airingtoday)}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default TvShows
