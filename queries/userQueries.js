class GetAllUsersQuery {
  constructor() {}
}

class GetUserByIdQuery {
  constructor(id) {
    this.id = id;
  }
}

class GetUserByEmailQuery {
  constructor(email) {
    this.email = email;
  }
}

module.exports = {
  GetAllUsersQuery,
  GetUserByIdQuery,
  GetUserByEmailQuery,
};
