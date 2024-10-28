class BookValidator {
  static validate(data) {
    const errors = [];

    if (!data.bookname) {
      errors.push("El nombre del libro es requerido");
    } else {
      if (data.bookname.length < 5) {
        errors.push("El nombre del libro debe tener al menos 5 caracteres");
      }
      if (data.bookname.length > 100) {
        errors.push("El nombre del libro no puede exceder los 100 caracteres");
      }
    }

    if (!data.gender) {
      errors.push("El genero es requerido");
    } else {
      if (data.gender.length < 5) {
        errors.push("El genero debe tener al menos 5 caracteres");
      }
      if (data.gender.length > 30) {
        errors.push("El genero no puede exceder los 30 caracteres");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = BookValidator;
