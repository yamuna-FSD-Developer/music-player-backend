const express = require("express");
const app = express();
require("dotenv/config")

const cors = require("cors");
const {default: mongoose, mongo} = require("mongoose");

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) =>{
  return res.json("Hi there......")
})

// user authentication route
const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist links
const artistsRoute = require("./routes/artist");
app.use("/api/artists/", artistsRoute);

// Album links
const albumRoute = require("./routes/albums");
app.use("/api/albums/", albumRoute);

// Songs links
const songRoute = require("./routes/songs");
app.use("/api/songs/", songRoute);

mongoose.connect(process.env.DB_STRING, {useNewUrlParser: true});
mongoose.connection
.once("open",() => console.log("Connected"))
.on("error",(error)=>{
  console.log(`ERROR : ${error}`);
})
let PORT = 8000
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));