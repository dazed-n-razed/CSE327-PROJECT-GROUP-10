const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());

// MongoDB connection details
const CONNECTION_STRING =
  "mongodb+srv://shahriarratul100:49777balermongodb@cluster0.rhz50.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "LaunchPad";
let database;

// Set up port with fallback to 3000 if not specified
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  // Attempt MongoDB connection without deprecated options
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    if (error) {
      console.error("Failed to connect to MongoDB", error);
      return;
    }
    database = client.db(DATABASENAME);
    console.log("MongoDB connection successfuldfsdf!");
  });
});
