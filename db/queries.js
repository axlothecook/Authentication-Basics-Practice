const pool = require('./pool');

async function registerUser(username, password) {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *", [username, password]);
};

async function checkUserByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return rows[0];
};

async function checkUserById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
};

module.exports = {
    registerUser,
    checkUserByUsername,
    checkUserById
};