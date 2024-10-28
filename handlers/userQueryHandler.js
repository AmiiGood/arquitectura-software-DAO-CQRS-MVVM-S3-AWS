const UserDAO = require("../DAO/userDAO");

class UserQueryHandlers {
  async handleGetAllUsers(query) {
    return await UserDAO.getAll();
  }

  async handleGetUserById(query) {
    return await UserDAO.getById(query.id);
  }

  async handleGetUserByEmail(query) {
    return await UserDAO.getByEmail(query.email);
  }
}

module.exports = new UserQueryHandlers();
