import mongoose from "mongoose";


const searchHistorySchema=new mongoose.Schema({
    searchTerm:{type:String},
    visitedPage:[{ type: String }],
    timestamp: { type: Date, default: Date.now },
})
const searchHistoryModel=mongoose.model("searchhistories",searchHistorySchema)
export default searchHistoryModel