const database = require("../database");

// GET
const getMovies = (req, res) => {
  let sqlReq = "select * from movies";
  let sqlQuery = [];

  if (req.query.color && req.query.max_duration) {
    sqlReq += " where color = ? and duration <= ?";
    sqlQuery.push(req.query.color, req.query.max_duration);
  } else if (req.query.color) {
    sqlReq += " where color = ?";
    sqlQuery.push(req.query.color);
  } else if (req.query.max_duration) {
    sqlReq += " where duration <= ?";
    sqlQuery.push(req.query.max_duration);
  }

  database
    .query(sqlReq, sqlQuery)
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

const updateMovie = (req, res) => {
  const { title, director, year, color, duration } = req.body;
  const id = Number(req.params.id);

  database
    .query(
      "UPDATE movies SET title=?, director=?, year=?, color=?, duration=? WHERE id = ?",
      [title, director, year, color, duration, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("Not Found");
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the movie");
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
  updateMovie,
  deleteMovies,
};
