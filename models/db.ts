import { Sequelize } from 'sequelize';


const isMySQL = process.env.DB_DIALECT === 'mysql';

const sequelize = new Sequelize({
  dialect: isMySQL ? 'mysql' : 'sqlite',
  storage: isMySQL ? undefined : './database.sqlite', // Path to your SQLite database file
  host: isMySQL ? 'localhost' : undefined, // MySQL host
  username: isMySQL ? 'your_mysql_username' : undefined, // MySQL username
  password: isMySQL ? 'your_mysql_password' : undefined, // MySQL password
  database: isMySQL ? 'your_mysql_database' : undefined, // MySQL database name
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
