require("dotenv").config();

const express = require("express");
const cors = require("cors");
const api = require("./routes/api");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let whitelist;
try {
  whitelist = JSON.parse(process.env.WHITELIST_DOMAINS);
} catch (error) {
  console.error("Error parsing WHITELIST_DOMAINS:", error);
  process.exit(1);
}

const corsOptions = {
  origin: function (origin, callback) {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "deploypment"
    ) {
      callback(null, true);
    } else {
      if (whitelist?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Unauthorized Domain"));
      }
    }
  },
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, PATCH",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, Authorization, X-Requested-With, X-Auth-Token, Content-Disposition",
  });
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

const init = async () => {
  app.use("/api/v1", api);
  app.listen(process.env.PORT, () => {
    console.log(`App running on ${process.env.PORT}`);
  });
};

init();
