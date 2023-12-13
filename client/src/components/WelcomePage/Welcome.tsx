import React from 'react'

import { Link } from 'react-router-dom'
import './Welcome.css'
const Welcome: React.FC = () => {
  return (
    <>
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={undefined}
        />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Sono:wght@200;300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <Link className="navbar-brand me-lg-5 me-0" to="/">
              <img
                src="https://www.vtaffiliates.com/wp-content/themes/vt/images/logo.gif?v=1"
                className="logo-image img-fluid"
                alt="templatemo pod talk"
              />
            </Link>

            <div id="navbarNav">
              <div className="ms-auto order-2">
              <Link to='/login'> <button> Log In</button>
                   </Link>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <section
        className="hero-section"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(https://atelierdalbion.com/wp-content/uploads/2019/12/Top-10-films-2019-1.jpg)',
          backgroundBlendMode: 'multiply',
        }}
      >
        <div
          style={{
            position: 'absolute',
           marginTop: '1%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
          }}
        >
          <h1
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            WITH VIEWTOPIA
          </h1>
          <h3
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
            Watch full seasons of exclusive streaming series, current-season
            episodes, movies, kids shows, and more.
          </h3>
        </div>
        <hr />
       <br /><br /><br /><br /><br />

        <div className="row">
          <div className="col-lg-6 col-12 mx-auto">
            <div className="text-center ">
              <div className="card-group">
                <div className="card">
                  <div className="content">
                    <div className="back">
                      <div className="back-content">
                        <img
                          src="https://i.pinimg.com/280x280_RS/30/56/a3/3056a3e4268a6ad965eb0aba67933800.jpg"
                          className="card-img-top"
                          alt="..."
                        />

                        <strong>Hover Me</strong>
                      </div>
                    </div>
                    <div className="front">
                      <div className="img">
                        <div className="circle"></div>
                        <div className="circle" id="right"></div>
                        <div className="circle" id="bottom"></div>
                      </div>
                      <div className="front-content">
                        <small className="badge">Basic</small>
                        <div className="description">
                          <div className="title">
                            <h6>
                              <strong>With Free basic option</strong>
                            </h6>
                          </div>
                          <h6>
                            Many Features for free
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="content">
                    <div className="back">
                      <div className="back-content">
                        <img
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYcDsoTN9SYYMuLIVoiPNb1RaDLlvwT1HVCtoPumEjKARaUBEXznumMUX1mOL2pkG4vw&usqp=CAU"
                          className="card-img-top"
                          alt="..."
                        />

                        <strong>Hover Me</strong>
                      </div>
                    </div>
                    <div className="front">
                      <div className="img">
                        <div className="circle"></div>
                        <div className="circle" id="right"></div>
                        <div className="circle" id="bottom"></div>
                      </div>
                      <div className="front-content">
                        <small className="badge">Premium</small>
                        <div className="description">
                          <div className="title">
                            <h6 >
                              <strong>Premium option</strong>
                            </h6>
                          </div>
                          <h6>
                            MOST POPULAR : 30 DAYs FREE TRIAL
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <img
                    src="data:image/png;base64,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"
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                   <Link to='/signup'> <button> GET STARTED</button>
                   </Link>
                    <hr />
                    <h5 className="card-text">
                      A cinematic experience with the best picture and audio
                      quality.
                    </h5>
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
        
      </section>
<br />
      <div
          style={{
          
         
           
           textAlign:'center',
            width: '50%',
            marginLeft:'25%'
          }}
          >
            <hr />
      <h1
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
     Watch the way you want
Enjoy the world's greatest stories - anytime, anywhere.
          </h1>
          <br />
          <Link to='/signup'> <button> GET STARTED</button>
                   </Link>
          <hr />
          </div>
      <section className="topics-section section-padding pb-0" id="section_3">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="section-title-wrap mb-5">
            
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <Link to="/" className="custom-block-image-wrap">
                <img
                  src="images/comedy2.avif"
                  className="custom-block-image img-fluid"
                  alt="Physician consulting his patient in a clinic"
                />
              </Link>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                  <Link to="/"></Link>
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <Link to="/" className="custom-block-image-wrap">
                <img
                  src="images/avatar2.jpg"
                  className="custom-block-image img-fluid"
                  alt="Repairman doing air conditioner service"
                />
              </Link>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
             
                </h5>
               
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
              <Link to="/" className="custom-block-image-wrap">
                <img
                  src="images/spider1.jpeg"
                  className="custom-block-image img-fluid"
                  alt="Woman practicing yoga at home"
                />
              </Link>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
                
                </h5>
              
              </div>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div className="custom-block custom-block-overlay">
                
              <Link to="/" className="custom-block-image-wrap">
                <img
                  src="images/comedy.jpg"
                  className="custom-block-image img-fluid"
                  alt="Delicious meal with sambal arrangement"
                />
                
              </Link>

              <div className="custom-block-info custom-block-overlay-info">
                <h5 className="mb-1">
               
                </h5>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div
          style={{
          
         
           
           textAlign:'center',
            width: '50%',
            marginLeft:'25%'
          }}
          >
            <hr />
      <h1
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
Select Your Plan
<h3> No hidden fees, equipment rentals, or installation appointments.
Switch plans or cancel anytime.**</h3>
          </h1>
          <br />
          <Link to='/signup'> <button> Join Now</button>
                   </Link> 
          <hr />
          <br />
          </div>




         

  <div className="container ">
    
    <table >
      <thead className="thead-light">
        <tr>
          <th><h3>Options</h3></th>
          <th><h3>Basic</h3></th>
          <th><h3>Premium</h3></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><h5>Monthly price</h5></td>
          <td><h5>Free</h5></td>
          <td><h5>$9.99/mo.</h5></td>
        </tr>
        <hr />
        <tr>
          <td><h5>Streaming Library with tons of  episodes 
</h5></td>
          <td><span className="material-symbols-outlined">
done
</span></td>
          <td><span className="material-symbols-outlined">
done
</span></td>
        </tr>
        <hr />
        <tr>
          <td><h5>Most new episodes </h5></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
        <tr>
          <td><h5>Access to award-winning ViewTopia Originals</h5></td>
          <td><span className="material-symbols-outlined">
minimize
</span></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
        <tr>
          <td><h5>   Up to 3 user profiles</h5></td>
          <td>   <td><span className="material-symbols-outlined">
minimize
</span></td></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
        <tr>
          <td><h5>Watch on 2 different screens at the same time</h5></td>
          <td>   <td><span className="material-symbols-outlined">
minimize
</span></td></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
        <tr>
          <td><h5>No ads in streaming library</h5></td>
          <td>   <td><span className="material-symbols-outlined">
minimize
</span></td></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
        <tr>
          <td><h5>Download and watch</h5></td>
          <td>   <td><span className="material-symbols-outlined">
minimize
</span></td></td>
          <td> <td><span className="material-symbols-outlined">
done
</span></td></td>
        </tr>
        <hr />
      </tbody>
    </table>
  
  </div>

  <div
          style={{
          
         
           
           textAlign:'center',
            width: '50%',
            marginLeft:'25%'
          }}
          >
            <br /><br />
            <hr />
      <h1
            style={{
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              textAlign: 'center',
            }}
          >
Questions? Call 0700-700-22
          </h1>
        
          <hr />
          </div>


    </>
  )
}

export default Welcome
