import express from "express";
import Watchlist from "../models/Watchlist.js";
import { isAuthenticated } from "../middleware/Auth.js";
import {
  newWatchlist,
  myWatchlist,
  updateWatchlist,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/new", isAuthenticated, newWatchlist);

router.get("/my", isAuthenticated, myWatchlist);

router.delete("/:id", isAuthenticated, updateWatchlist);

export default router;
