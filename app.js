const express = require('express');


require('dotenv').config(); //um passwörter etc zu storen

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs'); //telling that we use dynamic sites with hbs
app.set('views', path.join(__dirname, 'views'));  //telling where all the views are 

app.use(express.static(path.join(__dirname, 'public')));



// Register the location for handlebars partials here:

hbs.registerPartials(path.join(__dirname, 'views/partials'))

// Add the route handlers here:

app.get('/', (req, res, next) => {
 // console.log(process.env.MYPASSWORD)       works :)
  
  res.render('index.hbs');
});


app.get('/beers', (req, res, next)=> {

  punkAPI
  .getBeers()
  .then((beersFromdb)=> {
  res.render('beers', {beers: beersFromdb});                 //oder nur 'beers ohne extension?'
  })
  .catch(err => console.log(err))


})
  
 app.get('/random-beer', (req, res, next)=> {

  punkAPI
  .getRandom()
  .then((beer)=> {
   res.render('random-beer', {beer})
  // console.log()
  
  })
  .catch(err => console.log(err))

 })
 
 


app.listen(3000, () => console.log('🏃‍ on port 3000'));
