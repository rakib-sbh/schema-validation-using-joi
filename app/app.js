const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register", (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(12).required(),
  });

  try {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };
    const result = schema.validate({ name, email, password });

    res.status(201).json({
      message: "User created successfully",
      result,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

//? base route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Home route is working perfectly",
  });
});

module.exports = app;
