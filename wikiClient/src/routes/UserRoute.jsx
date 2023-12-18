import React from 'react'
import { Route, Routes } from "react-router-dom";
import SearchPage from '../pages/user/searchPage/SearchPage';
import WikiPage from '../pages/user/wikiPage/WikiPage';
import MostSearchedKeywords from '../pages/user/mostSearchedKeyword/MostSearchedKeyword';


function UserRoute() {


  return (
    <Routes>
     
          <Route path="/" element={<SearchPage/>} />
          <Route path='/read/:slug' element={<WikiPage/>}/>
          <Route path='/keywords' element ={<MostSearchedKeywords/>}/>
         
    </Routes>
  )
}

export default UserRoute
