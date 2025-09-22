const mongoose = require("mongoose");
const express = require("express");
const app = express();
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser");

dotenv.config(); // env ke variables
/*****************db connection***************/
// const dbLink = `mongodb+srv://${process.env.DB_USERNAME}
// :${process.env.DB_PASSWORD}@cluster0.zc5df.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const dbLink =`mongodb://localhost:27017/admin` ;

mongoose.connect(dbLink)
    .then(function (connection) {
        console.log("connected to db")
    }).catch(err => console.log(err))

/*******************************************/
const cors = require("cors");

// Enable CORS for frontend (Vite default port is 5173)
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));

// middleWare -> user -> object is not empty
app.use(express.json());
app.use(cookieParser());


/**************auth ke methods and route************/
const authRouter = require("./router/authRouter.js");
const userRouter = require("./router/userRouter.js");
const chatbotRouter = require("./api/chatbot.js");


app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatbotRouter);



app.listen(3000, function () {
    console.log("Server started on port 3000")
})