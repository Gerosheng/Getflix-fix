import express from 'express'
import axios from 'axios'
import { searchTv } from './search/searchtv.mjs'
import TvShowModel from '../models/tvmodel.mjs'

const tvshowRoutes = express.Router()

const apiKey = '1cc614b6cd01c73622141ccf0bdceac5'
tvshowRoutes.get('/searchtv/:query', async (req, res) => {
  const { query } = req.params
  try {
    const tv = await searchTv(query)
    res.json(tv)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

tvshowRoutes.get('/toprated', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`,
    )
    const topRatedTv = response.data.results

    await TvShowModel.deleteMany({ toprated: true })
    await TvShowModel.insertMany(
      topRatedTv.map((show) => ({ ...show, toprated: true })),
    )

    res.json(topRatedTv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

tvshowRoutes.get('/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`,
    )
    const popularTv = response.data.results

    await TvShowModel.deleteMany({ popular: true })
    await TvShowModel.insertMany(
      popularTv.map((show) => ({ ...show, popular: true })),
    )

    res.json(popularTv)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

tvshowRoutes.get('/airingtoday', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/airing_today?api_key=${apiKey}`,
    )
    const airingToday = response.data.results

    await TvShowModel.deleteMany({ airingtoday: true })
    await TvShowModel.insertMany(
      airingToday.map((show) => ({ ...show, airingtoday: true })),
    )

    res.json(airingToday)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

tvshowRoutes.get('/details/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=videos`,
    )
    const tvDetails = response.data

    const {
      name: title,
      overview: synopsis,
      first_air_date: releaseYear,
      number_of_seasons: numberOfSeasons,
      genres,
      vote_average: tmdbRating,
      videos,
    } = tvDetails

    const genresString = genres.map((genre) => genre.name).join(', ')

    const trailerKey = videos.results.length > 0 ? videos.results[0].key : null

    const detailsToSend = {
      title,
      synopsis,
      releaseYear,
      numberOfSeasons,
      genres: genresString,
      tmdbRating,
      trailerKey,
    }

    await TvShowModel.findByIdAndUpdate(id, { trailerKey })

    res.json(detailsToSend)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

tvshowRoutes.get('/latestepisodes/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&append_to_response=seasons`,
    )
    const tvDetails = response.data

    const { name: title, seasons } = tvDetails

    const latestEpisodes = seasons.map((season) => {
      const { season_number: seasonNumber, episodes } = season
      const latestEpisode = episodes.reduce((latest, episode) =>
        episode.air_date > latest.airDate ? episode : latest,
      )

      return {
        seasonNumber,
        episodeNumber: latestEpisode.episode_number,
        name: latestEpisode.name,
        airDate: latestEpisode.air_date,
        overview: latestEpisode.overview,
      }
    })

    await TvShowModel.findByIdAndUpdate(id, { episodes: latestEpisodes })

    res.json({
      title,
      latestEpisodes,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default tvshowRoutes
