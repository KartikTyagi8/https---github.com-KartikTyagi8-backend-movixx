import express from "express";
import Watchlist from "../models/Watchlist.js";
import { isAuthenticated } from "../middleware/Auth.js";
import {
  newWatchlist,
  myWatchlist,
  updateWatchlist,
  findWatchlistItem,
  checkWatchlistItem,
} from "../controllers/watchlistController.js";

const router = express.Router();

router.post("/new", isAuthenticated, newWatchlist);

router.get("/my", isAuthenticated, myWatchlist);

router.get("/check/:item_id", isAuthenticated, checkWatchlistItem);

router.get("/:item_id",isAuthenticated, findWatchlistItem);

router.delete("/:item_id", isAuthenticated, updateWatchlist);

export default router;
