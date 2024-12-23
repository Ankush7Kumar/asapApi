const bodyParser = require("body-parser");
const processInput = require("../src/index"); // Adjust path based on file location
const cors = require("cors");

module.exports = async (req, res) => {
  // Allow CORS
  cors()(req, res, () => {
    // Only allow POST requests
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Parse body
    bodyParser.json()(req, res, async () => {
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
  });
};
