const argon2 = require("argon2");
const database = require("../database");

const jwt = require("jsonwebtoken");
const privateKey = process.env.JWT_SECRET;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = async (req, res, next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    console.log(hashedPassword);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getUserByEmailWithPasswordAndPassToNext = async (req, res, next) => {
  const { email } = req.body;
  try {
    const [[user]] = await database.query(
      "select id, firstname, lastname, email, city, language, hashedpassword from users where email = ?",
      [email]
    );
    if (user != null) {
      console.log(user);
      req.user = user;
      next();
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error retrieving data from database`);
  }
};

const verifyPassword = async (req, res, next) => {
  try {
    const isVerified = await argon2.verify(
      req.user.hashedpassword,
      req.body.password
    );
    if (isVerified) {
      console.log("Credentials are valid");
      next();
    } else {
      console.log("Mauvais login ou mdp");
      return res.status(401).send("Mauvais login ou mdp");
    }
  } catch (err) {
    console.error(err);
  }
};

const getToken = (req, res) => {
  const payload = { sub: req.user.id };
  const token = jwt.sign(payload, privateKey, {
    expiresIn: "1h",
  });
  console.log("Token : " + token);
  return res.status(201).send(token);
};

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = {
  hashPassword,
  verifyPassword,
  getUserByEmailWithPasswordAndPassToNext,
  getToken,
  verifyToken,
};
