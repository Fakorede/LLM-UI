require('dotenv').config();

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const URL = process.env.SERVER_URL || "http://localhost";
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
if (process.env.SERVER_ENVIRONMENT == "production") {
    app.use(cors({
        origin: URL
    }));
} else {
    app.use(cors());
}

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.post("/api/save-chats", (req, res) => {
  const {user, data} = req.body;

  // Define the file path for saving the JSON data
  const filePath = path.join(__dirname, "conversations", user + ".json");

  // Write the JSON data to the file
  fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("Error saving chats data:", err);
      return res.status(500).send("Failed to save chats data");
    }
    res.status(200).send("Chats data saved successfully");
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${URL}:${PORT}`);
});
