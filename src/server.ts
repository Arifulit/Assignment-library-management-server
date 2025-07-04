import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";

import routes from "./modules/routes";
const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Library Management System API",
  });
});

app.listen(config.port, () => {
  console.log("Server is running on port 5000");
});


async function server() {
  try {
    console.log(config);
    await mongoose.connect(config.databse_url!);

    console.log(`Database connected successfully ${5000}`);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.error(`server error: ${server}`);
  }
}

server();
