import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config";
import routes from "./modules/routes";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://library-management-client-ruby.vercel.app"
  ],
}));

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
  res.send({
    success: true,
    message: "Welcome to Library Management System API",
  });
});

async function server() {
  try {
    await mongoose.connect(config.database_url!); 
    console.log("✅ Database connected successfully");

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });

  } catch (error) {
    console.error("❌ Error connecting to server:", error);
  }
}

server();
