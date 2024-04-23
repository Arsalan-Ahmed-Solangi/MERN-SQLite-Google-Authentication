//****ImportingPackages******//
const express = require('express');
const dotenv = require('dotenv')
dotenv.config();
const cors = require('cors');
const app = express();
const port = process.env.PORT || 6000;

const passport = require("./config/passport");


//*****Middlewares*******//
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use(passport.initialize());


//****ConfigRoutes*******//
const userRoute = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
app.use("/api/users", userRoute);
app.use("/api/auth", authRoutes);


//****Listening******//
app.listen(port, () => {
    console.log(`Application running on port no: ${port} `)
})