const express = require("express");
const connectDb = require("./config/db");

const app = express();

//connect to Database
connectDb();

const PORT = 5000 || process.env.PORT;

app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("App is running");
});

//Defining routes
app.use("/api/register", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));

//post route
app.use("/api/post", require("./routes/post"));

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
