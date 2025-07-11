import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  userId: String,
  name: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  mob: {
    type: String,
    required: true
  },
  whatno: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  // Fields that are only required for UP state
  district: {
    type: String,
    required: function() { return this.state === 'Uttar Pradesh'; }
  },
  paymentId: String,
  orderId: String,
  paymentStatus: String,
  membershipDate: { type: Date, default: Date.now }
});

export default mongoose.models.Doner || mongoose.model('Doner', memberSchema);
