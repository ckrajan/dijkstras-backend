import City from './City';
import db from './db';

db.once('open', async () => {
  await City.deleteMany();

  const cities = [
    {
      name: 'delhi',
      neighbors: [
        { name: 'mumbai', distance: 10 },
        { name: 'kolkata', distance: 20 },
        { name: 'jaipur', distance: 30 },
      ],
    },
    {
      name: 'mumbai',
      neighbors: [
        { name: 'delhi', distance: 10 },
        { name: 'pune', distance: 15 },
        { name: 'nashik', distance: 25 },
      ],
    },
    {
      name: 'kolkata',
      neighbors: [
        { name: 'delhi', distance: 20 },
        { name: 'jaipur', distance: 10 },
        { name: 'vizag', distance: 40 },
      ],
    },
    {
      name: 'jaipur',
      neighbors: [
        { name: 'delhi', distance: 30 },
        { name: 'kolkata', distance: 10 },
        { name: 'nagpur', distance: 35 },
      ],
    },
    {
      name: 'pune',
      neighbors: [
        { name: 'mumbai', distance: 15 },
        { name: 'cochin', distance: 12 },
        { name: 'aurangabad', distance: 22 },
      ],
    },
    {
      name: 'nashik',
      neighbors: [
        { name: 'mumbai', distance: 25 },
        { name: 'aurangabad', distance: 18 },
      ],
    },
    {
      name: 'vizag',
      neighbors: [
        { name: 'kolkata', distance: 40 },
        { name: 'chennai', distance: 28 },
      ],
    },
    {
      name: 'nagpur',
      neighbors: [
        { name: 'jaipur', distance: 35 },
        { name: 'hyderabad', distance: 45 },
      ],
    },
    {
      name: 'cochin',
      neighbors: [
        { name: 'pune', distance: 12 },
        { name: 'chennai', distance: 20 },

      ],
    },
    {
      name: 'aurangabad',
      neighbors: [
        { name: 'pune', distance: 22 },
        { name: 'nashik', distance: 18 },
        { name: 'hyderabad', distance: 30 },
      ],
    },
    {
      name: 'chennai',
      neighbors: [
        { name: 'vizag', distance: 28 },
        { name: 'cochin', distance: 20 },
      ],
    },
    {
      name: 'hyderabad',
      neighbors: [
        { name: 'nagpur', distance: 45 },
        { name: 'aurangabad', distance: 30 },
      ],
    },

  ];

  await City.insertMany(cities);

  console.log('Example data inserted.');
  process.exit();
});