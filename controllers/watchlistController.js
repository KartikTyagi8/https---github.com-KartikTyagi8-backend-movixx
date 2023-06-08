import ErrorHandler from "../middleware/Error.js";
import Watchlist from "../models/Watchlist.js";

export const newWatchlist = async (req, res, next) => {
  try {
    const { type, item_id } = req.body;

    let list = await Watchlist.findOne({ item_id });

    if (list) {
      return next(
        new ErrorHandler(`This ${type} is already in your Watchlist`, 404)
      );
    }

    list = await Watchlist.create({
      type,
      item_id,
      user: req.user,
      isMarked: true,
    });

    res.status(200).json({
      success: true,
      message: "Item added successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const myWatchlist = async (req, res, next) => {
  try {
    const userid = req.user._id;

    let list = await Watchlist.find({ user: userid, isMarked: true });

    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWatchlist = async (req, res, next) => {
  try {
    const { id } = req.params;

    const list = await Watchlist.findById(id);
    if (!list) {
      return next(new ErrorHandler("Item not found", 404));
    }

    list.isMarked = !list.isMarked;
    await list.deleteOne();

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
