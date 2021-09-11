const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
app.use(express.json({extented: false}));
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));
const PORT_NUM = 5000
app.listen(PORT_NUM, () => {
    console.log("Server listening on port: ", PORT_NUM);
})

