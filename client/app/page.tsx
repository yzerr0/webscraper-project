'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Page = () => {

  useEffect(() => {
    fetch('http://localhost:3000/api/scrape').then(res => res.json()).then(data => console.log(data));
    // axios("http://localhost:4000/api/scrape").then(res => console.log(res));
  });

  return (
    <div className="flex items-center justify-center">
      <h1 className="block">simple webscraper</h1>
      <p className="block">Enter a URL to scrape:</p>
    </div>
  );
}

export default Page;