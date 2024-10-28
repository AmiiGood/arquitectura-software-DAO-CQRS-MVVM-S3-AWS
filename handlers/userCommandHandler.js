const UserDAO = require("../DAO/userDAO");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserCommandHandlers {
  async handleRegisterUser(command) {
    const validation = command.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(". "));
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(command.password, 10);

    const newUser = new User({
      username: command.username,
      email: command.email,
      password: hashedPassword,
    });

    return await UserDAO.insert(newUser);
  }

  async handleUpdateUser(command) {
    const validation = command.validate();
    if (!validation.isValid) {
      throw new Error(validation.errors.join(". "));
    }

    let hashedPassword;
    if (command.password) {
      hashedPassword = await bcrypt.hash(command.password, 10);
    }

    const updateData = {
      id: command.id,
      username: command.username,
      email: command.email,
      password: hashedPassword,
    };

    return await UserDAO.update(updateData);
  }
}

module.exports = new UserCommandHandlers();
