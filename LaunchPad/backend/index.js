const Express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const multer = require("multer");

const app = Express();
app.use(cors());

const CONNECTION_STRING =
  "mongodb+srv://shahriarratul100:49777balermongodb@cluster0.rhz50.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const DATABASENAME = "LaunchPad";
let database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Failed to connect to MongoDB", error);
      return;
    }
    database = client.db(DATABASENAME);
    console.log("MongoDB connection successful!");
  });
});
