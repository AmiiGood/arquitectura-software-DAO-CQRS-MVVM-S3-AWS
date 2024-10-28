const db = require("../config/database");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserDAO {
  async getAll() {
    const [rows] = await db.execute("SELECT * FROM users");
    return rows.map((row) => new User(row));
  }

  async getById(id) {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      throw new Error("No se encontró el usuario con el ID proporcionado");
    }
    return new User(rows[0]);
  }

  async getByEmail(email) {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0) {
      throw new Error("No se encontró el usuario con el email proporcionado");
    }
    return new User(rows[0]);
  }

  async insert(user) {
    const [result] = await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [user.username, user.email, user.password]
    );
    return result.insertId;
  }

  async update(user) {
    const updates = {};
    const params = [];
    const setClauses = [];

    if (user.username !== undefined) {
      updates.username = user.username;
      setClauses.push("username = ?");
      params.push(user.username);
    }

    if (user.email !== undefined) {
      updates.email = user.email;
      setClauses.push("email = ?");
      params.push(user.email);
    }

    if (user.password !== undefined) {
      updates.password = user.password;
      setClauses.push("password = ?");
      params.push(user.password);
    }

    if (setClauses.length === 0) {
      throw new Error("No se proporcionaron campos para actualizar");
    }

    params.push(user.id);

    const query = `
      UPDATE users 
      SET ${setClauses.join(", ")} 
      WHERE id = ?
    `;

    const [result] = await db.execute(query, params);

    if (result.affectedRows === 0) {
      throw new Error("No se encontró el usuario con el ID proporcionado");
    }

    return result.affectedRows;
  }
}

module.exports = new UserDAO();
