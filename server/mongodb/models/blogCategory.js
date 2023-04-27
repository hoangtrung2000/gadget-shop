import mongoose from "mongoose";
// Declare the Schema of the Mongo model
var blogCategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  { timestamps: true }
);

//Export the model
const blogCategory = mongoose.model("blogCategory", blogCategorySchema);
export default blogCategory;
