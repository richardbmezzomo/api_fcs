'use strict'

import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import configFile from '../config/config.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]
const db = {}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)

const modelFiles = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf('.') !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  )
})

for (const file of modelFiles) {
  const model = await import(path.join(__dirname, file))
  const modelInstance = model.default(sequelize, Sequelize.DataTypes)
  db[modelInstance.name] = modelInstance
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
