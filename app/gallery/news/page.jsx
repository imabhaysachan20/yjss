"use client"
import { getNews } from '@/utils/contentful'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Skeleton } from "@/components/ui/skeleton"
import { Newspaper } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'
import Link from 'next/link'

function NewsGalleryPage() {
    const { t } = useTranslation();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center flex-col">
                <h1 className="text-4xl font-bold pt-10 pb-8"><Newspaper className="inline-block mr-2" />{t('gallery.newsGallery')}</h1>
                <div className="w-24 h-2.5 bg-[#F53D3D] rounded-full mb-10 relative -top-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
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
                        <Link href={item.link} key={index} target="_blank" rel="noopener noreferrer">
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
                                <div className="relative w-full h-48">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#F53D3D]">{item.title}</h3>
                                    <p className="text-gray-600 text-sm">{item.summary}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

export default NewsGalleryPage;