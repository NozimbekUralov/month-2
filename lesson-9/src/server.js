import express from "express";

import { config } from "./utils/index.js";
import { mainRoutes, viewRoutes } from "./routes/index.js";

const app = express();
const { PORT } = config;

app.use(express.json());

app.use("/api", mainRoutes);
app.use(viewRoutes);

app.use(express.static(`${process.cwd()}/public`));

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));