const cors = require("cors")
const express = require("express")
const path = require("path")
require("dotenv").config()
const port = process.env.PORT
const app = express()
const corsConfig = {
    origin: "*"
}
app.use(cors(corsConfig))
app.use(express.json())
const apiRoutes = require("./routes")
const { default: mongoose } = require("mongoose")

//db connect
mongoose.connect(process.env.mongoURI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Listening to port ${port}`);
    });
}).catch(e => {
    console.log('database connection failed');
    console.log(e);
});
app.get("/", (req, res) => {
    res.end("server is running")
})
app.use("/api", apiRoutes)
app.use(express.static(path.join(__dirname, 'uploads')));
