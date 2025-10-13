import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/connectToDb';
import OrganizationalMember from '@/models/OrganizationalMember';

// Helper function remains the same
function slugToTitleCase(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
}

export async function GET(request, { params }) {
    try {

        const { category } = params;

        if (!category) {
            return NextResponse.json({ error: 'Category parameter is missing' }, { status: 400 });
        }
        
    

        await connectDB();
        
        // Use the new 'category' variable
        const categoryName = slugToTitleCase(category);
        const members = await OrganizationalMember.find({ pad: categoryName }).sort({ kramSankhya: 1 });

        if (!members || members.length === 0) {
            return NextResponse.json({ error: 'No members found for this category' }, { status: 404 });
        }
        
        return NextResponse.json(members);
    } catch (error) {
        console.error("API Error:", error); 
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}