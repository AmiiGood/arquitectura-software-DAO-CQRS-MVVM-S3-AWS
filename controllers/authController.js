// controllers/authController.js
const { RegisterUserCommand } = require("../commands/userCommand");
const { GetUserByEmailQuery } = require("../queries/userQueries");
const userCommandHandlers = require("../handlers/userCommandHandler");
const userQueryHandlers = require("../handlers/userQueryHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Todos los campos son requeridos" });
    }

    const command = new RegisterUserCommand(username, email, password);

    try {
      const userId = await userCommandHandlers.handleRegisterUser(command);
      res
        .status(201)
        .json({ message: "Usuario registrado exitosamente", userId });
    } catch (validationError) {
      return res.status(400).json({
        message: "Error de validación",
        errors: validationError.message.split(". "),
      });
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña son requeridos" });
    }

    try {
      const query = new GetUserByEmailQuery(email);
      const user = await userQueryHandlers.handleGetUserByEmail(query);

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Email o contraseña incorrectos" });
      }

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({
        message: "Login exitoso",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Email o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("Error en el login:", error);
    res
      .status(500)
      .json({ message: "Error en el servidor", error: error.message });
  }
};
