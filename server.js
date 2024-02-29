require('./mongoose/db')
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require("dotenv").config();
 
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(bodyParser.json());

 
app.use(cors({
  origin: "*",
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
}));
 
const router = require('./router/index');
app.use('/', router);
 
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the app' })
  })
 
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});