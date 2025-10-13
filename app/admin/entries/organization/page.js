"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import Image from "next/image";
import districts from "@/utils/data";

// (Your data structures like kalyanpur, upZones, positions, and initialFormState remain the same)
const kalyanpur = ['नवाबगंज ', 'विष्णुपुरी ', 'पुराना कानपुर ', 'ख्योरा ', 'नारामऊ ', 'बेनाझाबर ', 'तिलक नगर ', 'आवास विकास ', 'कल्याणपुर उत्तरी ', 'कल्याणपुर दक्षिण ', 'गीता नगर ', 'कल्याणपुर पश्चिम', 'पनकी ', 'नानकारी ', 'आंबेडकर नगर काकादेव ', 'काकादेव ', 'अशोक नगर'];
const upZones = { "पश्चिमांचल": { mandals: ["मेरठ मंडल", "आगरा मंडल", "अलीगढ़ मंडल", "सहारनपुर मंडल", "मुरादाबाद मंडल", "बरेली मंडल"], districts: { "मेरठ मंडल": ["मेरठ", "गाजियाबाद", "गौतम बुद्ध नगर", "हापुड़", "बुलंदशहर", "बागपत"], "आगरा मंडल": ["आगरा", "फिरोजाबाद", "मैनपुरी", "मथुरा"], "अलीगढ़ मंडल": ["अलीगढ़", "हाथरस", "कासगंज", "एटा"], "सहारनपुर मंडल": ["सहारनपुर", "मुज़फ्फरनगर", "शामली"], "मुरादाबाद मंडल": ["मुरादाबाद", "रामपुर", "ज्योतिबा फुले नगर", "बिजनौर", "सम्भल"], "बरेली मंडल": ["बरेली", "बदायूं", "पीलीभीत", "शाहजहाँपुर"] } }, "पूर्वांचल": { mandals: ["गोरखपुर मंडल", "देवीपाटन मंडल", "बस्ती मंडल", "आजमगढ़ मंडल", "वाराणसी मंडल", "मिर्जापुर मंडल"], districts: { "गोरखपुर मंडल": ["गोरखपुर", "कुशी नगर", "देवरिया", "महराजगंज"], "देवीपाटन मंडल": ["गोंडा", "बहराइच", "श्रावस्ती", "बलरामपुर"], "बस्ती मंडल": ["बस्ती", "सिद्धार्थ नगर", "संत कबीर नगर"], "आजमगढ़ मंडल": ["आजमगढ़", "मऊ", "बलिया", "अम्बेडकर नगर"], "वाराणसी मंडल": ["वाराणसी", "चन्दौली", "जौनपुर", "गाजीपुर", "भदोही(संत रविदास नगर)"], "मिर्जापुर मंडल": ["मीरजापुर", "सोनभद्र"] } }, "मध्यांचल": { mandals: ["लखनऊ मंडल", "फैजाबाद मंडल", "इलाहाबाद मंडल", "कानपुर मंडल"], districts: { "लखनऊ मंडल": ["लखनऊ", "अयोध्या", "रायबरेली", "उन्नाव", "सीतापुर", "हरदोई", "लखीमपुर खीरी"], "फैजाबाद मंडल": ["फैजाबाद", "अमेठी", "सुल्तानपुर", "बाराबंकी"], "इलाहाबाद मंडल": ["प्रयागराज", "कौशाम्बी", "प्रतापगढ़", "फतेहपुर"], "कानपुर मंडल": ["कानपुर देहात", "कानपुर नगर", "औरैया", "इटावा", "फर्रुखाबाद", "कन्नौज"] } }, "बुंदेलखंड": { mandals: ["झांसी मंडल", "चित्रकूट मंडल"], districts: { "झांसी मंडल": ["झांसी", "जालौन", "ललितपुर", "हमीरपुर", "महोबा"], "चित्रकूट मंडल": ["चित्रकूट", "बाँदा"] } } };
const positions = ['National Executive', 'State Executive', 'Divisional Committee', 'District Committee', 'Assembly Committee', 'Ward Committee', 'Booth Committee', 'Social Media', 'Spokesperson'];
const initialFormState = { kramSankhya: '', naam: '', pad: '', sampark: '', zimedari: '', photoUrl: '', zone: '', mandal: '', jila: '', loksabha: '', vidansabha: '', areaType: '', block: '', gramPanchayat: '', ward: '' };


