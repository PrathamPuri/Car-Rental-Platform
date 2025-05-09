const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const dbConnection = require('./config/db');
const carRoutes = require('./routes/carRoutes');
const userRoutes=require('./routes/userRoutes')
const bookingRoutes=require('./routes/bookingRoutes')
const poolingRoutes=require('./routes/poolingRoutes')
const joiningRoutes=require('./routes/join')
const cors = require('cors');
app.use(express.json()); 
const corsOptions = {
    origin: ['https://car-rental-platform-two.vercel.app', 'http://localhost:3000'],
    credentials: true,
  };
  
  app.use(cors(corsOptions));

app.use('/api/cars', carRoutes);
app.use('/api/users',userRoutes);
app.use('/api/bookings',bookingRoutes);
app.use('/',bookingRoutes);
app.use('/api/pooling',poolingRoutes);
app.use('/api/booking',joiningRoutes)

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port, () => console.log(`Server is running on port ${port}`));
