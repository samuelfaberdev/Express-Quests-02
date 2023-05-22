const database = require("../database");

// GET
const getHome = (req, res) => {
  res.json({
    message: "Bienvenu sur ma liste de films favorite !",
  });
};

// POST
const postHome = (req, res) => {
  res.json({
    message: "C'est ajouté !",
  });
};

// PUT
const putHome = (req, res) => {
  res.json({
    message: "C'est à jour !",
  });
};

// DELETE
const deleteHome = (req, res) => {
  res.json({
    message: "C'est delete !",
  });
};

module.exports = {
  getHome,
  postHome,
  putHome,
  deleteHome,
};
