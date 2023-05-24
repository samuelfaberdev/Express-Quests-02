const database = require("../database");

// GET
const getUsers = (req, res) => {
  let sqlReq = "select * from users";
  let sqlQuery = [];

  if (req.query.language && req.query.city) {
    sqlReq += " where language = ? and city = ?";
    sqlQuery.push(req.query.language, req.query.city);
  } else if (req.query.language) {
    sqlReq += " where language = ?";
    sqlQuery.push(req.query.language);
  } else if (req.query.city) {
    sqlReq += " where city = ?";
    sqlQuery.push(req.query.city);
  }

  database
    .query(sqlReq, sqlQuery)
    .then(([users]) => {
      res.json(users);
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
    .then(([user]) => {
      if (user[0] != null) {
        res.json(user[0]);
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
const updateUser = (req, res) => {
  const { firstname, lastname, email, city, language } = req.body;
  const id = Number(req.params.id);

  database
    .query(
      "UPDATE users SET firstname=?, lastname=?, email=?, city=?, language=? WHERE id = ?",
      [firstname, lastname, email, city, language, id]
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
      res.status(500).send("Error saving the user");
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
  updateUser,
  deleteUsers,
};
