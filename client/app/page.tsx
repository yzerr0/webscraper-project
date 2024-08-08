import React, {useEffect, useState} from 'react';
//import axios from 'axios';

const Page = () => {

  useEffect(() => {
    fetch('http://localhost:3000/api/scrape').then(res => res.json()).then(data => console.log(data));
  });

  return (
    <div className="flex items-center justify-center">
      <h1 className="flex">simple webscraper</h1>
      <p className="flex">Enter a URL to scrape:</p>
    </div>
  );
}

export default Page;