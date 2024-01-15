import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import SearchBar from './SearchBar'
import SearchResultsSection from '../Homepage/SearchResultsSection'
const Navbar: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('homepage')
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handlePageChange = (newPage: string) => {
    setCurrentPage(newPage)
  }

  const handleSearch = (results: any[]) => {
    setSearchResults(results)
  }
  return (
    <>
      <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={undefined}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&family=Sono:wght@200;300;400;500;700&display=swap"
          rel="stylesheet"
        />

        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <a className="navbar-brand me-lg-5 me-0" href="/">
              <img
                src="https://www.vtaffiliates.com/wp-content/themes/vt/images/logo.gif?v=1"
                className="logo-image img-fluid"
                alt="templatemo pod talk"
              />
            </a>
            <SearchBar
              onSearchResults={handleSearch}
              currentPage={currentPage}
              apiBaseUrl={'http://localhost:5050'} // Replace with your actual API base URL
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-lg-auto">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="./Homepage"
                    style={{ color: 'white' }}
                    onClick={() => handlePageChange('homepage')}
                  >
                    HomePage
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="./movies"
                    style={{ color: 'white' }}
                    onClick={() => handlePageChange('movies')}
                  >
                    Movies
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    to="./series"
                    style={{ color: 'white' }}
                    onClick={() => handlePageChange('series')}
                  >
                    Series
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Contact">
                    Contact
                  </Link>
                </li>

                <div className="ms-4">
                  <Link
                    to="/Login"
                    className="btn custom-btn custom-border-btn smoothscroll"
                  >
                    Login
                  </Link>
                </div>
                <div className="ms-4">
                  <Link
                    to="/Profile"
                    className="btn custom-btn custom-border-btn smoothscroll"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Link>
                </div>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <SearchResultsSection
        results={searchResults}
        searchMade={true}
        currentPage={''}
        onSearchResultClick={function (_id: number, _type: string): void {
          throw new Error('Function not implemented.')
        }}
      />
    </>
  )
}
export default Navbar
