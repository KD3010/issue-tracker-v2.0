import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));

// Routes
app.get("/", (_, res) => {
    res.send("This is home route")
})

app.use("/api/v1/projects", projectRoutes)
app.use("/api/v1/tasks", taskRoutes)

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
    console.log(`Server running on Port:${Port}`)
})
