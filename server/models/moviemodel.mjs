import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  title: String,
  overview: String,
  release_date: Date,
  genre_ids: [Number],
  poster_path: String,
  vote_average: Number,
  trailerkey: String,
})

const MovieModel = mongoose.model('Movie', movieSchema)

export default MovieModel
