const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Slide = sequelize.define('Slide', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  layout: {
    type: DataTypes.STRING,
    defaultValue: 'default'
  }
});

app.get('/slides', async (req, res) => {
  const slides = await Slide.findAll();
  res.json(slides);
});

app.post('/slides', async (req, res) => {
  const slide = await Slide.create(req.body);
  res.json(slide);
});

app.put('/slides/:id', async (req, res) => {
  const slide = await Slide.findByPk(req.params.id);
  if (slide) {
    await slide.update(req.body);
    res.json(slide);
  } else {
    res.status(404).send('Slide not found');
  }
});

app.delete('/slides/:id', async (req, res) => {
  const slide = await Slide.findByPk(req.params.id);
  if (slide) {
    await slide.destroy();
    res.status(204).send();
  } else {
    res.status(404).send('Slide not found');
  }
});

sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });
});