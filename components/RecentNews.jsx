'use client';

import { useState, useEffect } from 'react';
import { getNews } from '@/utils/contentful';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';


export default function RecentNews() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchNews = async () => {
      const allNews = await getNews();
       console.log("RECEIVED NEWS DATA:", allNews);
      setNewsItems(allNews.slice(0, 3));
      setLoading(false);
    };

    fetchNews();
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent News</h2>
        <Link href="/gallery/news">
          <Button variant="outline">View All News</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loading ? (
          Array(3).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Skeleton className="w-full h-48" />
              <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))
        ) : (
          newsItems.map((item, index) => (
            // Wrap the entire Card component in a Link
            <Link href="/gallery/news" key={index}>
              <Card 
                className="overflow-hidden transform hover:scale-105 transition-transform duration-300 group cursor-pointer h-full"
              >
                <div className="relative w-full h-48 bg-gray-100">
                  {item.mediaType === 'video' ? (
                    <>
                      <div className="absolute inset-0 bg-black bg-opacity-30 z-10 flex items-center justify-center">
                        <PlayCircle className="text-white opacity-80" size={64} />
                      </div>
                      <video
                        src={item.mediaUrl}
                        poster={item.thumbnailUrl} 
                        className="w-full h-full object-cover"
                        preload="metadata"
                      />
                    </>
                  ) : (
                    <Image
                      src={item.mediaUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#F53D3D] truncate">{item.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}