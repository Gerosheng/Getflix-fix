import React, { useEffect, useState } from 'react'
import axios from 'axios' // Import axios
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface Actor {
  name: string
  profile_path: string
  known_for_department: string
}

const TrendingPodcastSection: React.FC = () => {
  const [popularActors, setPopularActors] = useState<Actor[]>([])

  useEffect(() => {
    const fetchActors = async () => {
      try {
        const actorsResponse = await axios.get(
          'https://viewtopia.onrender.com/homepage/actors',
        )
        setPopularActors(actorsResponse.data)
      } catch (error) {
        console.error('Error fetching actors:', error)
      }
    }

    fetchActors()
  }, [])

  return (
    <section className="trending-podcast-section section-padding">
      <div className="container">
        <hr />{' '}
        <h1 style={{ textAlign: 'center', color: 'white' }}>
          Populars Actors{' '}
        </h1>
        <br />
        <div className="row">
          {popularActors.map((actor, index) => (
            <div className="col-lg-4 col-12 mb-4 mb-lg-0" key={index}>
              <div className="custom-block custom-block-full">
                <div className="custom-block-image-wrap">
                  <a href="detail-page.html">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      className="img-fluid"
                      alt={actor.name}
                    />
                  </a>
                </div>

                <div className="custom-block-info">
                  <h5 className="mb-2" style={{ color: 'black' }}>
                    {actor.name} <hr />
                    Known for {actor.known_for_department}
                  </h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingPodcastSection
