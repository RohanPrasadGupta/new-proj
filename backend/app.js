const express = require("express");
const userRouter = require("./Routes/userRouter")
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:3001",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
}


const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/v1/Signup", userRouter)

app.get("*", (req, res) => {
    res.status(404).send("Not Found");
})


module.exports = app