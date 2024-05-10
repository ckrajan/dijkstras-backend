import express from 'express';
import bodyParser from 'body-parser';
import City, { ICity } from './City';
import db from './db';
import dijkstra from './dijkstra';
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

interface Neighbors {
  [name: string]: number;
}

const dotenv = require('dotenv');
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro"});

app.get('/cities', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

app.post('/calculate-path', async (req, res) => {
  const { startCity, endCity } = req.body;

  const cities: ICity[] = await City.find();
  const graph: Record<string, Neighbors> = {};

  cities.forEach((city) => {
    graph[city.name] = {};
    city.neighbors.forEach((neighbor) => {
      graph[city.name][neighbor.name] = neighbor.distance;
    });
  });

  const shortestPath = dijkstra(graph, startCity, endCity);
  res.json({ shortestPath });
});

app.post('/generate_path', async (req, res) => {
  try {
    const { startCity, endCity } = req.body;
    const prompt = "More details about" + startCity + "and" + endCity;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ text });
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});