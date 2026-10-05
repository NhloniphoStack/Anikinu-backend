import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import { animeRouter } from './routes/anime.js';
import { delay } from './util/delay.js';
import { ingestAnime } from './scripts/ingestAnime.js';
import { ingestTrending } from './scripts/ingestTrending.js';
import { ingestRecent } from './scripts/ingestRecent.js';
import { ingestTopRated } from './scripts/ingestTopRated.js';
import { trendingRouter } from './routes/trending.js';
import { recentlyRouter } from './routes/recently.js';
import { topRatedRouter } from './routes/topRated.js';
import { resolveRouter } from './routes/resolve.js';
import { upcomingRouter } from './routes/upcoming.js';
import { authRouter } from './routes/auth.js';
import { meRouter } from './routes/me.js';
import { changeLogsRouter } from './routes/changeLogs.js';
import session from 'express-session';
dotenv.config()




async function startIngest(){
  try{
    console.log("Ingesting executing....")

    await ingestTopRated()

    await ingestTrending()

    await ingestRecent()

    await ingestAnime()

    

  }catch(error){
    console.log('Ingestion failed:', error)
  }

  await delay(1000 * 60 * 60 * 6 )

  startIngest()
}

startIngest()

const PORT = 8000

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(session({
  secret: process.env.SUPER_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: false
  }
  
}))

app.use(express.json())

app.use('/api/changelogs', changeLogsRouter)

app.use('/api/me', meRouter)

app.use('/api/anime/upcoming', upcomingRouter)

app.use('/api/anime/resolve', resolveRouter)

app.use('/api/anime/top-rated', topRatedRouter)

app.use('/api/anime/recently-finished', recentlyRouter)

app.use('/api/anime/trending', trendingRouter)



app.use('/api/auth', authRouter)

app.use('/api/anime', animeRouter)





app.use((req, res) => {
  return  res.status(404).json({error: 'Invalid path'})
})


app.listen(PORT, () => console.log(`Connected at Port: ${PORT}`))