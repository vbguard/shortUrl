// імпортуємо Expreess
const express = require("express")

// Запускаємо Express у новій переміній app де будемо надалі її використвовувати
const app = express()
// монгус - для з'єднання з базою даних mongodb і створення схем для колекій документів
const mongoose = require("mongoose")
// cors - для дозвозволу або блокування певних методів по домену
//    / Allow - GET, POST з domain.com
//    / Block - DELETE  з boo.com
//  origin - це домен на якому хоститься апка
const cors = require("cors")
//
const logger = require("morgan")
const port = process.env.PORT || 3000
require("dotenv").config()

const routes = require("./routes/routes")
const mainController = require("./controllers/main")
const dbUri = process.env.MONGO_DB_URI

const Urls = require("./models/urls.model")

mongoose
  .connect(dbUri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("dB connected...")
  })
  .catch(err => {
    console.log("DB conneting error: ", err)
    process.exit(1)
  })

//TODO:
//* + add CORS
//* + disable in headers abiut app runing by express
//* + add routing
//* + body parsel
//* add handleError for not route found
//* add global error handle

app.disable("x-powered-by")
app.use(logger("dev"))
app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs")

app.use(express.static("static"))

app.get("/", (req, res) => {
  Urls.find({})
    .then(result => {
      const normalized = result.map(item => ({
        mainUrl: item.mainUrl,
        url: item.url
      }))

      res.render("home", {
        title: "Short Url", //page title
        action: "/api/url/create", //post action for the form
        fields: [
          { name: "url", type: "url", property: "required" } //first field for the form
        ],
        urls: normalized
      })
    })
    .catch(err => res.status(400).json(err))
})

app.get("/:url", mainController)

app.get("/result", (req, res) => {
  res.render("result")
})
app.use("/api", routes)

app.use((req, res) => {
  res.render("404")
})

app.listen(port, () => console.log(`Server running on port ${port} 🔥`))
