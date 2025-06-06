const express = require("express");
const { Sequelize, DataTypes } = require("sequelize");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const Slide = sequelize.define("Slide", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  layout: {
    type: DataTypes.STRING,
    defaultValue: "default",
  },
});

app.get("/slides", async (req, res) => {
  const slides = await Slide.findAll();
  res.json(slides);
});

app.post("/slides", async (req, res) => {
  const slide = await Slide.create(req.body);
  res.json(slide);
});

app.put("/slides/:id", async (req, res) => {
  const slide = await Slide.findByPk(req.params.id);
  if (slide) {
    await slide.update(req.body);
    res.json(slide);
  } else {
    res.status(404).send("Slide not found");
  }
});

app.delete("/slides/:id", async (req, res) => {
  const slide = await Slide.findByPk(req.params.id);
  if (slide) {
    await slide.destroy();
    res.status(204).send();
  } else {
    res.status(404).send("Slide not found");
  }
});

app.post("/reset-db", async (req, res) => {
  try {
    if (req.query.secret !== process.env.RESET_SECRET) {
      return res.status(403).send("Forbidden");
    }
    const db = require("./db"); // or wherever your DB instance is
    db.run("DELETE FROM slides", (err) => {
      if (err) {
        console.error("Error clearing DB:", err);
        return res.status(500).send("Failed to reset DB");
      }
      res.send("Database cleared successfully.");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
