import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
    form: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, 'Form name cannot be empty']
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price cannot be negative']
    }
}, {
    timestamps: true
});

export default mongoose.models.Pricing || mongoose.model("Pricing", pricingSchema);