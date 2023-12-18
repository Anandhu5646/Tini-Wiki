import searchHistoryModel from "../models/searchHistoryModel.js";

const adminControl = {
  dashboard: async (req, res) => {
    try {
      const searchTermCounts = await searchHistoryModel.aggregate([
        {
          $group: {
            _id: "$searchTerm",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            searchTerm: "$_id",
            count: 1,
            _id: 0,
          },
        },
      ]);

      let totalSearches = await searchHistoryModel.countDocuments();
      res.json({ totalSearches, searchTermCounts });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

export default adminControl;
