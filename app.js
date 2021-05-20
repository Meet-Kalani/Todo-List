// Importing Packages(dependencies)
const todo_routes = require("./routes/todo_routes");
const user_routes = require('./routes/user_routes');
const express = require('express');
const config = require('config');
const app = express();
const PORT = process.env.PORT || 3000;

// Configuering Apps
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/'));
app.use("/todo", todo_routes);
app.use("/user", user_routes);

// Checking of environmental variables are set or not 
if (!config.get('jwtPrivateKey') | !config.get('smtpUsername') | !config.get('smtpPassword') | !config.get('dbPassword')) {
    console.log("ERROR: Environment variable is not defined");
    process.exit(1);
}

// Base Route
app.get('/', (req, res) => {
    res.render('index.html');
})

// Listening Port of App
app.listen(PORT, () => {
    console.log(`App started on PORT:${PORT}`);
})