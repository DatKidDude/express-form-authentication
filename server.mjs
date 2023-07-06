import express from "express";
import "./loadEnvironment.mjs";
import { fileURLToPath } from "url";
import path from "path";
import users from "./routes/Users.mjs";
import { connectDB } from "./db/dbConnection.mjs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || "";
const app = express();

// Start the server
connectDB();

// Parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.use("/users", users);

// Global error handlera
app.use((err, req, res, next) => {
  res.status(500).send({
    msg: err.message,
    success: false,
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}/users`);
});
