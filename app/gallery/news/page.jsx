// in /app/gallery/news/page.js

"use client"
import { getNews } from '@/utils/contentful'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { Newspaper, PlayCircle } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'
import { NewsModalDetail } from '@/components/NewsModalDetail' 

function NewsGalleryPage() {
    const { t } = useTranslation();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNews, setSelectedNews] = useState(null); 

    useEffect(() => {
        // ... (fetchNews function remains the same)
        const fetchNews = async () => {
            try {
                const res = await getNews();
                if (!res || res.length === 0) {
                    setError('No news articles found.');
                } else {
                    setNewsItems(res);
                }
            } catch (err) {
                setError('Failed to load news articles.');
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center flex-col">
                    <h1 className="text-4xl font-bold pt-10 pb-8"><Newspaper className="inline-block mr-2" />{t('gallery.newsGallery')}</h1>
                    <div className="w-24 h-2.5 bg-[#F53D3D] rounded-full mb-10 relative -top-4"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            // ... (Skeleton loading state remains the same)
                            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <Skeleton className="w-full h-48" />
                                <div className="p-4">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-5/6 mt-1" />
                                </div>
                            </div>
                        ))
                    ) : (
                        newsItems.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group cursor-pointer"
                                onClick={() => setSelectedNews(item)} // Set selected item on click
                            >
                                <div className="relative w-full h-48 bg-gray-100">
                                    {item.mediaType === 'video' ? (
                                        <>
                                            <div className="absolute inset-0 bg-black bg-opacity-30 z-10 flex items-center justify-center">
                                                <PlayCircle className="text-white opacity-80" size={64} />
                                            </div>
                                            <video
                                                src={item.mediaUrl}
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F53D3D] truncate">{item.title}</h3>
                                    {/* Use line-clamp to limit summary to 2 lines */}
                                    <p className="text-gray-600 text-sm line-clamp-2">{item.summary}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Render the Modal */}
            <NewsModalDetail
                isOpen={!!selectedNews} 
                newsItem={selectedNews} 
                onClose={() => setSelectedNews(null)} 
            />
        </>
    );
}

export default NewsGalleryPage;