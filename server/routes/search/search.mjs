import axios from 'axios'

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

/*export async function search(query) {
  try {
    let searchType
    if (!isNaN(query) && query.length === 4) {
      // Si l'input est une année (numérique à 4 chiffres)
      searchType = 'year'
    } else if (await isGenre(query)) {
      // Si l'input est un genre
      searchType = 'genre'
    } else {
      // Si l'input n'est ni un genre ni une année, recherche normale
      searchType = 'normal'
    }

    let endpoint
    if (searchType === 'year') {
      // Recherche par année
      endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_year=${query}`
    } else if (searchType === 'genre') {
      // Recherche par tous les films de ce genre
      const genreId = await getGenreId(query)
      endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`
    } else {
      // Recherche normale
      endpoint = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`
    }

    const response = await axios.get(endpoint)
    return response.data.results
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
}  */

export async function search(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${query}`,
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for movies or tv shows')
  }
}

/* export async function searchMovies(query) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    )
    return response.data.results
  } catch (error) {
    console.error(error)
    throw new Error('Error searching for movies')
  }
} */
