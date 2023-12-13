import React, { useState } from 'react'
import axios from 'axios'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

const SearchResultsSection = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
// change fetch route
  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`,
      )
      setResults(response.data.results)
      setError(null)
    } catch (error) {
      console.error(error)
      setError('Error searching for movies or TV shows')
    }
  }

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies or TV shows"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {results.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          <ul>
            {results.map((result) => (
              <li key={result.id}>{result.title || result.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default SearchResultsSection
