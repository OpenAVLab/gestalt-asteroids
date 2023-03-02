const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const dbName = process.env.NODE_ENV === 'test' ? `${pkg.name}-test` : pkg.name
const dbUrl = process.env.DATABASE_