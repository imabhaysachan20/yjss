"use client"
import { getImages } from '@/utils/contentful'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { ImageModal } from '@/components/ImageModal'
import { ImageIcon } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

function GalleryPage() {
  const {t} = useTranslation()
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const observer = useRef();
  const imagesPerPage = 6;

  const lastImageRef = (node) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const res = await getImages();
        
        if (!res || res.length === 0) {
          setError('No images found in the gallery');
          return;
        }

        setImages(res);
        setHasMore(res.length > page * imagesPerPage);
      } catch (err) {
        setError('Failed to load images. Please try again later.');
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [page]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({
      ...prev,
      [index]: true
    }));
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Gallery</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center flex-col">
        <h1 className="text-4xl font-bold pt-10 pb-8"><ImageIcon className="inline-block mr-2" />{t('gallery.heading')}</h1>
        <div className="w-[100px] h-[10px] bg-[#F53D3D] rounded-3xl mb-10 relative -top-4"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          // Skeleton loading state
          Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg shadow-lg">
              <Skeleton className="aspect-square w-full" />
            </div>
          ))
        ) : (
          images.slice(0, page * imagesPerPage).map((img, index) => (
            <div
              key={index}
              ref={index === images.slice(0, page * imagesPerPage).length - 1 ? lastImageRef : null}
              className="relative group overflow-hidden rounded-lg shadow-lg transition-all duration-500 hover:scale-105"
            >
              <div className="aspect-square relative">
                {!loadedImages[index] && (
                  <Skeleton className="absolute inset-0" />
                )}
                <Image
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    loadedImages[index] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                  } cursor-pointer sm:group-hover:opacity-75`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  unoptimized
                  priority={index < 4}
                  onLoad={() => handleImageLoad(index)}
                  onClick={() => setSelectedImage(img)}
                  onError={(e) => {
                    console.error(`Error loading image ${index}:`, img);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 hidden sm:flex group-hover:opacity-100 transition-all duration-300 items-center justify-center">
                <button 
                  className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100"
                  onClick={() => setSelectedImage(img)}
                >
                  View Image
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {!loading && !hasMore && images.length > 0 && (
        <div className="text-center py-8 text-gray-600">
          No more images to load
        </div>
      )}

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage}
      />
    </div>
  );
}

export default GalleryPage;
