const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const path = require('path')
const db = require('./db')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/api/users', async (req, res, next) => {