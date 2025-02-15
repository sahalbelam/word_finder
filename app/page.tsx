'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search } from 'lucide-react';

const Page = () => {
  const [ytLink, setYtLink] = useState('');
  const [word, setWord] = useState('');
  const [time, setTime] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<{ text: string; offset: number; duration: number }[]>([]);

  const extractVideoId = (url: string) => {
    try {
      const match = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?/\s]{11})/
      );
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };
  

  const handleRequest = async () => {
    setError('');
    setSearchResults([]);
    setLoading(true);
  
    try {
      const videoId = extractVideoId(ytLink);
      if (!videoId) {
        throw new Error("Invalid YouTube link. Please enter a valid YouTube URL.");
      }
  
      if (!word.trim()) {
        throw new Error("Please enter a word to search.");
      }
  
      console.log(videoId);
  
      const response = await fetch(`${window.location.origin}/api/yt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId }),
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch transcript.');
      }
  
      const transcript = data.transcript;
      const regex = new RegExp(`\\b${word}\\b`, "i");
      const matches = transcript.filter((item: { text: string }) => regex.test(item.text));
  
      if (matches.length > 0) {
        setSearchResults(matches);
        setTime(matches[0].offset / 100);
      } else {
        setError(`The word "${word}" was not found in the transcript.`);
        setTime(0);
      }
    }catch (error) {
      if (error instanceof Error) {
        setError(error.message || "An error occurred while fetching the transcript.");
      } else {
        setError("An unknown error occurred.");
      }
      setTime(0);
    } finally {
      setLoading(false);
    }
  };

  const videoId = ytLink ? extractVideoId(ytLink) : null;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Search className="w-6 h-6" />
            WordFinder for YouTube
          </h1>
          <p className="text-gray-400 mt-2">
            Search for specific words in YouTube videos and jump directly to those moments
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-3xl mx-auto w-full p-4 space-y-4">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Input
                className="text-black"
                value={ytLink}
                onChange={(e) => setYtLink(e.target.value)}
                placeholder="Enter YouTube link"
                disabled={loading}
              />
              <Input
                className="text-black"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word to search"
                disabled={loading}
              />
              <Button
                onClick={handleRequest}
                disabled={loading || !ytLink || !word}
                className="w-full"
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Found {searchResults.length} occurrence(s) of &quot;{word}&quot;
                </p>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {searchResults.map((result, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start text-left"
                      onClick={() => setTime(result.offset)}
                    >
                      <span className="truncate">
                        {result.text}
                      </span>
                      <span className="ml-2 text-gray-500">
                        ({Math.floor(result.offset)}s)
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {videoId && (
          <div className="aspect-video">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?start=${Math.floor(time)}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-4 px-4 mt-8">
        <div className="max-w-3xl mx-auto text-center">
        Created by
          <a 
            href="https://www.linkedin.com/in/sahal-belam-11531b232/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pl-1 hover:text-blue-400 transition-colors duration-200"
          >
             Sahal Belam
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Page;