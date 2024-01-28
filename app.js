const express = require('express');
const app = express();
const bodyparser =require("body-parser");
const PORT = process.env.PORT || 3002;
require("dotenv/config")

const HttpException = require('./utils/http-exception')
const userRoutes = require('./routes/userRoute');
const courseRouter = require('./routes/courseRouter');
const programeRouter = require('./routes/programeRouter');
const studentRoutes = require('./routes/studentRoutes');



app.use(express.json());
app.use(bodyparser.json());

//USING THE ROUTE
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/programe', programeRouter);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/course', courseRouter)

app.all('', (req, res, next) => {
        const error = new HttpException(`cant find ${req.originalUrl} on the server!`, 404);
       next(error);
    })

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})