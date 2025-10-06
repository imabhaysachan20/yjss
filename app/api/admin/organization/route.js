import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/connectToDb';
import OrganizationalMember from '@/models/OrganizationalMember';

// GET all members for the admin list
export async function GET() {
    try {
        await connectDB();
        const members = await OrganizationalMember.find({}).sort({ kramSankhya: 1 });
        return NextResponse.json(members);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch members' }, { status: 500 });
    }
}

// POST a new member
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const newMember = new OrganizationalMember(body);
        await newMember.save();
        return NextResponse.json(newMember, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create member' }, { status: 500 });
    }
}