import express from 'express'
import axios from 'axios'
import { search } from './search/search.mjs'
import MovieModel from '../models/moviemodel.mjs'

const homepageRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'

homepageRoutes.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`,
    )
    const trendingMoviesData = response.data.results

    await MovieModel.deleteMany() // Clear existing data
    await MovieModel.insertMany(trendingMoviesData)

    res.json(trendingMoviesData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

homepageRoutes.get('/search/:query', async (req, res) => {
  const { query } = req.params
  try {
    const searchResults = await search(query)
    res.json(searchResults)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default homepageRoutes
