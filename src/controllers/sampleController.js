const database = require("../database");

// GET
const getSamples = (req, res) => {
  res.json({
    message: "C'est récupéré !",
  });
};

// POST
const postSamples = (req, res) => {
  res.json({
    message: "C'est ajouté !",
  });
};

// PUT
const putSamples = (req, res) => {
  res.json({
    message: "C'est mis à jour !",
  });
};

// DELETE
const deleteSamples = (req, res) => {
  res.json({
    message: "C'est delete !",
  });
};

module.exports = {
  getSamples,
  getSampleById,
  postSamples,
  putSamples,
  deleteSamples,
};