function OrganizationAdminPage() {
    const [members, setMembers] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [editingId, setEditingId] = useState(null);
    const [uploading, setUploading] = useState(false);

    // --- FIX #1: THIS FUNCTION IS NOW COMPLETE ---
    const fetchMembers = async () => {
        try {
            const response = await fetch('/api/admin/organization');
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            } else {
                throw new Error("Failed to fetch members.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => { fetchMembers(); }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        const newState = { ...formData, [name]: value };
        const resetFields = (fields) => fields.forEach(field => newState[field] = '');
        if (name === 'zone') resetFields(['mandal', 'jila', 'loksabha', 'vidansabha', 'areaType', 'block', 'gramPanchayat', 'ward']);
        if (name === 'mandal') resetFields(['jila', 'loksabha', 'vidansabha', 'areaType', 'block', 'gramPanchayat', 'ward']);
        if (name === 'jila') resetFields(['loksabha', 'vidansabha', 'areaType', 'block', 'gramPanchayat', 'ward']);
        if (name === 'loksabha') resetFields(['vidansabha', 'areaType', 'block', 'gramPanchayat', 'ward']);
        if (name === 'vidansabha') {
            resetFields(['areaType', 'block', 'gramPanchayat', 'ward']);
            if (value === 'कल्याणपुर') newState.areaType = 'urban';
        }
        if (name === 'block') resetFields(['gramPanchayat']);
        setFormData(newState);
    };
    
    const handleAreaTypeChange = (type) => { /* ... (no change) ... */ };
    const handleSubmit = async (e) => { /* ... (no change) ... */ };

    // --- FIX #2: THIS FUNCTION IS NOW COMPLETE ---
    const handleEdit = (member) => {
        setEditingId(member._id);
        setFormData({
            kramSankhya: member.kramSankhya || '',
            naam: member.naam || '',
            pad: member.pad || '',
            sampark: member.sampark || '',
            zimedari: member.zimedari || '',
            photoUrl: member.photoUrl || '',
            zone: member.zone || '',
            mandal: member.mandal || '',
            jila: member.jila || '',
            loksabha: member.loksabha || '',
            vidansabha: member.vidansabha || '',
            areaType: member.areaType || '',
            block: member.block || '',
            gramPanchayat: member.gramPanchayat || '',
            ward: member.ward || ''
        });
    };
    
    const handleDelete = async (id) => { /* ... (no change) ... */ };
    
    const showUrbanOption = formData.jila && districts[formData.jila]?.nagar_nikay?.ward?.length > 0;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Manage Organization Members</h2>

            {/* Your form JSX is correct, no changes needed here */}
            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                {/* ... all your form inputs ... */}
                 <Input name="kramSankhya" type="number" placeholder="क्र.सं." value={formData.kramSankhya} onChange={handleInputChange} required />
                <Input name="naam" placeholder="नाम" value={formData.naam} onChange={handleInputChange} required />
                <Select onValueChange={(value) => handleSelectChange('pad', value)} value={formData.pad}>
                    <SelectTrigger><SelectValue placeholder="पद" /></SelectTrigger>
                    <SelectContent>{positions.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
                <Input name="sampark" placeholder="संपर्क" value={formData.sampark} onChange={handleInputChange} />
                <Input name="zimedari" placeholder="जिम्मेदारी" value={formData.zimedari} onChange={handleInputChange} />
                <Select onValueChange={(value) => handleSelectChange('zone', value)} value={formData.zone}>
                    <SelectTrigger><SelectValue placeholder="क्षेत्र का चयन करें" /></SelectTrigger>
                    <SelectContent>{Object.keys(upZones).map(zone => <SelectItem key={zone} value={zone}>{zone}</SelectItem>)}</SelectContent>
                </Select>
                {formData.zone && ( <Select onValueChange={(value) => handleSelectChange('mandal', value)} value={formData.mandal}> <SelectTrigger><SelectValue placeholder="मंडल का चयन करें" /></SelectTrigger> <SelectContent>{upZones[formData.zone].mandals.map(mandal => <SelectItem key={mandal} value={mandal}>{mandal}</SelectItem>)}</SelectContent> </Select> )}
                {formData.mandal && ( <Select onValueChange={(value) => handleSelectChange('jila', value)} value={formData.jila}> <SelectTrigger><SelectValue placeholder="जिला का चयन करें" /></SelectTrigger> <SelectContent>{upZones[formData.zone].districts[formData.mandal]?.map(dist => <SelectItem key={dist} value={dist}>{dist}</SelectItem>)}</SelectContent> </Select> )}
                {formData.jila && districts[formData.jila] && ( <> <Select onValueChange={(value) => handleSelectChange('loksabha', value)} value={formData.loksabha}> <SelectTrigger><SelectValue placeholder="लोकसभा" /></SelectTrigger> <SelectContent>{districts[formData.jila].loksabha.map(ls => <SelectItem key={ls} value={ls}>{ls}</SelectItem>)}</SelectContent> </Select> {formData.loksabha && ( <Select onValueChange={(value) => handleSelectChange('vidansabha', value)} value={formData.vidansabha}> <SelectTrigger><SelectValue placeholder="विधानसभा" /></SelectTrigger> <SelectContent>{districts[formData.jila].vidansabha[formData.loksabha]?.map(vs => <SelectItem key={vs} value={vs}>{vs}</SelectItem>)}</SelectContent> </Select> )} </> )}
                {formData.vidansabha && formData.vidansabha !== 'कल्याणपुर' && ( <div className="flex items-center space-x-4"> <Label>Area Type:</Label> <RadioGroup value={formData.areaType} onValueChange={handleAreaTypeChange} className="flex gap-4"> <div className="flex items-center space-x-2"><RadioGroupItem value="rural" id="rural" /><Label htmlFor="rural">Rural</Label></div> {showUrbanOption && (<div className="flex items-center space-x-2"><RadioGroupItem value="urban" id="urban" /><Label htmlFor="urban">Urban</Label></div>)} </RadioGroup> </div> )}
                {formData.areaType === 'rural' && ( <> <Select onValueChange={(value) => handleSelectChange('block', value)} value={formData.block}> <SelectTrigger><SelectValue placeholder="ब्लॉक" /></SelectTrigger> <SelectContent>{districts[formData.jila].blocks.map(block => <SelectItem key={block} value={block}>{block}</SelectItem>)}</SelectContent> </Select> {formData.block && ( <Select onValueChange={(value) => handleSelectChange('gramPanchayat', value)} value={formData.gramPanchayat}> <SelectTrigger><SelectValue placeholder="ग्राम पंचायत" /></SelectTrigger> <SelectContent>{districts[formData.jila].grampanchayat[formData.block]?.map(gp => <SelectItem key={gp} value={gp}>{gp}</SelectItem>)}</SelectContent> </Select> )} </> )}
                {formData.vidansabha === 'कल्याणपुर' && ( <Select onValueChange={(value) => handleSelectChange('ward', value)} value={formData.ward}> <SelectTrigger><SelectValue placeholder="वार्ड का चयन करें" /></SelectTrigger> <SelectContent>{kalyanpur.map(ward => <SelectItem key={ward} value={ward}>{ward}</SelectItem>)}</SelectContent> </Select> )}
                {formData.areaType === 'urban' && formData.vidansabha !== 'कल्याणपुर' && ( <Select onValueChange={(value) => handleSelectChange('ward', value)} value={formData.ward}> <SelectTrigger><SelectValue placeholder="वार्ड का चयन करें" /></SelectTrigger> <SelectContent>{districts[formData.jila].nagar_nikay.ward.map(ward => <SelectItem key={ward} value={ward}>{ward}</SelectItem>)}</SelectContent> </Select> )}
                <div className="flex items-center space-x-2 col-span-2"> <Input type="file" accept="image/*" onChange={async (e) => { const file = e.target.files[0]; if (!file) return; setUploading(true); const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => { setFormData(prev => ({ ...prev, photoUrl: reader.result })); toast.success("Image ready to save!"); setUploading(false); }; reader.onerror = () => { toast.error("Failed to read image."); setUploading(false); }; }} /> {formData.photoUrl && <Image src={formData.photoUrl} alt="Preview" className="w-16 h-16 rounded object-cover border" width={64} height={64} />} </div>
                <Button type="submit" disabled={uploading} className="col-span-full">{editingId ? 'Update Member' : 'Add Member'}</Button>
                {editingId && <Button variant="secondary" onClick={() => { setEditingId(null); setFormData(initialFormState); }}>Cancel Edit</Button>}
            </form>

            {/* Table for displaying members */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>क्र.सं.</TableHead>
                        <TableHead>नाम</TableHead>
                        <TableHead>पद</TableHead>
                        <TableHead>जिम्मेदारी</TableHead>
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
                            <TableCell>{member.zimedari}</TableCell>
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