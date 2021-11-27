import { Sequelize, DataTypes } from 'sequelize'
const { DB_HOST, DB_USER, DB_PASS, DB_NAME, SYSTEM_DIALECT } = process.env

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: SYSTEM_DIALECT
})
export { db, DataTypes }
