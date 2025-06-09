const mongoose = require('mongoose');

const goldRateSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  rate22K: { type: Number, required: true }, // Rate per gram for 22K gold
  rate24K: { type: Number, required: true }, // Rate per gram for 24K gold
  source: { type: String, required: true }, // Source of the rate (e.g., market name or website)
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'StaffAccount', required: true },
  previousRate22K: { type: Number }, // Previous rate for tracking changes
  previousRate24K: { type: Number },
  changePercentage22K: { type: Number }, // Percentage change from previous rate
  changePercentage24K: { type: Number },
  remarks: String
}, {
  timestamps: true
});

// Create index for efficient date-based queries
goldRateSchema.index({ date: -1 });

// Pre-save middleware to calculate change percentages
goldRateSchema.pre('save', async function(next) {
  if (this.isModified('rate22K') || this.isModified('rate24K')) {
    // Get the latest rate before this one
    const previousRate = await this.constructor.findOne({}, {}, { sort: { 'date': -1 } });
    
    if (previousRate) {
      this.previousRate22K = previousRate.rate22K;
      this.previousRate24K = previousRate.rate24K;
      
      // Calculate percentage changes
      this.changePercentage22K = ((this.rate22K - previousRate.rate22K) / previousRate.rate22K) * 100;
      this.changePercentage24K = ((this.rate24K - previousRate.rate24K) / previousRate.rate24K) * 100;
    }
  }
  next();
});

module.exports = mongoose.model('GoldRate', goldRateSchema); 