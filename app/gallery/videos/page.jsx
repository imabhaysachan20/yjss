"use client"
import { getVideos } from '@/utils/contentful'
import React, { useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Video } from 'lucide-react'
import { useTranslation } from '@/contexts/TranslationContext'

function VideoGalleryPage() {
    const { t } = useTranslation();
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await getVideos();
                if (!res || res.length === 0) {
                    setError('No videos found.');
                } else {
                    setVideos(res);
                }
            } catch (err) {
                setError('Failed to load videos.');
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center flex-col">
                <h1 className="text-4xl font-bold pt-10 pb-8"><Video className="inline-block mr-2" />{t('gallery.videoGallery')}</h1>
                <div className="w-24 h-2.5 bg-[#F53D3D] rounded-full mb-10 relative -top-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <div key={index}>
                            <Skeleton className="w-full aspect-video rounded-lg" />
                            <Skeleton className="h-4 w-3/4 mt-2" />
                        </div>
                    ))
                ) : (
                    videos.map((video, index) => (
                        <div key={index} className="rounded-lg overflow-hidden shadow-lg group">
                            <div className="aspect-video bg-black">
                                <video controls className="w-full h-full object-cover">
                                    <source src={video.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <div className="p-4 bg-white">
                                <h3 className="text-lg font-semibold text-gray-800">{video.title}</h3>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default VideoGalleryPage;