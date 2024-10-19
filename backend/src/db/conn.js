const { Sequelize }  = require('sequelize');


const sequelize = new Sequelize(
    process.env.POSTGRES_DATABASE, 
    process.env.POSTGRES_USER, 
    process.env.POSTGRES_PASSWORD, {
    host: process.env.POSTGRES_URL,
    dialect: 'postgres',
    port: 5432,
    logging: false,
  });

try {
    sequelize.authenticate()
    console.log(`Sequelize: Conectado ao banco: ${process.env.POSTGRES_DATABASE} `)
} catch (error) {
    console.log("Não foi possível conectar: ", error)
}


module.exports = sequelize
