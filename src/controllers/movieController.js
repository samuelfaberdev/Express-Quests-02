const database = require("../database");

// GET
const getMovies = (req, res) => {
  database
    .query("select * from movies")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from movies where id = ?", [id])
    .then(([movie]) => {
      if (movie[0] != null) {
        res.json(movie[0]);
      } else {
        res.status(404).send(`Movie N°${id} Not Found`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error retrieving data from database`);
    });
};

// POST
const postMovies = (req, res) => {
  console.log(req.body);

  const { title, director, year, color, duration } = req.body;

  database
    .query(
      "INSERT INTO movies(title, director, year, color, duration) VALUES (?, ?, ?, ?, ?)",
      [title, director, year, color, duration]
    )
    .then(([result]) => {
      console.log("Done");
      res.location(`/api/movies/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
    });
};

const putMovies = (req, res) => {
  res.json({
    message: "C'est à jour !",
  });
};

const deleteMovies = (req, res) => {
  res.json({
    message: "C'est delete !",
  });
};

module.exports = {
  getMovies,
  getMovieById,
  postMovies,
  putMovies,
  deleteMovies,
};
