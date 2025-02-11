import connectToMongo from "./db.js";
import express from "express";
import authRoutes from "./routes/auth.js";
import noteRoutes from "./routes/notes.js";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

connectToMongo();

app.get("/", (req, res) => {
  res.send("Hello Neha!");
});

//Available routes:
app.use("/api/auth/", authRoutes);
app.use("/api/notes", noteRoutes);

app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});
