import axios from 'axios'
import MovieModel from '../../models/moviemodel.mjs'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

export async function searchmovie(query) {
  try {
    let searchType
    if (!isNaN(query) && query.length === 4) {
      searchType = 'year'
    } else if (await isGenre(query)) {
      searchType = 'genre'
    } else {
      searchType = 'normal'
    }

    let endpoint
    if (searchType === 'year') {
      endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${query}`
    } else if (searchType === 'genre') {
      const genreId = await getGenreId(query)
      endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    } else {
      endpoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    }

    const response = await axios.get(endpoint)
    const moviesData = response.data.results

    await MovieModel.deleteMany({ searched: true })
    await MovieModel.insertMany(
      moviesData.map((movie) => ({ ...movie, searched: true })),
    )

    return moviesData
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for movies or Tv Shows')
  }
}

async function isGenre(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
    )
    const genres = response.data.genres.map((genre) => genre.name.toLowerCase())
    return genres.includes(query.toLowerCase())
  } catch (error) {
    console.error(error)
    return false
  }
}

async function getGenreId(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`,
    )
    const genre = response.data.genres.find(
      (genre) => genre.name.toLowerCase() === query.toLowerCase(),
    )
    return genre ? genre.id : null
  } catch (error) {
    console.error(error)
    return null
  }
}
