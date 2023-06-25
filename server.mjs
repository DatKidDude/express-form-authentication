import express from "express";
import "./loadEnvironment.mjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || "";
const app = express();

// Parses incoming JSON requests
app.use(express.json());

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.use((err, req, res, next) => {
  res.status(500).send({
    msg: err.message,
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
