var mongoose = require("mongoose")

const {DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD} = process.env
const mongoDBUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
console.log("MONDODB:", mongoDBUrl)

mongoose.connect(mongoDBUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));