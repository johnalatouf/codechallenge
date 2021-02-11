var express = require('express');
var router = express.Router();
var https = require('https');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/characters/:id', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var url = `https://swapi.dev/api/people/${req.params.id}/`;
  var swapiRequest = https.get(url, (response) => {
    if (response.statusCode === 200) {
      let chunks = '';
      response.on('data', (chunk) => {
        chunks += chunk;
      }).on('end',  async () => {
        const rawPerson = JSON.parse(chunks);

        // get the home planet info
        const homePlanet = await getSecondaryData(rawPerson['homeworld']).catch((err) => {
          console.log(err);
        });

        // get every species info
        const species = [];
        for (const spec of rawPerson['species']) {
          const speciesData = await getSecondaryData(spec).catch((err) => {
            console.log(err);
          });
          species.push({
            name: speciesData.name,
            averageLifespan: speciesData.average_lifespan,
            classification: speciesData.classification,
            language: speciesData.language
          });
        }
        // get every species info
        const films = [];
        for (const film of rawPerson['films']) {
          const filmData = await getSecondaryData(film).catch((err) => {
                console.log(err);
              })
          ;
          films.push({
            title: filmData.title,
            director: filmData.director,
            producer: filmData.producer,
            releaseDate: filmData.release_date
          });
        }
        // const homePlanetRequest = await https.get(rawPerson['homeworld']);

        const person = {
          name: rawPerson.name,
          height: rawPerson.height,
          mass: rawPerson.mass,
          hairColor: rawPerson.hair_color,
          skinColor: rawPerson.skin_color,
          gender: rawPerson.gender,
          birthYear: rawPerson.birth_year,
          homePlanet: {
            title: homePlanet.name,
            terrain: homePlanet.terrain,
            population: homePlanet.population
          },
          species: species,
          films: films
        };
        res.json(person);
      });
    } else {
      res.send(error);
    }
  }).on('error', (error) => {
    res.error();
  });
});

function getSecondaryData(url) {

  // handle issue with http vs https
  if (url.startsWith('http:')) {
    url = url.replace('http:', 'https:');
  }

  return new Promise((resolve, reject) => {
    const secondaryHTTP = https.get(url, (secondaryMessage) => {
      let chunks = '';
      secondaryMessage.on('data', (secData) => {
        chunks += secData;
      }).on('end', () => {
        const output = JSON.parse(chunks);
        resolve(output);
      }).on('error', () => {
        reject();
      });
    });
  });
}

router.get('/api/films/:id', function(req, res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
  res.setHeader('Access-Control-Allow-Credentials', true); // If needed

  var url = `https://swapi.dev/api/films/${req.params.id}/`;
  var swapiRequest = https.get(url, (response) => {
    if (response.statusCode === 200) {
      let chunks = '';
      response.on('data', (chunk) => {
        chunks += chunk;
      }).on('end',  async () => {
        const rawFilm = JSON.parse(chunks);
        const people = [];

        for (const film of rawFilm.characters) {
          const peopleData = await getSecondaryData(film).catch((err) => {
            console.log(err);
          });
          const peopleURL = film.split('/');
          people.push({
            name: peopleData.name,
            id: peopleURL[peopleURL.length - 2]
          });
        }

        res.json(people);
      });
    } else {
      res.send(error);
    }
  }).on('error', (error) => {
    res.error();
  });
});

module.exports = router;
