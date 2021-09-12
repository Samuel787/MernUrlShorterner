const express = require("express");
const connectDB = require("./config/db");
var cors = require("cors")
const app = express();

connectDB();
app.use(cors())
app.use(express.json({extented: false}));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
const PORT_NUM = 5000
app.listen(PORT_NUM, () => {
    console.log("Server listening on port: ", PORT_NUM);
})

