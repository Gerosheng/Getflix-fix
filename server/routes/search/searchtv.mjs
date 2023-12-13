import axios from 'axios'
import TvShowModel from '../../models/tvmodel.mjs'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

export async function searchTv(query) {
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
      endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&first_air_date_year=${query}`
    } else if (searchType === 'genre') {
      const genreId = await getGenreId(query)
      endpoint = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreId}`
    } else {
      endpoint = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`
    }

    const response = await axios.get(endpoint)

    const tvShowsData = response.data.results

    await TvShowModel.deleteMany() //
    await TvShowModel.insertMany(tvShowsData)

    return tvShowsData
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for Tv Shows')
  }
}

async function isGenre(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`,
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
      `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}`,
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
