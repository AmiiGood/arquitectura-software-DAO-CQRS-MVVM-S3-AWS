const UserValidator = require("../Validators/userValidators");

class RegisterUserCommand {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  validate() {
    return UserValidator.validate(this);
  }
}

class UpdateUserCommand {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  validate() {
    return UserValidator.validate(this);
  }
}

module.exports = {
  RegisterUserCommand,
  UpdateUserCommand,
};
