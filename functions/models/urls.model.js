const Schema = require("mongoose").Schema
const model = require("mongoose").model

const UrlsSchema = new Schema(
  {
    mainUrl: String,
    shortUrl: String,
    url: String
  },
  { timestamps: true }
)

module.exports = model("Urls", UrlsSchema)
