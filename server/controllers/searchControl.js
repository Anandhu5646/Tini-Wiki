
import searchHistoryModel from "../models/searchHistoryModel.js";
import axios from 'axios'

const searchControl = {
  searchTopic: async (req, res) => {
    
    const { searchTerm } = req.params;
    console.log(searchTerm,'searchterm');
  try {
    const response = await axios.get('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        list: 'search',
        srsearch: searchTerm,
      },
    });
    const searchResults = response.data
    res.json(searchResults);
  } catch (error) {
    console.error('Something went wrong...', error); 
    res.status(500).json({ error: 'Internal Server Error' });
  }
  },

  pageInfo: async (req, res) => {
    const { slug } = req.params;
const { searchTerm } = req.query;

    console.log(searchTerm,'this is searchterm');
    console.log(slug,'slug');
    try {
    
        const response = await axios.get(`https://en.wikipedia.org/w/api.php?action=parse&format=json&page=${slug}`);
        const pageContent = response.data.parse.text;
        const pageTitle = response.data.parse.title;
        let existingRecord = await searchHistoryModel.findOne({ searchTerm:searchTerm, visitedPage: slug });

        if (!existingRecord) {
           
            let searchHistory = new searchHistoryModel({ searchTerm, visitedPage: slug });
            await searchHistory.save();
        }
        res.json({ title: pageTitle, content: pageContent });
      } catch (error) { 
        console.error('Something went wrong...', error);
        res.status(500).json({ error: 'Internal Server Error' });
      } 
  }, 
  
  mostSearchedKeyword:async(req,res)=>{
    try {
      const order = req.params.order.toLowerCase();
    
      if (order !== 'asc' && order !== 'desc') {
        return res.status(400).json({ error: 'Invalid order parameter' });
      }

      const mostSearchedKeywords = await searchHistoryModel.aggregate([
        {
          $group: {
            _id: '$searchTerm',
            count: { $sum: 1 },
          },
        },
        {
          $sort: {
            count: order === 'asc' ? 1 : -1,
          },
        },
        {
          $project: {
            searchTerm: '$_id',
            count: 1,
            _id: 0,
          },
        },
      ]);
  console.log(mostSearchedKeywords,'wwwwwwwwwwwwwwwwwwww');
      res.json(mostSearchedKeywords);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};  

export default searchControl
