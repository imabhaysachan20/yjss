import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/connectToDb';
import OrganizationalMember from '@/models/OrganizationalMember';

// PUT (update) a member
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const body = await request.json();
        const updatedMember = await OrganizationalMember.findByIdAndUpdate(params.id, body, { new: true });
        if (!updatedMember) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json(updatedMember);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update member' }, { status: 500 });
    }
}

// DELETE a member
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const deletedMember = await OrganizationalMember.findByIdAndDelete(params.id);
        if (!deletedMember) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Member deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete member' }, { status: 500 });
    }
}