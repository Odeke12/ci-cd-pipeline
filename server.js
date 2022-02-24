const express = require('express')
const app = express()
require("dotenv").config();
mongoose = require('mongoose')
const port = process.env.PORT || 3000
const studentRoutes = require('./routes/students')
// const uri = "mongodb+srv://angulo:manuella@<your-cluster-url>/test?retryWrites=true&w=majority";

mongoose.connect(
    process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
    },
    (err) => {
        if (err) throw err;
        console.log('Connected');
    }
);

//middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.use('/students', studentRoutes);

// app.get('/', (req, res) => {
//   res.send('Good job team')
// })

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})