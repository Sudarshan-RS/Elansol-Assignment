require("dotenv").config();
const express = require("express");
const cors = require("cors")
const app = express();
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const adminRoute = require("./router/admin-router")


// let's tackle cors

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "POST, GET, PUT, DELETE, PATCH, HEAD ",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());                                        // middleware

app.use("/api/auth", authRoute);
app.use("/api/admin",adminRoute)

app.use(errorMiddleware);                                       // for store errors in one file

const PORT = 5000;                                                              
connectDb().then(() => {                                        // try{
                                                                //     app.listen(PORT);    
    app.listen(PORT, () => {                                    //  }catch(error){
        console.log(`Server started on port ${PORT}`);          //     console.log("something went wrong");
    })                                                          //  }
})                                                               