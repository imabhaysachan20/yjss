"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Base64Upload from '@/components/Base64upload'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";


const positions = [
    'Vice President', 'State President', 'District President', 
    'Social Media', 'Spokesperson', 'Election Program'
];

const initialFormState = {
    kramSankhya: '', naam: '', pad: '', sampark: '', jila: '', atiriktZimedari: '', photoUrl: ''
};

function OrganizationAdminPage() {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);

    const fetchMembers = async () => {
        const response = await fetch('/api/admin/organization');
        const data = await response.json();
        setMembers(data);
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, pad: value }));
    };
     const handlePhotoUpload = (base64String) => {
        setFormData(prev => ({ ...prev, photoUrl: base64String }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingId ? `/api/admin/organization/${editingId}` : '/api/admin/organization';
        const method = editingId ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            toast.success(`Member ${editingId ? 'updated' : 'added'} successfully!`);
            setFormData(initialFormState);
            setEditingId(null);
            fetchMembers();
        } else {
            toast.error('Failed to save member.');
        }
    };

    const handleEdit = (member) => {
        setEditingId(member._id);
        setFormData({
            kramSankhya: member.kramSankhya,
            naam: member.naam,
            pad: member.pad,
            sampark: member.sampark || '',
            jila: member.jila || '',
            atiriktZimedari: member.atiriktZimedari || '',
            photoUrl: member.photoUrl,
        });
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        
        const response = await fetch(`/api/admin/organization/${id}`, { method: 'DELETE' });
        if (response.ok) {
            toast.success('Member deleted successfully!');
            fetchMembers();
        } else {
            toast.error('Failed to delete member.');
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Organization Members</h2>

            {/* Form for adding/editing members */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Input name="kramSankhya" type="number" placeholder="क्र.सं." value={formData.kramSankhya} onChange={handleInputChange} required />
                <Input name="naam" placeholder="नाम" value={formData.naam} onChange={handleInputChange} required />
                <Select onValueChange={handleSelectChange} value={formData.pad}>
                    <SelectTrigger><SelectValue placeholder="पद" /></SelectTrigger>
                    <SelectContent>
                        {positions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Input name="sampark" placeholder="संपर्क" value={formData.sampark} onChange={handleInputChange} />
                <Input name="jila" placeholder="जिला" value={formData.jila} onChange={handleInputChange} />
                <Input name="atiriktZimedari" placeholder="अतिरिक्त जिम्मेदारी" value={formData.atiriktZimedari} onChange={handleInputChange} />
                <div className="lg:col-span-2">
                    <Label>Photo</Label>
                    <Base64Upload 
                        value={formData.photoUrl} 
                        onUpload={handlePhotoUpload}
                    />
                </div>
                <Button type="submit" className="col-span-full">{editingId ? 'Update Member' : 'Add Member'}</Button>
                 {editingId && <Button variant="secondary" onClick={() => { setEditingId(null); setFormData(initialFormState); }}>Cancel Edit</Button>}
            </form>

            {/* Table of existing members */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>क्र.सं.</TableHead>
                        <TableHead>नाम</TableHead>
                        <TableHead>पद</TableHead>
                        <TableHead>जिला</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {members.map(member => (
                        <TableRow key={member._id}>
                            <TableCell>{member.kramSankhya}</TableCell>
                            <TableCell>{member.naam}</TableCell>
                            <TableCell>{member.pad}</TableCell>
                            <TableCell>{member.jila}</TableCell>
                            <TableCell className="space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(member)}>Edit</Button>
                                <Button size="sm" variant="destructive" onClick={() => handleDelete(member._id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default OrganizationAdminPage;