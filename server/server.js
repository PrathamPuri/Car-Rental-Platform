const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const dbConnection = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const userRoutes=require('./routes/userRoutes')
const cors = require('cors');

app.use(express.json()); 
app.use(cors());

app.use('/api/cars', carRoutes);
app.use('/api/users',userRoutes)

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
