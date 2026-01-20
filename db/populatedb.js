const { Client } = require('pg');
require('dotenv').config();

const SQL = `
CREATE TABLE users (
   id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
   username VARCHAR ( 255 ),
   password VARCHAR ( 255 )
);
`;

const main = async () => {
    ('seeding...');
    const client = new Client({ connectionString: process.env.NODE_ENV_DB_LOCALHOST });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done');
};

main();