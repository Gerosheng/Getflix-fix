import mongoose from 'mongoose'

const tvShowSchema = new mongoose.Schema({
  name: String,
  overview: String,
  first_air_date: Date,
  genre_ids: [Number],
  poster_path: String,
  vote_average: Number,
  trailerkey: String,
  episodes: [
    {
      seasonNumber: Number,
      episodeNumber: Number,
      name: String,
      airDate: Date,
      overview: String,
    },
  ],
})

const TvShowModel = mongoose.model('TvShow', tvShowSchema)

export default TvShowModel
