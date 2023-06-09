import ErrorHandler from "../middleware/Error.js";
import Watchlist from "../models/Watchlist.js";

export const newWatchlist = async (req, res, next) => {
  try {
    const { type, item_id, poster_path } = req.body;
    const userid = req.user._id;

    let list = await Watchlist.findOne({ item_id,user:userid });

    if (list) {
      return next(
        new ErrorHandler(`This ${type} is already in your Watchlist`, 404)
      );
    }

    list = await Watchlist.create({
      type,
      item_id,
      user: req.user,
      poster_path,
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

    let list = await Watchlist.find({ user: userid });

    res.status(200).json({
      success: true,
      list,
    });
  } catch (error) {
    next(error);
  }
};

export const checkWatchlistItem = async (req, res, next) => {
    try {
      const {item_id} = req.params;
      const userid = req.user._id;
  
      let item = await Watchlist.findOne({ item_id ,user:userid });
  
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Item is not found"
        });
      }
  
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      next(error);
    }
  };

export const findWatchlistItem = async (req, res, next) => {
    try {
      const {item_id} = req.params;
      const userid = req.user._id;
  
      let item = await Watchlist.findOne({ item_id:item_id,user:userid });
  
      if (!item) {
        return res.status(404).json({
          success: false,
          message: "Watchlist item not found",
        });
      }
  
      res.status(200).json({
        success: true,
        item,
      });
    } catch (error) {
      next(error);
    }
  };

  export const updateWatchlist = async (req, res, next) => {
    try {
      const {item_id} = req.params;
      const userId = req.user._id;
  
      const item = await Watchlist.findOne({ item_id: item_id, user: userId });
  
      if (!item) {
        return next(new ErrorHandler("Item not found", 404));
      }
  
      await item.deleteOne();
  
      res.status(200).json({
        success: true,
        message: "Updated Successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  