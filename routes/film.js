var express = require('express');
var router = express.Router();

// Create RAW data array
let film = [{
    film: "",
    id: "0"
  }];
  
  /* GET film listing. */
  router.get('/', (req, res) => {
    // Get List of user and return JSON
    res.status(200).json({ film });
  });
  
  /* GET one film. */
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    // Find film in DB
    const film = _.find(film, ["id", id]);
    // Return film
    res.status(200).json({
      message: 'Film found!',
      film 
    });
  });
  
  /* PUT new film. */
  router.put('/', (req, res) => {
    // Get the data from request from request
    const { film } = req.body;
    // Create new unique id
    const id = _.uniqueId();
    // Insert it in array (normaly with connect the data with the database)
    film.push({ film, id });
    // Return message
    res.json({
      message: `Just added ${id}`,
      film: { film, id }
    });
  });
  
  /* DELETE film. */
  router.delete('/:id', (req, res) => {
    // Get the :id of the user we want to delete from the params of the request
    const { id } = req.params;
  
    // Remove from "DB"
    _.remove(film, ["id", id]);
  
    // Return message
    res.json({
      message: `Just removed ${id}`
    });
  });
  
  /* UPDATE film. */
  router.post('/:id', (req, res) => {
    // Get the :id of the film we want to update from the params of the request
    const { id } = req.params;
    // Get the new data of the film we want to update from the body of the request
    const { film } = req.body;
    // Find in DB
    const filmToUpdate = _.find(film, ["id", id]);
    // Update data with new data (js is by address)
    filmToUpdate.film = film;
  
    // Return message
    res.json({
      message: `Just updated ${id} with ${film}`
    });
  });

module.exports = router;