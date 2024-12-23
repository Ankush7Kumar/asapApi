const express = require("express");
const bodyParser = require("body-parser");
const processInput = require("../index"); // Adjust path based on file location
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/test", async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Input field is required." });
  }

  try {
    console.log(`Processing input: ${input}`);
    const result = await processInput(input);
    return res.status(200).json({ success: true, result });
  } catch (error) {
    console.error(`Error processing input: ${error.message}`);
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = app;
