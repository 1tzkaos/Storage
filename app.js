const fs = require("fs");
const express = require("express");
let cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let multer = require("multer");
let mongoose = require("mongoose");
let user = require("./models/authorization/user.js");

let config = JSON.parse(fs.readFileSync("config.json", "utf8"));

let dir = "./uploads";
let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, callback) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),

  fileFilter: function (req, file, callback) {
    let ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
      return callback(/*res.end('Only images are allowed')*/ null, false);
    }
    callback(null, true);
  },
});

app.use(cors());
app.use(express.static("uploads"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const FileRouter = require("./models/file/file.routes.js");
const FolderRouter = require("./models/folder/folder.routes.js");
const NoteRouter = require("./models/note/note.routes.js");
FolderRouter.routesConfig(app);
FileRouter.routesConfig(app);
NoteRouter.routesConfig(app);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.send(200);
  } else {
    return next();
  }
});

// Add the ensureAuthenticated middleware function here
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    // Redirect to login page if not authenticated
    res.redirect("/login");
  }
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/client/build"));
  app.get("*", (req, res, next) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  });
}

const mongoURI = "mongodb://localhost:27017/" + config.name;
mongoose.set("useFindAndModify", false);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use("/", (req, res, next) => {
  try {
    if (req.path == "/login" || req.path == "/register" || req.path == "/") {
      next();
    } else {
      /* decode jwt token if authorized*/
      jwt.verify(req.headers.token, "shhhhh11111", function (err, decoded) {
        if (decoded && decoded.user) {
          req.user = decoded;
          next();
        } else {
          return res.status(401).json({
            errorMessage: "User unauthorized!",
            status: false,
          });
        }
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    title: "Apis",
  });
});

/* login api */
app.post("/login", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length > 0) {
          if (bcrypt.compareSync(data[0].password, req.body.password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: "Username or password is incorrect!",
              status: false,
            });
          }
        } else {
          res.status(400).json({
            errorMessage: "Username or password is incorrect!",
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

/* register api */
app.post("/register", (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      user.find({ username: req.body.username }, (err, data) => {
        if (data.length == 0) {
          let User = new user({
            username: req.body.username,
            password: req.body.password,
          });
          User.save((err, data) => {
            if (err) {
              res.status(400).json({
                errorMessage: err,
                status: false,
              });
            } else {
              res.status(200).json({
                status: true,
                title: "Registered Successfully.",
              });
            }
          });
        } else {
          res.status(400).json({
            errorMessage: `UserName ${req.body.username} Already Exist!`,
            status: false,
          });
        }
      });
    } else {
      res.status(400).json({
        errorMessage: "Add proper parameter first!",
        status: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: "Something went wrong!",
      status: false,
    });
  }
});

function checkUserAndGenerateToken(data, req, res) {
  jwt.sign(
    { user: data.username, id: data._id },
    "shhhhh11111",
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        res.status(400).json({
          status: false,
          errorMessage: err,
        });
      } else {
        res.json({
          message: "Login Successfully.",
          token: token,
          status: true,
        });
      }
    }
  );
}

app.listen(config.port, () => {
  console.log("Server is Running On port " + config.port);
});
