const express = require("express");

const { serverConfig } = require("./utils");
const viewsRouter = require("./routes/views")
const mainRouter = require("./routes/index");

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/api", mainRouter)
app.use("/", viewsRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`server is running on http://localhost:${serverConfig.PORT}`);
});