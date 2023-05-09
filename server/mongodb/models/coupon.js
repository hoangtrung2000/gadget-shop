import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var couponSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    discount: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

//Export the model
const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
