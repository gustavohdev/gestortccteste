const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const routes = require("./routes/api");
const path = require("path");
require("dotenv").config();

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://admin:admin@oficina.busoo.mongodb.net/oficina?retryWrites=true&w=majority`);

app.use(bodyParser.json());
app.use("/api", routes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
