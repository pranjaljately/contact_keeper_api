const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect to DB
connectDB();

//Init middleware
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.get('/', (req, res) =>
  res.json({ msg: 'Welcome to the ContactKeep Api...' })
);

/* Define Routes */

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
