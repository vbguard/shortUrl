const routes = require("express").Router()

const createShortUrl = require("../controllers/createShortUrl")

routes.post("/url/create", createShortUrl)
module.exports = routes
