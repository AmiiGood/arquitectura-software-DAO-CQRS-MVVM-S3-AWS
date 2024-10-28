class UserValidator {
  static validate(data) {
    const errors = [];

    // Validación del nombre de usuario
    if (!data.username) {
      errors.push("El nombre de usuario es requerido");
    } else {
      if (data.username.length < 3) {
        errors.push("El nombre de usuario debe tener al menos 3 caracteres");
      }
      if (data.username.length > 50) {
        errors.push("El nombre de usuario no puede exceder los 50 caracteres");
      }
    }

    // Validación del email
    if (!data.email) {
      errors.push("El email es requerido");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push("El formato del email no es válido");
      }
      if (data.email.length > 100) {
        errors.push("El email no puede exceder los 100 caracteres");
      }
    }

    // Validación de la contraseña (solo para registro o actualización con contraseña)
    if (data.password !== undefined) {
      if (!data.password) {
        errors.push("La contraseña es requerida");
      } else if (data.password.length < 6) {
        errors.push("La contraseña debe tener al menos 6 caracteres");
      } else if (data.password.length > 255) {
        errors.push("La contraseña no puede exceder los 255 caracteres");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }
}

module.exports = UserValidator;
