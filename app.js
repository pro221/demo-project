const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  userRoutes = require("./routes/user");

//Connect to database  // "mongodb://localhost:27017/usersdb"
try {
  mongoose.connect("mongodb+srv://Probin:mongo009@cluster0.t7dg60x.mongodb.net/?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log("connected to db");
} catch (error) {
  handleError(error);
}

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

//using user route
app.use(userRoutes);

//setup server to listen on port 3002
app.listen(process.env.PORT || 3002, () => {
  console.log("Server is live on port 3002");
})