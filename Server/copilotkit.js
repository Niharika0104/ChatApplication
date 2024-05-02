const copilot=()=>{
require("dotenv").config();
const express = require("express");
const { CopilotBackend, OpenAIAdapter } = require("@copilotkit/backend");

const app = express();

app.use(express.json());

const HEADERS = {
  // make sure to modify CORS headers to match your frontend's origin
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
  "Access-Control-Allow-Headers": "X-Requested-With,content-type"
};

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  next();
});

app.post("/", (req, res) => {
  try {
    const copilotBackend = new CopilotBackend();
    copilotBackend.streamHttpServerResponse(
      req,
      res,
      new OpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY })
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
}
module.exports=copilot;
