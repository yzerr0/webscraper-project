'use client'

import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { title } from 'process';

const Page = () => {
  const [url, setUrl] = useState('');
  const [data, setData] = useState<ScrapedData | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrape = async () => {
    if(!url) {
      setError('URL is required');
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await axios.get('http://localhost:4000/api/scrape', { params: { url }});
      setData({title: response.data.title, body: response.data.body});
      console.log(`Response data: ${response.data}`);
    } catch (err) {
      setError('Error scraping URL');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400">
      <h1 className="text-4xl font-bold mb-4">Simple Web Scraper</h1>
      <p className="mb-4 text-lg">Enter a URL to scrape:</p>
      <input
        type="text"
        className="border rounded p-2 mb-4 w-1/2 text-black"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={scrape}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Scraping...' : 'Scrape'}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {data && (
        <div className="bg-white shadow-md rounded p-4 mt-4 w-1/2">
          <h2 className="text-2xl font-bold mb-2 text-black">Scraped Data:</h2>
          <pre className="whitespace-pre-wrap text-black text-xl">{data.title}</pre>
          <p className="text-base text-black">{data.body}</p>
        </div>
      )}
    </div>
  );
}

interface ScrapedData {
  title: string;
  body: string;
}

export default Page;