const database = require("../database");

// GET
const getUsers = (req, res) => {
  database
    .query("select * from users")
    .then(([movies]) => {
      res.json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([movie]) => {
      if (movie[0] != null) {
        res.json(movie[0]);
      } else {
        res.status(404).send(`User N°${id} Not Found`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(`Error retrieving data from database`);
    });
};

// POST
const postUsers = (req, res) => {
  console.log(req.body);

  const { firstname, lastname, email, city, language } = req.body;

  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city, language) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, city, language]
    )
    .then(([result]) => {
      console.log("Done");
      res.location(`/api/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

// PUT
const putUsers = (req, res) => {
  res.json({
    message: "C'est à jour !",
  });
};

// DELETE
const deleteUsers = (req, res) => {
  res.json({
    message: "C'est delete !",
  });
};

module.exports = {
  getUsers,
  getUserById,
  postUsers,
  putUsers,
  deleteUsers,
};