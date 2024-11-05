const express = require("express");
const userRouter = require("./Routes/userRouter")


const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello world");
});

app.use("/v1/Signup", userRouter)

app.get("*", (req, res) => {
    res.status(404).send("Not Found");
})


module.exports = app