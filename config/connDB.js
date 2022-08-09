const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const userDB = process.env.DB_USERNAME;
const passDB = process.env.DB_PASSWORD;
const hostDB = process.env.DB_HOST;
const portDB = process.env.DB_PORT;
const nameDB = process.env.DB_DATABASE;
const dialectDB = process.env.DB_DIALECT;

// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize(nameDB, userDB, passDB, {
    host: hostDB,
    dialect: dialectDB
});
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});

// export connection
module.exports = sequelize;