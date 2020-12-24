require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIE = require('./movie.json')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!!!')
  })
  
  app.use(function validateBearerToken(req, res, next){
  
      const bearerToken = req.get('Authorization');
      console.log("bearerToken: " + bearerToken);
      const apiToken = process.env.API_TOKEN;
      console.log("apitoken: " + apiToken);
  
      console.log('validate bearer token middleware');
  
      if (bearerToken !== apiToken || !bearerToken) {
          return res.status(401).json({ error: 'Unauthorized request' })
      }
  
      next();
    })

    function handleMovie(req, res){
        let response = MOVIE;

        if (req.query.film_title){
            response = response.filter(movie =>
              // case insensitive searching
              movie.film_title.toLowerCase().includes(req.query.film_title.toLowerCase())
            )
          }

        if (req.query.genre){
            response = response.filter(movie =>
              // case insensitive searching
              movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
            )
          }
        
          if (req.query.country){
            response = response.filter(movie =>
              // case insensitive searching
              movie.country.toLowerCase().includes(req.query.country.toLowerCase())
            )
          }

          if (req.query.avg_vote){
            response = response.filter(movie =>
              // case insensitive searching
              movie.avg_vote >= req.query.avg_vote)
          }
          
    }

    app.get('/movie', handleMovie)

    const PORT = 8000

      app.listen(PORT, () => {
        console.log(`Server listening at http://localhost:${PORT}`)
      })