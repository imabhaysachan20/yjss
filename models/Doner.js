import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  userId: String,
  name: String,
  lname: String,
  mob: String,
  whatno: String,
  address: String,
  state: String,
  district: String,
  loksabha: String,
  vidansabha: String,
  ward: String,
  paymentId: String,
  orderId: String,
  paymentStatus: String,
  membershipDate: { type: Date, default: Date.now }
});

export default mongoose.models.Doner || mongoose.model('Doner', memberSchema);
