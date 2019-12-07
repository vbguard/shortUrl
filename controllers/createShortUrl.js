const Urls = require("../models/urls.model")
const shortId = require("shortid")

module.exports = (req, res) => {
  const { url } = req.body

  if (url) {
    const getShortId = shortId()
    const host = "http://localhost:3000/"
    const newShortUrl = new Urls({
      mainUrl: url,
      shortUrl: getShortId,
      url: host + getShortId
    })

    newShortUrl.save((err, result) => {
      res.render("result", { createdUrl: result.url })
    })
  } else {
    res.redirect("/")
  }
}
