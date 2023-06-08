import mongoose from "mongoose";

const WatchlistSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  item_id: {
    type: Number,
    required: true,
  },
  isMarked: {
    type: Boolean,
    default: false,
  },
  poster_path: {
    type: String,
    required:true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("watchlist", WatchlistSchema);
