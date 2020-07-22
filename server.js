const express = require("express");
const connectDb = require("./config/db");
const path = require("path");

const app = express();

//connect to Database
connectDb();

app.use(express.json({ extended: false }));

//Defining routes
app.use("/api/register", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));

//post route
app.use("/api/post", require("./routes/post"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("front_end/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front_end", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
