import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

interface TVShowDetail {
  // Define the types for the TV show details
  id: Number
  title: String
  synopsis: String
  release_date: Date
  genre_ids: [Number]
  poster_path: String
  genres: String
  tmdbRating: Number
  trailerKey: String
  releaseDate: string
}

const TVShowDetailPage: React.FC = () => {
  const { id } = useParams()
  const [contentDetails, setContentDetails] = useState<TVShowDetail | null>(
    null,
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchContentDetails = async () => {
      try {
        const endpoint = `http://localhost:5050/tvshows/details/${id}`
        const response = await axios.get<TVShowDetail>(endpoint)
        setContentDetails(response.data)
      } catch (error) {
        console.error('Error fetching content details:', error)
        setError(error as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchContentDetails()
  }, [id])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error loading content details. Please try again later.</p>
  }

  if (!contentDetails) {
    return <p>No content details available.</p>
  }

  return (
    <>
      <div
        className="row justify-content-center "
        style={{ margin: 0, padding: 0 }}
      >
        <div className="col-lg-4 col-sm-12 col-md-6" style={{ padding: 0 }}>
          <div
            className="card d-flex flex-row"
            style={{
              height: '800px',
              border: '3px solid #32de84',
              borderRadius: '20px',
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${contentDetails.poster_path}`}
              alt={`${contentDetails.title} Poster`}
              style={{
                width: '100%',
                border: '3px solid #32de84',
                borderRadius: '20px',
              }}
            />
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 col-md-4" style={{ padding: 0 }}>
          <div
            className="card d-flex flex-row "
            style={{
              backgroundColor: 'black',
              color: 'white',
              height: '800px',
              border: '3px solid #32de84',
              borderRadius: '20px',
              paddingTop: '5%',
            }}
          >
            <div
              className="card-body"
              style={{ overflowY: 'auto', maxHeight: '800px' }}
            >
              <h5>{contentDetails.title}</h5>
              <hr />
              <h5> {contentDetails.synopsis}</h5>
              <hr />
              <h5>Genre: {contentDetails.genres}</h5>
              <hr />
              <h5>{contentDetails.releaseDate}</h5>
              <hr />
              <h5>Rating: {`${contentDetails.tmdbRating}`}</h5>
              <hr />
              <div
                className="trailer"
                style={{ textAlign: 'center', height: '' }}
              >
                {contentDetails.trailerKey && (
                  <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                      className="embed-responsive-item"
                      style={{ width: '90%', height: '220px' }}
                      src={`https://www.youtube.com/embed/${contentDetails.trailerKey}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TVShowDetailPage
