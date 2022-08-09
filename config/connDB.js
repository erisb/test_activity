const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const userDB = process.env.MYSQL_USER;
const passDB = process.env.MYSQL_PASSWORD;
const hostDB = process.env.MYSQL_HOST;
const portDB = process.env.MYSQL_PORT;
const nameDB = process.env.MYSQL_DBNAME;
const dialectDB = 'mysql';

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