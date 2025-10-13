import mongoose from 'mongoose';

const organizationalMemberSchema = new mongoose.Schema({
    kramSankhya: { type: Number, required: true },
    naam: { type: String, required: true },
    pad: { // Position/Designation
        type: String,
        required: true,
        // UPDATED ENUM to match your new admin form
        enum: [
            'National Executive', 'State Executive', 'Divisional Committee', 
            'District Committee', 'Assembly Committee', 'Ward Committee', 
            'Booth Committee', 'Social Media', 'Spokesperson'
        ]
    },
    sampark: { type: String },
    zimedari: { type: String },
    photoUrl: { type: String, required: true },
    zone: { type: String },
    mandal: { type: String },
    jila: { type: String },
    loksabha: { type: String },
    vidansabha: { type: String },
    areaType: { type: String },
    block: { type: String },
    gramPanchayat: { type: String },
    ward: { type: String },
    
}, {
    timestamps: true 
});

export default mongoose.models.OrganizationalMember || mongoose.model('OrganizationalMember', organizationalMemberSchema);