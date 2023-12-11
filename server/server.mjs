import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import './db/conn.mjs'
import connectDB from './db/connmovie.mjs'
import {
  userRoutes,
  passwordRoutes,
  movieRoutes,
  homepageRoutes,
  tvShowsRoutes,
  authRoutes,
} from './routes/index.mjs'

const PORT = process.env.PORT || 5050
const NODE_ENV = process.env.NODE_ENV || 'development'
const app = express()

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

connectDB()

const apiRouter = express.Router()
app.use('/api', apiRouter)
app.use('/movies', movieRoutes)
app.use('/homepage', homepageRoutes)
app.use('/tvshows', tvShowsRoutes)
apiRouter.use('/users', userRoutes)
apiRouter.use('/password', passwordRoutes)
apiRouter.use('/auth', authRoutes);
apiRouter.use('/password', passwordRoutes);


// apiRouter.use('/comment', commentRoutes)

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
