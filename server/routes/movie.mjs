import express from 'express'
import axios from 'axios'
import { searchmovie } from './search/searchmovie.mjs'
import MovieModel from '../models/moviemodel.mjs'

const movieRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

movieRoutes.get('/latest', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`,
    )
    const latestMovies = response.data.results

    await MovieModel.deleteMany({ latest: true })
    await MovieModel.insertMany(
      latestMovies.map((movie) => ({ ...movie, latest: true })),
    )

    res.json(latestMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
movieRoutes.get('/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
    )
    const popularMovies = response.data.results

    await MovieModel.deleteMany({ popular: true }) // Clear existing popular movie data
    await MovieModel.insertMany(
      popularMovies.map((movie) => ({ ...movie, popular: true })),
    )
    res.json(popularMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/upcoming', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`,
    )
    const upcomingMovies = response.data.results
    await MovieModel.deleteMany({ upcoming: true })
    await MovieModel.insertMany(
      upcomingMovies.map((movie) => ({ ...movie, upcoming: true })),
    )

    res.json(upcomingMovies)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

movieRoutes.get('/searchmovie/:query', async (req, res) => {
  const { query } = req.params
  try {
    const movies = await searchmovie(query)
    res.json(movies)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

movieRoutes.get('/moviedetails/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`,
    )
    const movieDetails = response.data

    const {
      title,
      overview: synopsis,
      release_date: releaseDate,
      genres,
      vote_average: tmdbRating,
      videos,
    } = movieDetails

    const genresString = genres.map((genre) => genre.name).join(', ')

    const trailerKey = videos.results.length > 0 ? videos.results[0].key : null
    const detailsToSend = {
      title,
      synopsis,
      releaseDate,
      genres: genresString,
      tmdbRating,
      trailerKey,
    }

    await MovieModel.findByIdAndUpdate(id, { trailerKey })

    res.json(detailsToSend)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default movieRoutes
