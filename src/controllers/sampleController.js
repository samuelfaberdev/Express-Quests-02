const database = require("../database");

// GET
const getSamples = (req, res) => {
  res.json({
    message: "C'est affiché !",
  });
};

const getSampleById = (req, res) => {
  res.json({
    message: "C'est affiché !",
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
    message: "C'est à jour !",
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
