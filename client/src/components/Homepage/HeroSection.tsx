import React from 'react'
import './HeroSection.css'
const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="text-center mb-5 pb-2">
              
              <div className="card-group">
  
  <div className="card">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-XIEC56urExStGBK-ifnva0wswRw8uc9G7A&usqp=CAU" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">FREEMIUM</h5>
      <p className="card-text">
       
      </p>
      <p className="card-text">
        <small className="text-body-secondary"></small>
      </p>
    </div>
  </div>
  <div className="card">
    <img src="https://cdn.pixabay.com/photo/2023/11/10/16/05/premium-8379664_1280.png" className="card-img-top" alt="..." />
    <div className="card-body">
      <h5 className="card-title">PREMIUM</h5>
      <p className="card-text">
      A cinematic experience with the best picture and audio quality.
      </p>
      <p className="card-text">
        <small className="text-body-secondary"></small>
      </p>
    </div>
  </div>
</div>

            </div>

            <div className="owl-carousel owl-theme"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
