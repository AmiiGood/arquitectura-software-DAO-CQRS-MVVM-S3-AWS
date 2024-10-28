class GetAllBooksQuery {
  constructor() {}
}

class GetBookByIdQuery {
  constructor(id) {
    this.id = id;
  }
}

class GetBookPdfQuery {
  constructor(id) {
    this.id = id;
  }
}

module.exports = {
  GetAllBooksQuery,
  GetBookByIdQuery,
  GetBookPdfQuery,
};
