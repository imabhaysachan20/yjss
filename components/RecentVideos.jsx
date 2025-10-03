'use client';

import { useState, useEffect } from 'react';
import { getVideos } from '@/utils/contentful';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlayCircle } from 'lucide-react';

export default function RecentVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      const allVideos = await getVideos();
      setVideos(allVideos.slice(0, 3));
      setLoading(false);
    };

    fetchVideos();
  }, []);

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Videos</h2>
        <Link href="/gallery/videos">
          <Button variant="outline">View All Videos</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3).fill(null).map((_, index) => (
            <div key={`skeleton-${index}`}>
              <Skeleton className="w-full aspect-video rounded-lg" />
              <Skeleton className="h-4 w-3/4 mt-2" />
            </div>
          ))
        ) : (
          videos.map((video, index) => (
            // This Link wrapper is already correct
            <Link href="/gallery/videos" key={index}>
              <Card className="rounded-lg overflow-hidden shadow-lg group h-full">
                <div className="aspect-video bg-black relative">
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="text-white" size={64}/>
                  </div>
                  <video
                    src={video.videoUrl}
                    className="w-full h-full object-cover"
                    preload="metadata"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="text-md font-semibold text-gray-800 truncate">{video.title}</h3>
                </div>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}