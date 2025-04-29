const express = require('express');
const path = require('path');
const { serverConfig } = require("./utils");
const viewRouter = require('./routes/index');
const apiRouter = require('./routes/api.router')

const { PORT } = serverConfig;

const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use('/api', apiRouter);
app.use("/", viewRouter);

app.use(express.static(path.join(__dirname, '../public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});