var mongoose = require("mongoose")

const {DB_HOST, DB_PORT, DB_NAME} = require("./helpers/config")
const mongoDBUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('MongoDB connection error:', error));