const Urls = require("../models/urls.model")

module.exports = (req, res) => {
  const url = req.params.url
  if (url) {
    Urls.findOne({ shortUrl: url })
      .then(result => {
       return res.redirect(result.mainUrl)
      })
      .catch(err => {
        console.log("err :", err)
        res.status(400).json({
          message: err.message
        })
      })
  } else {
    res.render("home", {
      title: "Short Url", //page title
      action: "/api/url/create", //post action for the form
      fields: [
        { name: "url", type: "url", property: "required" } //first field for the form
      ]
    })
  }
}
