import mongoose from 'mongoose';

const supportFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'],
    trim: true
  },
  district: {
    type: String,
    required: [true, 'District is required'],
    trim: true
  },
  loksabha: {
    type: String,
    required: [true, 'Lok Sabha is required'],
    trim: true
  },
  vidansabha: {
    type: String,
    required: [true, 'Vidhan Sabha is required'],
    trim: true
  },
  areaType: {
    type: String,
    required: [true, 'Area type is required'],
    enum: ['rural', 'urban'],
    trim: true
  },
  // Rural specific fields
  block: {
    type: String,
    required: function() { return this.areaType === 'rural'; },
    trim: true
  },
  gramPanchayat: {
    type: String,
    required: function() { return this.areaType === 'rural'; },
    trim: true
  },
  // Urban specific field
  ward: {
    type: String,
    required: function() { return this.areaType === 'urban'; },
    trim: true
  },
  problem: {
    type: String,
    required: [true, 'Problem description is required'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

// Update lastUpdated timestamp before saving
supportFormSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

const SupportForm = mongoose.models.SupportForm || mongoose.model('SupportForm', supportFormSchema);

export default SupportForm;
