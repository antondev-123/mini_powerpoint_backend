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

const Document = sequelize.define("Document", {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

app.get("/document", async (req, res) => {
  let doc = await Document.findOne();
  if (!doc) {
    doc = await Document.create({ content: "# Welcome!\n\nStart editing..." });
  }
  res.json(doc);
});

app.put("/document", async (req, res) => {
  const { content } = req.body;
  let doc = await Document.findOne();
  if (!doc) {
    doc = await Document.create({ content });
  } else {
    await doc.update({ content });
  }
  res.json(doc);
});

app.post("/reset-db", async (req, res) => {
  try {
    if (req.query.secret !== process.env.RESET_SECRET) {
      return res.status(403).send("Forbidden");
    }

    await Document.destroy({ where: {} });
    await Document.create({ content: "# Welcome!\n\nStart editing..." });

    res.send("Document reset.");
  } catch (error) {
    console.error("Error resetting document:", error);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 3001;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
