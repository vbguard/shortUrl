const Urls = require("../models/urls.model")
const shortId = require("shortid")

module.exports = (req, res) => {
  const { url } = req.body

  if (url) {
    const getShortId = shortId()
    const host =
      "http://https://us-central1-shorturl-be599.cloudfunctions.net/app/"
    const newShortUrl = new Urls({
      mainUrl: url,
      shortUrl: getShortId,
      url: host + getShortId
    })

    newShortUrl.save((err, result) => {
      if (err) throw new Error(err)
      res.render("result", { createdUrl: result.url })
    })
  } else {
    res.redirect("/")
  }
}
