'use client';

import { useState, useEffect } from 'react';
import { getImages } from '@/utils/contentful';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function RecentImages() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      const allImages = await getImages();
      // Get only the 6 most recent images
      setImages(allImages.slice(0, 3));
      setLoading(false);
    };

    fetchImages();
  }, []);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  return (
    <div className="w-full py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Images</h2>
        <Link href="/gallery/images">
          <Button variant="outline">View All Images</Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          // Skeleton loading state
          Array(3).fill(null).map((_, index) => (
            <Card key={`skeleton-${index}`} className="overflow-hidden">
              <div className="aspect-square">
                <Skeleton className="w-full h-full" />
              </div>
            </Card>
          ))
        ) : (
          // Actual images
          images.map((imageUrl, index) => (
            <Card 
              key={index} 
              className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-105"
            >
              <div className="aspect-square relative">
                {!loadedImages[index] && (
                  <Skeleton className="absolute inset-0" />
                )}
                <Image
                  src={imageUrl}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    loadedImages[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  }`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={index < 2 ? 'eager' : 'lazy'}
                  priority={index < 2}
                  onLoad={() => handleImageLoad(index)}
                  unoptimized
                  onError={(e) => {
                    console.error(`Error loading image ${index}:`, imageUrl);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <Link href="/gallery/images" className="absolute inset-0 bg-black/50 opacity-0 hidden sm:flex group-hover:opacity-100 transition-all duration-300 items-center justify-center">
                <button className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100">
                  View Gallery
                </button>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
