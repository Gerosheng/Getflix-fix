import React from 'react'
import { Link } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface SearchResult {
  id: number
  title: string
  poster_path: string
  type: string // Add a type property to distinguish between movies and tv shows
}

interface SearchResultsSectionProps {
  results: SearchResult[]
  searchMade: boolean
  currentPage: string
  onSearchResultClick: (id: number, type: string) => void // Update the callback signature
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({
  results,
  searchMade,
  currentPage,
  onSearchResultClick, // Update the prop
}) => {
  console.log('Results:', results)
  console.log('Search Made:', searchMade)
  console.log('Current Page:', currentPage)

  // If currentPage is not defined, display all results
  const filteredResults = currentPage
    ? results.filter((result) => result.type === currentPage)
    : results

  console.log('Filtered Results:', filteredResults)

  return (
    <div className="search-results-section">
      {filteredResults.length > 0 ? (
        <Carousel>
          {results
            .filter((result) => {
              console.log('Result Type:', result.type)
              return result.type === currentPage
            })
            .map((result, index) => (
              <div key={index}>
                <Link
                  to={`/${result.type === 'movie' ? 'movie' : 'tvshow'}/${
                    result.id
                  }`}
                  onClick={() => onSearchResultClick(result.id, result.type)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                    alt={`${result.title} Poster`}
                    style={{
                      width: '80%',
                      height: 'auto',
                      border: '3px solid #32de84',
                      borderRadius: '20px',
                      marginLeft: '10%',
                    }}
                  />
                  <p>{result.title}</p>
                </Link>
              </div>
            ))}
        </Carousel>
      ) : searchMade ? (
        <p>No results found.</p>
      ) : null}
    </div>
  )
}

export default SearchResultsSection
