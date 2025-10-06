import mongoose from 'mongoose';

const organizationalMemberSchema = new mongoose.Schema({
    kramSankhya: { // Serial Number
        type: Number,
        required: true,
    },
    naam: { // Name
        type: String,
        required: [true, 'Name is required.'],
    },
    pad: { // Position/Designation
        type: String,
        required: [true, 'Position is required.'],
        enum: [
            'Vice President',
            'State President',
            'District President',
            'Social Media',
            'Spokesperson',
            'Election Program'
        ]
    },
    sampark: { // Contact
        type: String,
    },
    jila: { // District
        type: String,
    },
    atiriktZimedari: { // Additional Responsibility
        type: String,
    },
    photoUrl: { // Photo URL
        type: String,
        required: [true, 'Photo URL is required.'],
    }
}, {
    timestamps: true 
});

export default mongoose.models.OrganizationalMember || mongoose.model('OrganizationalMember', organizationalMemberSchema);