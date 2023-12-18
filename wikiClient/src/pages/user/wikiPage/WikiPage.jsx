import './WikiPage.css';
import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const WikiPage = () => {
  const { slug } = useParams();
  const [pageContent, setPageContent] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const location = useLocation();
  const { searchTerm } = location.state || {}
  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        console.log(searchTerm,'iiiiiiiiiiiiiiiii');
        const response = await axios.get(`/read/${slug}`,{params:{searchTerm}}
        );
        
        if (response.data.error) {
          console.error(response.data.error);
          return;
        }

        const { content, title } = response.data;
        const extractedContent = typeof content === 'object' ? content['*'] : content;

        setPageContent(extractedContent);
        setPageTitle(title);
      } catch (error) {
        console.log(error);
        console.error('Error in fetchPageContent', error);
      }
    };

    fetchPageContent();
  }, [slug]);

  return (
    <div className='wiki-content'>
      <h2>{pageTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    </div>
  );
};

export default WikiPage;
