"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';

export const NewsModalDetail = ({ isOpen, newsItem, onClose }) => {
    if (!isOpen || !newsItem) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
                >
                    <X size={24} />
                </button>

                {newsItem.mediaUrl && (
                    <div className="relative w-full h-64 sm:h-80 bg-gray-200">
                        {newsItem.mediaType === 'video' ? (
                            <video src={newsItem.mediaUrl} className="w-full h-full object-cover" controls autoPlay muted loop />
                        ) : (
                            <Image src={newsItem.mediaUrl} alt={newsItem.title} fill className="object-cover" unoptimized />
                        )}
                    </div>
                )}
                
                <div className="p-6 sm:p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{newsItem.title}</h2>
                    
                    <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
                        {newsItem.summary}
                    </p>

                    {/* This entire block will only appear if a link exists */}
                    {newsItem.link && (
                        <div className="mt-8 pt-4 border-t">
                            <Link href={newsItem.link} target="_blank" rel="noopener noreferrer" className="inline-block bg-[#F53D3D] text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors">
                                Read Full Story
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};