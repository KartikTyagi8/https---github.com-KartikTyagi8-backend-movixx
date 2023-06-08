import express from "express";
import connectToMongo from "./db.js";
import userRouter from "./routes/userRoute.js";
import watchlistRouter from "./routes/watchlistRoute.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/Error.js";
import cors from "cors";

const app = express();
config({
  path: "./config.env",
});

connectToMongo();
const PORT = process.env.PORT;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello ji, kaise ho ji");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/watchlist", watchlistRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT} in ${process.env.NODE_ENV} mode`);
});
