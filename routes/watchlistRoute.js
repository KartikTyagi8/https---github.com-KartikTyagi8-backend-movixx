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

router.delete("/:id", isAuthenticated, updateWatchlist);

router.get("/:item_id/check", isAuthenticated, checkWatchlistItem);

router.get("/:id",isAuthenticated, findWatchlistItem);



export default router;
