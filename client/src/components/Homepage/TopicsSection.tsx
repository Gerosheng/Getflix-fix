import React from 'react'
import './TopicSection.css'
import './TopicsSection.css'
const TopicsSection: React.FC = () => {
  return (
    <section className="topics-section section-padding pb-0" id="section_3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="section-title-wrap mb-5">
            
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="images/comedy2.avif"
                  className="custom-block-image img-fluid"
                  alt="Physician consulting his patient in a clinic"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                  <a href="listing-page.html"></a>
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="images/topics/repairman-doing-air-conditioner-service.jpg"
                  className="custom-block-image img-fluid"
                  alt="Repairman doing air conditioner service"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
             
                </h5>
               
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="images/spiderman.webp"
                  className="custom-block-image img-fluid"
                  alt="Woman practicing yoga at home"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <a href="detail-page.html" className="custom-block-image-wrap">
                <img
                  src="images/topics/delicious-meal-with-sambal-arrangement.jpg"
                  className="custom-block-image img-fluid"
                  alt="Delicious meal with sambal arrangement"
                />
              </a>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
               
                </h5>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopicsSection
