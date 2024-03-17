const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");

app.set("view engine", "ejs");
app.use(express.static("public"));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

const allRoutes = require("./routes/allRoutes");

// Reload Page
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
const { log } = require("console");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

// Post request Code
app.use(express.urlencoded({ extended: true }));

// Connect with MongoDb
mongoose
  .connect(
    "mongodb+srv://mohameddahani87:OLRtMRomUv2GHSZq@cluster0.akt4zzi.mongodb.net/all-data?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// -------------------------------------------------------------------------------------------------------------------------------

app.use(allRoutes);
