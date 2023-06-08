import express from "express";
import Watchlist from "../models/Watchlist.js";
import { isAuthenticated } from "../middleware/Auth.js";
import {
  newWatchlist,
  myWatchlist,
  updateWatchlist,
  findWatchlistItem,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/new", isAuthenticated, newWatchlist);

router.get("/my", isAuthenticated, myWatchlist);

router.delete("/:item_id", isAuthenticated, updateWatchlist);

router.get("/:item_id",isAuthenticated, findWatchlistItem);

export default router;
