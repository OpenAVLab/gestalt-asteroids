const db = require('../server/db')

db.sync({ force: true })
