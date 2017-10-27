var express = require("express")
var cors = require("cors")

var sockets = require("signal-master/sockets")
var config = require("getconfig")

class Chewb {

  constructor(envarsPath = ".env") {
    require("dotenv").config({ path: envarsPath })
    console.log(process.env)
    this.app = express()
    this.app.use(cors())

    let _port = process.env.PORT || 8080
    let _host = process.env.SERVER_HOST || "127.0.0.1"
    console.log(_host, _port)

    var router = express.Router()

    this.app.use(router)

    router.get("/", function(req, res) {
      res.status(200).send("nothing to see here...")
    })

    var server = this.app.listen(_port)
    sockets(server, config) // config is the same that server.js uses

    this.server = server
  }
}

const chewb = new Chewb("envvars")

module.exports = chewb
