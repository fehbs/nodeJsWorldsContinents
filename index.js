const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");



app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DB = {

  worldContinents: [
    {
      id: 1,
      name: "Asia",
      countriesAmount: 50,
      population: "4.463 billion"

    },
    {
      id: 2,
      name: "America",
      countriesAmount: 36,
      population: "1 billion"

    },
    {
      id: 3,
      name: "Africa",
      countriesAmount: 54,
      population: "1.216 billion"
    },
    {
      id: 4,
      name: "Europe",
      countriesAmount: 50,
      population: "800 miillion"
    },
    {
      id: 5,
      name: "Oceania",
      countriesAmount: 0,
      population: "0"
    },
    {
      id: 6,
      name: "Antarctica",
      countriesAmount: 0,
      population: "0"
    }
  ]

}

app.get("/atlas", (req, res) => {
  res.statusCode = 200;
  res.json(DB.worldContinents);
  console.log('Welcome at Atlas API NODEJS')
});

app.get("/continent/:id", (req, res) => {

  if (isNaN(req.params.id)) {
    //res.send('This is not a number your BASTARD!')
    res.sendStatus(400);

  } else {
    //res.send (statusCode = 200); 
    //res.sendStatus(200) 

    let id = parseInt(req.params.id);

    let continent = DB.worldContinents.find(c => c.id == id);

    if (continent != undefined) {
      res.statusCode = 200;
      res.json(DB.worldContinents);
    } else {
      res.sendStatus(404);

    }
  }
});

app.post("/continent", (req, res) => {

  let { name, countriesAmount, population } = req.body;

  DB.worldContinents.push({
    id: 7,
    name,
    countriesAmount,
    population
  });

  res.sendStatus(200);
  console.log("Continent created successfully!");
});

app.delete("/continent/:id", (req, res) => {

  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let index = DB.worldContinents.findIndex(c => c.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      DB.worldContinents.splice(index, 1);
      res.sendStatus(200);
      console.log("Erased Continent Succssesfuly!");
    }
  }

  //res.sendStatus(200)
  //console.log('Route created successfully!')
});


app.put("/continent/:id", (req, res) => {

  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {

    let id = parseInt(req.params.id);

    let continent = DB.worldContinents.find(c => c.id == id);

    if (continent != undefined) {

      let { name, countriesAmount, population } = req.body;

      if (name != undefined) {
        continent.name = name;
      }

      if (countriesAmount != undefined) {
        continent.countriesAmount = countriesAmount;
      }

      if (population != undefined) {
        continent.population = population;
      }

      res.sendStatus(200);
      console.log("Successfully updated!");
    } else {
      res.sendStatus(404);
    }
  }

});

app.listen(9999, () => {
  console.log('API RUNING at Port 9999');
});