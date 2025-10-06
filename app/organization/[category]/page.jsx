"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';

function OrganizationCategoryPage() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const params = useParams();
    const { category } = params;

    useEffect(() => {
        if (category) {
            // Set a user-friendly title from the URL slug
            const pageTitle = category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
            setTitle(pageTitle);

            const fetchMembers = async () => {
                setLoading(true);
                try {
                    const response = await fetch(`/api/organization/${category}`);
                    if (response.ok) {
                        const data = await response.json();
                        setMembers(data);
                    } else {
                        setMembers([]);
                    }
                } catch (error) {
                    console.error("Failed to fetch members", error);
                    setMembers([]);
                } finally {
                    setLoading(false);
                }
            };
            fetchMembers();
        }
    }, [category]);

    if (loading) {
        return <div className="text-center py-20">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
            
            {members.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {members.map(member => (
                        <div key={member._id} className="border rounded-lg shadow-lg text-center p-4">
                            <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                                <Image src={member.photoUrl} alt={member.naam} layout="fill" objectFit="cover" />
                            </div>
                            <h3 className="font-bold text-lg">{member.naam}</h3>
                            <p className="text-sm text-red-600">{member.pad}</p>
                            <p className="text-sm text-gray-600">{member.jila}</p>
                            {member.sampark && <p className="text-sm text-gray-500">संपर्क: {member.sampark}</p>}
                            {member.atiriktZimedari && <p className="text-xs text-gray-500 mt-1">({member.atiriktZimedari})</p>}
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No members found for this category.</p>
            )}
        </div>
    );
}

export default OrganizationCategoryPage;